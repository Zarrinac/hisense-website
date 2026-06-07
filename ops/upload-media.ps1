# Upload local media -> server, then mirror it into the live dir with correct perms.
# Runs on the Windows dev PC. Requires PuTTY (pscp.exe + plink.exe).
#
# One-time server setup (see ops/README.md): install sync-media.sh to /usr/local/bin
# and add the NOPASSWD sudoers rule, so the final step runs unattended.
#
# Usage (from the repo root or anywhere):
#   pwsh ops/upload-media.ps1
# ---------------------------------------------------------------------------------

# ===== CONFIG — edit to match the Host/Port you use in your working PuTTY session =====
$LocalMedia = "C:\Users\r.saberifard\Documents\IT-Hisense\HIsense-Website\media"
$ServerUser = "reza"
$ServerHost = "172.17.0.10"   # IMPORTANT: must be reachable FROM your PC. 172.17.0.10
                              # looks like an internal IP — if pscp can't connect, use
                              # the public IP / hostname from your PuTTY session.
$ServerPort = "22"            # the SSH port you use in PuTTY
$Pscp  = "C:\Program Files\PuTTY\pscp.exe"
$Plink = "C:\Program Files\PuTTY\plink.exe"
# =====================================================================================

$ErrorActionPreference = "Stop"
$target = "${ServerUser}@${ServerHost}"
$staging = "/home/$ServerUser/media"

if (-not (Test-Path $LocalMedia)) { throw "Local media folder not found: $LocalMedia" }
foreach ($exe in @($Pscp, $Plink)) { if (-not (Test-Path $exe)) { throw "Not found: $exe" } }

Write-Host "1/3  Clearing server staging ($staging)..." -ForegroundColor Cyan
& $Plink -P $ServerPort $target "rm -rf '$staging'"
if ($LASTEXITCODE -ne 0) { throw "plink (clear staging) failed with exit $LASTEXITCODE" }

Write-Host "2/3  Uploading media (full copy; may take a while)..." -ForegroundColor Cyan
& $Pscp -P $ServerPort -r "$LocalMedia" "${target}:/home/$ServerUser/"
if ($LASTEXITCODE -ne 0) { throw "pscp upload failed with exit $LASTEXITCODE — live media NOT touched." }

Write-Host "3/3  Mirroring to live dir + fixing permissions..." -ForegroundColor Cyan
& $Plink -P $ServerPort $target "sudo /usr/local/bin/sync-media.sh"
if ($LASTEXITCODE -ne 0) { throw "remote sync-media.sh failed with exit $LASTEXITCODE" }

Write-Host "Media sync complete." -ForegroundColor Green
Write-Host "Note: replaced (same-name) images may be cached by Next's optimizer; new files appear immediately."
