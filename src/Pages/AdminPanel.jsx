import axios from "axios";
import { useContext, useState } from "react";
import { EtkinliklerContext } from "../data/Context";
import { formatTarih } from "../data/etkinlikler";

const AdminPanel = () => {
  const [form, setForm] = useState({
    ad: "",
    kategori: "",
    tarih: "",
    mekan: "",
    aciklama: "",
    img: "",
    fiyat: "",
  });

  const { etkinlikler, setEtkinlikler } = useContext(EtkinliklerContext);

  // Sayfalama için state
  const [currentPage, setCurrentPage] = useState(1);
  const etkinliklerPerPage = 8;
  const totalPages = Math.max(1, Math.ceil(etkinlikler.length / etkinliklerPerPage));
  const etkinliklerToShow = etkinlikler.slice(
    (currentPage - 1) * etkinliklerPerPage,
    currentPage * etkinliklerPerPage
  );

  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({
    ad: "",
    kategori: "",
    tarih: "",
    mekan: "",
    aciklama: "",
    img: "",
    fiyat: "",
  });

  const kategoriMap = {
    konser: "konserler",
    tiyatro: "tiyatrolar",
    sinema: "sinemalar",
    spor: "sporlar",
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/etkinlik-ekle", form);
      const data = response.data?.etkinlikler || response.data;
      const etkinliklerArr = Array.isArray(data) ? data : [data];
      const normalized = etkinliklerArr.map((e) => ({
        ...e,
        kategori: kategoriMap[e.kategori] || e.kategori,
      }));
      setEtkinlikler(normalized);
      setForm({
        ad: "",
        kategori: "",
        tarih: "",
        mekan: "",
        aciklama: "",
        img: "",
        fiyat: "",
      });
      alert("Etkinlik başarıyla eklendi!");
    } catch (err) {
      console.error("Etkinlik eklenirken hata oluştu:", err);
      alert("Etkinlik eklenirken hata oluştu!");
    }
  };

  const handleDelete = async (index) => {
    const onay = window.confirm("Etkinliği silmek istediğinize emin misiniz?");
    if (onay) {
      try {
        const target = etkinlikler[index];
        if (!target) return;
        const response = await axios.delete(`/api/etkinlik-sil/${target.id}`);
        const data = response.data?.etkinlikler || response.data;
        const etkinliklerArr = Array.isArray(data) ? data : etkinlikler.filter((_, i) => i !== index);
        const normalized = etkinliklerArr.map((e) => ({
          ...e,
          kategori: kategoriMap[e.kategori] || e.kategori,
        }));
        setEtkinlikler(normalized);
      } catch (err) {
        console.error("Etkinlik silinirken hata oluştu:", err);
        // Local fallback
        setEtkinlikler((prev) => prev.filter((_, i) => i !== index));
      }
    }
  };

  const handleEditClick = (index) => {
    const selected = etkinliklerToShow[index];
    if (!selected) return;
    setEditId(selected.id);
    let kategori = selected.kategori ? selected.kategori.toString().trim().toLowerCase() : "";
    let tarih = selected.tarih ? selected.tarih.slice(0, 10) : "";
    setEditForm({
      ...selected,
      kategori,
      tarih,
    });
    setShowModal(true);
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!editId) throw new Error("Etkinlik ID bulunamadı!");
      const response = await axios.put(`/api/etkinlik-guncelle/${editId}`, editForm);
      const data = response.data?.etkinlikler || response.data;
      const etkinliklerArr = Array.isArray(data)
        ? data
        : etkinlikler.map((item) => (item.id === editId ? { ...item, ...editForm } : item));
      const normalized = etkinliklerArr.map((e) => ({
        ...e,
        kategori: kategoriMap[e.kategori] || e.kategori,
      }));
      setEtkinlikler(normalized);
      setShowModal(false);
      setEditId(null);
      alert("Etkinlik başarıyla güncellendi!");
    } catch (err) {
      console.error("Etkinlik güncellenirken hata oluştu:", err);
      // Local fallback
      setEtkinlikler((prev) =>
        prev.map((item) => (item.id === editId ? { ...item, ...editForm } : item))
      );
      setShowModal(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 flex items-center gap-2">
            <span>🎛️</span> Yönetim Paneli
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Etkinlikleri ekleyin, düzenleyin veya kaldırın.
          </p>
        </div>
        <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-teal-100 text-teal-800">
          Toplam: {etkinlikler.length} Etkinlik
        </span>
      </div>

      {/* Etkinlik Ekleme Formu */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200">
        <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
          <span>➕</span> Yeni Etkinlik Ekle
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
            <div className="sm:col-span-8">
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">
                Etkinlik Adı
              </label>
              <input
                type="text"
                name="ad"
                value={form.ad}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                placeholder="Örn: Tarkan Harbiye Açıkhava Konseri"
                required
              />
            </div>

            <div className="sm:col-span-4">
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">
                Kategori
              </label>
              <select
                name="kategori"
                value={form.kategori}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                required
              >
                <option value="">Tür Seçin</option>
                <option value="tiyatrolar">🎭 Tiyatro</option>
                <option value="konserler">🎵 Konser</option>
                <option value="sinemalar">🎬 Sinema</option>
                <option value="sporlar">🏟️ Spor</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">
                Tarih
              </label>
              <input
                type="date"
                name="tarih"
                value={form.tarih}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">
                Mekan
              </label>
              <input
                type="text"
                name="mekan"
                value={form.mekan}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                placeholder="Örn: Harbiye Cemil Topuzlu"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">
                Bilet Fiyatı (₺)
              </label>
              <input
                type="number"
                name="fiyat"
                value={form.fiyat}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                placeholder="Örn: 250"
                min="0"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">
              Görsel Bağlantısı (URL)
            </label>
            <input
              type="text"
              name="img"
              value={form.img}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
              placeholder="Örn: /images/konser1.jpg veya https://..."
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">
              Etkinlik Açıklaması
            </label>
            <textarea
              name="aciklama"
              value={form.aciklama}
              onChange={handleChange}
              rows="3"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
              placeholder="Etkinlik hakkında detaylı bilgi yazın..."
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-slate-900 to-teal-700 hover:from-slate-800 hover:to-teal-600 shadow-md hover:shadow-lg transition-all active:scale-[0.99]"
          >
            Etkinliği Ekle
          </button>
        </form>
      </div>

      {/* Etkinlikler Listesi & Sayfalama */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <span>📋</span> Mevcut Etkinlikler ({etkinlikler.length})
          </h2>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center gap-1 self-end sm:self-auto">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-2.5 py-1 text-xs font-medium rounded-lg border border-slate-200 disabled:opacity-30 hover:bg-slate-100 transition-colors"
              >
                &laquo;
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
                    currentPage === i + 1
                      ? "bg-teal-600 text-white"
                      : "border border-slate-200 hover:bg-slate-100 text-slate-700"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-2.5 py-1 text-xs font-medium rounded-lg border border-slate-200 disabled:opacity-30 hover:bg-slate-100 transition-colors"
              >
                &raquo;
              </button>
            </div>
          )}
        </div>

        <div className="divide-y divide-slate-100">
          {etkinliklerToShow.map((e, index) => {
            const globalIndex = index + (currentPage - 1) * etkinliklerPerPage;
            return (
              <div
                key={e.id || globalIndex}
                className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/70 p-2 rounded-xl transition-colors"
              >
                <div className="flex items-center gap-4">
                  {e.img && (
                    <img
                      src={e.img}
                      alt={e.ad}
                      className="w-14 h-14 rounded-xl object-cover border border-slate-200 flex-shrink-0"
                    />
                  )}
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-slate-900 text-sm sm:text-base">{e.ad}</h3>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-slate-100 text-slate-600 border border-slate-200">
                        {e.kategori}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      📅 {formatTarih(e.tarih)} • 📍 {e.mekan} • 💰 {e.fiyat} ₺
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <button
                    onClick={() => handleEditClick(index)}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-teal-50 hover:bg-teal-100 text-teal-700 border border-teal-200 transition-colors"
                  >
                    ✏️ Düzenle
                  </button>
                  <button
                    onClick={() => handleDelete(globalIndex)}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 transition-colors"
                  >
                    🗑️ Sil
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Düzenleme Modalı (Pure React + Tailwind) */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-xl p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="text-lg font-bold text-slate-900">Etkinlik Düzenle</h3>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center text-sm font-bold transition-colors"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                  Etkinlik Adı
                </label>
                <input
                  type="text"
                  name="ad"
                  value={editForm.ad}
                  onChange={handleEditChange}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                    Kategori
                  </label>
                  <select
                    name="kategori"
                    value={editForm.kategori}
                    onChange={handleEditChange}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                    required
                  >
                    <option value="">Tür Seçin</option>
                    <option value="tiyatrolar">🎭 Tiyatro</option>
                    <option value="konserler">🎵 Konser</option>
                    <option value="sinemalar">🎬 Sinema</option>
                    <option value="sporlar">🏟️ Spor</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                    Tarih
                  </label>
                  <input
                    type="date"
                    name="tarih"
                    value={editForm.tarih}
                    onChange={handleEditChange}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                    Mekan
                  </label>
                  <input
                    type="text"
                    name="mekan"
                    value={editForm.mekan}
                    onChange={handleEditChange}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                    Fiyat (₺)
                  </label>
                  <input
                    type="number"
                    name="fiyat"
                    value={editForm.fiyat}
                    onChange={handleEditChange}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                    min="0"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                  Resim URL
                </label>
                <input
                  type="text"
                  name="img"
                  value={editForm.img}
                  onChange={handleEditChange}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                  Açıklama
                </label>
                <textarea
                  name="aciklama"
                  value={editForm.aciklama}
                  onChange={handleEditChange}
                  rows="3"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                >
                  Vazgeç
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-semibold bg-teal-600 hover:bg-teal-700 text-white transition-colors"
                >
                  Kaydet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;


