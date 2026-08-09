# CoreSlash Technologies — Disaster Recovery & Business Continuity Plan

## 1. Disaster Recovery Objectives (RPO & RTO)

| Metric | Target | Classification | Description |
|---|---|---|---|
| **RPO (Recovery Point Objective)** | < 24 Hours | Technical Recommendation | Maximum acceptable data loss window determined by daily PostgreSQL dumps. |
| **RTO (Recovery Time Objective)** | < 1 Hour | Technical Recommendation | Target time to restore full operational capability after total server loss. |

*Note: Formal SLAs should be aligned with business stakeholders based on operational tiering.*

---

## 2. Authoritative vs Rebuildable Data Summary

- **AUTHORITATIVE DATA (Must be restored from PostgreSQL backup)**:
  - Users, Password Hashes, Roles, Permissions
  - Refresh Tokens, Revocation Logs, Activity Logs
  - CMS Entities (Services, Blogs, Blog Categories, Portfolio, FAQ, Careers, Applications, Contact Inquiries, Newsletter Subscribers, SEO Meta, System Settings, Media Metadata)

- **REBUILDABLE DATA (Transient & Automatically Recomputed)**:
  - Redis Cache keys (repopulated on miss using single-flight loaders)
  - In-flight HTTP request deduping state
  - Transient BullMQ queue state (re-queued on job creation)

---

## 3. Disaster Recovery Procedures

### Scenario A: Complete Production Server Loss (Total Bare-Metal Recovery)

```
Step 1: Provision New Compute Instance (Ubuntu 22.04 LTS, 4GB+ RAM)
  │
Step 2: Install Runtime Prerequisites (Node 20, PostgreSQL 15, Redis 7, NGINX, PM2)
  │
Step 3: Restore Database from Off-Server PostgreSQL Dump
  │     pg_restore -U postgres -h 127.0.0.1 -d coreslash_prod /path/to/latest_backup.dump
  │
Step 4: Clone Code Base & Restore Production .env File
  │     git clone <repo_url> /var/www/coreslash
  │     chmod 600 /var/www/coreslash/backend/.env
  │
Step 5: Install Dependencies & Compile Production Build
  │     npm ci && npm run build
  │
Step 6: Configure NGINX, Obtain SSL Certificate, Start PM2 Processes
  │     pm2 start ecosystem.config.js --env production
  │     certbot --nginx -d api.coreslash.com
  │
Step 7: Update DNS A-Record to Point to New Server IP
  │
Step 8: Execute Production Smoke Tests & Health Probes
```

### Scenario B: PostgreSQL Restoration Verification Procedure

Restoration verification MUST be performed in an isolated non-production environment (`coreslash-recovery-test`) to guarantee backup archive integrity:

```bash
# 1. Create temporary test database
createdb -U postgres -h 127.0.0.1 coreslash_recovery_test

# 2. Restore PostgreSQL dump file
pg_restore -U postgres -h 127.0.0.1 -d coreslash_recovery_test /var/backups/postgresql/coreslash/latest.dump

# 3. Execute validation queries against restore target
psql -U postgres -h 127.0.0.1 -d coreslash_recovery_test -c "SELECT COUNT(*) FROM \"User\";"
psql -U postgres -h 127.0.0.1 -d coreslash_recovery_test -c "SELECT COUNT(*) FROM \"Service\";"

# 4. Tear down temporary database
dropdb -U postgres -h 127.0.0.1 coreslash_recovery_test
```

---

## 4. Disaster Recovery Testing Summary

- **API Process Failover**: Verified automatic restart via PM2 cluster.
- **Worker Isolation**: Verified worker restart without impacting API cluster.
- **Redis Degradation**: Verified HTTP API continues serving DB requests cleanly when Redis drops.
- **Database Schema Protection**: Schema frozen with **0 changes**, eliminating migration risks during disaster recovery.
