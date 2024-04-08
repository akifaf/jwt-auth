import { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import Header from "./components/Header.jsx";
import { PrivateRoute } from "./utils/PrivateRoute.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
// import { AuthProvider } from "./context/AuthContext.jsx";

function App() {
  return (
    <BrowserRouter>
    <AuthProvider>
        <Header />
        <Routes>
          <Route path="/" element={<PrivateRoute Component={HomePage} />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </AuthProvider> 
    </BrowserRouter>
  );
}

export default App;
