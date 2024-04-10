from pydantic import BaseModel
from typing import Union, List, Optional

class Location(BaseModel):
    """ This model is the representation of registered Location. """
    address: str
    last_updated: int
    hash: str

class Coordinates(BaseModel):
    """ Location of an address """
    lat: float
    lon: float

class WeatherInfo(BaseModel):
    """ Individual weather information """
    id: Union[str, int]
    main: str
    description: str
    icon: str

class TemperatureInfo(BaseModel):
    """ Temperature insight """
    temp: float
    feels_like: float
    temp_min: float
    temp_max: float
    pressure: int
    humidity: int

class WindInfo(BaseModel):
    """ Wind insight """
    speed: float
    deg: Union[float, int]

class CloudInfo(BaseModel):
    """ Cloud infomation """
    all: int

class LocationInfo(BaseModel):
    """ Location information. """
    country: str
    sunrise: int
    sunset: int

class WeatherUpdate(BaseModel):
    """ This model is the representation of a weather update. """
    coord: Coordinates
    weather: List[WeatherInfo]
    main: TemperatureInfo
    wind: WindInfo
    clouds: CloudInfo
    sys: LocationInfo
    name: str
    last_updated: Optional[Union[int, float]]

class WeeklyWeatherUpdate(BaseModel):
    """ This model is the representation of a week of weather update """
    average_temp: Union[float, int]
    updates: List[WeatherUpdate]

class AddLocationRequest(BaseModel):
    city: str
    country_code: str