import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Topbar from "./Components/Topbar";
import Footer from "./Components/Footer";
import HomePage from "./Pages/HomePage";
import Konserler from "./Pages/Konserler";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import TiyatroPage from "./Pages/TiyatroPage";
import EtkinlikGrupPage from "./Pages/EtkinlikGrupPage";
import { konserler,tiyatrolar } from "./data/etkinlikler";

function App() {
  const location = useLocation();

  const hideTopbarPaths= ["/login","/register"];
  const showTopBar = !hideTopbarPaths.includes(location.pathname);

  return (
    <div className="d-flex flex-column">
      {showTopBar && <Topbar/>}
      <div className="flex-grow-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/konserler" element={<EtkinlikGrupPage baslik={"Konserler"} etkinlikler={konserler} />} />
          <Route path="/tiyatrolar" element={<EtkinlikGrupPage baslik={"Tiyatrolar"} etkinlikler={tiyatrolar} />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
