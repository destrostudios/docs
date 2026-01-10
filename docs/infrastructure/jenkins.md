# Jenkins

User interface: https://destrostudios.com:9999

![destrostudios-jenkins](/images/destrostudios_jenkins.png)

## Setup
- Runs in a container (Setup in https://github.com/destrostudios/infrastructure)
- Built and managed manually via `docker compose` in `/home/destroflyer/jenkins/docker`
- Required building `destrostudios/https-proxy` manually (e.g. in `/home/destroflyer/jenkins/docker/https-proxy`) if it doesn't exist yet

## Host directories
- The Jenkins home directory is mounted from `/home/destroflyer/jenkins/jenkins_home`
- Jenkins runs as user `jenkins` with UID `1000` in the container - To give it write access to host directories, we therefore need to create this exact user on the host and give it the access
- `groupadd jenkins`
- `useradd -u 1000 -g jenkins jenkins`
- `chown -R jenkins:jenkins /home/destroflyer/jenkins/jenkins_home` (and similar for all other directories that Jenkins builds should be able to write to, e.g. moving build artifacts to a certain location)

## Reusing host docker socket
- Mounting `/usr/bin/docker` and `/var/run/docker.sock` allows `docker` commands in jobs, using the socket from host
- Using the host docker socket means jobs can build images and start containers on the host
- Make sure the `GID_DOCKER` arg in Jenkins own `compose.yaml` is set correctly

## Mounting letsencrypt certificates
- Mounting `/etc/letsencrypt` enables jobs that require the certificates to be directly accessible via `sh` commands (not only indirectly by mounting them into started containers)
- Requires recursive `755` permissions on `/etc/letsencrypt/live` and `/etc/letsencrypt/archive` (since Jenkins runs as non-root user in its container).

## GitHub user
- User: [destrostudios-jenkins](https://github.com/destrostudios-jenkins)
- Access token with scopes `repo:status` and `read:packages`

## Global credentials
| Name                  | Type                  | Notes                                                                                                                                                                                     |
|:----------------------|:----------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `github-credentials`  | Username and password | User = `destrostudios-jenkins`, Passwort = Access token (The GitHub API doesn't allow authentication via plaintext passwords anymore, but they accept a valid access token as "password") |

## Open topics
- Warning: "Building on the built-in node can be a security issue. You should set up distributed builds. See the [documentation](https://www.jenkins.io/doc/book/security/controller-isolation/)"
- Cypress: In the past, when building on the server itself, using Cypress worked but required a few [dependencies](https://docs.cypress.io/app/get-started/install-cypress#Linux-Prerequisites) installed. If we use Cypress in a build again in the future, it should now be doable in a Docker container without installing something on the host.
- GitHub: In the past, when depending on GitHub package dependencies via Maven, we required a file `/home/destroflyer/jenkins/jenkins_home/.m2/settings.xml`: (This might still work if we depend on some in the future)
```xml
<?xml version="1.0" encoding="UTF-8"?>
<settings xmlns="http://maven.apache.org/SETTINGS/1.0.0"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.0.0 https://maven.apache.org/xsd/settings-1.0.0.xsd">
    <servers>
        <server>
            <id>github</id>
            <username>destrostudios-jenkins</username>
            <password>[ACCESS_TOKEN]</password>
        </server>
    </servers>
</settings>
```
