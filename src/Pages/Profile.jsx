import { useContext } from 'react';
import { UserContext } from '../data/Context';

const Profile = () => {
    const { user } = useContext(UserContext);

    // Eğer user yoksa (giriş yapılmamışsa) yönlendirme veya uyarı ekleyebilirsiniz
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

    // Biletler kısmı örnek olarak boş bırakıldı, backend ile entegre edebilirsiniz
    const biletler = [];

    return (
        <div className="container my-5" style={{ maxWidth: 700 }}>
            <div className="card shadow-sm p-4 mb-4">
                <div className="text-center">
                    {/* Profil resmi kaldırıldı, düzenleme kaldırıldı */}
                    <h3>{user.name || user.username || "Kullanıcı Adı Yok"}</h3>
                    <p className="text-muted">{user.email || "E-posta Yok"}</p>
                </div>
            </div>

            {/* BİLET BİLGİLERİ */}
            <div className="card shadow-sm p-4">
                <h5 className="mb-3">🎟️ Aldığınız Biletler</h5>
                {biletler.length === 0 ? (
                    <p className="text-muted">Henüz bilet alınmamış.</p>
                ) : (
                    <ul className="list-group">
                        {biletler.map((bilet, idx) => (
                            <li key={idx} className="list-group-item d-flex justify-content-between align-items-center">
                                <div>
                                    <strong>{bilet.etkinlik}</strong> <br />
                                    <small>{bilet.tarih} - {bilet.mekan}</small>
                                </div>
                                <span className="badge bg-primary rounded-pill">{bilet.adet} adet</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Profile;
