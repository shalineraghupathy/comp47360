import pandas as pd
import joblib
import requests
import datetime
import os
from holidays import country_holidays


# Pre-loaded model
model = joblib.load('linear_regression_model.joblib')

# API Key for OpenWeatherMap
# hard code for local testing code
weather_api_key = '6ae70477e5e1b628641f75264ebcb0c6'

# put testing data here
request_data = {
    "timestamp": 1720742400,
    "park_id": "PK101"
}

def predict(request_data):
    timestamp = request_data['timestamp']
    dt = datetime.datetime.fromtimestamp(timestamp)
    month = dt.month
    day = dt.day
    hour = dt.hour
    day_of_week = dt.weekday()
    weekend = 1 if day_of_week > 4 else 0
    season = determine_season(month)
    is_holiday = check_holiday(dt)
    rain_1h, rain_3h = fetch_weather_data(timestamp)

    data = {
        'month': [month],
        'day': [day],
        'hour': [hour],
        'day_of_week': [day_of_week],
        'weekend': [weekend],
        'season': [season],
        'isHoliday?': [1 if is_holiday else 0],
        'rain_1h': [rain_1h],
        'rain_3h': [rain_3h],
        'park_id': [request_data['park_id']]
    }
    df = pd.DataFrame(data)
    prediction = model.predict(df)
    return prediction


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
        # Assuming the structure of the response includes weather details like this
        # make sure using the right data from api (double check the data structure received from api in Json)
        rain_1h = weather_data.get('rain', {}).get('1h', 0.0)
        rain_3h = weather_data.get('rain', {}).get('3h', 0.0)
        return rain_1h, rain_3h
    except requests.RequestException as e:
        print(f"Error fetching weather data: {e}")
        return 0.0, 0.0

def determine_season(month):
    """
    Determine the meteorological season based on the month.
    """
    if 3 <= month <= 5:
        return 1
    elif 6 <= month <= 8:
        return 3
    elif 9 <= month <= 11:
        return 2
    else:
        return 4

def check_holiday(dt):
    # Need to double check what have been used when trainning model
    """
    Check if the provided date is a public holiday in Manhattan.
    """
    holidays = {
        "New Year's Day": datetime.datetime(2024, 1, 1),
        "St. Patrick's Day": datetime.datetime(2024, 3, 17),
        "Easter Monday": datetime.datetime(2024, 4, 1),
        "May Day": datetime.datetime(2024, 5, 6),
        "June Holiday": datetime.datetime(2024, 6, 3),
        "October Holiday": datetime.datetime(2024, 10, 28),
        "Christmas Day": datetime.datetime(2024, 12, 25),
        "St. Stephen's Day": datetime.datetime(2024, 12, 26)
    }
    return dt in holidays.values()

def main():
    prediction = predict(request_data)
    print("Prediction: ", prediction)

if __name__ == '__main__':
    main()
