import requests

weather_api_key = '6ae70477e5e1b628641f75264ebcb0c6'

def fetch_weather_data(timestamp):
    """
    Fetch weather data from OpenWeatherMap API.
    Assumes the park's coordinates are fixed.
    """
    lat = 40.7748531810311
    lon = -73.97169404168142
    url = f"https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={weather_api_key}&dt={timestamp}"
    try:
        response = requests.get(url)
        response.raise_for_status()
        weather_data = response.json()

        print(weather_data)
        # Assuming the structure of the response includes weather details like this
        # make sure using the right data from api (double check the data structure received from api in Json)
        rain_1h = weather_data.get('rain', {}).get('1h', 0.0)
        rain_3h = weather_data.get('rain', {}).get('3h', 0.0)
        return rain_1h, rain_3h
    except requests.RequestException as e:
        print(f"Error fetching weather data: {e}")
        return 0.0, 0.0