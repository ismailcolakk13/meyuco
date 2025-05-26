import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const EtkinlikGrupPage = ({ baslik, etkinlikler }) =>
{
  const navigate = useNavigate();
  const isLoggedIn = false;
  const [detaylar, setDetaylar] = useState({});

  const handleSatinAl = (id) =>
  {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      alert(`${id} numaralı etkinlikten bilet satın alındı.`);
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
                    onClick={() => handleSatinAl(etkinlik.id)}
                  >
                    Satın Al
                  </button>
                  <button
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => toggleDetay(etkinlik.id)}
                  >
                    Detay
                  </button>
                </div>

                {detaylar[etkinlik.id] && (
                  <div className="mt-3 p-2 bg-light rounded shadow-sm">
                    <small className="text-secondary">{etkinlik.aciklama}</small>
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

export default EtkinlikGrupPage;
