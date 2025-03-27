const ResultCard = ({ result }) => {
    return (
        <div className="mt-4 p-4 border rounded-lg">
            <h2 className="text-lg font-bold">Prediction Result</h2>
            <p><strong>Best Departure Time:</strong> {result.best_departure_time}</p>
            <p><strong>Predicted Delay:</strong> {result.predicted_delay} minutes</p>
        </div>
    );
};

export default ResultCard;
