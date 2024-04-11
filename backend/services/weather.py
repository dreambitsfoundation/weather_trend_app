import os
import json
import uuid
import pytz
import threading
import requests
import datetime
import pandas as pd
import io
from fastapi.responses import StreamingResponse
from redis.commands.json.path import Path
from models.weather import WeeklyWeatherUpdate, Location, AddLocationRequest
from services.utils import get_required_fields_for_report

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


async def generate_report(redis_connection, start_date: str, end_date: str, location_hash: str) -> StreamingResponse:
    """ This method takes the following input

    - redis_connection: Redis connection instance.
    - start_date: Start date in format "dd/mm/yyyy"
    - end_date: End date in format "dd/mm/yyyy" 
    - location_hash: uuid of the location. 
    """

    start_date = datetime.datetime.strptime(start_date, "%d/%m/%Y")
    start_date = int(start_date.replace(hour=0, minute=0, tzinfo=pytz.timezone("Asia/Kolkata")).timestamp())
    end_date = datetime.datetime.strptime(end_date, "%d/%m/%Y")
    end_date = int(end_date.replace(hour=23, minute=59, tzinfo=pytz.timezone("Asia/Kolkata")).timestamp())

    weather_update = await get_weather_updates(redis_connection, location_hash)
    considered_reports = []

    # Filter updates in the request window.
    for update in weather_update.updates:
        if int(update.last_updated) in range(start_date, end_date):
            considered_reports.append(get_required_fields_for_report(update))
    
    # Convert the report into CSV
    data_frame = pd.DataFrame.from_records(considered_reports)

    stream = io.StringIO()
    data_frame.to_csv(stream, index=False)

    print("This much is complete")

    response = StreamingResponse(iter([stream.getvalue()]),
                                 media_type="text/csv"
                                )
    response.headers["Content-Disposition"] = "attachment; filename=export.csv"
    return response