const ResultCard = ({ result }) => {
    if (!result) return null;

    return (
        <div className="p-4 border rounded-lg shadow-md mt-4">
            <h2 className="text-lg font-bold">Prediction Results</h2>
            <p><strong>Best Departure Time:</strong> {result.best_departure_time}</p>
            <p><strong>Predicted Delay:</strong> {result.predicted_delay} minutes</p>
        </div>
    );
};

export default ResultCard;
