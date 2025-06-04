import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center" style={{background: "linear-gradient(135deg, #1C2D41, #18B38C)",height:"100%"}}>
      <h1 style={{ fontSize: "6rem", color: "#fff" }}>404</h1>
      <h2 style={{ color: "#fff" }}>Sayfa Bulunamadı</h2>
      <p style={{ color: "#fff" }}>Aradığınız sayfa mevcut değil veya kaldırılmış olabilir.</p>
      <Link to="/" className="btn btn-light mt-3">Anasayfaya Dön</Link>
    </div>
  );
};

export default NotFound;
