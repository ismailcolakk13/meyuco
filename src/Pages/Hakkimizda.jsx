
const Hakkimizda = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
            {/* Banner */}
            <div className="w-full rounded-3xl overflow-hidden shadow-sm border border-slate-200 bg-slate-100">
                <img
                    src="/images/hakkimizda-banner.png"
                    alt="Hakkımızda"
                    className="w-full h-auto object-cover max-h-[360px]"
                />
            </div>

            {/* Başlık ve İçerik */}
            <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-200 space-y-6">
                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Hakkımızda</h1>

                <div className="text-slate-600 text-base sm:text-lg leading-relaxed space-y-4">
                    <p>
                        <strong className="text-slate-900 font-bold">Meyuco</strong>, kültür, sanat ve eğlence dünyasına yepyeni bir soluk getirmek amacıyla kurulmuştur. Kullanıcılarımızın konserlerden tiyatrolara, sinema gösterimlerinden spor müsabakalarına kadar binlerce etkinliği kolayca keşfetmesini ve güvenle bilet satın almasını sağlıyoruz.
                    </p>
                    <p>
                        Teknoloji ve kullanıcı deneyimini merkeze alan modern yaklaşımımızla; hızlı, kesintisiz ve keyifli bir etkinlik keşfi sunuyoruz.
                    </p>
                    <p>
                        Ekibimiz; deneyimli yazılım geliştiriciler, kullanıcı odaklı tasarımcılar ve kültür-sanat tutkunlarından oluşmaktadır. Sizin için en kusursuz etkinlik deneyimini sunmak birincil önceliğimizdir.
                    </p>
                </div>

                <div className="p-4 rounded-2xl bg-teal-50 border border-teal-200/80 text-teal-900 font-medium text-sm flex items-center gap-3">
                    <span className="text-2xl">🎟️</span>
                    <span>Meyuco ile eğlenceye sadece bir tık kadar yakınsınız!</span>
                </div>
            </div>
        </div>
    );
};

export default Hakkimizda;
