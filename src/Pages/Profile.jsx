import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { UserContext } from '../data/Context';
import { formatTarih } from '../data/etkinlikler';
import Spinner from '../Components/Spinner';

const Profile = () => {
    const { user } = useContext(UserContext);
    const [biletler, setBiletler] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (user?.id) {
            axios.get(`/api/kullanici-biletleri/${user.id}`)
                .then(res => {
                    setBiletler(res.data.biletler || []);
                    setLoading(false);
                })
                .catch(() => {
                    setError('Biletler alınamadı.');
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, [user]);

    if (!user) {
        return (
            <div className="max-w-md mx-auto px-4 py-16 text-center">
                <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 space-y-4">
                    <span className="text-4xl block">🔒</span>
                    <h2 className="text-xl font-bold text-slate-800">Giriş Yapmalısınız</h2>
                    <p className="text-sm text-slate-500">Profilinizi ve biletlerinizi görüntülemek için lütfen giriş yapın.</p>
                    <Link to="/login" className="inline-block px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-sm transition-colors">
                        Giriş Yap
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
            {/* Profil Bilgisi */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-slate-800 to-teal-600 text-white flex items-center justify-center text-3xl font-bold shadow-md">
                    {(user.name || user.username || user.email || "U")[0].toUpperCase()}
                </div>
                <div className="text-center sm:text-left flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                        <h1 className="text-2xl font-bold text-slate-900">{user.name || user.username || "Kullanıcı"}</h1>
                        {user.role === "admin" && (
                            <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200">
                                Yönetici
                            </span>
                        )}
                    </div>
                    <p className="text-sm text-slate-500 mt-1">{user.email || "E-posta bulunamadı"}</p>
                </div>
            </div>

            {/* Bilet Bilgileri */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 sm:p-8">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                    <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                        <span>🎟️</span> Biletlerim
                    </h2>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                        {biletler.length} Adet Bilet
                    </span>
                </div>

                {loading ? (
                    <Spinner message="Biletleriniz yükleniyor..." />
                ) : error ? (
                    <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-sm text-center">
                        {error}
                    </div>
                ) : biletler.length === 0 ? (
                    <div className="text-center py-12 space-y-3">
                        <span className="text-4xl block text-slate-300">🎫</span>
                        <p className="text-slate-600 font-medium">Henüz satın alınmış biletiniz bulunmuyor.</p>
                        <Link to="/" className="inline-block px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold transition-colors">
                            Etkinlikleri Keşfet
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {biletler.map((bilet, idx) => (
                            <div
                                key={bilet.bilet_id || idx}
                                className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 hover:border-teal-200 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                            >
                                <div className="space-y-1">
                                    <h3 className="font-bold text-base text-slate-900">{bilet.ad}</h3>
                                    <p className="text-xs text-slate-500">
                                        📅 {formatTarih(bilet.tarih)} • 📍 {bilet.mekan}
                                    </p>
                                </div>
                                <div className="flex flex-wrap items-center gap-2">
                                    <span className="px-3 py-1 rounded-lg text-xs font-bold bg-teal-100 text-teal-800 border border-teal-200">
                                        {bilet.adet} Adet
                                    </span>
                                    <span className="px-3 py-1 rounded-lg text-xs font-bold bg-slate-200 text-slate-700 border border-slate-300">
                                        Koltuk: {bilet.koltuk}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
