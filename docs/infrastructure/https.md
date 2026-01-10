# HTTPS

Software: [certbot](https://certbot.eff.org)

## Setup
- Follow the [certbot instructions](https://certbot.eff.org/instructions?ws=other&os=snap) (via snap, in standalone mode) to create a certificate
- When asked for the domain names, list `destrostudios.com` first as that name will be used for the certificate. Also make sure to also list all subdomains (including `www` and `mail`, `imap`, `smtp` for domains with emails): `destrostudios.com www.destrostudios.com mail.destrostudios.com imap.destrostudios.com smtp.destrostudios.com anselm-kuesters.de www.anselm-kuesters.de mail.anselm-kuesters.de imap.anselm-kuesters.de smtp.anselm-kuesters.de ernst-kuesters.de www.ernst-kuesters.de mail.ernst-kuesters.de imap.ernst-kuesters.de smtp.ernst-kuesters.de etherblood.com www.etherblood.com fifa-champions.de www.fifa-champions.de maniascript.io www.maniascript.io sportfreunde-eschbach.de www.sportfreunde-eschbach.de sportfreunde-eschbach.com www.sportfreunde-eschbach.com`

## Renewal
- Certbot by default setups an automatic renewal mechanism
- Create a file `/etc/letsencrypt/renewal-hooks/deploy/destrostudios.sh` that gets executed after each renewal:
```
# Apps
docker container restart destrostudios-app-1

# Proxies
docker container restart jenkins-proxy-1
docker container restart mailserver-ui-proxy-1
docker container restart anselm-kuesters-backend-app-proxy-1

# DB UIs
docker container restart amara-db-ui-1
docker container restart anselm-kuesters-backend-db-ui-1
docker container restart cards-db-ui-1
docker container restart carl-bot-db-ui-1
docker container restart destrostudios-db-ui-1
docker container restart ernst-kuesters-db-ui-1
docker container restart fifa-champions-old-website-db-ui-1
docker container restart sportfreunde-eschbach-db-ui-1
```
- Mark the file as executable `chmod +x /etc/letsencrypt/renewal-hooks/deploy/destrostudios.sh`
