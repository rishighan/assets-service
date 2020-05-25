#!/bin/bash
# Rishi Ghan
# Deployment script for a microservice

# usage: ./deploy.sh -s [service name]
#                    -h [hostname]
#                    -u [username]
#                    -r [repository base url to the raw text content]

# Emojis
CLIPBOARD="📋"
CHECKMARK="✅"
RENAME="🏷️"
SCISSORS="✂️"
DOWNLOAD="📥"
BROOM="🧹"
CONSTRUCTION="🏗️"
START="🏁"

# ssh config
cat >> ~/.ssh/config  << EOF
VerifyHostKeyDNS yes
StrictHostKeyChecking no
EOF

# params
service_name=''
hostname=''
username=''

while getopts 'd:s:h:u:r:' flag; do
    case "${flag}" in
        s) service_name="${OPTARG}" ;;
        h) hostname="${OPTARG}" ;;
        u) username="${OPTARG}" ;;
        r) repository_base_url="${OPTARG}" ;;
        *) printf "Usage..."
           exit 1 ;;
    esac
done

printf "$CLIPBOARD Attempting to create configuration folder...\n"

ssh "$username@$hostname" /bin/bash << EOF
if [ ! -d "$service_name" ]
then
    printf "\n$CLIPBOARD Directory doesn't exist. Creating now...\n"
    mkdir "$service_name"
    printf "$service_name created."
else
    printf "\n$RENAME  $service_name already exists. Removing and recreating...\n"
    rm -Rf "$service_name"
    mkdir "$service_name"
    printf "$CHECKMARK Done.\n"
fi
    printf "\n$CLIPBOARD Changing directory to $service_name...\n"
    cd "$service_name"

    printf "\n$SCISSORS  Pruning Docker images, networks and volumes...\n\n"
    docker system prune -f

    printf "$DOWNLOAD Downloading the docker-compose configuration for $service_name...\n\n"
    printf "$repository_base_url\n\n"
    curl "$repository_base_url"/Dockerfile --output Dockerfile
    curl "$repository_base_url"/docker-compose.yml --output docker-compose.yml
    curl "$repository_base_url"/docker-compose.env --output docker-compose.env
    
    printf "\n$BROOM Stopping and removing containers and volumes...\n\n"
    docker-compose down -v
    
    printf "\n$DOWNLOAD Pulling the relevant Docker images...\n\n"
    docker-compose pull

    printf "\n$CONSTRUCTION  Creating containers...\n\n"
    docker-compose up --no-start

    printf "\n$START Starting images...\n\n"
    docker-compose start
EOF
