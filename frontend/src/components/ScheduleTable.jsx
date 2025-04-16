const ScheduleTable = ({ schedule }) => {
	if (!schedule || schedule.length === 0) return null;
	console.log(schedule);

	return (
		<div className="mt-6 w-full max-w-4xl bg-white p-4 rounded-lg shadow-md overflow-auto">
			<h3 className="text-lg font-semibold mb-2">Optimized Schedule</h3>
			<table className="table-auto w-full border border-gray-300 text-sm">
				<thead className="bg-gray-100">
					<tr>
						<th className="p-2 border">Flight Date</th>
						<th className="p-2 border">Carrier</th>
						<th className="p-2 border">Origin</th>
						<th className="p-2 border">Destination</th>
						<th className="p-2 border">Clock</th>
						{/* <th className="p-2 border">Predicted Delay (min)</th> */}
					</tr>
				</thead>
				<tbody>
					{schedule.map((flight, index) => (
						<tr key={index}>
							<td className="p-2 border text-center">{flight.FL_DATE}</td>
							<td className="p-2 border text-center">{flight.MKT_UNIQUE_CARRIER}</td>
							<td className="p-2 border text-center">{flight.ORIGIN}</td>
							<td className="p-2 border text-center">{flight.DEST}</td>
							<td className="p-2 border text-center">
								{`${flight.Best_Hour.toString().slice(0, -2)}:${flight.Best_Hour.toString().slice(-2)}`}
							</td>
							{/* <td className="p-2 border text-center">{flight.Predicted_Delay}</td> */}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default ScheduleTable;
