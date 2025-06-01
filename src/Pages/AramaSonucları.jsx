import { useLocation, useNavigate } from "react-router-dom"; 
import { etkinlikListesi, formatTarih } from "../data/etkinlikler";

const AramaSonuclari = () => {
  const { search } = useLocation();
  const navigate = useNavigate(); 
  const query = new URLSearchParams(search).get("query")?.toLowerCase() || "";

  const filtrelenmisEtkinlikler = etkinlikListesi.filter((etkinlik) =>
    etkinlik.ad.toLowerCase().includes(query)
  );

  return (
    <div className="container mt-4">
      <h4 className="mb-3">
        Arama Sonuçları: <strong>{query}</strong>
      </h4>

      {filtrelenmisEtkinlikler.length === 0 ? (
        <p>“{query}” için bir etkinlik bulunamadı.</p>
      ) : (
        filtrelenmisEtkinlikler.map((etkinlik) => (
          <div key={etkinlik.id} className="row mb-4 border-bottom pb-4">
            <div className="col-md-4">
              <img
                src={etkinlik.img}
                alt={etkinlik.ad}
                className="img-fluid rounded"
              />
            </div>
            <div className="col-md-8">
              <h3>{etkinlik.ad}</h3>
              <p>{etkinlik.aciklama}</p>
              <p>
                <strong>Tarih:</strong> {formatTarih(etkinlik.tarih)}<br />
                <strong>Mekan:</strong> {etkinlik.mekan}
              </p>
              <p>
                <strong>Bilet Fiyatı:</strong> {etkinlik.fiyat}₺
              </p>
              <button
                className="btn btn-success"
                onClick={() => navigate(`/bilet-satin-al/${etkinlik.id}`)} 
              >
                Bilet Satın Al
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default AramaSonuclari;

