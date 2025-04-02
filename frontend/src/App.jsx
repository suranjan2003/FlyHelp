import { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Services from "./pages/Services";
import About from "./pages/About";

const App = () => {

    return (
        <div >
            <Navbar />
            <Home/>
            <About/>
            <Services/>
        </div>
    );
};

export default App;

