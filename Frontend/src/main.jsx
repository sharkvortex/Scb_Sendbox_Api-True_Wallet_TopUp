import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import "./index.css";
import './App.css'
import { ToastContainer } from "react-toastify";
import Notfound404 from "./components/Notfound404.jsx";
import Index from "./Index";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import AuthLoginProvider from "./components/auth/AuthLoginProvider.jsx";
import TopUp from "./pages/TopUp.jsx";

createRoot(document.getElementById("root")).render(
  <Router>
    <AuthLoginProvider>
      <Routes>
        <Route path="*" element={<Notfound404 />} />
        <Route path="/" element={<Index />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/topup" element={<TopUp />} />
      </Routes>
    </AuthLoginProvider>
    <ToastContainer
      position="top-right"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={true}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
      style={{ fontFamily: "'Sarabun', sans-serif", fontSize: "12px" }}
    />
  </Router>
);
