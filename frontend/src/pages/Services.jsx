import React, { useState } from "react";
import FlightForm from "../components/FlightForm";
import ResultCard from "../components/ResultCard";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import ScheduleForm from "../components/ScheduleForm";
import ScheduleTable from "../components/ScheduleTable";

const Services = () => {
    

    return (
        <div
            id="services"
            className="min-h-screen flex flex-col items-center pt-20 md:pt-25 px-4 md:px-10 bg-gray-100 "
        >
            <h1 className="text-4xl font-bold mb-6 text-center">What We Provide?</h1>
            <div className="w-full md:w-1/3 mt-6">
                <div
                    className="bg-white shadow-md rounded-lg p-6 cursor-pointer hover:shadow-xl transition"
                    onClick={() => {
                        window.location.href = "/delay-predictor"; // change the URL as needed
                    }}
                >
                    <h2 className="text-2xl font-bold text-center">Delay Predictor</h2>
                </div>
            </div>
			<h1 className="text-4xl font-bold mb-6 text-center">What We Provide?</h1>
            <div className="w-full md:w-1/3 mt-6">
                <div
                    className="bg-white shadow-md rounded-lg p-6 cursor-pointer hover:shadow-xl transition"
                    onClick={() => {
                        window.location.href = "/scheduling"; // change the URL as needed
                    }}
                >
                    <h2 className="text-2xl font-bold text-center">Scheduling</h2>
                </div>
            </div>
        </div>
    );
};

export default Services;
