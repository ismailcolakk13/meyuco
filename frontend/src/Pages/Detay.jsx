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
    <div className="container my-5">
      <div className="row align-items-center bg-light rounded shadow-sm p-4">
        <div className="col-12 col-md-5 mb-4 mb-md-0 d-flex justify-content-center align-items-center">
          <img
            src={etkinlik.img}
            alt={etkinlik.ad}
            className="img-fluid rounded"
            style={{ maxWidth: '540px', maxHeight: '540px', width: '100%', height: '100%', objectFit: 'contain', background: '#fff' }}
          />
        </div>
        <div className="col-12 col-md-7">
          <h2 className="mb-3 text-primary">{etkinlik.ad}</h2>
          <p className="text-secondary fs-5">{etkinlik.aciklama}</p>
          <p className="text-muted mb-2">
            <strong>Tarih:</strong> {etkinlik.tarih} <br />
            <strong>Mekan:</strong> {etkinlik.mekan}
          </p>
          <div className="mt-4">
            <h5 className="mb-2">Etkinlik kuralları:</h5>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">18 yaş ve üzeri katılım gerekmektedir.</li>
              <li className="list-group-item">Etkinlik boyunca saygılı ve hoşgörülü olunmalıdır.</li>
              <li className="list-group-item">Etkinlik alanında sigara içmek yasaktır.</li>
              <li className="list-group-item">Etkinlik alanında yiyecek ve içecek tüketimi yasaktır.</li>
              <li className="list-group-item">Etkinlik sırasında fotoğraf ve video çekimi serbesttir.</li>
              <li className="list-group-item">Etkinlik alanına girişte kimlik kontrolü yapılacaktır.</li>
              <li className="list-group-item">Lütfen biletinizi yanınızda bulundurun.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detay;
