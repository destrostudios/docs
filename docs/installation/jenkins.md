# Jenkins
- User interface: [185.183.156.11:8090](http://185.183.156.11:8090/)
- TODO: Describe installation and config
- `jenkins.war` is in `/usr/share/java`

![destrostudios-jenkins](/images/destrostudios_jenkins.png)

## GitHub user
- User: [destrostudios-jenkins](https://github.com/destrostudios-jenkins)
- Access token with scopes `repo:status` and `read:packages`

## Home directory
- Jenkins has an own system user `jenkins` with home directory `/home/jenkins`
- Requires file `/home/jenkins/.m2/settings.xml` to download GitHub package dependencies via Maven:
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

## Credentials
| Name                  | Type                  | Notes                                                                                                                                                                                    |
|:----------------------|:----------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `github-credentials`  | Username and password | User = `destrostudios-jenkins`, Passwort = Access token (The GitHub API doesn't allow authentication via plaintext passwords anymore, but they accept a valid access token as "password") |

## Updating
1. `systemctl stop jenkins`
2. `cd /usr/share/java`
3. `mv jenkins.war jenkins.war.old`
4. `wget https://updates.jenkins-ci.org/latest/jenkins.war`
5. `systemctl start jenkins`
6. `rm jenkins.war.old`

## Open topics
- Warning: "Building on the built-in node can be a security issue. You should set up distributed builds. See the [documentation](https://www.jenkins.io/doc/book/security/controller-isolation/)"
- When building on the server itself, using Cypress needs a few [dependencies](https://docs.cypress.io/guides/continuous-integration/introduction#UbuntuDebian) installed
