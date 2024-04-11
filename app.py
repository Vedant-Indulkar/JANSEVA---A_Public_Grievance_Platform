from flask import Flask, request, jsonify
import pandas as pd
from sklearn.externals import joblib

app = Flask(__name__)
model = joblib.load('./JansevaFinalDataset.csv')  # Load your trained model

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    # Preprocess input data (similar to what you did before)
    # Make predictions using your model
    # Return predictions as JSON
    return jsonify({'predictions': predictions.tolist()})

if __name__ == '__main__':
    app.run(debug=True)
