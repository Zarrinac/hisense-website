#!/bin/bash
# Daily (cron) health monitor — checks disk/memory/PM2 thresholds directly, no external API calls.
# Live copy: /usr/local/bin/hisense-monitor.sh  ·  log: /var/log/hisense-monitor.log
# Node/pm2 paths are nvm-specific to this host — update if the node version changes.
export HOME=/home/reza
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
PM2_BIN="/home/reza/.nvm/versions/node/v22.19.0/bin/pm2"

TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')
DISK_PCT=$(df -P / | awk 'NR==2 {gsub("%","",$5); print $5}')
DISK_LINE=$(df -h / | awk 'NR==2 {print $3"/"$2" used ("$5")"}')
MEM_PCT=$(free | awk '/^Mem:/ {printf "%d", ($3/$2)*100}')
MEM_LINE=$(free -h | awk '/^Mem:/ {print $3"/"$2" used"}')

PM2_STATUS=$($PM2_BIN jlist 2>/dev/null | python3 -c "
import sys, json
procs = json.load(sys.stdin)
for p in procs:
    print(f\"{p['name']}: {p['pm2_env']['status']} | restarts: {p['pm2_env']['restart_time']}\")" 2>/dev/null)
[ -z "$PM2_STATUS" ] && PM2_STATUS="PM2 status unavailable"

ALERTS=()
[ "$DISK_PCT" -gt 80 ] 2>/dev/null && ALERTS+=("Disk usage critical: ${DISK_PCT}% ($DISK_LINE)")
[ "$MEM_PCT" -gt 90 ] 2>/dev/null && ALERTS+=("Memory usage critical: ${MEM_PCT}% ($MEM_LINE)")
while IFS= read -r line; do
    case "$line" in
        *": online"*) ;;
        *": "*) ALERTS+=("PM2 process not online: $line") ;;
    esac
done <<< "$PM2_STATUS"

{
    echo "[$TIMESTAMP]"
    echo "Disk: $DISK_LINE"
    echo "Memory: $MEM_LINE"
    echo "PM2: $PM2_STATUS"
    if [ ${#ALERTS[@]} -eq 0 ]; then
        echo "All clear. No issues detected."
    else
        echo "ALERTS:"
        printf ' - %s\n' "${ALERTS[@]}"
    fi
    echo "---"
} >> /var/log/hisense-monitor.log
