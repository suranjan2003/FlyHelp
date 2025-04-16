import React, { useState } from "react";
import ScheduleForm from "../components/ScheduleForm";
import ScheduleTable from "../components/ScheduleTable";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const Schedule_Page = () => {
	const [schedule, setSchedule] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [showNoResult, setShowNoResult] = useState(false);

	return (
		<div
			id="scheduling"
			className="min-h-screen flex flex-col items-center pt-20 md:pt-25 px-4 md:px-10 bg-gray-100"
		>
			<h2 className="text-4xl font-bold mb-6 text-center">
				Get Optimized Flight Schedule
			</h2>
			<div className="md:flex md:justify-center md:gap-10 w-full flex-col md:flex-row">
				<ScheduleForm
					setSchedule={setSchedule}
					setIsLoading={setIsLoading}
					setShowNoResult={setShowNoResult}
				/>
				<div className="block w-full max-w-4xl h-[400px] md:h-[500px] mt-4 md:mt-0 bg-white overflow-auto">
					{isLoading ? (
						<div className="flex justify-center items-center h-[382px] md:h-[484px] m-2 dashed border-2 border-dashed border-gray-300">
							<DotLottieReact
								src="https://lottie.host/04c268e2-c917-4c4d-b388-b39c1d293cae/4HXUl69PNz.lottie"
								loop
								autoplay
								style={{ width: "200px", height: "200px" }}
							/>
						</div>
					) : showNoResult ? (
						<div className="flex flex-col justify-center items-center h-[382px] md:h-[484px] m-2 dashed border-2 border-dashed border-gray-300">
							<DotLottieReact
								src="https://lottie.host/8ea3e50a-6b6b-4b1c-9f65-7c0db326b7f4/fupn8KD95x.lottie"
								loop
								autoplay
								style={{ width: "200px", height: "200px" }}
							/>
							<p className="text-gray-500 text-center m-2">
								No Data Available! Choose another date.
							</p>
						</div>
					) : Array.isArray(schedule) && schedule.length > 0 ? (
						<ScheduleTable schedule={schedule} />
					) : (
						<div className="flex justify-center items-center h-[382px] md:h-[484px] m-2 dashed border-2 border-dashed border-gray-300">
							<p className="text-gray-500 text-center m-2">
								Please select a date to get the optimized schedule.
							</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Schedule_Page;
