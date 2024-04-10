from fastapi.testclient import TestClient

from .main import app

client = TestClient(app)

locations = []

def test_all_locations():
    response = client.get("/locations")
    assert response.status_code == 200
    locations = response.json()
    
def test_weather_update():
    response = client.get(f"/weather_update/{locations[0]['hash']}")
    assert response.status_code == 200
