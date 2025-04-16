import React, { useState } from "react";
import FlightForm from "../components/FlightForm";
import ResultCard from "../components/ResultCard";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import ScheduleForm from "../components/ScheduleForm";
import ScheduleTable from "../components/ScheduleTable";

const Services = () => {
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

	const [schedule, setSchedule] = useState([]);

    return (
        <div
            id="services"
            className="min-h-screen flex flex-col items-center pt-20 md:pt-25 px-4 md:px-10 bg-gray-100 "
        >
            <h1 className="text-4xl font-bold mb-6 text-center">Flight Delay Predictor</h1>
            <div className="w-full flex flex-col md:flex-row md:justify-center md:gap-10">
                <div className="w-full md:w-1/2">
                    <FlightForm setResult={setResult} setLoading={setLoading} setError={setError} />
                </div>

                <div className="w-full md:w-1/2 border rounded-lg p-4 mt-6 md:mt-0">
                    <h2 className="text-2xl font-semibold mb-4 text-center mb-6 md:mb-10">
                        Prediction Result
                    </h2>

                    {loading ? (
                        <div className="flex justify-center items-center">
                            <DotLottieReact
                                src="https://lottie.host/c5011269-2f36-4dde-9c20-2e3eb67c289c/QSmDbdWBUW.lottie"
                                loop
                                autoplay
								style={{ width: "200px", height: "200px" }}
                            />
                        </div>
                    ) : error ? (
                        <div className="flex justify-center items-center">
                            <DotLottieReact
                                src="https://lottie.host/8ea3e50a-6b6b-4b1c-9f65-7c0db326b7f4/fupn8KD95x.lottie"
                                loop
                                autoplay
                                style={{ width: "200px", height: "200px" }}
                            />
                        </div>
                    ) : result ? (
                        <ResultCard result={result} />
                    ) : (
                        <div className="text-center text-gray-400">
                            Fill Form & Predict
                        </div>
                    )}
                </div>
            </div>
			<div className="w-full md:w-1/2 mt-6">
				<h2 className="text-2xl font-semibold mb-4 text-center">Optimized Schedule</h2>
				<div className="mt-10">
					<ScheduleForm setSchedule={setSchedule} />
					<ScheduleTable schedule={schedule} />
				</div>
			</div>
        </div>
    );
};

export default Services;
