import React, { useState } from 'react';

const Profile = () =>
{
    const [user, setUser] = useState({
        name: 'Mehmet Yılmaz',
        email: 'mehmetyilmaz@example.com',
        avatar: 'https://i.pravatar.cc/150?img=3',
        bio: 'Frontend geliştirici. React ve JavaScript tutkunu.'
    });

    const [biletler] = useState([
        { etkinlik: 'Aydınlıkevler', tarih: '18 Haziran 2025', mekan: 'Maximum UNIQ Hall', adet: 2 },
        { etkinlik: 'Mor Komedyen Stand Up', tarih: '20 Haziran 2025', mekan: 'BKM Tiyatro', adet: 1 }
    ]);

    const [editing, setEditing] = useState(false);
    const [formData, setFormData] = useState({ ...user });

    const handleChange = (e) =>
    {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () =>
    {
        setUser(formData);
        setEditing(false);
    };

    return (
        <div className="container my-5" style={{ maxWidth: 700 }}>
            <div className="card shadow-sm p-4 mb-4">
                <div className="text-center">
                    <img
                        src={user.avatar}
                        alt="Profil"
                        style={{ width: 100, height: 100, borderRadius: '50%', marginBottom: 16 }}
                    />

                    {!editing ? (
                        <>
                            <h3>{user.name}</h3>
                            <p className="text-muted">{user.email}</p>
                            <p>{user.bio}</p>
                            <button className="btn btn-primary btn-sm" onClick={() => setEditing(true)}>Profili Düzenle</button>
                        </>
                    ) : (
                        <>
                            <input
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="form-control mb-2"
                                placeholder="Ad Soyad"
                            />
                            <input
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="form-control mb-2"
                                placeholder="E-posta"
                            />
                            <textarea
                                name="bio"
                                value={formData.bio}
                                onChange={handleChange}
                                className="form-control mb-2"
                                placeholder="Kısa Biyografi"
                            />
                            <input
                                name="avatar"
                                value={formData.avatar}
                                onChange={handleChange}
                                className="form-control mb-2"
                                placeholder="Profil Fotoğrafı URL"
                            />
                            <div className="d-flex justify-content-center gap-2 mt-2">
                                <button className="btn btn-success btn-sm" onClick={handleSave}>Kaydet</button>
                                <button className="btn btn-secondary btn-sm" onClick={() => setEditing(false)}>İptal</button>
                            </div>
                        </>
                    )}
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
