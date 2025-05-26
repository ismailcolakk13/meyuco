import React, { useState } from "react";
import Lottie from "lottie-react";
import loginAnim from "../assets/login-animation.json";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Giriş yapılıyor:", { email, password });
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        background: "linear-gradient(135deg, #1C2D41, #18B38C)",
        padding: "20px"
      }}
    >
      <div
        className="card p-4 shadow-lg"
        style={{
          maxWidth: "400px",
          width: "100%",
          borderRadius: "15px",
          backgroundColor: "#ffffffcc",
          backdropFilter: "blur(10px)",
        }}
      >
        {/* Lottie Animasyon */}
        <div className="text-center mb-3">
          <Lottie animationData={loginAnim} loop={true} style={{ width: 200, margin: "0 auto" }} />
        </div>

        <h3 className="text-center mb-4 text-dark">Giriş Yap</h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label text-dark">E-posta adresi</label>
            <input
              type="email"
              className="form-control"
              placeholder="ornek@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label text-dark">Şifre</label>
            <input
              type="password"
              className="form-control"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-success">
              Giriş Yap
            </button>
          </div>

          <p className="text-center mt-3 mb-0 text-dark">
            Hesabın yok mu? <a href="/register">Kayıt Ol</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
