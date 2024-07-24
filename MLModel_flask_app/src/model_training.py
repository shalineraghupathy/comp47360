import pandas as pd
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.svm import SVR
from sklearn.metrics import mean_squared_error
import joblib
from .feature_engineering import encode_features, scale_features
from .data_preprocessing import preprocess_data  
from .utils import determine_season, check_holiday

#run using python -m src.model_training

def train_model(merged_data):
    X = merged_data.drop(columns=['park_busyness'])
    y = merged_data['park_busyness']        
    
    # Convert categorical features to strings
    categorical_features = ['day', 'season', 'isHoliday?', 'hour', 'month','park_id']
    X[categorical_features] = X[categorical_features].astype(str)

    # Fit the encoder and scaler during training
    X_encoded, encoder = encode_features(X)
    X_scaled, scaler = scale_features(X_encoded)
    
    X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.4, random_state=42)
    param_grid = {
        'C': [0.1, 1, 10],  # Reduced range
        'gamma': [0.01, 0.1, 1],  # Reduced range
        'epsilon': [0.01, 0.1, 0.5]  # Reduced range
    }
    
    grid_search = GridSearchCV(SVR(kernel='rbf'), param_grid, cv=3, scoring='neg_mean_squared_error', verbose=2, n_jobs=-1)
    grid_search.fit(X_train, y_train)
    
    best_svr = grid_search.best_estimator_
    joblib.dump(best_svr,'models/best_svr_model.pkl')
    joblib.dump(encoder, 'models/encoder.pkl')
    joblib.dump(scaler, 'models/scaler.pkl')
    return best_svr, grid_search.best_params_

def evaluate_model(model, X_test, y_test):
    y_pred = model.predict(X_test)
    mse = mean_squared_error(y_test, y_pred)
    return mse

if __name__ == "__main__":
        # Get the preprocessed merged data
        merged_data = preprocess_data()
        # Sample data for faster testing
        data_sample = merged_data.sample(frac=0.1, random_state=42)  #  10% ie 36k rows of data for testing
        # Train the model
        model, params = train_model(data_sample)
        print(f"Trained model with parameters: {params}")