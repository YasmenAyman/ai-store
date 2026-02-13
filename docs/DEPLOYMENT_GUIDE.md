# 🚀 Production Deployment Guide

## Pre-Deployment Checklist

### 1. Environment Configuration

```bash
# Copy and configure production environment
cp .env.example .env.production

# Update critical settings:
APP_ENV=production
APP_DEBUG=false
APP_URL=https://yourdomain.com

# Generate application key
php artisan key:generate
```

### 2. Database Optimization

```env
# Production database settings
DB_CONNECTION=mysql
DB_HOST=your-production-host
DB_PORT=3306
DB_DATABASE=luxury_production
DB_USERNAME=secure_user
DB_PASSWORD=very_secure_password
```

### 3. Caching Configuration

```env
CACHE_DRIVER=redis
SESSION_DRIVER=redis
QUEUE_CONNECTION=redis

REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379
```

---

## Server Requirements

### Minimum Requirements
- PHP 8.2+
- MySQL 8.0+ / PostgreSQL 13+
- Nginx / Apache
- Composer
- Node.js 18+
- Redis (recommended)
- SSL Certificate

### PHP Extensions
```bash
sudo apt install php8.2-{cli,fpm,mysql,xml,mbstring,curl,zip,gd,bcmath,redis}
```

---

## Step-by-Step Deployment

### 1. Server Setup (Ubuntu 22.04)

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Nginx
sudo apt install nginx -y

# Install PHP 8.2
sudo add-apt-repository ppa:ondrej/php
sudo apt update
sudo apt install php8.2-fpm -y

# Install MySQL
sudo apt install mysql-server -y
sudo mysql_secure_installation

# Install Redis
sudo apt install redis-server -y

# Install Composer
curl -sS https://getcomposer.org/installer | php
sudo mv composer.phar /usr/local/bin/composer

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install nodejs -y
```

### 2. Clone and Setup Application

```bash
# Navigate to web directory
cd /var/www

# Clone repository
git clone https://github.com/yourusername/luxury-ecommerce.git
cd luxury-ecommerce

# Set permissions
sudo chown -R www-data:www-data /var/www/luxury-ecommerce
sudo chmod -R 755 /var/www/luxury-ecommerce/storage
sudo chmod -R 755 /var/www/luxury-ecommerce/bootstrap/cache

# Install dependencies
composer install --optimize-autoloader --no-dev
npm install
npm run build

# Setup environment
cp .env.production .env
php artisan key:generate

# Run migrations
php artisan migrate --force

# Seed initial data
php artisan db:seed --class=RoleSeeder --force
php artisan db:seed --class=UserSeeder --force
php artisan db:seed --class=SettingSeeder --force

# Create storage link
php artisan storage:link

# Optimize application
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan event:cache
```

### 3. Nginx Configuration

Create: `/etc/nginx/sites-available/luxury-ecommerce`

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name yourdomain.com www.yourdomain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;
    root /var/www/luxury-ecommerce/public;

    # SSL Configuration
    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    # Security Headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Content-Security-Policy "default-src 'self' https: data: 'unsafe-inline' 'unsafe-eval';" always;

    index index.php;

    charset utf-8;

    # Logging
    access_log /var/log/nginx/luxury-access.log;
    error_log /var/log/nginx/luxury-error.log;

    # Gzip Compression
    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types text/plain text/css text/xml text/javascript application/json application/javascript application/xml+rss application/rss+xml font/truetype font/opentype application/vnd.ms-fontobject image/svg+xml;

    # Client Max Body Size (for uploads)
    client_max_body_size 20M;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location = /favicon.ico { access_log off; log_not_found off; }
    location = /robots.txt  { access_log off; log_not_found off; }

    error_page 404 /index.php;

    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.2-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
        fastcgi_hide_header X-Powered-By;
    }

    location ~ /\.(?!well-known).* {
        deny all;
    }

    # Cache static assets
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

Enable site:
```bash
sudo ln -s /etc/nginx/sites-available/luxury-ecommerce /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### 4. SSL Certificate (Let's Encrypt)

```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

### 5. PHP-FPM Optimization

Edit: `/etc/php/8.2/fpm/pool.d/www.conf`

```ini
pm = dynamic
pm.max_children = 50
pm.start_servers = 10
pm.min_spare_servers = 5
pm.max_spare_servers = 20
pm.max_requests = 500

; Performance
php_admin_value[memory_limit] = 256M
php_admin_value[upload_max_filesize] = 20M
php_admin_value[post_max_size] = 25M
php_admin_value[max_execution_time] = 300
```

Restart PHP-FPM:
```bash
sudo systemctl restart php8.2-fpm
```

### 6. Queue Worker Setup

Create: `/etc/systemd/system/luxury-worker.service`

```ini
[Unit]
Description=Luxury E-commerce Queue Worker
After=network.target

[Service]
Type=simple
User=www-data
Group=www-data
Restart=always
RestartSec=5s
WorkingDirectory=/var/www/luxury-ecommerce
ExecStart=/usr/bin/php /var/www/luxury-ecommerce/artisan queue:work --sleep=3 --tries=3 --max-time=3600

