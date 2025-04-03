import React from "react";

const About = () => {
	return (
		<div
			id="about"
			className="min-h-[60vh] bg-blue-900 text-white py-20 px-10 md:px-20"
		>
			<div className="max-w-4xl mx-auto text-center">
				<h2 className="text-4xl font-bold mb-6">About</h2>
				<p className="text-md md:text-lg leading-relaxed">
					FlyHelp is an AI-powered flight delay prediction and scheduling
					platform designed to enhance travel efficiency by leveraging machine
					learning models trained on historical flight data. It accurately
					forecasts potential delays, suggests optimal departure times, and
					provides an advanced flight scheduling module to help airlines and
					passengers optimize travel plans, reduce congestion, and improve time
					management.
				</p>
				<p className="text-md md:text-lg leading-relaxed mt-4">
					With a sleek and intuitive interface, FlyHelp empowers travelers and
					airlines with AI-driven insights, making air travel more predictable,
					efficient, and hassle-free.
				</p>
			</div>
		</div>
	);
};

export default About;
