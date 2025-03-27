import { useState } from "react";
import FlightForm from "./components/FlightForm";
import ResultCard from "./components/ResultCard";

const App = () => {
    const [result, setResult] = useState(null);

    return (
        <div className="min-h-screen flex flex-col items-center p-6">
            <h1 className="text-2xl font-bold">Flight Delay Predictor</h1>
            <FlightForm setResult={setResult} />
            {result && <ResultCard result={result} />}
        </div>
    );
};

export default App;

