import { useNavigate } from "react-router-dom";

const EtkinlikGrupPage = ({ baslik, etkinlikler }) =>
{
  const navigate = useNavigate();

  const kategori = baslik.toLowerCase(); // örnek: "Konserler" -> "konserler"

  const handleBiletBul = (id) =>
  {
    navigate(`/bilet-satin-al/${id}`);
  };

  const handleDetay = (id) =>
  {
    navigate(`/detay/${kategori}/${id}`);
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-5 fw-bold">{baslik}</h2>
      <div className="row justify-content-center">
        {etkinlikler.map((etkinlik) => (
          <div key={etkinlik.id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
            <div className="card shadow-sm h-100 text-center border-0">
              <img
                src={etkinlik.img}
                alt={etkinlik.ad}
                className="card-img-top"
                style={{
                  height: 400,
                  objectFit: "fill",
                  borderTopLeftRadius: "8px",
                  borderTopRightRadius: "8px",
                }}
              />
              <div className="card-body">
                <h5 className="card-title">{etkinlik.ad}</h5>

                <div className="d-flex justify-content-center gap-2">
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => handleBiletBul(etkinlik.id)}
                  >
                    Bilet Bul
                  </button>

                  <button
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => handleDetay(etkinlik.id)}
                  >
                    Detay
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EtkinlikGrupPage;
