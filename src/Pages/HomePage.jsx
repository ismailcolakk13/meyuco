import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { EtkinliklerContext } from "../data/Context";

// Etkinlik kartı bileşeni
const EtkinlikKart = ({ etkinlik }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/detay/${etkinlik.id}`, { state: { etkinlik } })}
      className="group cursor-pointer flex flex-col items-center text-center p-2 rounded-xl transition-all duration-200 hover:-translate-y-1 hover:bg-slate-100/70"
    >
      <div className="w-24 h-32 rounded-lg overflow-hidden shadow-sm border border-slate-200 bg-white group-hover:shadow-md transition-shadow">
        <img
          src={etkinlik.img}
          alt={etkinlik.ad}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <span
        className="mt-2 text-xs font-semibold text-slate-700 group-hover:text-teal-700 line-clamp-2 h-8 leading-4"
        title={etkinlik.ad}
      >
        {etkinlik.ad}
      </span>
      {etkinlik.fiyat && (
        <span className="mt-1 text-xs font-bold text-teal-600 bg-teal-50 px-2 py-0.5 rounded-full">
          {etkinlik.fiyat} ₺
        </span>
      )}
    </div>
  );
};

// Etkinlik kart grubu bileşeni
const EtkinlikKartGrubu = ({ baslik, veriler, link }) => {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 flex flex-col justify-between hover:shadow-md transition-shadow">
      <div>
        <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-2">
          <h2 className="text-lg font-bold text-slate-800">{baslik}</h2>
          <span className="text-xs text-slate-400 font-medium">{veriler.length} Etkinlik</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {veriler.slice(0, 4).map((etkinlik) => (
            <EtkinlikKart key={etkinlik.id} etkinlik={etkinlik} />
          ))}
        </div>
      </div>
      <Link
        to={link}
        className="mt-4 w-full py-2.5 text-center text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-[#0c3e49] to-[#188976] hover:opacity-95 shadow-sm transition-all"
      >
        Daha Fazla Gör
      </Link>
    </div>
  );
};

// Ana sayfa bileşeni
const HomePage = () => {
  const { etkinlikler } = useContext(EtkinliklerContext);
  const navigate = useNavigate();

  // Öne çıkan etkinlikler (ilk 3 veya popüler)
  const populerEtkinlikler = etkinlikler.length > 0
    ? etkinlikler.filter((e) => [1, 9, 22].includes(etkinlikler.indexOf(e)))
    : [];

  const slides = populerEtkinlikler.length > 0 ? populerEtkinlikler : etkinlikler.slice(0, 3);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Hero Section: Carousel & Video */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Sol: Öne Çıkan Carousel */}
        <div className="lg:col-span-8 flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <span>✨</span> Öne Çıkanlar
            </h1>
            {slides.length > 1 && (
              <div className="flex gap-1.5">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-2 rounded-full transition-all ${
                      idx === currentSlide ? "w-6 bg-teal-600" : "w-2 bg-slate-300 hover:bg-slate-400"
                    }`}
                    aria-label={`Slide ${idx + 1}`}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="relative w-full h-[360px] sm:h-[400px] rounded-2xl overflow-hidden shadow-md bg-slate-900 group">
            {slides.map((etkinlik, idx) => (
              <div
                key={etkinlik.id}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out cursor-pointer ${
                  idx === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                }`}
                onClick={() =>
                  navigate(`/detay/${etkinlik.id}`, { state: { etkinlik } })
                }
              >
                <img
                  src={etkinlik.img}
                  alt={etkinlik.ad}
                  className="w-full h-full object-cover brightness-90 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-teal-500/90 text-white backdrop-blur-sm mb-2 uppercase tracking-wider">
                    {etkinlik.kategori || "Etkinlik"}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold line-clamp-1">{etkinlik.ad}</h3>
                  <p className="text-sm text-slate-300 mt-1 line-clamp-1">
                    {etkinlik.mekan} • {etkinlik.fiyat} ₺
                  </p>
                </div>
              </div>
            ))}

            {slides.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))}
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-sm transition-colors opacity-0 group-hover:opacity-100"
                  aria-label="Önceki"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-sm transition-colors opacity-0 group-hover:opacity-100"
                  aria-label="Sonraki"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Sağ: Video Tanıtım */}
        <div className="lg:col-span-4 flex flex-col justify-end">
          <div className="hidden lg:block mb-3 text-sm font-semibold text-slate-500 uppercase tracking-wider">
            Tanıtım
          </div>
          <div className="w-full h-[360px] sm:h-[400px] rounded-2xl overflow-hidden shadow-md border border-slate-200 bg-black">
            <video
              src="https://i.imgur.com/GRZM8Uv.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Kategoriler Bölümü */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Kategorileri Keşfet</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <EtkinlikKartGrubu
            baslik="Konserler"
            veriler={etkinlikler.filter((e) => e.kategori === "konserler")}
            link="/konserler"
          />
          <EtkinlikKartGrubu
            baslik="Tiyatrolar"
            veriler={etkinlikler.filter((e) => e.kategori === "tiyatrolar")}
            link="/tiyatrolar"
          />
          <EtkinlikKartGrubu
            baslik="Spor"
            veriler={etkinlikler.filter((e) => e.kategori === "sporlar")}
            link="/sporlar"
          />
          <EtkinlikKartGrubu
            baslik="Sinemalar"
            veriler={etkinlikler.filter((e) => e.kategori === "sinemalar")}
            link="/sinemalar"
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
