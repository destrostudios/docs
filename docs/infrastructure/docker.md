# Docker

## Installation
- [Install Docker Engine on Debian](https://docs.docker.com/engine/install/debian)
- Verify that Docker was configured to start on boot via `systemctl is-enabled docker.service` and `systemctl is-enabled containerd.service`

## Guidelines
- Applications build/manage their images and containers bundled together via `docker compose`
- Custom images only have a `latest` tag, we don't store different versions (to save disk space)
- When restoring backups or moving to a new server, make sure that the mounted directories on the host have the same owners and permissions as before (as this is an easy source of error)

## Commands
- Build and replace `latest`: `docker compose build --no-cache` (Even if the `Dockerfile` didn't change) (The previous images and running containers will still exist / be running, but they will receive hash names)
- Start application: `docker compose up -d` (Will recreate container if needed)
- Stop application: `docker compose down`
- List all applications: `docker compose ls`
- List all containers: `docker container ls`
- List all images: `docker image ls`
- Shell into container: `docker exec -it -u root [container] sh`
- Copy file into container: `docker cp file.xyz [container]:/path/to/file.xyz`
- Delete unused data (Note: Only do this if you know what you are doing!): `docker system prune -a --volumes` (to save disk space)
