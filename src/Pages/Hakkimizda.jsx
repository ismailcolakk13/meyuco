
import { Link } from 'react-router-dom';

const Hakkimizda = () => {
    const stats = [
        { label: "Mutlu Katılımcı", value: "100K+", icon: "🎟️" },
        { label: "Canlı Etkinlik", value: "500+", icon: "🎭" },
        { label: "Farklı Mekan", value: "50+", icon: "📍" },
        { label: "Kullanıcı Memnuniyeti", value: "%99.8", icon: "⭐" },
    ];

    const values = [
        {
            title: "Hızlı & Kolay Biletleme",
            desc: "İnteraktif salon planından dilediğin koltuğu seç, saniyeler içinde biletini güvenle oluştur.",
            icon: (
                <svg className="w-6 h-6 text-[#18B38C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            ),
        },
        {
            title: "%100 Güvenli Altyapı",
            desc: "Uluslararası güvenlik standartlarına sahip altyapımızla ödemelerin ve kişisel verilerin her zaman koruma altında.",
            icon: (
                <svg className="w-6 h-6 text-[#18B38C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
            ),
        },
        {
            title: "Zengin Etkinlik Yelpazesi",
            desc: "Konserden tiyatroya, sinemadan stadyum sporlarına kültür ve sanatın nabzını tek çatı altında tutuyoruz.",
            icon: (
                <svg className="w-6 h-6 text-[#18B38C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
            ),
        },
    ];

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-12 sm:space-y-16">
            {/* Hero Header */}
            <div className="text-center max-w-3xl mx-auto space-y-4">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200/60 text-teal-800 text-xs font-semibold tracking-wide uppercase">
                    <span>✨</span> Meyuco'yu Tanıyın
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                    Kültür, Sanat ve Eğlenceyi <span className="text-transparent bg-clip-text bg-linear-to-r from-teal-600 to-teal-800">Tek Tıkla</span> Buluşturuyoruz
                </h1>
                <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                    Meyuco, canlı performansların büyüsünü teknolojiyle birleştiren yeni nesil etkinlik keşif ve biletleme platformudur.
                </p>
            </div>

            {/* Banner Image */}
            <div className="relative rounded-3xl overflow-hidden shadow-md border border-slate-200 aspect-21/9 max-h-95 w-full bg-slate-900">
                <img
                    src="/images/hakkimizda-banner.png"
                    alt="Meyuco Sahne ve Etkinlikler"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-950/60 via-transparent to-transparent" />
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                {stats.map((stat, idx) => (
                    <div
                        key={idx}
                        className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-xs text-center space-y-1 hover:border-teal-300 transition-colors"
                    >
                        <div className="text-2xl mb-1">{stat.icon}</div>
                        <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">{stat.value}</div>
                        <div className="text-xs sm:text-sm font-medium text-slate-500">{stat.label}</div>
                    </div>
                ))}
            </div>

            {/* Hikayemiz & Misyonumuz Split Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                <div className="bg-white rounded-3xl p-7 sm:p-9 border border-slate-200/80 shadow-xs space-y-4">
                    <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200/60 flex items-center justify-center text-teal-800 text-lg font-bold">
                        🎯
                    </div>
                    <h2 className="text-xl font-bold text-slate-900">Misyonumuz</h2>
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                        Kullanıcılarımızın konserlerden tiyatrolara, sinema gösterimlerinden stadyum derbilerine kadar binlerce etkinliği saniyeler içinde keşfetmesini, en şeffaf fiyatlandırma ve zahmetsiz koltuk seçimiyle güvenle bilet sahibi olmasını sağlamak.
                    </p>
                </div>

                <div className="bg-white rounded-3xl p-7 sm:p-9 border border-slate-200/80 shadow-xs space-y-4">
                    <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200/60 flex items-center justify-center text-teal-800 text-lg font-bold">
                        🔭
                    </div>
                    <h2 className="text-xl font-bold text-slate-900">Vizyonumuz</h2>
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                        Teknoloji ve kullanıcı deneyimini merkeze alarak, yalnızca bir bilet satış kanalı değil; etkinlik severlerin ilham aldığı, anılarını paylaştığı ve kültür-sanat topluluğunu büyüttüğü öncü dijital ekosistem olmak.
                    </p>
                </div>
            </div>

            {/* Neden Meyuco (Values) */}
            <div className="space-y-8">
                <div className="text-center space-y-2 max-w-2xl mx-auto">
                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Neden Meyuco?</h2>
                    <p className="text-slate-500 text-sm sm:text-base">
                        Sizin için en pürüzsüz ve keyifli etkinlik deneyimini tasarladık.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {values.map((item, idx) => (
                        <div
                            key={idx}
                            className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-xs hover:shadow-md transition-all space-y-3"
                        >
                            <div className="w-12 h-12 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center">
                                {item.icon}
                            </div>
                            <h3 className="text-base sm:text-lg font-bold text-slate-900">{item.title}</h3>
                            <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* CTA Banner */}
            <div className="rounded-3xl bg-linear-to-r from-[#142334] via-[#1C2D41] to-[#124d49] text-white p-8 sm:p-12 shadow-lg border border-teal-500/20 text-center space-y-6 relative overflow-hidden">
                <div className="relative z-10 max-w-2xl mx-auto space-y-3">
                    <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                        Sıradaki Deneyimini Keşfetmeye Hazır Mısın?
                    </h2>
                    <p className="text-slate-300 text-sm sm:text-base">
                        En popüler konserler, kapalı gişe tiyatrolar ve heyecan dolu spor karşılaşmaları seni bekliyor.
                    </p>
                    <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
                        <Link
                            to="/"
                            className="px-6 py-3 rounded-xl font-bold text-sm bg-[#18B38C] hover:bg-[#159e7b] text-white shadow-md hover:shadow-lg transition-all active:scale-[0.98]"
                        >
                            Etkinlikleri Keşfet
                        </Link>
                        <Link
                            to="/iletisim"
                            className="px-6 py-3 rounded-xl font-semibold text-sm bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white border border-white/15 transition-all"
                        >
                            Bizimle İletişime Geçin
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hakkimizda;
