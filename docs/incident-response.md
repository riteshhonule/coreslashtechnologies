# CoreSlash Technologies — Production Incident Response Plan

## Standard Operating Procedure (6-Phase Framework)

Every production incident must follow these 6 phases:
1. **Detect**: Alert received or anomaly reported.
2. **Confirm**: Validate issue scope using health probes (`/health/readiness`), PM2 logs, and metrics.
3. **Mitigate**: Apply temporary fix (e.g. process restart, failover) to restore service availability immediately.
4. **Recover**: Resolve root cause and ensure full operational capability.
5. **Verify**: Confirm system stability via smoke tests and log analysis.
6. **Document**: File an incident post-mortem documenting timeline, root cause, and corrective actions.

---

## Incident Response Procedures by Category

### Incident 1: API Total Outage (HTTP 502 / Connection Refused)
1. **Detect**: Uptime alert or NGINX 502 error spike.
2. **Confirm**: Run `pm2 status` and `curl http://127.0.0.1:5000/api/v1/health/liveness`.
3. **Mitigate**: Restart API cluster via `pm2 restart coreslash-api`.
4. **Recover**: Inspect `~/.pm2/logs/coreslash-api-error.log` to fix underlying crash.
5. **Verify**: `curl -f http://127.0.0.1:5000/api/v1/health/readiness`.
6. **Document**: File post-mortem report.

### Incident 2: Database Outage (HTTP 503 / PostgreSQL Down)
1. **Detect**: `GET /health/readiness` returns HTTP 503 or alert `PostgreSQL Unavailable`.
2. **Confirm**: Check PostgreSQL service: `systemctl status postgresql`.
3. **Mitigate**: Restart PostgreSQL service: `systemctl restart postgresql`.
4. **Recover**: If database failed to start due to disk exhaustion, clean temporary files/old logs.
5. **Verify**: `npx prisma migrate status` and verify API health probe.
6. **Document**: Update capacity planning document if disk reached 100%.

### Incident 3: Redis / Queue Outage
1. **Detect**: Redis connection warning in logs or worker stall.
2. **Confirm**: Test Redis ping: `redis-cli ping`.
3. **Mitigate**: Restart Redis service: `systemctl restart redis-server`. HTTP API degrades gracefully and continues operating.
4. **Recover**: Restart worker process: `pm2 restart coreslash-notification-worker`.
5. **Verify**: Check BullMQ queue processing logs.
6. **Document**: File incident summary.

### Incident 4: Security Anomaly (Token Reuse / Suspicious Activity Spikes)
1. **Detect**: Security log alert (`TOKEN_REUSE_DETECTED` or high `LOGIN_FAILED` spike).
2. **Confirm**: Inspect `ActivityLog` entries for suspicious IP addresses or user IDs.
3. **Mitigate**: Invalidate target user refresh tokens in database (`UPDATE "User" SET "refreshToken" = NULL WHERE id = ...`).
4. **Recover**: Block malicious IP address at firewall / NGINX layer (`deny <IP>;`).
5. **Verify**: Monitor auth metrics for normal baseline login traffic.
6. **Document**: Report security incident details.

### Incident 5: Backup Failure Alert
1. **Detect**: Daily backup cron alert or stale backup timestamp (> 26 hours).
2. **Confirm**: Inspect `/var/backups/postgresql/coreslash/` for file existence and non-zero size.
3. **Mitigate**: Run manual backup: `pg_dump -U postgres -h 127.0.0.1 -F c -b -v -f /var/backups/postgresql/coreslash/manual_$(date +%Y%m%d).dump coreslash_prod`.
4. **Recover**: Fix root cause (e.g. disk space limit or cron permission).
5. **Verify**: Validate dump file integrity using `pg_restore -l <dump_file>`.
6. **Document**: Log backup verification event.
