import { Link, useNavigate } from "react-router-dom";
import { konserler, sinemalar, sporlar, tiyatrolar } from "../data/etkinlikler";
import { useState } from "react";

// Öne çıkan etkinlikler
const populerEtkinlikler = [
  { ...konserler[1], kategori: "konserler" },
  { ...tiyatrolar[1], kategori: "tiyatrolar" },
  { ...sporlar[5], kategori: "sporlar" },
];

// Etkinlik kartı bileşeni
const EtkinlikKart = ({ etkinlik, hovered, setHovered, kategori }) =>
{
  const navigate = useNavigate();

  return (
    <div
      key={etkinlik.id}
      className="col-6 d-flex flex-column align-items-center mb-4"
      style={{
        transition: "transform 0.3s cubic-bezier(.4,2,.6,1)",
        transform: hovered === etkinlik.id ? "scale(1.06)" : "scale(1)"
      }}
      onMouseEnter={() => setHovered(etkinlik.id)}
      onMouseLeave={() => setHovered(null)}
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
          cursor: "pointer"
        }}
        onClick={() => navigate(`/detay/${kategori}/${etkinlik.id}`)}
      />
      <span
        className="mt-2 text-center"
        style={{
          maxWidth: 90,
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'normal',
          height: '2.4em',
          lineHeight: '1.2em'
        }}
        title={etkinlik.ad}
      >
        {etkinlik.ad}
      </span>
    </div>
  );
};

// Etkinlik kart grubu bileşeni
const EtkinlikKartGrubu = ({ baslik, veriler, link }) =>
{
  const [hovered, setHovered] = useState(null);
  const kategori = baslik.toLowerCase();

  return (
    <div className="col-12 col-sm-6 col-lg-3">
      <div className="border rounded p-3 h-100 d-flex flex-column">
        <h2 className="mb-3">{baslik}</h2>
        <div className="row mb-auto">
          {veriler.slice(0, 2).map(etkinlik => (
            <EtkinlikKart
              key={etkinlik.id}
              etkinlik={etkinlik}
              hovered={hovered}
              setHovered={setHovered}
              kategori={kategori}
            />
          ))}
        </div>
        <div className="row">
          {veriler.slice(2, 4).map(etkinlik => (
            <EtkinlikKart
              key={etkinlik.id}
              etkinlik={etkinlik}
              hovered={hovered}
              setHovered={setHovered}
              kategori={kategori}
            />
          ))}
        </div>
        <Link
          to={link}
          className="text-decoration-none text-dark btn btn-warning mt-auto"
        >
          Daha Fazla
        </Link>
      </div>
    </div>
  );
};

// Ana sayfa bileşeni
const HomePage = () =>
{
  const navigate = useNavigate();
  return (
    <div className="position-relative">
      {/* Sol Video */}
      <div className="d-none d-lg-block" style={{
        position: "fixed",
        left: 0,
        top: "80px",
        width: "18vw",
        height: "75vh",
        zIndex: 1000
      }}>
        <video
          src="/images/raklam1.mp4"
          autoPlay
          muted
          loop
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "8px",
            objectFit: "cover"
          }}
        />
      </div>

      {/* Sağ Video */}
      <div className="d-none d-lg-block" style={{
        position: "fixed",
        right: 0,
        top: "80px",
        width: "18vw",
        height: "75vh",
        zIndex: 1000
      }}>
        <video
          src="/images/reklam2.mp4"
          autoPlay
          muted
          loop
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "8px",
            objectFit: "cover"
          }}
        />
      </div>


      {/* Sayfa İçeriği */}
      <div className="container">
        <div className="row my-4 align-items-center">
          <div className="col-12 col-md-6">
            <h1>Öne Çıkanlar</h1>
            <div id="populerCarousel" className="carousel slide" data-bs-ride="carousel">
              <div className="carousel-inner">
                {populerEtkinlikler.map((etkinlik, idx) => (
                  <div className={`carousel-item${idx === 0 ? " active" : ""}`} key={etkinlik.id}>
                    <img
                      src={etkinlik.img}
                      className="d-block w-100 rounded"
                      alt={etkinlik.ad}
                      style={{ maxHeight: 350, objectFit: "cover", cursor: "pointer" }}
                      onClick={() => navigate(`/detay/${etkinlik.kategori || 'konserler'}/${etkinlik.id}`)}
                  />
                    <div className="carousel-caption d-none d-md-block">
                      <h5 style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        padding: '5px',
                        borderRadius: '5px',
                        display: "inline"
                      }}>{etkinlik.ad}</h5>
                    </div>
                  </div>
                ))}
              </div>
              <button className="carousel-control-prev" type="button" data-bs-target="#populerCarousel" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Önceki</span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target="#populerCarousel" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Sonraki</span>
              </button>
            </div>
          </div>
        </div>

        <div className="row g-4 my-4 col-12">
          <EtkinlikKartGrubu baslik="Konserler" veriler={konserler} link="/konserler" />
          <EtkinlikKartGrubu baslik="Tiyatrolar" veriler={tiyatrolar} link="/tiyatrolar" />
          <EtkinlikKartGrubu baslik="Spor" veriler={sporlar} link="/sporlar" />
          <EtkinlikKartGrubu baslik="Sinemalar" veriler={sinemalar} link="/sinemalar" />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
