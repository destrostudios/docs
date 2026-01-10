# Mail server

User interface: https://destrostudios.com:8000

Software: [Docker Mailserver](https://github.com/docker-mailserver/docker-mailserver), [Roundcube](https://github.com/roundcube/roundcubemail-docker)

## Setup
- Runs in a container (Setup in https://github.com/destrostudios/infrastructure)
- Data directory mounted from host `/home/destroflyer/mailserver`
- Managed via Jenkins job `mailserver-deployment`
- Make sure to remove the `netcup Mail block (Default Policy) - blocks outgoing SMTP (Mail) traffic` firewall in netcup SCP

## Commands
- Add email address: `docker exec -it mailserver setup email add [email] [password]`
