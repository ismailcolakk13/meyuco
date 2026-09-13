import Lottie from "lottie-react";
import { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../data/Context";
import loginAnim from "../assets/login-animation.json";
import { useNavigate, Link } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await axios.post("/api/giris", { email, password });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      setUser(response.data.user);
      navigate("/");
    } catch (err) {
      const msg = err.response?.data?.message || "Giriş sırasında bir hata oluştu. Lütfen tekrar deneyin.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center p-4 py-10 bg-linear-to-br from-slate-900 via-[#1C2D41] to-[#18B38C]">
      <div className="w-full max-w-md bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/30 transition-all">
        {/* Lottie Animasyon */}
        <div className="w-44 mx-auto mb-2">
          <Lottie animationData={loginAnim} loop={true} />
        </div>

        <h2 className="text-2xl font-bold text-center text-slate-800 mb-1">Hoş Geldiniz</h2>
        <p className="text-center text-slate-500 text-sm mb-6">Hesabınıza giriş yapın</p>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wider">
              E-posta Adresi
            </label>
            <input
              type="email"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
              placeholder="ornek@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Şifre
              </label>
              <Link to="/unutma" className="text-xs font-medium text-teal-600 hover:text-teal-700">
                Şifremi Unuttum?
              </Link>
            </div>
            <input
              type="password"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl text-sm font-bold text-white bg-linear-to-r from-slate-900 to-teal-700 hover:from-slate-800 hover:to-teal-600 shadow-md hover:shadow-lg transition-all disabled:opacity-50 mt-2"
          >
            {loading ? "Giriş Yapılıyor..." : "Giriş Yap"}
          </button>

          <p className="text-center text-sm text-slate-600 pt-2">
            Hesabınız yok mu?{" "}
            <Link to="/register" className="font-semibold text-teal-600 hover:text-teal-700">
              Kayıt Olun
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
