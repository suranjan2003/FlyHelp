from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import pandas as pd

app = Flask(__name__)
CORS(app)

# Load the trained ML model
with open("model.pkl", "rb") as file:
    model = pickle.load(file)

# Load flights.csv
flights_df = pd.read_csv("flights.csv")

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json

    # Extract user input
    flight_name = data["flight_name"]
    starting_point = data["starting_point"]
    destination = data["destination"]
    date = data["date"]
    time = data["time"]

    # Convert to pandas format
    input_data = pd.DataFrame([data])

    # Find similar flights in the dataset
    relevant_flights = flights_df[
        (flights_df["FLIGHT_NAME"] == flight_name) & 
        (flights_df["ORIGIN"] == starting_point) & 
        (flights_df["DESTINATION"] == destination)
    ]

    if relevant_flights.empty:
        return jsonify({"error": "No historical data for this flight route."}), 400

    # Predict delay using model
    predicted_delay = model.predict(input_data)[0]

    # Find best departure time by analyzing historical delays
    best_time_row = relevant_flights.sort_values(by="DELAY").iloc[0]
    best_time = best_time_row["DEPARTURE_TIME"]

    return jsonify({
        "best_departure_time": best_time,
        "predicted_delay": predicted_delay
    })

if __name__ == "__main__":
    app.run(debug=True)
