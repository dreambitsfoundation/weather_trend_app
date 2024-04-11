import datetime
from models.weather import WeatherUpdate

def get_required_fields_for_report(report: WeatherUpdate) -> dict:
    """ This method returns all the required fields for the weather update. """
    required_fields = {
        "date": str(datetime.datetime.fromtimestamp(report.last_updated)),
        "city": report.name,
        "country": report.sys.country,
        "weather": report.main.temp,
        "unit": "celcius"
    }

    print(required_fields)

    return required_fields
