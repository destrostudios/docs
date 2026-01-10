# HTTP Server

Software: `apache2`

## Installation
- `apt install apache2`
- Confirm via `systemctl status apache2` and `curl localhost`

## Enable required modules
- `a2enmod ssl` (for `SSLEngine`)
- `a2enmod rewrite` (for `RewriteEngine`)
- `a2enmod proxy` (for `ProxyPass`)
- `a2enmod proxy_http` (for `ProxyPass` to `http`+`https`)
- `a2enmod headers` (for `RequestHeader`)
- Restart server via `systemctl restart apache2`

## Default configuration
- Update the `DocumentRoot` from `/var/www/html` to `/var/www/default` in both `/etc/apache2/sites-available/000-default.conf` and `/etc/apache2/sites-available/default-ssl.conf` (for access via ip address)
- Delete the old html directory via `rm -rf /var/www/html`
- Remove the `Indexes` option from the `/var/wwww` `Directory` in `/etc/apache2/apache2.conf` (to disable directory listings)
- Restart server via `systemctl restart apache2`

## Certbot base configuration
- We want Certbot to generate its Apache base configuration file `/etc/letsencrypt/options-ssl-apache.conf` so that we can import into all our domain-specific configurations
- To generate this file, we can run certbot with the `--apache` flag and let it create a dummy certificate. When this flag is set, it will also create this file and change a few things in the Apache configuration. After it finishes, we delete the dummy certificate and revert all changes to the Apache configuration, leaving only the generated base configuration file.
- The following steps should therefore be done on a fresh server setup, without any custom `sites-available` existing yet, as certbots changes are then very easy to revert
- `certbot --apache -d destrostudios.com`
- `certbot delete --cert-name destrostudios.com-0001`
- `a2dissite 000-default-le-ssl.conf`
- `rm /etc/apache2/sites-available/000-default-le-ssl.conf`
- Restart server via `systemctl restart apache2`

## Domain configuration
- The example configurations below are for the domain `destrostudios.com`
- Create a configuration file `/etc/apache2/sites_available/destrostudios.com.conf` for http access via the domain (redirecting to the same domain via https):
```
<VirtualHost *:80>
    ServerName destrostudios.com
    ServerAlias www.destrostudios.com
    ServerAlias mail.destrostudios.com
    ServerAlias imap.destrostudios.com
    ServerAlias smtp.destrostudios.com

    Redirect permanent / https://destrostudios.com/
</VirtualHost>
```
- Create a configuration file `/etc/apache2/sites_available/destrostudios.com-ssl` for https access via the domain (pointing to `/var/www/destrostudios`):
```
<VirtualHost *:443>
    ServerName destrostudios.com
    ServerAlias www.destrostudios.com
    ServerAlias mail.destrostudios.com
    ServerAlias imap.destrostudios.com
    ServerAlias smtp.destrostudios.com

    DocumentRoot /var/www/destrostudios

    Include /etc/letsencrypt/options-ssl-apache.conf
    SSLCertificateFile /etc/letsencrypt/live/destrostudios.com/fullchain.pem
    SSLCertificateKeyFile /etc/letsencrypt/live/destrostudios.com/privkey.pem

    ErrorDocument 400 /errors/error.php?type=400
    ErrorDocument 401 /errors/error.php?type=401
    ErrorDocument 403 /errors/error.php?type=403
    ErrorDocument 404 /errors/error.php?type=404
    ErrorDocument 500 /errors/error.php?type=500
</VirtualHost>
 ```
- Enable the http site via `a2ensite destrostudios.com`
- Enable the https site via `a2ensite destrostudios.com-ssl`
- Restart server via `systemctl restart apache2`

## Common rules
- Don't redirect files or directories:
```
RewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI} -f [OR]
RewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI} -d
RewriteRule ^ - [L]
 ```
- Don't redirect a specific directory:
```
RewriteRule ^/directory/ - [L]
 ```
- Redirect the rest (possible Angular, Wordpress, etc. routes) to an index file:
```
RewriteRule ^ /index.html [L]
 ```
