import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Signup from "./components/signup";
import Login from "./components/login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Logedin from "./components/logedin";

function App() {
  return (
    <div className="text-center">
      <Router>
        <Routes>
          <Route path="/" element={<Signup />}></Route>
          <Route path="/home" element={<Logedin />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
