# Static content

Static content is hosted in `/var/www/`. Each domain is allowed to have an own exclusive directory on this level, which can be redirected to by the domains [http server](/infrastructure/http_server.md) configuration. Content that doesn't belong to a specific domain is hosted under `/var/www/default`, which is used when opening the server ip address via browser.

| Directory                       | Project        | Purpose                                 |
|:--------------------------------|:---------------|:----------------------------------------|
| `/var/www/default`              | -              | Default                                 |
| `/var/www/destrostudios`        | Destrostudios  | Website and static content for launcher |
| `/var/www/etherblood`           | -              | Website                                 |
| `/var/www/maniascript`          | Maniascript IO | Website                                 |
