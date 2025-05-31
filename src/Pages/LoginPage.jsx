import Lottie from "lottie-react";
import { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../data/Context";
import loginAnim from "../assets/login-animation.json";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/giris", { email, password });
      //alert(response.data.message);
      localStorage.setItem("token", response.data.token);
      setUser(response.data.user);
      window.location.href = "/kullanici"; // Başarılı girişte kullanıcı sayfasına yönlendir
    } catch (err) {
      const msg = err.response?.data?.message || "Giriş sırasında hata oluştu";
      alert(msg);
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
            <a href="/unutma">Şifremi Unuttum</a>
          </p>
          <p className="text-center mt-3 mb-0 text-dark">
            Hesabın yok mu? <a href="/register">Kayıt Ol</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
