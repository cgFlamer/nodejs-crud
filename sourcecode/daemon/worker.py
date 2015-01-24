#!/usr/bin/env python

import pika
from pymongo import MongoClient
import datetime

# short config
credentials = pika.PlainCredentials('admin', 'gabi')
rabbitmq_host = 'localhost'
mongodb_connection = 'mongodb://localhost:27017/'
global_identifier = 'pnx'
frequency = 20 # cron frequency

# rabbitmq connection
connection = pika.BlockingConnection(pika.ConnectionParameters(credentials=credentials, host=rabbitmq_host))
channel = connection.channel()
channel.queue_declare(queue=global_identifier)

# mongodb connection
mongo = MongoClient(mongodb_connection)
db = mongo[global_identifier]
articles = db["articles"]
push_articles = articles.find({"date" : {"$gt" : datetime.datetime.now() - datetime.timedelta(minutes=frequency)}})

for article in push_articles :
	channel.basic_publish(exchange='', routing_key=global_identifier, body=str(article))

# close connection to rabbitmq
connection.close()
