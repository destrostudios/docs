# Jenkins
- TODO: Describe installation and config
- `jenkins.war` is in `/usr/share/java`
- Jenkins home directory is in `/home/jenkins`
- User interface: [185.183.156.11:8090](http://185.183.156.11:8090/)

## Updating
1. `systemctl stop jenkins`
2. `cd /usr/share/java`
3. `mv jenkins.war jenkins.war.old`
4. `wget https://updates.jenkins-ci.org/latest/jenkins.war`
5. `systemctl start jenkins`
6. `rm jenkins.war.old`

## Open topics
- Warning: "Building on the built-in node can be a security issue. You should set up distributed builds. See the [documentation](https://www.jenkins.io/doc/book/security/controller-isolation/)"
