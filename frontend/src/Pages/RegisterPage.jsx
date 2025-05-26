import React, { useState } from "react";
import Lottie from "lottie-react";
import registerAnim from "../assets/register-animation.json"; // Yeni animasyon dosyası

const RegisterPage = () =>
{
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const handleChange = (e) =>
    {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) =>
    {
        e.preventDefault();
        if (form.password !== form.confirmPassword)
        {
            alert("Şifreler uyuşmuyor!");
            return;
        }
        console.log("Kayıt bilgileri:", form);
    };

    return (
        <div
            className="d-flex justify-content-center align-items-center vh-100"
            style={{
                background: "linear-gradient(135deg, #1C2D41, #18B38C)",
                padding: "20px",
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
                    <Lottie
                        animationData={registerAnim}
                        loop={true}
                        style={{ width: 200, margin: "0 auto" }}
                    />
                </div>

                <h3 className="text-center mb-4 text-dark">Kayıt Ol</h3>

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label text-dark">Ad Soyad</label>
                        <input
                            type="text"
                            name="name"
                            className="form-control"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label text-dark">E-posta</label>
                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label text-dark">Şifre</label>
                        <input
                            type="password"
                            name="password"
                            className="form-control"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label text-dark">Şifre Tekrar</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            className="form-control"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="d-grid">
                        <button type="submit" className="btn btn-success">Kayıt Ol</button>
                    </div>

                    <p className="text-center mt-3 mb-0 text-dark">
                        Zaten hesabın var mı? <a href="/login">Giriş Yap</a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;
