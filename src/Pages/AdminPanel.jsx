import axios from "axios";
import { useContext, useState } from "react";
import { EtkinliklerContext } from "../data/Context";
import { formatTarih } from '../data/etkinlikler';


const AdminPanel = () =>
{
    const [form, setForm] = useState({
        ad: "",
        kategori: "",
        tarih: "",
        mekan: "",
        aciklama: "",
        img: "",
        fiyat: ""
    });

    const {etkinlikler, setEtkinlikler} = useContext(EtkinliklerContext);

    // Sayfalama için state
    const [currentPage, setCurrentPage] = useState(1);
    const etkinliklerPerPage = 8;
    const totalPages = Math.ceil(etkinlikler.length / etkinliklerPerPage);
    const etkinliklerToShow = etkinlikler.slice((currentPage - 1) * etkinliklerPerPage, currentPage * etkinliklerPerPage);

    const [showModal, setShowModal] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const [editId, setEditId] = useState(null);
    const [editForm, setEditForm] = useState({
        ad: "",
        kategori: "",
        tarih: "",
        mekan: "",
        aciklama: "",
        img: "",
        fiyat: ""
    });

    // Kategori çoğul karşılıkları
    const kategoriMap = {
        "konser": "konserler",
        "tiyatro": "tiyatrolar",
        "sinema": "sinemalar",
        "spor": "sporlar"
    };

    const handleChange = (e) =>
    {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) =>
    {
        e.preventDefault();
        try {
            const response = await axios.post('/api/etkinlik-ekle', form);
            // response.data array değilse diziye çevir
            const etkinliklerArr = Array.isArray(response.data) ? response.data : [response.data];
            const normalized = etkinliklerArr.map(e => ({
                ...e,
                kategori: kategoriMap[e.kategori] || e.kategori
            }));
            setEtkinlikler(normalized);
            setForm({
                ad: "",
                kategori: "",
                tarih: "",
                mekan: "",
                aciklama: "",
                img: "",
                fiyat: ""
            });
        } catch (err) {
            console.error('Etkinlik eklenirken hata oluştu:', err);
            alert('Etkinlik eklenirken hata oluştu!');
        }
    };

    const handleDelete = async (index) => {
        const onay = window.confirm("Etkinliği silmek istediğine emin misin?");
        if (onay) {
            try {
                const etkinlikId = etkinlikler[index].id;
                const response = await axios.delete(`/api/etkinlik-sil/${etkinlikId}`);
                const etkinliklerArr = Array.isArray(response.data) ? response.data : [response.data];
                const normalized = etkinliklerArr.map(e => ({
                    ...e,
                    kategori: kategoriMap[e.kategori] || e.kategori
                }));
                setEtkinlikler(normalized);
            } catch (err) {
                console.error('Etkinlik silinirken hata oluştu:', err);
                alert('Etkinlik silinirken hata oluştu!');
            }
        }
    };

    const handleEditClick = (index) => {
        const globalIndex = index + (currentPage-1)*etkinliklerPerPage;
        setEditIndex(globalIndex);
        const selected = etkinliklerToShow[index];
        setEditId(selected.id); // id'yi ayrı tut
        // Kategori değerini normalize et
        let kategori = selected.kategori ? selected.kategori.toString().trim().toLowerCase() : "";
        const validKategoriler = ["tiyatro", "konser", "sinema", "spor"];
        if (!validKategoriler.includes(kategori)) kategori = "";
        // ISO formatı (YYYY-MM-DDTHH:mm:ss.sssZ) -> input type="date" için YYYY-MM-DD
        let tarih = selected.tarih ? selected.tarih.slice(0,10) : "";
        setEditForm({
            ...selected,
            kategori,
            tarih
        });
        setShowModal(true);
    };

    const handleEditChange = (e) =>
    {
        setEditForm({ ...editForm, [e.target.name]: e.target.value });
    };

    const handleEditSubmit = async (e) =>
    {
        e.preventDefault();
        try {
            if (!editId) throw new Error('Etkinlik id bulunamadı!');
            const response = await axios.put(`/api/etkinlik-duzenle/${editId}`, editForm);
            const etkinliklerArr = Array.isArray(response.data) ? response.data : [response.data];
            const normalized = etkinliklerArr.map(e => ({
                ...e,
                kategori: kategoriMap[e.kategori] || e.kategori
            }));
            setEtkinlikler(normalized);
            setShowModal(false);
            setEditId(null);
            setEditIndex(null);
        } catch (err) {
            console.error('Etkinlik güncellenirken hata oluştu:', err);
            alert('Etkinlik güncellenirken hata oluştu!');
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
                        <option value="tiyatrolar">🎭 Tiyatro</option>
                        <option value="konserler">🎵 Konser</option>
                        <option value="sinemalar">🎬 Sinema</option>
                        <option value="sporlar">🏟️ Spor</option>
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
                        name="img"
                        value={form.img}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Resim URL (veya /images/tiyatro1.jpg gibi)"
                        required
                    />
                </div>

                <div className="mb-3">
                    <input
                        type="number"
                        name="fiyat"
                        value={form.fiyat}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Fiyat (₺)"
                        min="0"
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
                    <h4 className="text-center">🎯 Etkinlikler</h4>
                    {/* Sayfalama butonları */}
                    <div className="d-flex justify-content-end align-items-center mb-2">
                        <nav>
                            <ul className="pagination mb-0">
                                <li className={`page-item${currentPage === 1 ? ' disabled' : ''}`}>
                                    <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>&laquo;</button>
                                </li>
                                {Array.from({length: totalPages}, (_, i) => (
                                    <li key={i} className={`page-item${currentPage === i+1 ? ' active' : ''}`}>
                                        <button className="page-link" onClick={() => setCurrentPage(i+1)}>{i+1}</button>
                                    </li>
                                ))}
                                <li className={`page-item${currentPage === totalPages ? ' disabled' : ''}`}>
                                    <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>&raquo;</button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <ul className="list-group">
                        {etkinliklerToShow.map((e, index) => (
                            <li key={index + (currentPage-1)*etkinliklerPerPage} className="list-group-item d-flex justify-content-between align-items-center">
                                <div>
                                    <strong>{e.ad}</strong> ({e.kategori}) - {formatTarih(e.tarih)} <br />
                                    <small className="text-muted">{e.mekan}</small>
                                </div>
                                <div className="ms-auto d-flex gap-2">
                                    <button
                                        onClick={() => handleDelete(index + (currentPage-1)*etkinliklerPerPage)}
                                        className="btn btn-sm btn-outline-danger"
                                    >
                                        🗑️ Sil
                                    </button>
                                    <button
                                        onClick={() => handleEditClick(index)}
                                        className="btn btn-sm btn-outline-primary"
                                    >
                                        ✏️ Düzenle
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Modal for editing */}
            {showModal && (
                <div className="modal fade show d-block" tabIndex="-1" style={{background: 'rgba(0,0,0,0.4)'}}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Etkinlik Düzenle</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                            </div>
                            <form onSubmit={handleEditSubmit}>
                                <div className="modal-body">
                                    <input type="text" name="ad" value={editForm.ad} onChange={handleEditChange} className="form-control mb-2" placeholder="Etkinlik Adı" required />
                                    <select name="kategori" value={editForm.kategori} onChange={handleEditChange} className="form-select mb-2" required>
                                        <option value="">🎯 Tür Seçin</option>
                                        <option value="tiyatro">🎭 Tiyatro</option>
                                        <option value="konser">🎵 Konser</option>
                                        <option value="sinema">🎬 Sinema</option>
                                        <option value="spor">🏟️ Spor</option>
                                    </select>
                                    <input type="date" name="tarih" value={editForm.tarih} onChange={handleEditChange} className="form-control mb-2" required />
                                    <input type="text" name="mekan" value={editForm.mekan} onChange={handleEditChange} className="form-control mb-2" placeholder="Mekan" required />
                                    <textarea name="aciklama" value={editForm.aciklama} onChange={handleEditChange} className="form-control mb-2" placeholder="Etkinlik Açıklaması" rows="3" required />
                                    <input type="text" name="img" value={editForm.img} onChange={handleEditChange} className="form-control mb-2" placeholder="Resim URL (veya /images/tiyatro1.jpg gibi)" required />
                                    <input type="number" name="fiyat" value={editForm.fiyat} onChange={handleEditChange} className="form-control mb-2" placeholder="Fiyat (₺)" min="0" required />
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Vazgeç</button>
                                    <button type="submit" className="btn btn-primary">Kaydet</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminPanel;


