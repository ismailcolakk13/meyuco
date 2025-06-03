import { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { EtkinliklerContext, UserContext } from "../data/Context";
import axios from "axios";
import Spinner from "../Components/Spinner";

// 👇 SeatSelection bileşeni
const SeatSelection = ({ selectedSeats, setSelectedSeats, adet, doluKoltuklar }) =>
{
    const rows = ["A", "B", "C", "D", "E", "F"];
    const cols = 10;

    const toggleSeat = (seatId) =>
    {
        if (doluKoltuklar.includes(seatId)) return; // Dolu koltuk tıklanamaz
        if (selectedSeats.includes(seatId))
        {
            setSelectedSeats((prev) => prev.filter((s) => s !== seatId));
        } else
        {
            if (selectedSeats.length >= adet)
            {
                alert(`En fazla ${adet} koltuk seçebilirsiniz.`);
                return;
            }
            setSelectedSeats((prev) => [...prev, seatId]);
        }
    };

    return (
        <div className="text-center mb-4">
            <div className="mb-2 text-muted">Perde</div>
            {rows.map((row) => (
                <div key={row} className="d-flex justify-content-center mb-1">
                    {Array.from({ length: cols }).map((_, i) =>
                    {
                        const seatId = `${row}${i + 1}`;
                        const isSelected = selectedSeats.includes(seatId);
                        const isFull = doluKoltuklar.includes(seatId);
                        return (
                            <div
                                key={seatId}
                                onClick={() => toggleSeat(seatId)}
                                style={{
                                    width: 30,
                                    height: 30,
                                    margin: 4,
                                    borderRadius: 4,
                                    cursor: isFull ? "not-allowed" : "pointer",
                                    backgroundColor: isFull ? "#d9534f" : (isSelected ? "#176763" : "#ccc"), // kırmızı: dolu, yeşil: seçili, gri: boş
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    fontSize: 12,
                                    fontWeight: "bold",
                                    color: isFull ? "#fff" : (isSelected ? "#fff" : "#333"),
                                    opacity: isFull ? 0.7 : 1
                                }}
                                title={isFull ? "Dolu Koltuk" : seatId}
                            >
                                {i + 1}
                            </div>
                        );
                    })}
                </div>
            ))}
        </div>
    );
};

// 👇 Ana bileşen
const BiletSatinalPage = () =>
{
    const { id } = useParams();
    const { etkinlikler } = useContext(EtkinliklerContext);
    const { user } = useContext(UserContext);
    const [adet, setAdet] = useState(1);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [doluKoltuklar, setDoluKoltuklar] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const etkinlik = etkinlikler.find((e) => e.id === parseInt(id));
    const [bilet, setBilet] = useState({});

    useEffect(() =>
    {
        setLoading(true);
        axios.get(`/api/etkinlik-dolu-koltuklar/${id}`)
            .then(res =>
            {
                // Her eleman virgüllü string olabilir, hepsini tek tek ayır
                let dolular = res.data.dolu_koltuklar || [];
                dolular = dolular.flatMap(item =>
                    typeof item === 'string' ? item.split(',').map(s => s.trim()) : []
                );
                setDoluKoltuklar(dolular);
                setLoading(false);
            })
            .catch(() =>
            {
                setDoluKoltuklar([]);
                setLoading(false);
            });
    }, [id]);

    if (!etkinlik || loading)
    {
        return (
            <div className="container my-5">
                {loading ? (
                    <Spinner message="Koltuk bilgileri yükleniyor..." />
                ) : (
                    <div className="alert alert-info text-center">
                        Etkinlik bulunamadı.
                    </div>
                )}
            </div>
        );
    }

    const handleSubmit = (e) =>
    {
        e.preventDefault();
        if (!user)
        {
            alert("Lütfen giriş yapınız.");
            return;
        }
        if (selectedSeats.length !== parseInt(adet))
        {
            alert(`Lütfen tam olarak ${adet} koltuk seçin.`);
            return;
        }
        const yeniBilet = {
            etkinlik,
            koltuklar: selectedSeats,
            adet: adet,
            toplamFiyat: etkinlik.fiyat * adet
        };
        setBilet(yeniBilet);
        console.log("Bilet Bilgisi:", yeniBilet);
        navigate(`/odeme/${id}`, { state: { bilet: yeniBilet } });
    };

    return (
        <div className="container my-5">
            <h2 className="text-center mb-4">🎟️ Bilet Satın Al – {etkinlik.ad}</h2>

            <form
                onSubmit={handleSubmit}
                className="p-4 bg-light rounded shadow-sm"
                style={{ maxWidth: "500px", margin: "auto" }}
            >
                <div className="mb-3">
                    <label className="form-label">Bilet Adedi</label>
                    <input
                        type="number"
                        min="1"
                        max="10"
                        value={adet}
                        onChange={(e) =>
                        {
                            setAdet(parseInt(e.target.value));
                            setSelectedSeats([]); // koltukları sıfırla
                        }}
                        className="form-control"
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Koltuk Seçimi</label>
                    <SeatSelection
                        adet={adet}
                        selectedSeats={selectedSeats}
                        setSelectedSeats={setSelectedSeats}
                        doluKoltuklar={doluKoltuklar}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Seçilen Koltuklar</label>
                    <input
                        type="text"
                        value={selectedSeats.join(", ")}
                        readOnly
                        className="form-control"
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Toplam Fiyat</label>
                    <input
                        type="text"
                        value={etkinlik ? (etkinlik.fiyat * adet) + " TL" : ""}
                        readOnly
                        className="form-control fw-bold text-success"
                    />
                </div>
                <button
                    type="submit"
                    className="w-100 text-white border-0"
                    style={{
                        background: "linear-gradient(135deg, #1C2D41, #18B38C)",
                        padding: "10px",
                        borderRadius: "5px",
                        fontWeight: "bold"
                    }}
                >
                    Ödemeye Geç
                </button>

            </form>
        </div>
    );
};

export default BiletSatinalPage;
