import base64
import functions_framework
import requests
import datetime
import json
import logging
import os
import redis
from redis.commands.json.path import Path
from flask import jsonify

# Initialize Logger
logging.basicConfig(format="%(process)d-%(levelname)s-%(message)s")

# Master Redis Config
REDIS_HOST = os.environ.get("REDIS_HOST")
REDIS_PORT = os.environ.get("REDIS_PORT")
REDIS_USERNAME = os.environ.get("REDIS_USERNAME")
REDIS_PASSWORD = os.environ.get("REDIS_PASSWORD")
WEATHER_API_KEY = os.environ.get("WEATHER_API_KEY")


def create_redis_connection():
    connection: redis.Redis = redis.Redis(
        host=REDIS_HOST,
        port=int(REDIS_PORT),
        username=REDIS_USERNAME,
        password=REDIS_PASSWORD,
    )

    return connection

def extract_all_cities():
    conn = create_redis_connection()
    results = conn.json().get("locations")
    return json.loads(results) if isinstance(results, str) else results

def store_weather_data_to_redis(update_hash, data):
    conn = create_redis_connection()
    conn.lpush(update_hash, json.dumps(data))

def store_last_update_to_redis(location):
    conn = create_redis_connection()
    all_cities = extract_all_cities()
    all_cities[location]['last_updated'] = int(datetime.datetime.now().timestamp())
    conn.json().set("locations", Path.root_path(), all_cities, decode_keys=True)


def run(request):
    """
    This method is used to load all the latest weather updates iteratively
    for all the indexed locations. This is a serverless script, ran through 
    GCP cloud run instance.
    """
    all_cities = extract_all_cities()
    for city, config in all_cities.items():
        if config.get("last_updated") <= int((datetime.datetime.now() - datetime.timedelta(hours=3)).timestamp()):
            response = requests.get(
                f"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={WEATHER_API_KEY}&units=metric"
            )
            if response.status_code == 200:
                result = json.loads(response.content)
                result['last_updated'] = int(datetime.datetime.now().timestamp())
                store_weather_data_to_redis(config.get('hash'), result)
                store_last_update_to_redis(city)
                logging.info(f"Updated the weather update for {city}")
            else:
                logging.info(f"Error in API response. Did not return 200 response")
    
    return jsonify({
        "status": True
    })
