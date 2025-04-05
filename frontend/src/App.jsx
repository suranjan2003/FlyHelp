import { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Services from "./pages/Services";
import About from "./pages/About";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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
			</Routes>
			{/* <Footer /> */}
		</Router>
	);
};

export default App;
