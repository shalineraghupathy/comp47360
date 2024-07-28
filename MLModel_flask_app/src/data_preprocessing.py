import pandas as pd
import geopandas as gpd

def load_data():
    parks_data = gpd.read_file("data/park_busyness_normalized.geojson")
    weather_data = pd.read_csv("data/CLEANED_WEATHER_DATA_2022.csv")
    unique_parks = gpd.read_file("data/unique_parks_50_.geojson")
    return parks_data, weather_data, unique_parks

def preprocess_weather_data(weather_data):
    # Convert the 'dt_iso' column to string type and remove timezone information
    weather_data['dt_iso'] = weather_data['dt_iso'].astype(str)
    weather_data['dt_iso'] = weather_data['dt_iso'].str.replace(' +0000 UTC', '', regex=False)
    
    # Convert the dt_iso column in the weather data to datetime
    weather_data['dt_iso'] = pd.to_datetime(weather_data['dt_iso'], format='%Y-%m-%d %H:%M:%S')
    return weather_data

def preprocess_parks_data(parks_data):
    # Convert categorical columns to category dtype
    categorical_columns = ['day_of_week', 'weekend', 'season', 'isHoliday?']
    for col in categorical_columns:
        parks_data[col] = parks_data[col].astype('category')
    
    # Create a datetime column in the parks data
    parks_data['datetime'] = pd.to_datetime(parks_data[['year', 'month', 'day', 'hour']], errors='coerce')
    
    # Convert categorical features to numerical
    parks_data['weekend'] = parks_data['weekend'].astype(str).map({'True': 1, 'False': 0})
    parks_data['isHoliday?'] = parks_data['isHoliday?'].astype(str).map({'True': 1, 'False': 0})
    parks_data['season'] = parks_data['season'].astype(str).map({'Spring': 1, 'Autumn': 2, 'Summer': 3, 'Winter': 4})
    parks_data['day_of_week'] = parks_data['day_of_week'].map({ 0: 'Monday', 1: 'Tuesday', 2: 'Wednesday', 3: 'Thursday', 4: 'Friday', 5: 'Saturday',6: 'Sunday'})
    return parks_data

def merge_data(parks_data, weather_data):
    # Merge the datasets on the datetime column
    merged_data = pd.merge(parks_data, weather_data, left_on='datetime', right_on='dt_iso', how='inner')
    return merged_data

def preprocess_data():
    parks_data, weather_data, unique_parks = load_data()
    
    weather_data = preprocess_weather_data(weather_data)
    parks_data = preprocess_parks_data(parks_data)
    
    merged_data = merge_data(parks_data, weather_data)

    return merged_data

if __name__ == "__main__":
    merged_data = preprocess_data()
    merged_data.to_csv('data/parks_busyness_weather.csv', index=False)
    print("Preprocessed data saved to parks_busyness_weather.csv")
