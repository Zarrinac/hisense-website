#!/bin/bash
# Weekly (cron) backup — tars rootfs/apache/ssh + pg_dumpall, keeps last 4 weeks.
# Live copy: /usr/local/bin/weekly-backup.sh  ·  needs sudo (tars system dirs + pg_dumpall).
set -euo pipefail

DATE="$(date +%F)"
HOST="$(hostname -s)"

BACKUP_DIR="/backup"
PG_DIR="/backup-postgres"

ROOTFS_TAR="${BACKUP_DIR}/${HOST}-rootfs-${DATE}.tar.gz"
APACHE_TAR="${BACKUP_DIR}/${HOST}-apache-${DATE}.tar.gz"
SSH_TAR="${BACKUP_DIR}/${HOST}-ssh-${DATE}.tar.gz"
PG_TAR="${BACKUP_DIR}/${HOST}-postgres-${DATE}.tar.gz"

PG_SQL="${PG_DIR}/postgres-all-${DATE}.sql"

mkdir -p "$BACKUP_DIR" "$PG_DIR"

echo "[1/4] RootFS -> $ROOTFS_TAR"
sudo tar -czpf "$ROOTFS_TAR" \
  --xattrs --acls \
  --exclude=/dev \
  --exclude=/proc \
  --exclude=/sys \
  --exclude=/tmp \
  --exclude=/run \
  --exclude=/mnt \
  --exclude=/media \
  --exclude=/lost+found \
  /

echo "[2/4] Apache -> $APACHE_TAR"
sudo tar -czpf "$APACHE_TAR" --xattrs --acls -C /etc apache2

echo "[3/4] SSH -> $SSH_TAR"
sudo tar -czpf "$SSH_TAR" --xattrs --acls -C /etc ssh

echo "[4/4] Postgres dump -> $PG_TAR"
# write SQL as postgres (avoid redirection permission issues)
sudo -u postgres pg_dumpall | sudo -u postgres tee "$PG_SQL" > /dev/null
sudo tar -czf "$PG_TAR" -C "$PG_DIR" "$(basename "$PG_SQL")"

# cleanup raw SQL
sudo rm -f "$PG_SQL"

# keep last 4 weeks of backups
find "$BACKUP_DIR" -maxdepth 1 -type f -name "*.tar.gz" -mtime +28 -delete

echo "DONE: $(ls -lh "$BACKUP_DIR"/*.tar.gz | wc -l) archives in $BACKUP_DIR"
