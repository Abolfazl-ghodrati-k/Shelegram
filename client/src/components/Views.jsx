import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Login/Login";
import SignUp from "./Login/SignUp";
import Home from "../Home";
import Profile from "../pages/Profile";

function Views() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<Login />} />
        </Routes>
    );
}

export default Views;
