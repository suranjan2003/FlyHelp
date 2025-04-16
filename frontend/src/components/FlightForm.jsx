import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../App";

const FlightForm = ({ setResult, setLoading, setError }) => {
    const [formData, setFormData] = useState({
        FL_DATE: "",
        CRS_DEP_TIME: "",
        MKT_UNIQUE_CARRIER: "",
        ORIGIN: "",
        DEST: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(false);
        setResult(null);

        console.log("Sending data:", formData);

        // Simulate a 4 second wait before sending request
        setTimeout(async () => {
            try {
                const response = await axios.post(BASE_URL + "/predict", formData, {
                    headers: { "Content-Type": "application/json" }
                });

                console.log("Response:", response.data);

                if (response.data) {
                    setResult(response.data);
                } else {
                    throw new Error("No result returned");
                }
            } catch (error) {
                console.error("Error fetching prediction:", error);
                setError(true);
                setTimeout(() => setError(false), 5000);
            } finally {
                setLoading(false);
            }
        }, 4000);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-lg bg-gray-100 opacity-90">
            <input name="FL_DATE" type="date" onChange={handleChange} required className="w-full p-2 border" />
            <input name="CRS_DEP_TIME" type="time" onChange={handleChange} required className="w-full p-2 border" />
            <input name="MKT_UNIQUE_CARRIER" placeholder="Flight Carrier Name" onChange={handleChange} required className="w-full p-2 border" />
            <input name="ORIGIN" placeholder="Starting Point" onChange={handleChange} required className="w-full p-2 border" />
            <input name="DEST" placeholder="Destination" onChange={handleChange} required className="w-full p-2 border" />
			<div className="flex gap-2 justify-end">
				<button 
					onClick={() => window.location.reload()}
					className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition cursor-pointer"
				>
					Reload
				</button>
				<button type="submit" className="px-4 py-2 w-1/2 bg-blue-500 text-white rounded hover:bg-blue-600 transition cursor-pointer">Predict</button>
			</div>
        </form>
    );
};

export default FlightForm;
