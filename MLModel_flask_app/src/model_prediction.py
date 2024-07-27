import pandas as pd
import joblib
import requests
import datetime
from .utils import determine_season, check_holiday
from .feature_engineering import encode_features, scale_features

model = joblib.load('models/best_svr_model.pkl')
encoder = joblib.load('models/encoder.pkl')
scaler = joblib.load('models/scaler.pkl')

weather_api_key = '6ae70477e5e1b628641f75264ebcb0c6'

def fetch_weather_data(timestamp):
    lat = 40.7748531810311
    lon = -73.97169404168142
    #url = f"https://api.openweathermap.org/data/2.5/onecall/timemachine?lat={lat}&lon={lon}&dt={timestamp}&appid={weather_api_key}"
    #url = f"https://api.openweathermap.org/data/3.0/onecall/timemachine?lat={lat}&lon={lon}&dt={timestamp}&appid={weather_api_key}"
    #url =  f"<http://api.openweathermap.org/data/2.5/air_pollution?lat={lat}&lon={lon}&appid=6ae70477e5e1b628641f75264ebcb0c6>"
    url = f"https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={weather_api_key}&units=metric"
    # print(f"Requesting weather data with URL: {url}")  # Debugging information
    try:
        response = requests.get(url)
        response.raise_for_status()
        weather_data = response.json()
        # print(weather_data)  # Print the response for debugging        
        
        # Handle cases where rain data might not be present
        rain_1h = weather_data.get('rain', {}).get('1h', 0)
        rain_3h = weather_data.get('rain', {}).get('3h', 0)
        
        return rain_1h, rain_3h
    
    except requests.exceptions.HTTPError as e:
        if response.status_code == 401:
            print("Unauthorized access - check your API key.")
        else:
            print(f"HTTP error occurred: {e}")
        raise
    except (requests.RequestException, ValueError) as e:
        print(f"Error fetching weather data: {e}")
        raise




def predict(request_data):
    timestamp = request_data['timestamp']
    dt = datetime.datetime.fromtimestamp(timestamp)
    month = dt.month
    day = dt.day
    hour = dt.hour
    day_of_week = dt.weekday()
    weekend = 1 if day_of_week in [0, 6] else 0  # Updated logic for weekend
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
    # print(f"Data for prediction: {df}")  # Debugging information
    
    # Convert categorical features to strings
    categorical_features = ['day', 'season', 'isHoliday?', 'hour', 'month','park_id']
    df[categorical_features] = df[categorical_features].astype(str)
    
    # print(f"Encoder categories: {encoder.categories_}")  # Debugging information
    # print(f"Data types before encoding: {df.dtypes}")  # Debugging information
    
    df_encoded, _ = encode_features(df, encoder=encoder)
    # print(f"Data after encoding: {df_encoded}")  # Debugging information
    
    df_scaled, _ = scale_features(df_encoded, scaler=scaler)

    #df_encoded = encoder.transform(df[['day', 'season', 'isHoliday?', 'hour', 'month']])
    #df_scaled = scaler.transform(df_encoded)
    
    prediction = model.predict(df_scaled)
    return prediction


if __name__ == "__main__":
    request_data = {
        "timestamp": 1720742400,
        "park_id": "PK101"
    }
    try:
        prediction = predict(request_data)
        print("Prediction: ", prediction)
    except Exception as e:
        print(f"Failed to make prediction: {e}")


