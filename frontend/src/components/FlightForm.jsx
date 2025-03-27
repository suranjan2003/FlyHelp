import { useState } from "react";
import axios from "axios";

const FlightForm = ({ setResult }) => {
    const [formData, setFormData] = useState({
        date: "",
        time: "",
        flight_name: "",
        starting_point: "",
        destination: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://127.0.0.1:5000/predict", formData);
            setResult(response.data);
        } catch (error) {
            console.error("Error fetching prediction:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-lg">
            <input name="date" type="date" onChange={handleChange} required className="w-full p-2 border" />
            <input name="time" type="time" onChange={handleChange} required className="w-full p-2 border" />
            <input name="flight_name" placeholder="Flight Name" onChange={handleChange} required className="w-full p-2 border" />
            <input name="starting_point" placeholder="Starting Point" onChange={handleChange} required className="w-full p-2 border" />
            <input name="destination" placeholder="Destination" onChange={handleChange} required className="w-full p-2 border" />
            <button type="submit" className="w-full p-2 bg-blue-500 text-white">Predict</button>
        </form>
    );
};

export default FlightForm;
