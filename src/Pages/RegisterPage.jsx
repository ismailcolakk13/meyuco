import axios from "axios";
import Lottie from "lottie-react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import registerAnim from "../assets/register-animation.json";
import { UserContext } from "../data/Context";

const RegisterPage = () =>
{
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [error, setError] = useState("");

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
            setError("Şifreler uyuşmuyor!");
            return;
        }
        try
        {
            const response = await axios.post("/api/register", {
                email: form.email,
                password: form.password,
                name: form.name,
                role: "user" // Varsayılan rol
            });
            alert(response.data.message);
            navigate("/login"); // Ana sayfaya yönlendir
        } catch (err)
        {
            const msg = err.response?.data?.message || "Kayıt sırasında bir hata oluştu. Lütfen tekrar deneyin.";
            setError(msg);
        }
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
                    backdropFilter: "blur(10px)"
                }}
            >
                <div className="text-center mb-3">
                    <Lottie
                        animationData={registerAnim}
                        loop={true}
                        style={{ width: 200, margin: "0 auto" }}
                    />
                </div>
                <h3 className="text-center mb-4 text-dark">Kayıt Ol</h3>
                {error && <div className="alert alert-danger text-center">{error}</div>}
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
                            Kayıt Ol
                        </button>
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
