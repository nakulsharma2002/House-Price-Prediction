from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.feature_selection import RFE
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split

app = Flask(__name__)
CORS(app)  # Handle CORS


# Load and preprocess data
data = pd.read_csv('D:\\Desktop\\New_Desktop\\HousePrice\\backend\\Housing.csv')

# Label Encoding and Scaling
le = LabelEncoder()
for col in data.iloc[:, 5:]:
    data[col] = le.fit_transform(data[col])

scaler = StandardScaler()
for col in data.iloc[:, 5:]:
    data[col] = scaler.fit_transform(data[[col]])

# Define input and output features
input_data = data.iloc[:, 1:]
output_data = data[['price']]

# Feature selection using RFE
model = LinearRegression()
rfe = RFE(model, n_features_to_select=5)
rfe.fit(input_data, output_data)
selected_features = input_data.columns[rfe.support_]

# Train-Test split
x_train, x_test, y_train, y_test = train_test_split(input_data, output_data, test_size=0.21)
lr = LinearRegression()
lr.fit(x_train, y_train)

@app.route('/predict', methods=['POST'])
def predict():
    # Get data from request
    input_values = request.json['input']
    
    # Predict house price
    prediction = lr.predict([input_values])
    prediction_int = int(prediction[0][0])
    
    # Return prediction
    return jsonify({'price': prediction_int})

if __name__ == "__main__":
    app.run(debug=True)
