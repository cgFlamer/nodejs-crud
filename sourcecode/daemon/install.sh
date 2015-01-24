#!/bin/sh

sudo apt-get install python-pip git-core
sudo apt-get install build-essential python-dev
sudo pip install pika==0.9.8
sudo pip install pymongo

# create rabbitmq user
rabbitmqctl add_user admin gabi
rabbitmqctl set_user_tags admin administrator
rabbitmqctl set_permissions -p / admin  ".*" ".*" ".*"