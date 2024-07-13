
import pandas as pd
import joblib
import  os 


def load_model(model_path):
    """Load the pre-trained model from the file."""
    return joblib.load(model_path)


def prepare_sample_input():
    # Create a sample input dataframe similar to the training data structure
    data = {
        'month': [7],
        'day': [15],
        'hour': [14],
        'day_of_week': [3],
        'weekend': [0],
        'season': [2],
        'isHoliday?': [0],
        'rain_1h': [0.1],
        'rain_3h': [0.0],
        'park_id': ["PK99"] 
    }
    df = pd.DataFrame(data)
    return df


def main():
    # Relative path to the model
    base_path = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    model_path = os.path.join(base_path, 'model', 'linear_regression_model.joblib')
    

    model = load_model(model_path)
    

    sample_input = prepare_sample_input() 
    prediction = model.predict(sample_input)
    
    print("Prediction for the sample input:", prediction)

if __name__ == "__main__":
    main()


