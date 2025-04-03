const ResultCard = ({ result }) => {
    if (!result) return null;

    return (
        <div className="p-4 mt-4">
            <p><strong>Best Departure Time:</strong> {result.best_departure_time}</p>
            <p><strong>Predicted Delay:</strong> {result.predicted_delay} minutes</p>
        </div>
    );
};

export default ResultCard;
