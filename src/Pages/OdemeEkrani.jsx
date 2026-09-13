import { useContext, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { formatTarih } from '../data/etkinlikler';
import axios from 'axios';
import { UserContext } from '../data/Context';
import Spinner from '../Components/Spinner';

const OdemeEkrani = () => {
    const { user } = useContext(UserContext);
    const [form, setForm] = useState({ isim: '', kartNo: '', sonKullanma: '', cvc: '' });
    const [odemeBasarili, setOdemeBasarili] = useState(false);
    const [cvvOdakta, setCvvOdakta] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const location = useLocation();
    const bilet = location.state?.bilet || {};

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            await axios.post('/api/bilet-al', {
                user_id: user?.id,
                etkinlik_id: bilet.etkinlik?.id,
                adet: bilet.adet,
                koltuk: bilet.koltuklar
            });
            setOdemeBasarili(true);
        } catch (err) {
            const msg = err.response?.data?.message || 'Bilet kaydedilirken bir hata oluştu. Lütfen tekrar deneyin.';
            setError(msg);
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSonKullanmaChange = e => {
        let value = e.target.value.replace(/[^\d]/g, '');
        if (value.length > 4) value = value.slice(0, 4);
        if (value.length > 2) value = value.slice(0, 2) + '/' + value.slice(2);
        setForm(prev => ({ ...prev, sonKullanma: value }));
    };

    const handleKartNoChange = e => {
        let value = e.target.value.replace(/[^\d]/g, '');
        value = value.slice(0, 16);
        setForm(prev => ({ ...prev, kartNo: value }));
    };

    const formatKartNo = (num) => {
        return num.replace(/(.{4})/g, '$1 ').trim();
    };

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Sol: Bilet Özeti */}
                <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="text-xl">🧾</span>
                        <h3 className="text-lg font-bold text-slate-800">Sipariş Özeti</h3>
                    </div>

                    <div className="space-y-4 divide-y divide-slate-100">
                        <div className="pt-2">
                            <span className="text-xs text-slate-400 font-medium block">Etkinlik</span>
                            <span className="text-base font-bold text-slate-900">{bilet.etkinlik?.ad || "Bilinmiyor"}</span>
                        </div>

                        <div className="pt-3">
                            <span className="text-xs text-slate-400 font-medium block">Tarih & Saat</span>
                            <span className="text-sm font-semibold text-slate-700">{formatTarih(bilet.etkinlik?.tarih)}</span>
                        </div>

                        <div className="pt-3">
                            <span className="text-xs text-slate-400 font-medium block">Mekan</span>
                            <span className="text-sm font-semibold text-slate-700">{bilet.etkinlik?.mekan}</span>
                        </div>

                        <div className="pt-3">
                            <span className="text-xs text-slate-400 font-medium block">Seçilen Koltuklar</span>
                            <span className="text-sm font-semibold text-teal-700">
                                {Array.isArray(bilet.koltuklar) ? bilet.koltuklar.join(", ") : bilet.koltuklar}
                            </span>
                        </div>

                        <div className="pt-3 flex items-center justify-between">
                            <div>
                                <span className="text-xs text-slate-400 font-medium block">Bilet Adedi</span>
                                <span className="text-sm font-semibold text-slate-700">{bilet.adet} Adet</span>
                            </div>
                            <div className="text-right">
                                <span className="text-xs text-slate-400 font-medium block">Ödenecek Tutar</span>
                                <span className="text-xl font-extrabold text-teal-600">{bilet.toplamFiyat} ₺</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sağ: Kart & Ödeme Formu */}
                <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200">
                    <h2 className="text-xl font-bold text-slate-800 mb-6 text-center">💳 Güvenli Ödeme</h2>

                    {odemeBasarili ? (
                        <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-4">
                            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
                                ✓
                            </div>
                            <h3 className="text-xl font-bold text-emerald-800">Ödemeniz Başarıyla Alındı!</h3>
                            <p className="text-sm text-emerald-700 max-w-md mx-auto">
                                Biletiniz e-posta adresinize gönderilmiştir. Bilet detaylarınızı dilediğiniz zaman profil sayfanızdan inceleyebilirsiniz.
                            </p>
                            <div className="pt-2 flex justify-center gap-3">
                                <Link to="/profile" className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold shadow-sm transition-colors">
                                    Biletlerime Git
                                </Link>
                                <Link to="/" className="px-5 py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-sm font-semibold transition-colors">
                                    Anasayfaya Dön
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <>
                            {/* KART 3D FLIP */}
                            <div className="flex justify-center mb-8 overflow-hidden py-2">
                                <div className={`credit-card-3d ${cvvOdakta ? "flipped" : ""}`}>
                                    {/* Ön */}
                                    <div className="card-face front shadow-xl">
                                        <div className="chip"></div>
                                        <div className="card-number tracking-widest">{form.kartNo ? formatKartNo(form.kartNo) : "•••• •••• •••• ••••"}</div>
                                        <div className="card-footer">
                                            <div>
                                                <label>Kart Sahibi</label>
                                                <div className="font-semibold uppercase tracking-wider">{form.isim || "İSİM SOYİSİM"}</div>
                                            </div>
                                            <div>
                                                <label>SKT</label>
                                                <div className="font-semibold">{form.sonKullanma || "AA/YY"}</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Arka */}
                                    <div className="card-face back shadow-xl">
                                        <div className="black-bar"></div>
                                        <div className="cvc-area">
                                            <label>CVV</label>
                                            <div className="cvc-box">{form.cvc || "•••"}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* FORM */}
                            {error && (
                                <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm text-center">
                                    {error}
                                </div>
                            )}

                            {loading ? (
                                <Spinner message="Ödeme işleniyor, lütfen bekleyin..." />
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <label htmlFor="isim" className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">
                                            Kart Üzerindeki İsim
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                                            id="isim"
                                            name="isim"
                                            placeholder="AD SOYAD"
                                            value={form.isim}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="kartNo" className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">
                                            Kart Numarası
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                                            id="kartNo"
                                            name="kartNo"
                                            value={formatKartNo(form.kartNo)}
                                            onChange={handleKartNoChange}
                                            required
                                            maxLength={19}
                                            placeholder="1234 5678 9012 3456"
                                            autoComplete="cc-number"
                                            inputMode="numeric"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="sonKullanma" className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">
                                                Son Kullanma
                                            </label>
                                            <input
                                                type="text"
                                                pattern="^(0[1-9]|1[0-2])\/\d{2}$"
                                                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                                                id="sonKullanma"
                                                name="sonKullanma"
                                                value={form.sonKullanma}
                                                onChange={handleSonKullanmaChange}
                                                required
                                                placeholder="AA/YY"
                                                maxLength={5}
                                                autoComplete="cc-exp"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="cvc" className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">
                                                CVC / CVV
                                            </label>
                                            <input
                                                type="password"
                                                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                                                id="cvc"
                                                name="cvc"
                                                value={form.cvc}
                                                onFocus={() => setCvvOdakta(true)}
                                                onBlur={() => setCvvOdakta(false)}
                                                onChange={handleChange}
                                                required
                                                maxLength={3}
                                                placeholder="123"
                                                autoComplete="cc-csc"
                                                inputMode="numeric"
                                            />
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-slate-900 to-teal-700 hover:from-slate-800 hover:to-teal-600 shadow-md hover:shadow-lg transition-all active:scale-[0.99] mt-4"
                                    >
                                        Ödemeyi Tamamla ({bilet.toplamFiyat} ₺)
                                    </button>
                                </form>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OdemeEkrani;
