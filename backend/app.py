from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import pandas as pd
import numpy as np
from datetime import datetime
import traceback

app = Flask(__name__)
CORS(app)

# Load the trained ML model
with open("model.pkl", "rb") as file:
    model = pickle.load(file)

# Load flights.csv
flights_df = pd.read_csv("flights.csv")

@app.route("/")
def home():
    return "Flask Backend is Running!"

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json  # Get JSON request data
    print("Received data:", data)
    try:
        # Extract user input
        fl_date = data["FL_DATE"]  # YYYY-MM-DD
        crs_dep_time = int(data["CRS_DEP_TIME"].replace(":", ""))  # Ensure it's an integer
        carrier = data["MKT_UNIQUE_CARRIER"]
        origin = data["ORIGIN"]
        destination = data["DEST"]

        # Convert FL_DATE to datetime
        date_obj = datetime.strptime(fl_date, "%Y-%m-%d")
        year = date_obj.year
        month = date_obj.month
        day_of_month = date_obj.day
        day_of_week = date_obj.weekday() + 1  # Monday = 1, Sunday = 7

        # Extract departure hour and minutes
        dep_time_hrs = crs_dep_time // 100  # Extract hour
        dep_time_mins = crs_dep_time % 100  # Extract minutes
        dep_time_mins_total = dep_time_hrs * 60 + dep_time_mins  # Convert to total minutes

        # Trigonometric transformations for cyclic features
        month_sin = np.sin(2 * np.pi * month / 12)
        month_cos = np.cos(2 * np.pi * month / 12)
        day_of_week_sin = np.sin(2 * np.pi * day_of_week / 7)
        day_of_week_cos = np.cos(2 * np.pi * day_of_week / 7)
        day_of_month_sin = np.sin(2 * np.pi * day_of_month / 31)
        day_of_month_cos = np.cos(2 * np.pi * day_of_month / 31)
        dep_time_hrs_sin = np.sin(2 * np.pi * dep_time_hrs / 24)
        dep_time_hrs_cos = np.cos(2 * np.pi * dep_time_hrs / 24)
        dep_time_mins_sin = np.sin(2 * np.pi * dep_time_mins_total / 1440)
        dep_time_mins_cos = np.cos(2 * np.pi * dep_time_mins_total / 1440)

        # Create input DataFrame for the model
        input_df = pd.DataFrame([{
            "YEAR": year,
            "MONTH": month,  # ✅ Added missing "MONTH"
            "QUARTER": (month - 1) // 3 + 1,
            "DAY_OF_MONTH": day_of_month,
            "DAY_OF_WEEK": day_of_week,
            "FL_DATE": fl_date,
            "MKT_UNIQUE_CARRIER": carrier,
            "ORIGIN": origin,
            "DEST": destination,
            "CRS_DEP_TIME": crs_dep_time,
            "DEP_TIME_HRS": dep_time_hrs,
            "DEP_TIME_MINS": dep_time_mins_total,
            "CRS_ELAPSED_TIME": 60,  # Default value, change if needed
            "DISTANCE": 500,  # Default value, change if needed
            "MONTH_SIN": month_sin,
            "MONTH_COS": month_cos,
            "DAY_OF_WEEK_SIN": day_of_week_sin,
            "DAY_OF_WEEK_COS": day_of_week_cos,
            "DAY_OF_MONTH_SIN": day_of_month_sin,
            "DAY_OF_MONTH_COS": day_of_month_cos,
            "DEP_TIME_HRS_SIN": dep_time_hrs_sin,
            "DEP_TIME_HRS_COS": dep_time_hrs_cos,
            "DEP_TIME_MINS_SIN": dep_time_mins_sin,
            "DEP_TIME_MINS_COS": dep_time_mins_cos,
            "tavg": 25,  # Default temperature value
            "tmin": 20,
            "tmax": 30,
            "prcp": 0,
            "snow": 0,
            "wdir": 180,
            "wspd": 10,
            "wpgt": 15,
            "pres": 1013,
            "tsun": 200
        }])

        # Ensure input matches model's expected columns
        missing_cols = set(model.feature_names_in_) - set(input_df.columns)
        if missing_cols:
            return jsonify({"error": f"Missing columns: {missing_cols}"}), 400

        # Predict delay using model
        predicted_delay = model.predict(input_df)[0]

        # Find best departure time by analyzing historical delays
        relevant_flights = flights_df[
            (flights_df["MKT_UNIQUE_CARRIER"] == carrier) &
            (flights_df["ORIGIN"] == origin) &
            (flights_df["DEST"] == destination)
        ]
        
        if relevant_flights.empty:
            return jsonify({"error": "No historical data for this flight route."}), 400

        best_time_row = relevant_flights.sort_values(by="DEP_DELAY").iloc[0]
        best_time = best_time_row["CRS_DEP_TIME"]

        return jsonify({
            "best_departure_time": int(best_time),  # Convert int64 to int
            "predicted_delay": float(predicted_delay)  # Convert numpy float to Python float
        })


    except Exception as e:
        print("❌ Error:", str(e))
        print(traceback.format_exc())  # Prints full error stack trace
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
