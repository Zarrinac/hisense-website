# ops/ — server operations scripts

Canonical, version-controlled copies of the production server's operational scripts.
The **live** copies run from outside the repo (so a `git pull` never rewrites a script
mid-execution); these are the source of truth — edit here, then sync to the server.

**Server:** Ubuntu host `nexzarrin`, user `reza`, app at `/var/www/hisense-ir/app`,
served by PM2 (`hisense-ir`, `ecosystem.config.cjs`) behind Apache. DB: local Postgres
`zarrin` (owner `reza_sf`).

## Files

| Repo file                     | Live location on server             | Purpose                                                    |
| ----------------------------- | ----------------------------------- | ---------------------------------------------------------- |
| `ops/deploy.sh`               | `/var/www/hisense-ir/deploy.sh`     | Pull → `npm ci` → `db:deploy` → `build` → `pm2 reload`     |
| `ops/cron/hisense-monitor.sh` | `/usr/local/bin/hisense-monitor.sh` | Hourly health check piped to `claude -p`                   |
| `ops/cron/weekly-backup.sh`   | `/usr/local/bin/weekly-backup.sh`   | Weekly rootfs/apache/ssh tar + `pg_dumpall`, keeps 4 weeks |
| `ops/sync-media.sh`           | `/usr/local/bin/sync-media.sh`      | Mirror staged media → live dir + fix owner/perms (`a+rX`)  |
| `ops/upload-media.ps1`        | (runs on the Windows dev PC)        | pscp upload + trigger `sync-media.sh` over plink           |

> Not included: `ecosystem.config.cjs`, `.env` — they hold secrets and are gitignored.
> Keep them only on the server. The husky hooks (`.husky/pre-commit`, `pre-push`) live in
> the repo root already.

## Syncing to the server

After a deploy pulls a change under `ops/`, copy the affected script to its live location:

```bash
cd /var/www/hisense-ir/app

# Deploy script (outside the repo on purpose)
cp ops/deploy.sh /var/www/hisense-ir/deploy.sh
chmod +x /var/www/hisense-ir/deploy.sh

# Cron scripts (need root to write /usr/local/bin)
sudo cp ops/cron/hisense-monitor.sh /usr/local/bin/hisense-monitor.sh
sudo cp ops/cron/weekly-backup.sh   /usr/local/bin/weekly-backup.sh
sudo chmod +x /usr/local/bin/hisense-monitor.sh /usr/local/bin/weekly-backup.sh
```

(`deploy.sh` is intentionally a manual copy, not a symlink into the repo: bash reads a
script as it runs, so letting `git pull` overwrite the executing file is unsafe.)

## One-time setup

```bash
# Deploy log must be writable by the app user (a failing tee aborts the deploy)
sudo touch /var/log/hisense-deploy.log && sudo chown reza:reza /var/log/hisense-deploy.log

# Cron entries (crontab -e)  — adjust times to taste
0 * * * *  /usr/local/bin/hisense-monitor.sh                 # hourly monitor
0 3 * * 0  /usr/local/bin/weekly-backup.sh >> /var/log/hisense-backup.log 2>&1   # Sun 03:00 backup
```

## Media sync (local PC → server)

Media lives **outside git** (local `HIsense-Website/media`, server `/var/www/hisense-ir/media`).
The Next app runs as `reza` and reads media off disk to optimize images — so the live dir
**must be readable by `reza`**. Leaving it `www-data`-only / mode `700` causes `EACCES` and a
503 crash-loop. `sync-media.sh` always applies `chmod -R a+rX`, which prevents that.

**One-time setup on the server** (so `upload-media.ps1` runs unattended):

```bash
# install the script root-owned (so the NOPASSWD rule below is safe)
sudo cp /var/www/hisense-ir/app/ops/sync-media.sh /usr/local/bin/sync-media.sh
sudo chown root:root /usr/local/bin/sync-media.sh && sudo chmod 755 /usr/local/bin/sync-media.sh

# allow reza to run ONLY this script as root without a password
echo 'reza ALL=(root) NOPASSWD: /usr/local/bin/sync-media.sh' | sudo tee /etc/sudoers.d/hisense-media
sudo chmod 440 /etc/sudoers.d/hisense-media
```

**Usage from the Windows PC:** edit the CONFIG block in `ops/upload-media.ps1` (Host/Port must
match your working PuTTY session — `172.17.0.10` is internal and may not be reachable from your
PC), then run `pwsh ops/upload-media.ps1`. It clears staging → `pscp` uploads the whole media
folder → `plink` runs `sudo sync-media.sh` (rsync `--delete` mirror + owner/perms).

Manual equivalent (no PS script): `pscp` the folder to `/home/reza/`, then on the server
`sudo /usr/local/bin/sync-media.sh`.

## Notes

- `hisense-monitor.sh` hard-codes nvm node paths (`v22.19.0`) for `claude`/`pm2` — update
  them if the server's node version changes.
- `deploy.sh` runs as `reza` (never root): a root-owned `.next` breaks PM2.
- Deploy/DB/media workflow context lives in the repo root `CLAUDE.md` (Deployment & Ops,
  DB & Media Workflow sections).

## TODO (deferred)

- **Single-source secrets:** secrets are currently duplicated in both `ecosystem.config.cjs`
  (PM2 runtime, wins at runtime) and `.env` (prisma CLI during deploy). Since `next start`
  loads `.env` from its `cwd`, the secret keys could be removed from `ecosystem.config.cjs`
  so `.env` is the single source of truth — leaving only `DATABASE_URL` to keep in sync,
  or none. Validate that PM2-launched `next start` picks up `.env` before removing them.
