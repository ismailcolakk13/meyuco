import { useLocation, useNavigate, Link } from 'react-router-dom';
import { formatTarih } from '../data/etkinlikler';

const Detay = () => {
  const location = useLocation();
  const etkinlik = location.state?.etkinlik;
  const navigate = useNavigate();

  if (!etkinlik) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="p-8 bg-white rounded-2xl shadow-sm border border-slate-200">
          <p className="text-slate-600 text-lg mb-4">Etkinlik bulunamadı.</p>
          <Link to="/" className="inline-flex items-center px-4 py-2 rounded-xl bg-teal-600 text-white font-medium hover:bg-teal-700 transition-colors">
            Anasayfaya Dön
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center text-sm text-slate-500 gap-2">
        <Link to="/" className="hover:text-teal-600 transition-colors">Anasayfa</Link>
        <span>/</span>
        {etkinlik.kategori && (
          <>
            <Link to={`/${etkinlik.kategori}`} className="capitalize hover:text-teal-600 transition-colors">
              {etkinlik.kategori}
            </Link>
            <span>/</span>
          </>
        )}
        <span className="text-slate-800 font-medium truncate max-w-xs">{etkinlik.ad}</span>
      </nav>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden p-6 sm:p-8 lg:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Sol Görsel */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-sm rounded-2xl overflow-hidden shadow-lg border border-slate-100 bg-slate-50 aspect-[3/4]">
              <img
                src={etkinlik.img}
                alt={etkinlik.ad}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Sağ Bilgiler */}
          <div className="lg:col-span-7 flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-teal-50 text-teal-700 border border-teal-200">
                  {etkinlik.kategori || "Etkinlik"}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-4">
                {etkinlik.ad}
              </h1>

              <p className="text-slate-600 text-base leading-relaxed mb-6">
                {etkinlik.aciklama}
              </p>

              {/* Tarih & Mekan Bilgileri */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 font-medium block">Tarih</span>
                    <span className="text-sm font-semibold text-slate-800">{formatTarih(etkinlik.tarih)}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 font-medium block">Mekan</span>
                    <span className="text-sm font-semibold text-slate-800">{etkinlik.mekan}</span>
                  </div>
                </div>
              </div>

              {/* Bilet Butonu */}
              <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
                <button
                  onClick={() => navigate(`/bilet-satin-al/${etkinlik.id}`)}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-slate-900 to-teal-700 text-white font-bold text-base shadow-md hover:from-slate-800 hover:to-teal-600 transition-all flex items-center justify-center gap-3 group"
                >
                  <span>Bilet Satın Al</span>
                  <span className="bg-white/20 px-2.5 py-1 rounded-lg text-sm font-extrabold group-hover:bg-white/30 transition-colors">
                    {etkinlik.fiyat} ₺
                  </span>
                </button>
              </div>
            </div>

            {/* Etkinlik Kuralları */}
            <div className="border-t border-slate-100 pt-6">
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-3 flex items-center gap-2">
                <span>📋</span> Etkinlik Kuralları
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
                <li className="flex items-center gap-2">
                  <span className="text-teal-600 font-bold">•</span> 18 yaş ve üzeri katılım gerekmektedir.
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-teal-600 font-bold">•</span> Etkinlik boyunca saygılı ve hoşgörülü olunmalıdır.
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-teal-600 font-bold">•</span> Etkinlik alanında sigara içmek yasaktır.
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-teal-600 font-bold">•</span> Dışarıdan yiyecek ve içecek getirilmesi yasaktır.
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-teal-600 font-bold">•</span> Fotoğraf ve video çekimi serbesttir.
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-teal-600 font-bold">•</span> Girişte kimlik kontrolü yapılacaktır.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detay;
