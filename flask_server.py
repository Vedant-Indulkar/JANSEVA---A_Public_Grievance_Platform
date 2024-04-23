# Flask example
from flask import Flask, request, jsonify
from model import predict_priority
from flask_cors import CORS

app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

@app.route('/predict-priority', methods=['POST'])
def predict():
    data = request.json
    category = data['category']
    hospitals_count = data['hospitalsCount']
    school_count = data['schoolsCollegesCount']
    upvotes = data['upvotes']
    time = data['time']
    priority = predict_priority(category, hospitals_count, school_count, upvotes, time)
    return jsonify({'predictedPriority': priority})

if __name__ == '__main__':
    app.run(debug=True)
