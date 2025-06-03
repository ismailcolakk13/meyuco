import { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { formatTarih } from '../data/etkinlikler';
import axios from 'axios';
import { UserContext } from '../data/Context';
import Spinner from '../Components/Spinner';

const OdemeEkrani = () =>
{
    const { user } = useContext(UserContext);
    const [form, setForm] = useState({ isim: '', kartNo: '', sonKullanma: '', cvc: '' });
    const [odemeBasarili, setOdemeBasarili] = useState(false);
    const [cvvOdakta, setCvvOdakta] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const location = useLocation();
    const bilet = location.state?.bilet || {};

    const handleChange = e =>
    {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) =>
    {
        e.preventDefault();
        setLoading(true);
        setError("");
        try
        {
            // Bilet bilgisini backend'e gönder
            await axios.post('/api/bilet-al', { user_id: user.id, etkinlik_id: bilet.etkinlik?.id, adet: bilet.adet, koltuk: Array.isArray(bilet.koltuklar) ? bilet.koltuklar.join(", ") : bilet.koltuklar });
            setOdemeBasarili(true);
        } catch (err)
        {
            const msg = err.response?.data?.message || 'Bilet kaydedilirken bir hata oluştu. Lütfen tekrar deneyin.';
            setError(msg);
            console.error(err);
        } finally
        {
            setLoading(false);
        }
    };

    const handleSonKullanmaChange = e =>
    {
        let value = e.target.value.replace(/[^\d]/g, '');
        if (value.length > 4) value = value.slice(0, 4);
        if (value.length > 2) value = value.slice(0, 2) + '/' + value.slice(2);
        setForm(prev => ({ ...prev, sonKullanma: value }));
    };

    const handleKartNoChange = e =>
    {
        let value = e.target.value.replace(/[^\d]/g, '');
        value = value.slice(0, 16);
        setForm(prev => ({ ...prev, kartNo: value }));
    };

    const formatKartNo = (num) =>
    {
        return num.replace(/(.{4})/g, '$1 ').trim();
    };

    return (
        <div className="container py-5" style={{ minHeight: 500 }}>
            <div className="row justify-content-center align-items-center">
                <div className="col-12 col-md-5 mb-4 mb-md-0">
                    <div className="card shadow-sm p-4 bg-light">
                        <h4 className="mb-3 text-success">Bilet Bilgileri</h4>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item"><strong>Etkinlik:</strong> {bilet.etkinlik?.ad}</li>
                            <li className="list-group-item"><strong>Tarih:</strong> {formatTarih(bilet.etkinlik?.tarih)}</li>
                            <li className="list-group-item"><strong>Mekan:</strong> {bilet.etkinlik?.mekan}</li>
                            <li className="list-group-item"><strong>Koltuk:</strong> {Array.isArray(bilet.koltuklar) ? bilet.koltuklar.join(", ") : bilet.koltuklar}</li>
                            <li className="list-group-item"><strong>Adet:</strong> {bilet.adet}</li>
                            <li className="list-group-item"><strong>Fiyat:</strong> {bilet.toplamFiyat} ₺</li>
                        </ul>
                    </div>
                </div>

                <div className="col-12 col-md-7 col-lg-5">
                    <div className="card shadow-sm p-4">
                        <h2 className="mb-4 text-center">Ödeme Bilgileri</h2>
                        {odemeBasarili ? (
                            <div className="alert alert-success text-center">
                                Ödemeniz başarıyla alındı! Biletiniz e-posta adresinize gönderilecektir. Profilinizde de görüntüleyebilirsiniz.
                            </div>
                        ) : (
                            <>
                                {/* KART 3D */}
                                <div className="custom-card-container mb-4">
                                    <div className={`credit-card-3d ${cvvOdakta ? "flipped" : ""}`}>
                                        {/* Ön */}
                                        <div className="card-face front">
                                            <div className="chip"></div>
                                            <div className="card-number">{form.kartNo ? formatKartNo(form.kartNo) : "•••• •••• •••• ••••"}</div>
                                            <div className="card-footer">
                                                <div>
                                                    <label>Kart Sahibi</label>
                                                    <div>{form.isim || "İSİM SOYİSİM"}</div>
                                                </div>
                                                <div>
                                                    <label>SKT</label>
                                                    <div>{form.sonKullanma || "AA/YY"}</div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Arka */}
                                        <div className="card-face back">
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
                                    <div className="alert alert-danger text-center">{error}</div>
                                )}
                                {loading ? (
                                    <Spinner message="Ödeme işleniyor..." />
                                ) : (
                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-3">
                                            <label htmlFor="isim" className="form-label">Kart Üzerindeki İsim</label>
                                            <input type="text" className="form-control" id="isim" name="isim" value={form.isim} onChange={handleChange} required />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="kartNo" className="form-label">Kart Numarası</label>
                                            <input type="text" className="form-control" id="kartNo" name="kartNo" value={formatKartNo(form.kartNo)} onChange={handleKartNoChange} required maxLength={19} placeholder="1234 5678 9012 3456" autoComplete="cc-number" inputMode="numeric" />
                                        </div>
                                        <div className="row mb-3">
                                            <div className="col">
                                                <label htmlFor="sonKullanma" className="form-label">Son Kullanma</label>
                                                <input
                                                    type="text"
                                                    pattern="^(0[1-9]|1[0-2])\/\d{2}$"
                                                    className="form-control"
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
                                            <div className="col">
                                                <label htmlFor="cvc" className="form-label">CVC</label>
                                                <input
                                                    type="password"
                                                    className="form-control"
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
                                            className="text-white border-0 w-100"
                                            style={{
                                                background: "linear-gradient(135deg, #1C2D41, #18B38C)",
                                                padding: "10px",
                                                borderRadius: "5px",
                                                fontWeight: "bold"
                                            }}
                                        >
                                            Ödemeyi Tamamla
                                        </button>

                                    </form>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OdemeEkrani;
