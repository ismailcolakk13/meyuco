import { useContext, useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { EtkinliklerContext, UserContext } from "../data/Context";
import axios from "axios";
import Spinner from "../Components/Spinner";

// Koltuk seçimi bileşeni
const SeatSelection = ({ selectedSeats, setSelectedSeats, adet, doluKoltuklar }) => {
  const rows = ["A", "B", "C", "D", "E", "F"];
  const cols = 10;

  const toggleSeat = (seatId) => {
    if (doluKoltuklar.includes(seatId)) return;
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats((prev) => prev.filter((s) => s !== seatId));
    } else {
      if (selectedSeats.length >= adet) {
        alert(`En fazla ${adet} koltuk seçebilirsiniz.`);
        return;
      }
      setSelectedSeats((prev) => [...prev, seatId]);
    }
  };

  return (
    <div className="flex flex-col items-center my-4 select-none">
      {/* Sahne / Perde */}
      <div className="w-full max-w-sm mb-6 flex flex-col items-center">
        <div className="w-4/5 h-2 rounded-full bg-gradient-to-r from-slate-300 via-teal-500 to-slate-300 shadow-sm" />
        <span className="text-[11px] font-bold text-slate-400 tracking-widest uppercase mt-1">SAHNE / PERDE</span>
      </div>

      {/* Koltuk Matrisi */}
      <div className="space-y-2 overflow-x-auto pb-2 max-w-full">
        {rows.map((row) => (
          <div key={row} className="flex items-center justify-center gap-1.5 sm:gap-2">
            <span className="w-4 text-xs font-bold text-slate-400 text-right mr-1">{row}</span>
            {Array.from({ length: cols }).map((_, i) => {
              const seatId = `${row}${i + 1}`;
              const isSelected = selectedSeats.includes(seatId);
              const isFull = doluKoltuklar.includes(seatId);

              let seatClass = "bg-slate-200 text-slate-700 hover:bg-slate-300 border-slate-300";
              if (isFull) {
                seatClass = "bg-rose-100 text-rose-400 border-rose-200 cursor-not-allowed opacity-60";
              } else if (isSelected) {
                seatClass = "bg-teal-600 text-white border-teal-700 ring-2 ring-teal-300 font-bold scale-105";
              }

              return (
                <button
                  type="button"
                  key={seatId}
                  disabled={isFull}
                  onClick={() => toggleSeat(seatId)}
                  title={isFull ? `Dolu Koltuk (${seatId})` : `Koltuk ${seatId}`}
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg border text-xs flex items-center justify-center font-medium transition-all ${seatClass}`}
                >
                  {i + 1}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Lejant / Açıklamalar */}
      <div className="flex items-center justify-center gap-6 mt-6 text-xs text-slate-600">
        <div className="flex items-center gap-1.5">
          <div className="w-3.5 h-3.5 rounded bg-slate-200 border border-slate-300" />
          <span>Boş</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3.5 h-3.5 rounded bg-teal-600 border border-teal-700" />
          <span>Seçili</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3.5 h-3.5 rounded bg-rose-100 border border-rose-200" />
          <span>Dolu</span>
        </div>
      </div>
    </div>
  );
};

// Ana Bilet Satın Al Sayfası
const BiletSatinalPage = () => {
  const { id } = useParams();
  const { etkinlikler } = useContext(EtkinliklerContext);
  const { user } = useContext(UserContext);
  const [adet, setAdet] = useState(1);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [doluKoltuklar, setDoluKoltuklar] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const etkinlik = etkinlikler.find((e) => e.id === parseInt(id));

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/api/etkinlik-dolu-koltuklar/${id}`)
      .then((res) => {
        let dolular = res.data.dolu_koltuklar || [];
        dolular = dolular.flatMap((item) =>
          typeof item === "string" ? item.split(",").map((s) => s.trim()) : []
        );
        setDoluKoltuklar(dolular);
        setLoading(false);
      })
      .catch(() => {
        setDoluKoltuklar([]);
        setLoading(false);
      });
  }, [id]);

  if (!etkinlik || loading) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center">
        {loading ? (
          <Spinner message="Koltuk planı yükleniyor..." />
        ) : (
          <div className="p-8 bg-white rounded-2xl shadow-sm border border-slate-200">
            <p className="text-slate-600 mb-4">Etkinlik bulunamadı.</p>
            <Link to="/" className="px-4 py-2 bg-teal-600 text-white rounded-xl text-sm font-medium">
              Anasayfaya Dön
            </Link>
          </div>
        )}
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      alert("Lütfen devam etmek için giriş yapınız.");
      navigate("/login");
      return;
    }
    if (selectedSeats.length !== parseInt(adet)) {
      alert(`Lütfen tam olarak ${adet} koltuk seçiniz.`);
      return;
    }
    const yeniBilet = {
      etkinlik,
      koltuklar: selectedSeats,
      adet: adet,
      toplamFiyat: etkinlik.fiyat * adet,
    };
    navigate(`/odeme/${id}`, { state: { bilet: yeniBilet } });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 sm:p-8">
        <div className="border-b border-slate-100 pb-4 mb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-600">Bilet Satın Al</span>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">🎟️ {etkinlik.ad}</h1>
          <p className="text-xs text-slate-500 mt-1">{etkinlik.mekan} • Birim Fiyat: {etkinlik.fiyat} ₺</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Adet Seçimi */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
              Bilet Adedi
            </label>
            <div className="flex items-center gap-3">
              <input
                type="number"
                min="1"
                max="10"
                value={adet}
                onChange={(e) => {
                  setAdet(parseInt(e.target.value) || 1);
                  setSelectedSeats([]);
                }}
                className="w-24 px-3 py-2 text-center rounded-xl border border-slate-200 bg-slate-50 text-slate-800 font-semibold focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                required
              />
              <span className="text-xs text-slate-500">Maksimum 10 bilet seçebilirsiniz.</span>
            </div>
          </div>

          {/* Koltuk Seçim Alanı */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
              Koltuk Seçimi ({selectedSeats.length}/{adet} seçildi)
            </label>
            <SeatSelection
              adet={adet}
              selectedSeats={selectedSeats}
              setSelectedSeats={setSelectedSeats}
              doluKoltuklar={doluKoltuklar}
            />
          </div>

          {/* Seçilen Koltuklar ve Özet */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">
                Seçilen Koltuklar
              </label>
              <div className="px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm font-semibold text-slate-700 min-h-[42px] flex items-center">
                {selectedSeats.length > 0 ? selectedSeats.join(", ") : "Henüz koltuk seçilmedi"}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">
                Toplam Tutar
              </label>
              <div className="px-4 py-2.5 rounded-xl border border-teal-200 bg-teal-50 text-base font-bold text-teal-700 min-h-[42px] flex items-center">
                {etkinlik.fiyat * adet} ₺
              </div>
            </div>
          </div>

          {/* Submit CTA */}
          <button
            type="submit"
            className="w-full py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-slate-900 to-teal-700 hover:from-slate-800 hover:to-teal-600 shadow-md hover:shadow-lg transition-all active:scale-[0.99]"
          >
            Ödemeye Geç
          </button>
        </form>
      </div>
    </div>
  );
};

export default BiletSatinalPage;
