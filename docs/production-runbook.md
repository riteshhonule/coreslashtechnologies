# CoreSlash Technologies — Production Operations Runbook

## 1. System Architecture & Topology

- **Application API**: NestJS (Cluster mode managed by PM2, `coreslash-api`, default port `5000`)
- **Notification Worker**: NestJS Standalone BullMQ Worker (`coreslash-notification-worker`, single fork process)
- **Database**: PostgreSQL v15+ (Port `5432`, primary authoritative source of truth)
- **Cache & Queue Broker**: Redis v7+ (Port `6379`, key prefix `coreslash:`)
- **Reverse Proxy**: NGINX v1.18+ (Port `80`, `443`, TLS 1.3, Certbot SSL)
- **File Storage**: Local filesystem (`storage/uploads` and protected `storage/uploads/resumes`)

---

## 2. Health & Monitoring Endpoints

- **Liveness Probe**: `GET /api/v1/health/liveness` — Returns process status (`{ "status": "up", "liveness": true }`).
- **Readiness Probe**: `GET /api/v1/health/readiness` — Returns database connectivity status (`200 OK` if PostgreSQL reachable, `533 Service Unavailable` if DB down).
- **Full Health Probe**: `GET /api/v1/health` — Aggregate status of API, PostgreSQL, and Redis.
- **Metrics Snapshot**: `GET /api/v1/metrics` — Protected admin metrics endpoint (`@Permissions('system.settings.read')`).

---

## 3. Key File Locations & Directories

- **Application Root**: `/var/www/coreslash/backend`
- **Environment File**: `/var/www/coreslash/backend/.env` (Permissions `600`, strictly uncommitted)
- **PM2 Ecosystem Config**: `/var/www/coreslash/backend/ecosystem.config.js`
- **NGINX Configuration**: `/etc/nginx/sites-available/coreslash`
- **Application Logs**: `/var/www/coreslash/backend/logs/` and PM2 logs (`~/.pm2/logs/`)
- **Database Backups**: `/var/backups/postgresql/coreslash/`

---

## 4. Operational Tasks & Command Reference

### Restart API Cluster
```bash
pm2 restart coreslash-api
```

### Restart Notification Worker
```bash
pm2 restart coreslash-notification-worker
```

### View Live Logs
```bash
pm2 logs
# Or specific process:
pm2 logs coreslash-api --lines 100
pm2 logs coreslash-notification-worker --lines 100
```

### NGINX Service Management
```bash
# Test configuration
nginx -t

# Reload NGINX
systemctl reload nginx
```

### SSL Certificate Renewal (Certbot)
```bash
# Test automatic renewal dry run
certbot renew --dry-run

# Force manual renewal if within 30 days
certbot renew
```

---

## 5. Common Operational Failures & Mitigation

| Symptom | Probable Cause | Immediate Remediation Action |
|---|---|---|
| HTTP 502 Bad Gateway | `coreslash-api` processes crashed | Run `pm2 restart coreslash-api` and inspect `pm2 logs` for fatal errors. |
| HTTP 503 Service Unavailable | PostgreSQL database connection loss | Check PostgreSQL status (`systemctl status postgresql`), verify disk space. |
| Email Notifications Delayed | Worker process offline or Redis connection loss | Check worker status (`pm2 status coreslash-notification-worker`), restart worker. |
| Cache Miss Spikes | Redis restarted or evicted keys | Normal behavior; Redis single-flight deduping protects DB while cache rebuilds. |
