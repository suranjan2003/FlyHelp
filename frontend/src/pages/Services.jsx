import React from "react";

const Services = () => {
	return (
		<div
			id="services"
			className="min-h-screen flex flex-col items-center pt-20 md:pt-25 px-4 md:px-10 bg-fixed bg-center"
            style={{ backgroundImage: "url('/services-bg.jpg')"}}
		>
			<h1 className="text-4xl font-bold mb-6 text-white text-center">Services We Provide</h1>
			<div className="md:flex md:flex-row md:justify-center md:items-center w-full gap-4 md:gap-20 max-w-6xl mx-auto mb-10">
				<div className="w-full md:w-1/3 mt-6">
					<div
						className="bg-white shadow-md rounded-lg cursor-pointer hover:shadow-xl hover:scale-[103%] transition p-1"
						onClick={() => {
							window.location.href = "/delay-predictor"; // change the URL as needed
						}}
					>
                        <img src="/delay-prediction-card.jpg" alt="Delay Predictor" className="w-full h-full object-cover rounded-t-lg" />
						<h2 className="text-2xl font-bold text-center py-4">Delay Predictor</h2>
					</div>
				</div>
				<div className="w-full md:w-1/3 mt-6">
					<div
						className="bg-white shadow-md rounded-lg cursor-pointer hover:shadow-xl hover:scale-[103%] transition p-1"
						onClick={() => {
							window.location.href = "/scheduling"; // change the URL as needed
						}}
					>
                        <img src="/scheduling-card.jpg" alt="Flight Scheduling" className="w-full h-full object-cover rounded-t-lg" />
						<h2 className="text-2xl font-bold text-center py-4">Flight Scheduling</h2>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Services;
