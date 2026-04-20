#!/bin/bash
su -c "mkdir -p /var/run/postgresql && chown -R postgres:postgres /var/run/postgresql && /usr/lib/postgresql/16/bin/pg_ctl -D /etc/postgresql/16/main -l logfile start" postgres
