const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server çalışıyor!");
});

// Etkinlikler tablosundaki tüm verileri döndüren endpoint
app.get("/api/etkinlikler", (req, res) => {
  db.query("SELECT * FROM etkinlikler", (err, results) => {
    if (err) {
      console.error("Etkinlikler alınırken hata oluştu:", err);
      return res.status(500).json({ message: "Veritabanı hatası" });
    }
    return res.json(results);
  });
});

db.query('SELECT NOW() AS current_time', (err, results) => {
    if (err) {
      return console.error('Veritabanı hatası');
    }
    console.log(`Veritabanı bağlantısı başarılı! Sunucu zamanı: ${results[0].current_time}`);
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server ${PORT} portunda çalışıyor.`);
});
