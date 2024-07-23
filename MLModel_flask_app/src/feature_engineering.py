import pandas as pd
from sklearn.preprocessing import OneHotEncoder, MinMaxScaler


def encode_features(data, encoder=None):
    categorical_features = ['day', 'season', 'isHoliday?', 'hour', 'month','park_id']
    if encoder is None:  # During training phase-creates a new OneHotEncoder, fits it to the data, and then transforms the data
        encoder = OneHotEncoder()
        encoded_features = encoder.fit_transform(data[categorical_features])
    else: # During prediction phase-uses the passed encoder to transform the data without fitting it again.
        encoded_features = encoder.transform(data[categorical_features])
        
    encoded_feature_names = encoder.get_feature_names_out(categorical_features)
    encoded_df = pd.DataFrame(encoded_features.toarray(), columns=encoded_feature_names)
    return encoded_df, encoder

def scale_features(data, scaler=None):
    if scaler is None:# During training phase
        scaler = MinMaxScaler()
        scaled_data = scaler.fit_transform(data)
    else: # During prediction phase
        scaled_data = scaler.transform(data)
        
    return scaled_data, scaler

"""
def encode_features(data):
    categorical_features = ['day', 'season', 'isHoliday?', 'hour', 'month']
    encoder = OneHotEncoder()
    encoded_features = encoder.fit_transform(data[categorical_features])
    encoded_feature_names = encoder.get_feature_names_out(categorical_features)
    encoded_df = pd.DataFrame(encoded_features.toarray(), columns=encoded_feature_names)
    return encoded_df, encoder

def scale_features(data):
    scaler = MinMaxScaler()
    scaled_data = scaler.fit_transform(data)
    return scaled_data, scaler
"""