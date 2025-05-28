import React from "react";

const Hakkimizda = () =>
{
    return (
        <div className="container my-5">
            {/* Banner */}
            <div className="text-center mb-4">
                <img
                    src="/images/hakkimizda-banner.png"
                    alt="Hakkımızda"
                    style={{ maxWidth: "100%", height: "auto", borderRadius: "8px" }}
                />
            </div>

            {/* Başlık */}
            <h2 className="text-center fw-bold mb-4">Hakkımızda</h2>

            {/* Metin */}
            <div className="fs-5 text-secondary text-justify" style={{ lineHeight: "1.8" }}>
                <p>
                    <strong>Meyuco</strong>, kültür, sanat ve eğlence dünyasına yepyeni bir soluk getirmek amacıyla 2025 yılında kurulmuştur. Kullanıcılarımızın konserlerden tiyatrolara, sinema gösterimlerinden spor müsabakalarına kadar binlerce etkinliği kolayca keşfetmesini ve bilet satın almasını sağlıyoruz.
                </p>
                <p>
                    Teknoloji ve kullanıcı deneyimini merkeze alan yaklaşımımızla, hızlı, güvenli ve keyifli bir etkinlik keşfi sunuyoruz. Her bir tıklamanızda size daha yakın olmayı hedefliyoruz.
                </p>
                <p>
                    Ekibimiz; yazılım geliştiriciler, tasarımcılar ve kültür-sanat gönüllülerinden oluşan genç ve dinamik bireylerden oluşmaktadır. Sizin için en iyi deneyimi sunmak bizim önceliğimizdir.
                </p>
                <p className="mt-4 fw-semibold">
                    🎟️ Meyuco ile eğlenceye bir bilet kadar yakınsınız!
                </p>
            </div>
        </div>
    );
};

export default Hakkimizda;
