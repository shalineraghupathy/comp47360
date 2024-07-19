import pandas as pd
import joblib
import requests
import datetime
import os
from utils.holiday import check_holiday
from utils.weather import fetch_weather_data
from utils.season import determine_season

# Pre-loaded model
model = joblib.load('linear_regression_model.joblib')

# put testing data here
request_data = {
    "timestamp": 1721476960,
    "park_id": "PK98"
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
    print(df)
    return prediction

def main():
    prediction = predict(request_data)
    print("Prediction: ", prediction)

if __name__ == '__main__':
    main()
