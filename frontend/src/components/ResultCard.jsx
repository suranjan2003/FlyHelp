const ResultCard = ({ result }) => {
    if (!result) return null;

    return (
        <div className="p-4 mt-4">
            <p>
                <strong>Best Departure Time:</strong>{" "}
                {String(result.best_departure_time).slice(0, -2) + ':' + String(result.best_departure_time).slice(-2)}

            </p>
            <p><strong>Predicted Delay:</strong> {result.predicted_delay}</p>
        </div>
    );
};

export default ResultCard;
