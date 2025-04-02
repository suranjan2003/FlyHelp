import { useState } from "react";
import axios from "axios";

const FlightForm = ({ setResult }) => {
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
        console.log("Sending data:", formData); // Debugging log
    
        try {
            const response = await axios.post("http://127.0.0.1:5000/predict", formData, {
                headers: { "Content-Type": "application/json" }
            });            
            console.log("Response:", response.data);
            setResult(response.data);
        } catch (error) {
            console.error("Error fetching prediction:", error);
        }
    };
    

    return (
        <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-lg">
            <input name="FL_DATE" type="date" onChange={handleChange} required className="w-full p-2 border" />
            <input name="CRS_DEP_TIME" type="time" onChange={handleChange} required className="w-full p-2 border" />
            <input name="MKT_UNIQUE_CARRIER" placeholder="Flight Carrier" onChange={handleChange} required className="w-full p-2 border" />
            <input name="ORIGIN" placeholder="Starting Point" onChange={handleChange} required className="w-full p-2 border" />
            <input name="DEST" placeholder="Destination" onChange={handleChange} required className="w-full p-2 border" />
            <button type="submit" className="w-full p-2 bg-blue-500 text-white">Predict</button>
        </form>
    );
};

export default FlightForm;
