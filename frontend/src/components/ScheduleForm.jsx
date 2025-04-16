import { useState } from "react";
import axios from "axios";

const ScheduleForm = ({ setSchedule }) => {
	const [date, setDate] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log("Sending FL_DATE:", date);
		try {
			const response = await axios.post("http://127.0.0.1:5000/schedule-day", { FL_DATE: date });
			setSchedule(response.data);
		} catch (error) {
			console.error("Error fetching schedule:", error);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded-lg shadow-md w-full max-w-md">
			<h2 className="text-lg font-bold text-center">Get Optimized Flight Schedule</h2>
			<input
				type="date"
				value={date}
				onChange={(e) => setDate(e.target.value)}
				required
				className="w-full p-2 border rounded"
			/>
			<button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
				Get Schedule
			</button>
		</form>
	);
};

export default ScheduleForm;
