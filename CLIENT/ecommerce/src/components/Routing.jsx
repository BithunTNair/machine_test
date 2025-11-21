import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./Auth/SignUp";
import LogIn from "./Auth/LogIn";
import Home from "./Home/Home";
const Routing = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
           <Route path="/home" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
};

export default Routing;
