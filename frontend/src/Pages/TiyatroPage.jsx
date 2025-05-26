import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const tiyatrolar = [
  {
    id: 1,
    ad: "Mercaniye Çok Yaşa",
    img: "/images/tiyatro1.jpg",
    aciklama: "Komedi dolu bir Osmanlı parodisi. Tarih: 12 Haziran 2025, Mekan: Zorlu PSM"
  },
  {
    id: 2,
    ad: "Aydınlıkevler",
    img: "/images/tiyatro2.jpg",
    aciklama: "Toplumsal olaylara mizahi bakış. Tarih: 18 Haziran 2025, Mekan: Maximum UNIQ Hall"
  },
  {
    id: 3,
    ad: "Mor Komedyen Stand Up",
    img: "/images/tiyatro3.jpg",
    aciklama: "Sınırsız kahkaha garantili bir gösteri. Tarih: 20 Haziran 2025, Mekan: BKM Tiyatro"
  },
  {
    id: 4,
    ad: "Gökhan Ünvar Stand Up",
    img: "/images/tiyatro4.jpg",
    aciklama: "Klasiklerden sahne uyarlamaları. Tarih: 25 Haziran 2025, Mekan: DasDas Sahne"
  },
  {
    id: 5,
    ad: "Seyfi Bey ",
    img: "/images/tiyatro5.jpg",
    aciklama: "Romantik komedi türünde sahne oyunu. Tarih: 1 Temmuz 2025, Mekan: Kadıköy Halk Eğitim Merkezi"
  },
  {
    id: 6,
    ad: "Kutsal",
    img: "/images/tiyatro6.jpg",
    aciklama: "Derin karakter çözümlemeleri içerir. Tarih: 3 Temmuz 2025, Mekan: Trump Sahne"
  },
  {
    id: 7,
    ad: "Kel Diva",
    img: "/images/tiyatro7.jpg",
    aciklama: "Absürt skeçlerden oluşur. Tarih: 6 Temmuz 2025, Mekan: Cevahir Sahnesi"
  },
  {
    id: 8,
    ad: "Timsah Ateşi",
    img: "/images/tiyatro8.jpg",
    aciklama: "Çocuklar ve yetişkinler için kukla oyunu. Tarih: 9 Temmuz 2025, Mekan: Sahne Dragos"
  },
  {
    id: 9,
    ad: "1923 Müzikal",
    img: "/images/tiyatro9.jpg",
    aciklama: "Tarihi olaylara sahnede bir yolculuk. Tarih: 12 Temmuz 2025, Mekan: Atatürk Kültür Merkezi"
  }
];


const TiyatroPage = () =>
{
  const navigate = useNavigate();
  const isLoggedIn = false; // Giriş yapılmadıysa false
  const [adetler, setAdetler] = useState({});
  const [detaylar, setDetaylar] = useState({}); // Her tiyatro için detay görünürlüğü

  const handleAdetDegis = (id, fark) =>
  {
    setAdetler((prev) => ({
      ...prev,
      [id]: Math.max(0, (prev[id] || 0) + fark),
    }));
  };

  const handleSatinAl = (id) =>
  {
    if (!isLoggedIn)
    {
      navigate("/login");
    } else
    {
      alert(`${adetler[id] || 1} adet bilet satın alındı.`);
    }
  };

  const toggleDetay = (id) =>
  {
    setDetaylar((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-5 fw-bold">🎭 Tiyatro Etkinlikleri</h2>
      <div className="row justify-content-center">
        {tiyatrolar.map((t) => (
          <div key={t.id} className="col-12 col-sm-6 col-md-4 col-lg-4 mb-4">
            <div className="card shadow-sm h-100 text-center border-0">
              <img
                src={t.img}
                alt={t.ad}
                className="card-img-top"
                style={{
                  height: 620,
                  objectFit: "cover",
                  borderTopLeftRadius: "8px",
                  borderTopRightRadius: "8px",
                }}
              />
              <div className="card-body">
                <h5 className="card-title">{t.ad}</h5>



                <div className="d-flex justify-content-center gap-2">
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => handleSatinAl(t.id)}
                  >
                    Satın Al
                  </button>
                  <button
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => toggleDetay(t.id)}
                  >
                    Detay
                  </button>
                </div>

                {/* Detay metni kutusu */}
                {detaylar[t.id] && (
                  <div className="mt-3 p-2 bg-light rounded shadow-sm">
                    <small className="text-secondary">{t.aciklama}</small>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TiyatroPage;
