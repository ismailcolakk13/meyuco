import React from "react";
import EtkinlikGrupPage from "./EtkinlikGrupPage";

const tiyatrolar = [
  {
    id: 1,
    ad: "Mercaniye Çok Yaşa",
    img: "/images/tiyatro1.jpg",
    aciklama: "Komedi dolu bir Osmanlı parodisi. Tarih: 12 Haziran 2025, Mekan: Zorlu PSM",
  },
  {
    id: 2,
    ad: "Aydınlıkevler",
    img: "/images/tiyatro2.jpg",
    aciklama: "Toplumsal olaylara mizahi bakış. Tarih: 18 Haziran 2025, Mekan: Maximum UNIQ Hall",
  },
  {
    id: 3,
    ad: "Mor Komedyen Stand Up",
    img: "/images/tiyatro3.jpg",
    aciklama: "Sınırsız kahkaha garantili bir gösteri. Tarih: 20 Haziran 2025, Mekan: BKM Tiyatro",
  },
  {
    id: 4,
    ad: "Gökhan Ünvar Stand Up",
    img: "/images/tiyatro4.jpg",
    aciklama: "Klasiklerden sahne uyarlamaları. Tarih: 25 Haziran 2025, Mekan: DasDas Sahne",
  },
  {
    id: 5,
    ad: "Seyfi Bey ",
    img: "/images/tiyatro5.jpg",
    aciklama: "Romantik komedi türünde sahne oyunu. Tarih: 1 Temmuz 2025, Mekan: Kadıköy Halk Eğitim Merkezi",
  },
  {
    id: 6,
    ad: "Kutsal",
    img: "/images/tiyatro6.jpg",
    aciklama: "Derin karakter çözümlemeleri içerir. Tarih: 3 Temmuz 2025, Mekan: Trump Sahne",
  },
  {
    id: 7,
    ad: "Kel Diva",
    img: "/images/tiyatro7.jpg",
    aciklama: "Absürt skeçlerden oluşur. Tarih: 6 Temmuz 2025, Mekan: Cevahir Sahnesi",
  },
  {
    id: 8,
    ad: "Timsah Ateşi",
    img: "/images/tiyatro8.jpg",
    aciklama: "Çocuklar ve yetişkinler için kukla oyunu. Tarih: 9 Temmuz 2025, Mekan: Sahne Dragos",
  },
  {
    id: 9,
    ad: "1923 Müzikal",
    img: "/images/tiyatro9.jpg",
    aciklama: "Tarihi olaylara sahnede bir yolculuk. Tarih: 12 Temmuz 2025, Mekan: Atatürk Kültür Merkezi",
  },
];

const TiyatroPage = () => {
  return <Etkinlik baslik="🎭 Tiyatro Etkinlikleri" etkinlikler={tiyatrolar} />;
};

export default TiyatroPage;
