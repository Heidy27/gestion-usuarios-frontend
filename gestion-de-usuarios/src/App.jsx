import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { useState } from "react";
import MainComponent from "./components/mainComponent";
import LoginForm from "./components/Login/login";
import RegisterForm from "./components/Register/register";
import Dashboard from "./components/Dashboard/dasboard";
import { loadUserFromBackend } from "./services/userService";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainComponent />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
      </Routes>
    </Router>
  );
};

export default App;
