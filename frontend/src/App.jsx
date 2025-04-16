import { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Services from "./pages/Services";
import About from "./pages/About";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Delay_Predictor from "./pages/Delay_Predictor";
import Schedule_Page from "./pages/Schedule_Page";

const App = () => {
	return (
		<Router>
			<Navbar />
			<Routes>
				<Route
					path="/"
					element={
						<div>
							<Home />
							<About />
							<Services />
						</div>
					}
				/>
				<Route path="/delay-predictor" element={<Delay_Predictor />} />
				<Route path="/scheduling" element={<Schedule_Page />} />
			</Routes>
			{/* <Footer /> */}
		</Router>
	);
};

export default App;
