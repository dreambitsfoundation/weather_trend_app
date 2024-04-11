# Weather Trend App

This application is developed to generate bulk report based on a location from OpenWeatherMap API.

## Live Application:

1. UI: !(Frontend URL)[https://weather-trend-app-frontend.onrender.com]
2. Backend Service (API Docs): !(Backend URL)[https://weather-trend-app-backend-service.onrender.com/docs]
3. Serverless function: Application is deployed on GCP !(Invocation URL)[https://asia-south1-thefourthpillar.cloudfunctions.net/load_all_weather_updates]

## Throry of Development

This project intends to have a UI that can register any city of choice though Restful APIs and capture weather updates for all the registered cities periodically throughout the day at an interval of 3-6 hours. Also the user should be capable of generating and downloading CSV files of reports in a date range.

# Architecture

This application uses the following architecture.

1. A ReactJS based frontend to interact with the backend web-service.
2. A Python/FastAPI based backend web-service that host Restful APIs to create, list and delete a watchlist of cities and list weather updates for a city and download reports in date range.
3. A serverless function that is triggered by HTTP responsible for communicating with the OpenweatherMap API and storing the updates in a Redis storage.
4. A schedular to trigger the serverless function periodically.

![Architecture diagram](https://github.com/dreambitsfoundation/weather_trend_app/blob/master/frontend/public/Weather_trend.drawio.png?raw=true)

## TODO Item list.

- [x] UI Development
  - [x] Setup a ReactJS application.
  - [x] Country Lookup
  - [x] City Lookup (required to make query)
  - [x] Date picker.
  - [x] List view to render weather updates.
  - [x] Form to download report files.
  - [x] API integration with the Restful API backend service.
- [x] Backend Service Development
  - [x] Setup a FastAPI application.
  - [x] Establish connection with the Redis server.
  - [x] Develop pydantic models for carious Request and Response and also Weather updates stored in redis.
  - [x] Implementation of API endpoints to create, list and delete a watchlist of cities and list weather updates for a city and download reports in date range.
- [x] Serverless Function development
  - [x] API integration to fetch current weather for any `{city},{country_code}` combination.
  - [x] Iteration logic to fetch weather updates from server for all the stored city watchlist.
  - [x] Implementation of Schedular to trigger this function at an interval of 6 hours.

## Installation instruction

### UI

[Root diretory: `frontend`]

1. Install all dependencies
   `npm install`

2. Run the project locally using
   `npm run dev`

### Backend

[Root directory: `backend`]
Please setup `python-dotenv` as per your system preference. If requires!

1. Create virtual env
   `python -m venv venv`

2. Install all depenencies
   `pip install -r requirements.txt`

3. Activate virtual environment
   `$ cd venv/Scripts` - Windows
   `$ cd venv/bin` - Linux and MacOS

   `$ activate`

4. Run server locally
   `$ uvicorn main:app --reload`

Note: Please update the .env file in the project root with Redis credentials.

### Serverless

[Root directory: `serverless`]
Please setup `python-dotenv` as per your system preference. If requires!

1. Create virtual env
   `python -m venv venv`

2. Install all depenencies
   `pip install -r requirements.txt`

3. Activate virtual environment
   `$ cd venv/Scripts` - Windows
   `$ cd venv/bin` - Linux and MacOS

   `$ activate`

4. Run application locally
   `$ python run_locally.py`
