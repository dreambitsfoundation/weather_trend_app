import os
import redis
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from typing import Union, List
from dotenv import load_dotenv
from services.weather import load_all_locations, get_weather_updates, add_new_location
from models.weather import Location, WeeklyWeatherUpdate, AddLocationRequest

load_dotenv()

# import api.weather as weather_api

app = FastAPI(
    title="Weather Update API",
    description="API to handle weather update related crud operations."
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event('startup')
async def startup_event():
    app.redis_connection = redis.Redis(
        host=os.getenv("REDIS_HOST"),
        port=int(os.getenv("REDIS_PORT")),
        username=os.getenv("REDIS_USERNAME"),
        password=os.getenv("REDIS_PASSWORD")
    )

@app.get("/locations")
async def show_locations() -> List[Location]:
    return await load_all_locations(app.redis_connection)

@app.get("/weather_update/{location_hash}")
async def read_item(location_hash: str) -> WeeklyWeatherUpdate:
    return await get_weather_updates(app.redis_connection, location_hash)

@app.post("/locations")
async def add_location(request: AddLocationRequest):
    return await add_new_location(app.redis_connection, request)

