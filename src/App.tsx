import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Home } from "./routes/home";
import { About } from "./routes/about";
import { Login } from "./routes/auth/login";
import { Register } from "./routes/auth/register";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/register" element={<Register />} />
    </Routes>
  );
}

export default App;
