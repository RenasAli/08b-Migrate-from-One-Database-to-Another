#!/bin/bash

source ./variables.sh

docker run -d --name $CONTAINER_NAME -p $HOST_PORT:$MONGODB_PORT -e MONGO_INITDB_ROOT_PASSWORD=$PASSWORD -e MONGO_INITDB_ROOT_USERNAME=$USERNAME mongo

sleep 15

docker cp ./$FILE_NAME $CONTAINER_NAME:/$FILE_NAME

docker exec -it $CONTAINER_NAME mongosh --username $USERNAME --password $PASSWORD --port $MONGODB_PORT --eval 'use mydatabase;' --file /$FILE_NAME