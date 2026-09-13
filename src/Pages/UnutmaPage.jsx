import Lottie from "lottie-react";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import registerAnim from "../assets/şifreunttum.json";

const UnutmaPage = () => {
    const [form, setForm] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [mesaj, setMesaj] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (form.password !== form.confirmPassword) {
            setMesaj("Şifreler eşleşmiyor!");
            setIsSuccess(false);
            return;
        }

        setLoading(true);
        setMesaj("");
        try {
            const res = await axios.put("/api/sifremi-unuttum", {
                email: form.email,
                yeni_sifre: form.password,
            });

            if (res.status === 200) {
                setMesaj("Şifre başarıyla güncellendi. Giriş ekranına yönlendiriliyorsunuz...");
                setIsSuccess(true);
                setTimeout(() => {
                    navigate("/login");
                }, 1500);
            }
        } catch (error) {
            const errorMsg = error.response?.data?.message || "Bir hata oluştu";
            setMesaj(errorMsg);
            setIsSuccess(false);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center p-4 py-10 bg-linear-to-br from-slate-900 via-[#1C2D41] to-[#18B38C]">
            <div className="w-full max-w-md bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/30 transition-all">
                <div className="w-40 mx-auto mb-2">
                    <Lottie animationData={registerAnim} loop={true} />
                </div>

                <h2 className="text-2xl font-bold text-center text-slate-800 mb-1">Şifremi Unuttum</h2>
                <p className="text-center text-slate-500 text-sm mb-6">Yeni şifrenizi belirleyin</p>

                {mesaj && (
                    <div
                        className={`mb-4 p-3 rounded-xl text-sm text-center border ${
                            isSuccess
                                ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                                : "bg-rose-50 border-rose-200 text-rose-700"
                        }`}
                    >
                        {mesaj}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wider">
                            E-posta
                        </label>
                        <input
                            type="email"
                            name="email"
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                            placeholder="ornek@mail.com"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wider">
                            Yeni Şifre
                        </label>
                        <input
                            type="password"
                            name="password"
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                            placeholder="••••••••"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wider">
                            Şifreyi Tekrar Girin
                        </label>
                        <input
                            type="password"
                            name="confirmPassword"
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                            placeholder="••••••••"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 rounded-xl text-sm font-bold text-white bg-linear-to-r from-slate-900 to-teal-700 hover:from-slate-800 hover:to-teal-600 shadow-md hover:shadow-lg transition-all disabled:opacity-50 mt-2"
                    >
                        {loading ? "Güncelleniyor..." : "Şifreyi Değiştir"}
                    </button>

                    <p className="text-center text-sm text-slate-600 pt-2">
                        Hesabınızı hatırladınız mı?{" "}
                        <Link to="/login" className="font-semibold text-teal-600 hover:text-teal-700">
                            Giriş Yapın
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default UnutmaPage;
