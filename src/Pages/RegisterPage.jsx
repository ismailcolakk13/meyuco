import Lottie from "lottie-react";
import { useState, useContext } from "react";
import registerAnim from "../assets/register-animation.json";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../data/Context";

const RegisterPage = () =>
{
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const { setUser } = useContext(UserContext);

    const navigate = useNavigate();

    const handleChange = (e) =>
    {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) =>
    {
        e.preventDefault();
        if (form.password !== form.confirmPassword)
        {
            alert("Şifreler uyuşmuyor!");
            return;
        }
        try {
            const response = await axios.post("/api/register", {
                email: form.email,
                password: form.password,
                name: form.name,
                role: "user" // Varsayılan rol
            });
            alert(response.data.message);
            setUser(response.data.user); // Kullanıcıyı context'e kaydet
            navigate("/"); // Ana sayfaya yönlendir
        } catch (err) {
            const msg = err.response?.data?.message || "Kayıt sırasında hata oluştu";
            alert(msg);
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
