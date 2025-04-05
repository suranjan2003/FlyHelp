import React, { useState } from "react";
import FlightForm from "../components/FlightForm";
import ResultCard from "../components/ResultCard";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const Services = () => {
	const [result, setResult] = useState(null);
	return (
		<div
			id="services"
			className="min-h-screen flex flex-col items-center pt-20 md:pt-25 px-4 md:px-10 bg-gray-100"
		>
			<h1 className="text-4xl font-bold mb-6 text-center">Flight Delay Predictor</h1>
			<div className="w-full flex flex-col md:flex-row md:justify-center md:gap-10">
				{/* FlightForm on the left */}
				<div className="w-full md:w-1/2">
					<FlightForm setResult={setResult} />
				</div>

				{/* ResultCard on the right */}
				<div className="w-full md:w-1/2 border rounded-lg p-4 mt-6 md:mt-0">
					<h2 className="text-2xl font-semibold mb-4 text-center mb-6 md:mb-10">
						Prediction Result
					</h2>
					{result ? (
						<ResultCard result={result} />
					) : (
						<div className="flex justify-center items-center">
							<DotLottieReact
								src="https://lottie.host/04c268e2-c917-4c4d-b388-b39c1d293cae/4HXUl69PNz.lottie"
								loop
								autoplay
								style={{ width: "200px", height: "200px" }} // Adjust the size here
							/>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Services;