[Install]
WantedBy=multi-user.target
```

Enable and start:
```bash
sudo systemctl enable luxury-worker
sudo systemctl start luxury-worker
```

### 7. Scheduled Tasks (Cron)

```bash
sudo crontab -e -u www-data
```

Add:
```
* * * * * cd /var/www/luxury-ecommerce && php artisan schedule:run >> /dev/null 2>&1
```

### 8. Database Backup Script

Create: `/usr/local/bin/backup-luxury-db.sh`

```bash
#!/bin/bash
BACKUP_DIR="/var/backups/luxury-ecommerce"
DATE=$(date +%Y%m%d_%H%M%S)
DB_NAME="luxury_production"

mkdir -p $BACKUP_DIR

mysqldump -u root -p$DB_PASSWORD $DB_NAME | gzip > $BACKUP_DIR/backup_$DATE.sql.gz

# Keep only last 7 days
find $BACKUP_DIR -name "backup_*.sql.gz" -mtime +7 -delete
```

Add to cron (daily at 2 AM):
```
0 2 * * * /usr/local/bin/backup-luxury-db.sh
```

---

## Security Hardening

### 1. Firewall Setup (UFW)

```bash
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

### 2. Fail2Ban

```bash
sudo apt install fail2ban -y
sudo cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local
sudo systemctl enable fail2ban
sudo systemctl start fail2ban
```

### 3. Disable Directory Listing

In Nginx config (already included above):
```nginx
autoindex off;
```

### 4. Rate Limiting

Update `.env`:
```env
API_RATE_LIMIT=60
WEB_RATE_LIMIT=1000
```

---

## Performance Optimization

### 1. OPcache Configuration

Edit: `/etc/php/8.2/fpm/php.ini`

```ini
opcache.enable=1
opcache.memory_consumption=128
opcache.interned_strings_buffer=8
opcache.max_accelerated_files=10000
opcache.revalidate_freq=2
opcache.fast_shutdown=1
```

### 2. Redis Configuration

Edit: `/etc/redis/redis.conf`

```ini
maxmemory 256mb
maxmemory-policy allkeys-lru
```

### 3. Laravel Optimization

```bash
# Run all optimization commands
php artisan optimize
php artisan view:cache
php artisan route:cache
php artisan config:cache
php artisan event:cache
```

### 4. Database Indexing

Already included in migrations, but verify:
```sql
SHOW INDEX FROM products;
SHOW INDEX FROM orders;
```

---

## Monitoring & Logging

### 1. Application Logging

Laravel logs to: `/var/www/luxury-ecommerce/storage/logs/laravel.log`

### 2. Nginx Logs

- Access: `/var/log/nginx/luxury-access.log`
- Error: `/var/log/nginx/luxury-error.log`

### 3. Log Rotation

Create: `/etc/logrotate.d/luxury-ecommerce`

```
/var/www/luxury-ecommerce/storage/logs/*.log {
    daily
    rotate 14
    compress
    delaycompress
    notifempty
    create 0644 www-data www-data
    sharedscripts
}
```

### 4. Health Check Endpoint

Add to routes:
```php
Route::get('/health', function () {
    return response()->json(['status' => 'ok']);
});
```

---

## Post-Deployment

### 1. Verify Installation

- [ ] Homepage loads correctly
- [ ] Admin login works
- [ ] Products display
- [ ] Cart functionality
- [ ] Checkout process
- [ ] Email sending
- [ ] File uploads
- [ ] SSL certificate valid
- [ ] All assets loading (no mixed content)

### 2. Setup Monitoring

Consider services like:
- Laravel Forge
- Envoyer
- New Relic
- Sentry for error tracking

### 3. Configure Backups

- Database backups (daily)
- File backups (weekly)
- Store backups off-site (S3, etc.)

---

## Troubleshooting

### Issue: 500 Internal Server Error
```bash
# Check logs
tail -f /var/log/nginx/luxury-error.log
tail -f /var/www/luxury-ecommerce/storage/logs/laravel.log

# Clear cache
php artisan cache:clear
php artisan config:clear
php artisan view:clear
```

### Issue: Permission Denied
```bash
sudo chown -R www-data:www-data /var/www/luxury-ecommerce
sudo chmod -R 755 /var/www/luxury-ecommerce/storage
sudo chmod -R 755 /var/www/luxury-ecommerce/bootstrap/cache
```

### Issue: Queue Not Processing
```bash
# Check worker status
sudo systemctl status luxury-worker

# Restart worker
sudo systemctl restart luxury-worker

# View logs
sudo journalctl -u luxury-worker -f
```

---

## Updates & Maintenance

### Update Application

```bash
cd /var/www/luxury-ecommerce

# Pull latest code
git pull origin main

# Update dependencies
composer install --optimize-autoloader --no-dev
npm install
npm run build

# Run migrations
php artisan migrate --force

# Clear and rebuild cache
php artisan optimize
php artisan view:cache
php artisan route:cache
php artisan config:cache

# Restart services
sudo systemctl restart php8.2-fpm
sudo systemctl restart luxury-worker
```

---

**Production deployment complete! 🎉**
