import React from "react";
import { Link } from "react-router-dom";
import { konserler,tiyatrolar } from "../data/etkinlikler";

// Örnek popüler etkinlikler (görselleri kendi projene göre değiştir)
const populerEtkinlikler = [
  { id: 1, ad: "Konser A", img: "https://placehold.co/300x200?text=Konser+A" },
  { id: 2, ad: "Aydınlıkevler", img: "/images/tiyatro2.jpg" },
  { id: 3, ad: "Spor C", img: "https://placehold.co/300x200?text=Spor+C" },
];

const sporlar = [
  { id: 1, ad: "Spor X", img: "https://placehold.co/300x200?text=Spor+X" },
  { id: 2, ad: "Spor Y", img: "https://placehold.co/300x200?text=Spor+Y" },
];
const sinemalar = [
  { id: 1, ad: "Sinema X", img: "https://placehold.co/300x200?text=Sinema+X" },
  { id: 2, ad: "Sinema Y", img: "https://placehold.co/300x200?text=Sinema+Y" },
];

const etkinlikKart = (etkinlik) => (
  <div
    key={etkinlik.id}
    className="col-6 d-flex flex-column align-items-center mb-4"
  >
    <img
      src={etkinlik.img}
      alt={etkinlik.ad}
      style={{
        width: 90,
        height: 120,
        objectFit: "cover",
        borderRadius: 8,
        border: "1px solid black",
        background: "#fff",
      }}
    />
    <span className="mt-2 text-center">{etkinlik.ad}</span>
  </div>
);

const HomePage = () => {
  return (
    <div className="container">
      <div className="my-4">
        <h1>Öne Çıkanlar</h1>
        {/* Bootstrap Carousel */}

        <div
          id="populerCarousel"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            {populerEtkinlikler.map((etkinlik, idx) => (
              <div
                className={`carousel-item${idx === 0 ? " active" : ""}`}
                key={etkinlik.id}
              >
                <img
                  src={etkinlik.img}
                  className="d-block w-100 rounded"
                  alt={etkinlik.ad}
                  style={{ maxHeight: 350, objectFit: "cover" }}
                />
                <div className="carousel-caption d-none d-md-block">
                  <h5>{etkinlik.ad}</h5>
                </div>
              </div>
            ))}
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#populerCarousel"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Önceki</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#populerCarousel"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Sonraki</span>
          </button>
        </div>
      </div>

      {/* 2x2 Grid: Konserler, Tiyatro, Spor, Sinema */}
      <div className="row g-4 my-4 col-12">
        <div className="col-md-3">
          <div className="border rounded p-3 h-100 d-flex flex-column">
            <h2 className="mb-3">Konserler</h2>
            <div className="row mb-auto">{konserler.slice(0, 2).map(etkinlikKart)}</div>
            <div className="row">{konserler.slice(2, 4).map(etkinlikKart)}</div>
            <Link
              to="/konserler"
              className="text-decoration-none text-dark btn btn-warning mt-auto"
            >
              Daha Fazla
            </Link>
          </div>
        </div>
        <div className="col-md-3">
          <div className="border rounded p-3 h-100 d-flex flex-column">
              <h2 className="mb-3">Tiyatro</h2>
              <div className="row mb-auto">{tiyatrolar.slice(0,2).map(etkinlikKart)}</div>
              <div className="row">{tiyatrolar.slice(2,4).map(etkinlikKart)}</div>
          <Link
              to="/tiyatrolar"
              className="text-decoration-none text-dark btn btn-warning mt-auto"
            >
              Daha Fazla
            </Link>
            </div>
        </div>

        <div className="col-12 col-md-6">
          <Link to="/sporlar" className="text-decoration-none text-dark">
            <div className="border rounded p-3 h-100 d-flex flex-column">
              <h2 className="mb-3">Spor</h2>
              <div className="row">{sporlar.map(etkinlikKart)}</div>
            </div>
          </Link>
        </div>
        <div className="col-md-3">
          <div className="border rounded p-3 h-100 d-flex flex-column">
            <h2 className="mb-3">Sinema</h2>
            <div className="row">{sinemalar.map(etkinlikKart)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
