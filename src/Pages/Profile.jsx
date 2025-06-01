import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../data/Context';
import { formatTarih } from '../data/etkinlikler';

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
                .catch(err => {
                    setError('Biletler alınamadı');
                    setLoading(false);
                });
        }
    }, [user]);

    if (!user) {
        console.warn("Kullanıcı bilgisi bulunamadı. Lütfen giriş yapın.", user);
        return (
            <div className="container my-5">
                <div className="alert alert-warning text-center">
                    Lütfen giriş yapınız.
                </div>
            </div>
        );
    }

    return (
        <div className="container my-5" style={{ maxWidth: 700 }}>
            <div className="card shadow-sm p-4 mb-4">
                <div className="text-center">
                    {/* Profil resmi kaldırıldı, düzenleme kaldırıldı */}
                    <h3>Ad: {user.name || user.username || "Kullanıcı Adı Yok"}</h3>
                    <p className="text-muted">E-posta: {user.email || "E-posta Yok"}</p>
                </div>
            </div>

            {/* BİLET BİLGİLERİ */}
            <div className="card shadow-sm p-4">
                <h5 className="mb-3">🎟️ Aldığınız Biletler</h5>
                {loading ? (
                    <p className="text-muted">Yükleniyor...</p>
                ) : error ? (
                    <p className="text-danger">{error}</p>
                ) : biletler.length === 0 ? (
                    <p className="text-muted">Henüz bilet alınmamış.</p>
                ) : (
                    <ul className="list-group">
                        {biletler.map((bilet, idx) => (
                            <li key={bilet.bilet_id || idx} className="list-group-item d-flex justify-content-between align-items-center">
                                <div>
                                    <strong>{bilet.ad}</strong> <br />
                                    <small>{formatTarih(bilet.tarih)} - {bilet.mekan}</small>
                                </div>
                                <span className="badge bg-primary rounded-pill ms-auto mx-1">{bilet.adet} adet</span>
                                <span className="badge bg-primary rounded-pill">Koltuk(lar): {bilet.koltuk}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Profile;
