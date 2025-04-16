import { useState } from "react";
import axios from "axios";

const ScheduleForm = ({ setSchedule, setIsLoading, setShowNoResult }) => {
	const [date, setDate] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		setShowNoResult(false);
		setSchedule(null);

		setTimeout(async () =>{
		try {
			const response = await axios.post("http://127.0.0.1:5000/schedule-day", { FL_DATE: date });
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
		<form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 shadow-md w-full max-w-md h-[180px]">
			<h2 className="text-lg font-bold text-center">Date? to Schedule Flights</h2>
			<input
				type="date"
				value={date}
				onChange={(e) => setDate(e.target.value)}
				required
				className="w-full p-2 border rounded"
			/>
			<button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 cursor-pointer transition">
				Get Schedule
			</button>
		</form>
	);
};

export default ScheduleForm;
