import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useNavigate } from 'react-router-dom';

const konserler_rock = [
  { id: 1, ad: "Hayko Cepkin", img:"/images/hayko.jpg" },
  { id: 2, ad: "AC/DC", img: "/images/ACDC.jpg" },
  { id: 3, ad: "Duman", img: "/images/duman.png" },
  { id: 4, ad: "Mor ve Ötesi", img: "/images/mvö.png" },
];
const konserler_caz = [
  { id: 1, ad: "Konser X", img: "https://placehold.co/300x200?text=Konser+X" },
  { id: 2, ad: "Konser Y", img: "https://placehold.co/300x200?text=Konser+Y" },
  { id: 3, ad: "Konser Z", img: "https://placehold.co/300x200?text=Konser+Z" },
  { id: 4, ad: "Konser W", img: "https://placehold.co/300x200?text=Konser+W" },
];

const EtkinlikKart = ({ etkinlik }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/login");
  };

  return (
    <div className="col-6 col-md-4 col-lg-3 d-flex flex-column align-items-center mb-4">
      <img
        src={etkinlik.img}
        alt={etkinlik.ad}
        style={{
          width: 170,
          height: 120,
          objectFit: "cover",
          borderRadius: 10,
          border: "1px solid #ddd",
          background: "#fff"
        }}
      />
      <span className="mt-2 text-center small">{etkinlik.ad}</span>
      <button className="btn btn-primary mt-2" onClick={handleClick}>Bilet bul</button>
    </div>
  );
};

const Konserler = () => {
  return (
    <div className="container my-4">
      <h1 className="mb-4">Rock Konserleri</h1>
      <div className="row">
        {konserler_rock.map(konser => (
          <EtkinlikKart key={konser.id} etkinlik={konser} />
        ))}
      </div>
      <h1>Caz Konserleri</h1>
      <div className="row">
        {konserler_caz.map(konser => (
          <EtkinlikKart key={konser.id} etkinlik={konser} />
        ))}
      </div>
    </div>
  );
};

export default Konserler;
