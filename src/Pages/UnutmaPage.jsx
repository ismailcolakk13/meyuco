import Lottie from "lottie-react";
import { useState } from "react";
import registerAnim from "../assets/şifreunttum.json"; // Animasyon dosyası

const UnutmaPage = () =>
{
    const [form, setForm] = useState({
        email: "",
        password: "",
        confirmPassword: "",
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
            alert("Şifreler eşleşmiyor!");
            return;
        }
        // Burada şifre sıfırlama işlemi yapılabilir
        alert("Şifre sıfırlama bağlantısı e-posta adresinize gönderildi.");
        console.log("Şifre sıfırlama isteği:", form);
        window.location.href = "/login";
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

                <h3 className="text-center mb-4 text-dark">Şifremi Unuttum</h3>

                <form onSubmit={handleSubmit}>
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
                        <label className="form-label text-dark">Yeni Şifre</label>
                        <input
                            type="password"
                            name="password"
                            className="form-control"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label text-dark">Şifreyi Tekrar Girin</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            className="form-control"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="d-grid">
                        <button type="submit" className="btn btn-success">Şifreyi Değiştir</button>
                    </div>

                    <p className="text-center mt-3 mb-0 text-dark">
                        Hesabın var mı? <a href="/login">Giriş Yap</a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default UnutmaPage;
