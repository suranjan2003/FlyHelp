import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../App";

const ScheduleForm = ({ setSchedule, setIsLoading, setShowNoResult }) => {
	const [date, setDate] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		setShowNoResult(false);
		setSchedule(null);

		setTimeout(async () =>{
		try {
			const response = await axios.post(BASE_URL + "/schedule-day", { FL_DATE: date }, {
				headers: { "Content-Type": "application/json" }
			});
			
			const data = response.data;

			console.log("Response:", data);

			if (data.length > 0) {
				setSchedule(data);
			} else {
				throw new Error("No result returned");
			}
		} catch (error) {
			console.error("Error fetching schedule:", error);
			setShowNoResult(true);
			setTimeout(() => setShowNoResult(false), 5000);
		} finally {
			setIsLoading(false);
		}
		}, 4000);
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-4 bg-gray-100 p-4 shadow-md w-full max-w-md h-[180px] opacity-90">
			<h2 className="text-lg font-bold text-center">Date? to Schedule Flights</h2>
			<input
				type="date"
				value={date}
				onChange={(e) => setDate(e.target.value)}
				required
				className="w-full p-2 border rounded"
			/>
			<div className="flex gap-2 justify-end">
			<button 
					onClick={() => window.location.reload()}
					className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition cursor-pointer"
				>
					Reload
				</button>
			<button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 cursor-pointer transition">
				Get Schedule
			</button>
			</div>
		</form>
	);
};

export default ScheduleForm;
