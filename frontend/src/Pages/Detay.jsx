import React from 'react';
import { useParams } from 'react-router-dom';
import { konserler, tiyatrolar, sporlar, sinemalar } from '../data/etkinlikler';

const Detay = () => {
  const { kategori, id } = useParams();
  const etkinlikId = parseInt(id, 10);

  let etkinlikListesi = [];

  switch (kategori) {
    case 'konserler':
      etkinlikListesi = konserler;
      break;
    case 'tiyatrolar':
      etkinlikListesi = tiyatrolar;
      break;
    case 'sporlar':
      etkinlikListesi = sporlar;
      break;
    case 'sinemalar':
      etkinlikListesi = sinemalar;
      break;
    default:
      etkinlikListesi = [];
  }

  const etkinlik = etkinlikListesi.find((e) => e.id === etkinlikId);

  if (!etkinlik) {
    return <div>Etkinlik bulunamadı.</div>;
  }

  return (
    <main style={{
      maxWidth: 600,
      margin: '0 auto',
      padding: 20,
      fontFamily: 'sans-serif',
      background: '#fafafa',
      borderRadius: 12,
      boxShadow: '0 2px 8px #eee'
    }}>
      <section style={{
        borderRadius: 8,
        overflow: 'hidden',
        marginBottom: 24
      }}>
        <img
          src={etkinlik.img}
          alt={etkinlik.ad}
          style={{ width: '100%', height: 'auto', display: 'block' }}
        />
      </section>
      <section style={{ marginBottom: 24 }}>
        <h2 style={{ margin: '0 0 8px 0', color: '#333' }}>{etkinlik.ad}</h2>
        <p style={{ color: '#555', fontSize: 16 }}>{etkinlik.aciklama}</p>
        <p style={{ fontSize: 14, color: '#777' }}>
          Tarih: {etkinlik.tarih} <br />
          Mekan: {etkinlik.mekan} <br />
        </p>
        <p style={{ fontSize: 20, color: '#000' }}>
          Etkinlik kuralları:<br /></p>
          <p>
          18 yaş ve üzeri katılım gerekmektedir. <br />
          Etkinlik boyunca saygılı ve hoşgörülü olunmalıdır. <br />
          Etkinlik alanında sigara içmek yasaktır. <br />
          Etkinlik alanında yiyecek ve içecek tüketimi yasaktır. <br />
          Etkinlik sırasında fotoğraf ve video çekimi serbesttir. <br />
          Etkinlik alanına girişte kimlik kontrolü yapılacaktır. <br />
          Lütfen biletinizi yanınızda bulundurun.</p>
      </section>
    </main>
  );
};

export default Detay;
