#!/bin/bash

source ./variables.sh

docker run --name $CONTAINER_NAME -e MYSQL_ROOT_PASSWORD=$DB_PASSWORD -p $HOST_PORT:$MYSQL_PORT -d mysql

echo "Starting $CONTAINER_NAME..."

sleep 20

echo "Container started. Creating database..."

docker exec -i $CONTAINER_NAME mysql -u$DB_USER -p$DB_PASSWORD -P$MYSQL_PORT< "./sql_db.sql"

echo "Done!"