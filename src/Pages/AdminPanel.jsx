import React, { useState } from "react";
import { formatTarih } from '../data/etkinlikler';

const başlangıçEtkinlikleri = [
    {
        ad: "Mor Komedyen",
        kategori: "Tiyatro",
        tarih: "2025-06-20",
        mekan: "Zorlu PSM",
        aciklama: "Sınırsız kahkaha!",
        resim: "/images/tiyatro3.jpg"
    },
    {
        ad: "1923 Müzikali",
        kategori: "Müzikal",
        tarih: "2025-07-10",
        mekan: "Atatürk Kültür Merkezi",
        aciklama: "Cumhuriyet’in 100. yılına özel.",
        resim: "/images/tiyatro9.jpg"
    }
];

const AdminPanel = () =>
{
    const [form, setForm] = useState({
        ad: "",
        kategori: "",
        tarih: "",
        mekan: "",
        aciklama: "",
        resim: ""
    });

    const [etkinlikler, setEtkinlikler] = useState(başlangıçEtkinlikleri);

    const handleChange = (e) =>
    {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) =>
    {
        e.preventDefault();
        setEtkinlikler((prev) => [...prev, form]);
        setForm({
            ad: "",
            kategori: "",
            tarih: "",
            mekan: "",
            aciklama: "",
            resim: ""
        });
    };

    const handleDelete = (index) =>
    {
        const onay = window.confirm("Etkinliği silmek istediğine emin misin?");
        if (onay)
        {
            setEtkinlikler(etkinlikler.filter((_, i) => i !== index));
        }
    };

    return (
        <div className="container my-5">
            <h2 className="text-center fw-bold mb-4">🎛️ Admin Panel</h2>

            <form onSubmit={handleSubmit} className="border rounded p-4 shadow-sm bg-light">
                <div className="mb-3 d-flex gap-2 align-items-center">
                    <input
                        type="text"
                        name="ad"
                        value={form.ad}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Etkinlik Adı"
                        style={{ maxWidth: "60%" }}
                        required
                    />

                    <select
                        name="kategori"
                        value={form.kategori}
                        onChange={handleChange}
                        className="form-select"
                        style={{ fontSize: "1rem", fontWeight: "500", maxWidth: "40%" }}
                        required
                    >
                        <option value="">🎯 Tür Seçin</option>
                        <option value="Tiyatro">🎭 Tiyatro</option>
                        <option value="Konser">🎵 Konser</option>
                        <option value="Sinema">🎬 Sinema</option>
                        <option value="Spor">🏟️ Spor</option>
                    </select>
                </div>

                <div className="mb-3">
                    <input
                        type="date"
                        name="tarih"
                        value={form.tarih}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>

                <div className="mb-3">
                    <input
                        type="text"
                        name="mekan"
                        value={form.mekan}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Mekan"
                        required
                    />
                </div>

                <div className="mb-3">
                    <textarea
                        name="aciklama"
                        value={form.aciklama}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Etkinlik Açıklaması"
                        rows="3"
                        required
                    />
                </div>

                <div className="mb-3">
                    <input
                        type="text"
                        name="resim"
                        value={form.resim}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Resim URL (veya /images/tiyatro1.jpg gibi)"
                        required
                    />
                </div>

                <div className="d-grid">
                    <button type="submit" className="btn btn-primary">Etkinliği Ekle</button>
                </div>
            </form>

            {/* Önizleme */}
            {etkinlikler.length > 0 && (
                <div className="mt-5">
                    <h4 className="text-center">🎯 Eklenen Etkinlikler</h4>
                    <ul className="list-group">
                        {etkinlikler.map((e, index) => (
                            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                <div>
                                    <strong>{e.ad}</strong> ({e.kategori}) - {formatTarih(e.tarih)} <br />
                                    <small className="text-muted">{e.mekan}</small>
                                </div>
                                <button
                                    onClick={() => handleDelete(index)}
                                    className="btn btn-sm btn-outline-danger"
                                >
                                    🗑️ Sil
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default AdminPanel;


