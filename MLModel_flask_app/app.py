from flask import Flask, request, jsonify
import pandas as pd
import os
import sys
# Add the root directory to sys.path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from src.model_prediction import predict
app = Flask(__name__)

@app.route('/predict', methods=['POST'])
def ml_predict():
    input_data = request.json
    prediction = predict(input_data).tolist()
    for i in range(len(prediction)):
        prediction[i] = float(prediction[i])
    return jsonify({'prediction': prediction})
    
if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000,debug=True)
