import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor

def run_scheduling(flights_df: pd.DataFrame, model: RandomForestRegressor, date: str) -> pd.DataFrame:
    """
    Given a DataFrame of flights on a specific date and a trained model,
    returns a new DataFrame with the best departure hour and predicted delay for each flight.
    """
    scheduled_flights = []

    # Filter for the specific date
    daily_flights = flights_df[flights_df['FL_DATE'] == date]

    if daily_flights.empty:
        return pd.DataFrame()  # Return empty DataFrame if no flights

    for _, flight in daily_flights.iterrows():
        best_hour = None
        best_delay = float('inf')

        for hour in range(5, 23):  # Hours from 5 AM to 10 PM
            # Feature engineering
            dep_time_hrs = hour
            dep_time_mins_total = hour * 60

            # Create feature row
            features = {
                "YEAR": pd.to_datetime(flight["FL_DATE"]).year,
                "MONTH": pd.to_datetime(flight["FL_DATE"]).month,
                "QUARTER": (pd.to_datetime(flight["FL_DATE"]).month - 1) // 3 + 1,
                "DAY_OF_MONTH": pd.to_datetime(flight["FL_DATE"]).day,
                "DAY_OF_WEEK": pd.to_datetime(flight["FL_DATE"]).dayofweek + 1,
                "FL_DATE": flight["FL_DATE"],
                "MKT_UNIQUE_CARRIER": flight["MKT_UNIQUE_CARRIER"],
                "ORIGIN": flight["ORIGIN"],
                "DEST": flight["DEST"],
                "CRS_DEP_TIME": hour * 100,
                "DEP_TIME_HRS": dep_time_hrs,
                "DEP_TIME_MINS": dep_time_mins_total,
                "CRS_ELAPSED_TIME": flight.get("CRS_ELAPSED_TIME", 60),
                "DISTANCE": flight.get("DISTANCE", 500),

                "MONTH_SIN": np.sin(2 * np.pi * pd.to_datetime(flight["FL_DATE"]).month / 12),
                "MONTH_COS": np.cos(2 * np.pi * pd.to_datetime(flight["FL_DATE"]).month / 12),
                "DAY_OF_WEEK_SIN": np.sin(2 * np.pi * (pd.to_datetime(flight["FL_DATE"]).dayofweek + 1) / 7),
                "DAY_OF_WEEK_COS": np.cos(2 * np.pi * (pd.to_datetime(flight["FL_DATE"]).dayofweek + 1) / 7),
                "DAY_OF_MONTH_SIN": np.sin(2 * np.pi * pd.to_datetime(flight["FL_DATE"]).day / 31),
                "DAY_OF_MONTH_COS": np.cos(2 * np.pi * pd.to_datetime(flight["FL_DATE"]).day / 31),
                "DEP_TIME_HRS_SIN": np.sin(2 * np.pi * dep_time_hrs / 24),
                "DEP_TIME_HRS_COS": np.cos(2 * np.pi * dep_time_hrs / 24),
                "DEP_TIME_MINS_SIN": np.sin(2 * np.pi * dep_time_mins_total / 1440),
                "DEP_TIME_MINS_COS": np.cos(2 * np.pi * dep_time_mins_total / 1440),

                "tavg": flight.get("tavg", 25),
                "tmin": flight.get("tmin", 20),
                "tmax": flight.get("tmax", 30),
                "prcp": flight.get("prcp", 0),
                "snow": flight.get("snow", 0),
                "wdir": flight.get("wdir", 180),
                "wspd": flight.get("wspd", 10),
                "wpgt": flight.get("wpgt", 15),
                "pres": flight.get("pres", 1013),
                "tsun": flight.get("tsun", 200)
            }

            # Convert to DataFrame
            test_df = pd.DataFrame([features])

            # Ensure column match
            missing = set(model.feature_names_in_) - set(test_df.columns)
            for col in missing:
                test_df[col] = 0

            # Predict delay
            delay = model.predict(test_df)[0]

            if delay < best_delay:
                best_delay = delay
                best_hour = hour

        # Save the best hour and predicted delay
        scheduled_flights.append({
            "FL_DATE": flight["FL_DATE"],
            "MKT_UNIQUE_CARRIER": flight["MKT_UNIQUE_CARRIER"],
            "ORIGIN": flight["ORIGIN"],
            "DEST": flight["DEST"],
            "DISTANCE": flight.get("DISTANCE", 500),
            "CRS_ELAPSED_TIME": flight.get("CRS_ELAPSED_TIME", 60),
            # "Best_Hour": best_hour,
            "Best_Hour": flight["CRS_DEP_TIME"],
            "Predicted_Delay": round(best_delay, 2)
        })

    return pd.DataFrame(scheduled_flights)
