import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { EtkinliklerContext } from "../data/Context";
import { formatTarih } from "../data/etkinlikler";

const EtkinlikGrupPage = ({ baslik, kategori }) => {
  const { etkinlikler } = useContext(EtkinliklerContext);
  const navigate = useNavigate();

  const filtreliEtkinlikler = etkinlikler.filter((e) => e.kategori === kategori);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 capitalize">
            {baslik}
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            En güncel {baslik.toLowerCase()} etkinlikleri ve biletleri.
          </p>
        </div>
        <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-teal-100 text-teal-800">
          {filtreliEtkinlikler.length} Etkinlik
        </span>
      </div>

      {filtreliEtkinlikler.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8">
          <span className="text-4xl block mb-2">🎭</span>
          <p className="text-slate-600 font-medium">Bu kategoride henüz etkinlik bulunamadı.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtreliEtkinlikler.map((etkinlik) => (
            <div
              key={etkinlik.id}
              className="group bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div
                className="relative aspect-[3/4] overflow-hidden bg-slate-100 cursor-pointer"
                onClick={() => navigate(`/detay/${etkinlik.id}`, { state: { etkinlik } })}
              >
                <img
                  src={etkinlik.img}
                  alt={etkinlik.ad}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-3 right-3">
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-white/90 text-teal-800 backdrop-blur-md shadow-xs">
                    {etkinlik.fiyat} ₺
                  </span>
                </div>
              </div>

              <div className="p-4 flex flex-col flex-grow justify-between">
                <div>
                  <h3
                    onClick={() => navigate(`/detay/${etkinlik.id}`, { state: { etkinlik } })}
                    className="font-bold text-slate-900 text-base line-clamp-2 hover:text-teal-700 cursor-pointer mb-1 transition-colors"
                    title={etkinlik.ad}
                  >
                    {etkinlik.ad}
                  </h3>
                  <p className="text-xs text-slate-500 mb-4 line-clamp-1">
                    📍 {etkinlik.mekan} • 📅 {formatTarih(etkinlik.tarih)}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                  <button
                    onClick={() => navigate(`/bilet-satin-al/${etkinlik.id}`)}
                    className="py-2 text-center text-xs font-bold rounded-xl bg-gradient-to-r from-slate-900 to-teal-700 hover:from-slate-800 hover:to-teal-600 text-white shadow-xs transition-all"
                  >
                    Bilet Bul
                  </button>
                  <button
                    onClick={() => navigate(`/detay/${etkinlik.id}`, { state: { etkinlik } })}
                    className="py-2 text-center text-xs font-bold rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                  >
                    Detay
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EtkinlikGrupPage;
