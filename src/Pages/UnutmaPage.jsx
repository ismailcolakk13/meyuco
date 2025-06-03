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

    const [mesaj, setMesaj] = useState("");

    const handleChange = (e) =>
    {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) =>
    {
        e.preventDefault();

        if (form.password !== form.confirmPassword)
        {
            setMesaj("❌ Şifreler eşleşmiyor!");
            return;
        }

        try
        {
            const res = await fetch("http://localhost:5000/api/sifremi-unuttum", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: form.email,
                    yeni_sifre: form.password,
                }),
            });

            const data = await res.json();

            if (res.ok)
            {
                setMesaj("✅ Şifre başarıyla güncellendi.");
                setTimeout(() =>
                {
                    window.location.href = "/login";
                }, 1500);
            }
            else
            {
                setMesaj(`❌ ${data.message || "Bir hata oluştu"}`);
            }
        }
        catch (error)
        {
            console.error("İstek hatası:", error);
            setMesaj("❌ Sunucuya ulaşılamadı.");
        }
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
                        <button
                            type="submit"
                            className="text-white border-0"
                            style={{
                                background: "linear-gradient(135deg, #1C2D41, #18B38C)",
                                padding: "10px",
                                borderRadius: "5px",
                                fontWeight: "bold"
                            }}
                        >
                            Şifreyi Değiştir
                        </button>
                    </div>


                    {mesaj && (
                        <div className="alert alert-info text-center mt-3 p-2">
                            {mesaj}
                        </div>
                    )}

                    <p className="text-center mt-3 mb-0 text-dark">
                        Hesabın var mı? <a href="/login">Giriş Yap</a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default UnutmaPage;
