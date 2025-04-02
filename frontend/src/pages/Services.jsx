import React, { useState } from "react";
import FlightForm from "../components/FlightForm";
import ResultCard from "../components/ResultCard";

const Services = () => {
	const [result, setResult] = useState(null);
	return (
		<div id="services" className="min-h-screen flex flex-col items-center pt-30 px-4 md:px-10 bg-gray-100">
			<h1 className="text-2xl mb-4 font-bold">Flight Delay Predictor</h1>
			<FlightForm setResult={setResult} />
			{result && <ResultCard result={result} />}
		</div>
	);
};

export default Services;
