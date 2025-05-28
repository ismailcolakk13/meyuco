import { Link } from "react-router-dom";
import { konserler, sinemalar, sporlar, tiyatrolar } from "../data/etkinlikler";

const populerEtkinlikler = [
  konserler[1],
  tiyatrolar[1],
  sporlar[5],
];

const etkinlikKart = (etkinlik) => (
  <div key={etkinlik.id} className="col-6 d-flex flex-column align-items-center mb-4">
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

const EtkinlikKartGrubu = ({ baslik, veriler, link }) => (
  <div className="col-12 col-sm-6 col-lg-3">
    <div className="border rounded p-3 h-100 d-flex flex-column">
      <h2 className="mb-3">{baslik}</h2>
      <div className="row mb-auto">{veriler.slice(0, 2).map(etkinlikKart)}</div>
      <div className="row">{veriler.slice(2, 4).map(etkinlikKart)}</div>
      <Link to={link} className="text-decoration-none text-dark btn btn-warning mt-auto">
        Daha Fazla
      </Link>
    </div>
  </div>
);

const HomePage = () =>
{
  return (
    <div className="position-relative">
      {/* Sol Video */}
      <div style={{
        position: "fixed",
        left: 0,
        top: "100px",
        width: "400px",
        height: "920px",
        zIndex: 1000
      }}>
        <video
          src="public/images/raklam1.mp4"
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
      <div style={{
        position: "fixed",
        right: 0,
        top: "100px",
        width: "400px",
        height: "920px",
        zIndex: 1000
      }}>
        <video
          src="public/images/reklam2.mp4"
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
                      style={{ maxHeight: 350, objectFit: "cover" }}
                    />
                    <div className="carousel-caption d-none d-md-block">
                      <h5 style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: '5px', borderRadius: '5px', display: "inline" }}>{etkinlik.ad}</h5>
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
