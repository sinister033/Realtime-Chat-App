import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import Avatar from "./pages/Avatar";
import Setusername from "./pages/Setusername";
const App = () => {

  return <BrowserRouter>
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/avatar" element={<Avatar />} />
      <Route path="/setUsername" element={<Setusername />} />
      <Route path="/" element={<Chat />} />
    </Routes>
  </BrowserRouter>;
};

export default App;
