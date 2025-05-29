import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { etkinlikler } from "../data/etkinlikler";

// Öne çıkan etkinlikler

const populerEtkinlikler = [etkinlikler[1],etkinlikler[9],etkinlikler[22]];

// Etkinlik kartı bileşeni
const EtkinlikKart = ({ etkinlik, hovered, setHovered }) =>
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
        onClick={() => navigate(`/detay/${etkinlik.id}`, {state: { etkinlik:etkinlik }})}
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
          className="text-decoration-none text-white btn mt-auto"
          style={{
            background: "linear-gradient(135deg, #0c3e49, #188976)",
            border: "none"
          }}
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
    <div>
      {/* Sayfa İçeriği */}
      <div className="container">
        <div className="row my-4 align-items-start">
          <div className="col-12 col-lg-9">
            <h1>Öne Çıkanlar</h1>
            <div id="populerCarousel" className="carousel slide" data-bs-ride="carousel">
              <div className="carousel-inner">
                {populerEtkinlikler.map((etkinlik, idx) => (
                  <div className={`carousel-item${idx === 0 ? " active" : ""}`} key={etkinlik.id}>
                    <img
                      src={etkinlik.img}
                      className="d-block w-100 rounded"
                      alt={etkinlik.ad}
                      style={{ height: 350, objectFit: "cover", cursor: "pointer" }}
                      onClick={() => navigate(`/detay/${etkinlik.id}`,{state:{etkinlik:etkinlik}})}
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
          {/* Sağ Video */}
          <div className="col-12 col-lg-3 d-flex flex-column align-items-start justify-content-center">
            <h1 style={{ visibility: 'hidden' }}>Öne Çıkanlar</h1>
            <video
              src="/images/reklam2.mp4"
              autoPlay
              muted
              loop
              style={{
                width: "100%",
                height: 350,
                borderRadius: "8px",
                objectFit: "cover"
              }}
            />
          </div>
        </div>

        <div className="row g-4 my-4 col-12">
          <EtkinlikKartGrubu baslik="Konserler" veriler={etkinlikler.filter((e)=> e.kategori==="konserler")} link="/konserler" />
          <EtkinlikKartGrubu baslik="Tiyatrolar" veriler={etkinlikler.filter((e)=> e.kategori==="tiyatrolar")} link="/tiyatrolar" />
          <EtkinlikKartGrubu baslik="Spor" veriler={etkinlikler.filter((e)=> e.kategori==="sporlar")} link="/sporlar" />
          <EtkinlikKartGrubu baslik="Sinemalar" veriler={etkinlikler.filter((e)=> e.kategori==="sinemalar")} link="/sinemalar" />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
