import React, { useState } from "react";
import { useParams } from "react-router-dom";

// 👇 SeatSelection bileşeni
const SeatSelection = ({ selectedSeats, setSelectedSeats, adet }) =>
{
    const rows = ["A", "B", "C", "D", "E", "F"];
    const cols = 10;

    const toggleSeat = (seatId) =>
    {
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
                        return (
                            <div
                                key={seatId}
                                onClick={() => toggleSeat(seatId)}
                                style={{
                                    width: 30,
                                    height: 30,
                                    margin: 4,
                                    borderRadius: 4,
                                    cursor: "pointer",
                                    backgroundColor: isSelected ? "#F39C12" : "#ccc",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    fontSize: 12,
                                    fontWeight: "bold",
                                    color: isSelected ? "#fff" : "#333",
                                }}
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
    const [adet, setAdet] = useState(1);
    const [selectedSeats, setSelectedSeats] = useState([]);

    const handleSubmit = (e) =>
    {
        e.preventDefault();
        if (selectedSeats.length !== parseInt(adet))
        {
            alert(`Lütfen tam olarak ${adet} koltuk seçin.`);
            return;
        }

        alert(`${adet} adet bilet satın alındı.\nKoltuklar: ${selectedSeats.join(", ")}`);
    };

    return (
        <div className="container my-5">
            <h2 className="text-center mb-4">🎟️ Bilet Satın Al – Etkinlik #{id}</h2>

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

                <button type="submit" className="btn btn-primary w-100">
                    Satın Al
                </button>
            </form>
        </div>
    );
};

export default BiletSatinalPage;
