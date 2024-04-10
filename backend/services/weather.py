import os
import json
import uuid
import threading
import requests
from redis.commands.json.path import Path
from models.weather import WeeklyWeatherUpdate, Location, AddLocationRequest

def run_manual_weather_update():
    requests.get(os.getenv("WEATHER_UPDATE_URL"))

async def load_all_locations(redis_connection) -> Location:
    """ This endpoint returns all the registered locations. """
    
    registered_cities = redis_connection.json().get("locations")
    cities = []
    for _, details in registered_cities.items():
        cities.append(details)
    return cities

async def get_weather_updates(redis_connection, location_hash: str) -> WeeklyWeatherUpdate:
    """ Weather updates for a location hash """
    weather_updates = redis_connection.lrange(location_hash, 0, -1)
    updates = []
    average_temp = 0
    for weather_update in weather_updates:
        weather_update = json.loads(weather_update)
        average_temp += weather_update.get("main").get("temp")
        updates.append(weather_update)
    if average_temp != 0:
        average_temp = average_temp/len(weather_updates)
    return WeeklyWeatherUpdate(average_temp=average_temp, updates=updates)

async def add_new_location(redis_connection, location: AddLocationRequest) -> Location:
    """ Add a new location to track on the UI. """
    registered_cities = redis_connection.json().get("locations")
    if not registered_cities.get(f"{location.city},{location.country_code}"):
        config = {
            "address": f"{location.city},{location.country_code}",
            "hash": str(uuid.uuid4()),
            "last_updated": 0
        }
        registered_cities[f"{location.city},{location.country_code}"] = config
        redis_connection.json().set("locations", Path.root_path(), registered_cities, decode_keys=True)
        
        # Run manual update for the first iteration.
        thread = threading.Thread(target=run_manual_weather_update)
        thread.start()

    return registered_cities.get(f"{location.city},{location.country_code}")
    
