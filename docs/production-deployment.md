# CoreSlash Technologies — Production Deployment & Operations Guide

## 1. Architecture Overview

```
Internet / Clients
       │
       ▼ (HTTPS 443)
┌──────────────┐
│    NGINX     │ Reverse Proxy & SSL Termination (Certbot / TLS 1.3)
└──────┬───────┘
       │ (HTTP Local 127.0.0.1:5000)
       ▼
┌──────────────┐     ┌────────────────┐
│ NestJS API   │────►│ PostgreSQL DB  │ (Primary Database Source of Truth)
│ (Cluster)    │     └────────────────┘
└──────┬───────┘
       │             ┌────────────────┐
       ├────────────►│ Redis Cache    │ (Single-flight Cache & Session Store)
       │             └────────────────┘
       ▼
┌──────────────┐     ┌────────────────┐
│ BullMQ Queue │────►│ Notification   │ (Standalone Worker Process)
└──────────────┘     │ Worker         │
                     └────────────────┘
```

---

## 2. Server Requirements & Prerequisites

- **OS**: Ubuntu 22.04 LTS (Recommended)
- **CPU**: 2+ Cores
- **RAM**: 4GB Minimum (8GB Recommended for DB + Redis + API)
- **Node.js**: v20.x or v22.x LTS
- **Package Manager**: `npm` v10+
- **Process Manager**: `PM2` v5+ (`npm install -g pm2`)
- **Database**: PostgreSQL v15+
- **Cache / Queue**: Redis v7+
- **Web Server**: NGINX v1.18+

---

## 3. Environment Variables Configuration

Environment variables MUST be stored strictly in `/var/www/coreslash/backend/.env` on the server with restricted file permissions (`chmod 600 .env`). **NEVER commit `.env` to Git.**

| Variable | Description | Example / Required Format |
|---|---|---|
| `PORT` | API Server Listen Port | `5000` |
| `NODE_ENV` | Environment Flag | `production` |
| `DATABASE_URL` | PostgreSQL Connection URI | `postgresql://user:pass@127.0.0.1:5432/coreslash_prod?schema=public` |
| `JWT_SECRET` | Strong Cryptographic Secret | `64+ char random hex string` |
| `JWT_REFRESH_SECRET` | Strong Refresh Cryptographic Secret | `64+ char random hex string` |
| `JWT_EXPIRES_IN` | Access Token TTL | `15m` |
| `JWT_REFRESH_EXPIRES_IN` | Refresh Token TTL | `7d` |
| `REDIS_HOST` | Redis Host | `127.0.0.1` |
| `REDIS_PORT` | Redis Port | `6379` |
| `REDIS_PASSWORD` | Redis Password | `Strong Redis Auth Password` |
| `CORS_ORIGIN` | Allowed Frontend Origin(s) | `https://coreslash.com,https://admin.coreslash.com` |
| `APP_URL` | Application API Domain | `https://api.coreslash.com` |
| `FRONTEND_URL` | Frontend Domain | `https://coreslash.com` |

---

## 4. Deployment Procedure

### Step 1: Code Pull & Validation
```bash
cd /var/www/coreslash/backend
git fetch origin main
git checkout main
git pull origin main
```

### Step 2: Clean Dependency Installation & Build
```bash
npm ci
npm run build
```

### Step 3: Database Migration Status Audit
```bash
npx prisma migrate status
```
*Expected output: `Database schema is up to date!`*

### Step 4: Process Reload via PM2
```bash
pm2 reload ecosystem.config.js --env production
pm2 save
```

### Step 5: Post-Deployment Smoke Verification
```bash
curl -f http://127.0.0.1:5000/api/v1/health/liveness
curl -f http://127.0.0.1:5000/api/v1/health/readiness
```

---

## 5. Rollback Procedure

If post-deployment smoke tests fail or issues arise:

```bash
# 1. Identify previous stable Git commit SHA
git log -n 5 --oneline

# 2. Revert code to stable commit
git reset --hard <STABLE_COMMIT_SHA>

# 3. Rebuild and restart API & Worker processes
npm ci
npm run build
pm2 reload ecosystem.config.js --env production

# 4. Verify health probes
curl -f http://127.0.0.1:5000/api/v1/health/readiness
```

*Note: Application code rollbacks do NOT alter PostgreSQL database records or Prisma schemas because the database schema is frozen.*

---

## 6. PostgreSQL Backup & Restore Procedure

### Automated Daily Backup Cron (`/etc/cron.daily/coreslash-db-backup`)
```bash
#!/bin/bash
BACKUP_DIR="/var/backups/postgresql/coreslash"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
mkdir -p "$BACKUP_DIR"

pg_dump -U postgres -h 127.0.0.1 -F c -b -v -f "$BACKUP_DIR/coreslash_prod_$TIMESTAMP.dump" coreslash_prod

# Retention policy: Delete backups older than 30 days
find "$BACKUP_DIR" -type f -name "*.dump" -mtime +30 -delete
```

### Restoration Test Procedure (Non-Production Target)
```bash
# Create isolated test database
createdb -U postgres -h 127.0.0.1 coreslash_restore_test

# Restore dump file
pg_restore -U postgres -h 127.0.0.1 -d coreslash_restore_test /var/backups/postgresql/coreslash/coreslash_prod_<TIMESTAMP>.dump

# Clean up test database
dropdb -U postgres -h 127.0.0.1 coreslash_restore_test
```

---

## 7. NGINX & SSL/TLS Setup

1. Copy NGINX configuration:
   ```bash
   cp /var/www/coreslash/nginx/coreslash.conf /etc/nginx/sites-available/coreslash
   ln -s /etc/nginx/sites-available/coreslash /etc/nginx/sites-enabled/
   nginx -t
   systemctl reload nginx
   ```
2. Obtain SSL Certificate via Certbot:
   ```bash
   certbot --nginx -d api.coreslash.com
   ```

---

## 8. Process & Queue Management (PM2)

- View process status: `pm2 status`
- Monitor real-time logs: `pm2 logs`
- Restart API cluster: `pm2 restart coreslash-api`
- Restart Worker process: `pm2 restart coreslash-notification-worker`

---

## 9. Troubleshooting & Health Probes

- **Liveness Probe**: `GET /api/v1/health/liveness` — Confirms Node.js HTTP event loop is active.
- **Readiness Probe**: `GET /api/v1/health/readiness` — Confirms active connectivity to PostgreSQL database.
- **Redis Degradation**: If Redis drops, API automatically degrades gracefully, allowing HTTP DB operations to continue.
