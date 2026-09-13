import { useLocation, useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import { EtkinliklerContext } from "../data/Context";
import { formatTarih } from "../data/etkinlikler";

const AramaSonuclari = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const { etkinlikler } = useContext(EtkinliklerContext);
  const query = new URLSearchParams(search).get("query")?.toLowerCase().trim() || "";

  const filtrelenmisEtkinlikler = etkinlikler.filter((etkinlik) =>
    etkinlik.ad.toLowerCase().includes(query) ||
    (etkinlik.mekan && etkinlik.mekan.toLowerCase().includes(query)) ||
    (etkinlik.kategori && etkinlik.kategori.toLowerCase().includes(query))
  );

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8 pb-4 border-b border-slate-200">
        <h1 className="text-2xl font-bold text-slate-900">
          Arama Sonuçları: <span className="text-teal-600 font-extrabold">"{query}"</span>
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          {filtrelenmisEtkinlikler.length} etkinlik bulundu.
        </p>
      </div>

      {filtrelenmisEtkinlikler.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 space-y-3">
          <span className="text-4xl block text-slate-300">🔍</span>
          <h2 className="text-lg font-bold text-slate-700">Sonuç Bulunamadı</h2>
          <p className="text-sm text-slate-500 max-w-sm mx-auto">
            “{query}” ile eşleşen bir etkinlik bulamadık. Farklı bir arama terimi deneyebilirsiniz.
          </p>
          <div className="pt-2">
            <Link to="/" className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-sm font-semibold transition-colors inline-block">
              Tüm Etkinliklere Göz At
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {filtrelenmisEtkinlikler.map((etkinlik) => (
            <div
              key={etkinlik.id}
              className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm hover:shadow-md hover:border-teal-200 transition-all flex flex-col sm:flex-row gap-5 items-start sm:items-center"
            >
              <div
                className="w-full sm:w-36 h-44 sm:h-32 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0 cursor-pointer"
                onClick={() => navigate(`/detay/${etkinlik.id}`, { state: { etkinlik } })}
              >
                <img
                  src={etkinlik.img}
                  alt={etkinlik.ad}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="flex-1 space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase bg-slate-100 text-slate-600">
                    {etkinlik.kategori}
                  </span>
                </div>
                <h3
                  onClick={() => navigate(`/detay/${etkinlik.id}`, { state: { etkinlik } })}
                  className="text-lg font-bold text-slate-900 hover:text-teal-700 cursor-pointer transition-colors"
                >
                  {etkinlik.ad}
                </h3>
                <p className="text-xs text-slate-600 line-clamp-2">{etkinlik.aciklama}</p>
                <p className="text-xs text-slate-500 pt-1">
                  📅 {formatTarih(etkinlik.tarih)} • 📍 {etkinlik.mekan}
                </p>
              </div>

              <div className="w-full sm:w-auto flex sm:flex-col items-center sm:items-end justify-between gap-3 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                <div className="text-lg font-extrabold text-teal-600">{etkinlik.fiyat} ₺</div>
                <button
                  onClick={() => navigate(`/bilet-satin-al/${etkinlik.id}`)}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-slate-900 to-teal-700 hover:from-slate-800 hover:to-teal-600 text-white font-bold text-xs shadow-sm transition-all"
                >
                  Bilet Al
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AramaSonuclari;

