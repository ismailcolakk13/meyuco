import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Topbar from './Components/Topbar';
import Footer from './Components/Footer';
import HomePage from './Pages/HomePage';
import Konserler from './Pages/Konserler';
import LoginPage from './Pages/LoginPage';        
import RegisterPage from './Pages/RegisterPage';   
import TiyatroPage from "./Pages/TiyatroPage";


function App() {
  
  return (
    <div className="d-flex flex-column min-vh-100">
      <Topbar />
      <div className="flex-grow-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/konserler" element={<Konserler />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
           <Route path="/tiyatrolar" element={<TiyatroPage />} />

        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
