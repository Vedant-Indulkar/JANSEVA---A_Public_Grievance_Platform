import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, r2_score
from sklearn.preprocessing import LabelEncoder
import joblib

# Load the dataset
data = pd.read_csv('JansevaFinalDataset.csv')

# Preprocess the data
categorical_cols = ['category']
numerical_cols = ['hospitalsCount', 'schoolsCollegesCount', 'upvotes']

# Convert time strings to seconds since midnight
data['time'] = pd.to_datetime(data['time'], format='%H:%M:%S').dt.second + \
               60 * pd.to_datetime(data['time'], format='%H:%M:%S').dt.minute + \
               3600 * pd.to_datetime(data['time'], format='%H:%M:%S').dt.hour

# Encode categorical features
encoders = {}
for col in categorical_cols:
    encoders[col] = LabelEncoder()
    data[col] = encoders[col].fit_transform(data[col])

# Split features and target
X = data[categorical_cols + numerical_cols + ['time']]
y = data['Priority']

# Split the data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train the model
model = RandomForestRegressor()
model.fit(X_train, y_train)

# Evaluate the model
y_pred = model.predict(X_test)
mae = mean_absolute_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)
print(f'Mean Absolute Error (MAE): {mae:.2f}')
print(f'R-squared: {r2:.2f}')

# Save the trained model
joblib.dump(model, 'trained_model.pkl')

# Function to predict priority for new situations
def predict_priority(category, hospital_count, school_count, upvotes, time):
    # Load the trained model
    model = joblib.load('trained_model.pkl')

    # Encode categorical features
    category_encoded = encoders['category'].transform([category])

    # Convert time to seconds since midnight
    time_seconds = pd.to_datetime(time, format='%H:%M:%S').hour * 3600 + \
                   pd.to_datetime(time, format='%H:%M:%S').minute * 60 + \
                   pd.to_datetime(time, format='%H:%M:%S').second

    # Apply custom priority rules
    priority = 0
    if category == 'water supply' and 6 <= pd.to_datetime(time, format='%H:%M:%S').hour < 12:
        priority = 1  # Highest priority for water-related issues between morning 6 to evening 12
    # elif category == 'water supply' and 18 <= pd.to_datetime(time, format='%H:%M:%S').hour <= 23:
    #     priority = 2  # Second highest priority for water-related issues between evening 6 to midnight
    elif category == 'street light':
        if (18 <= pd.to_datetime(time, format='%H:%M:%S').hour <= 23 or
            pd.to_datetime(time, format='%H:%M:%S').hour <= 5):
            priority = 1  # Highest priority for streetlight-related issues after evening 6 till midnight
        elif 12 <= pd.to_datetime(time, format='%H:%M:%S').hour < 18:
            priority = 4  # Priority 4 for streetlight-related issues during the afternoon
    else:
        # Create input data for prediction
        input_data = pd.DataFrame({
            'category': category_encoded,
            'hospitalsCount': [hospital_count],
            'schoolsCollegesCount': [school_count],
            'upvotes': [upvotes],
            'time': [time_seconds]
        })

        # Make prediction using the trained model
        priority = int(round(model.predict(input_data)[0]))

    return priority

# Example usage
if __name__ == '__main__':
    new_category = 'street light'
    new_hospital_count = 5
    new_school_count = 3
    new_upvotes = 44
    new_time = '7:00:00'

    predicted_priority = predict_priority(new_category, new_hospital_count, new_school_count, new_upvotes, new_time)
    print(f'Predicted priority for the new situation: {predicted_priority}')
