const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();

const connection = mysql.createConnection({
  host: "tramway.proxy.rlwy.net", // sadece host kısmı
  port: 52783,                     // Railway'de verilen özel port
  user: "root",
  password: "gaTBFKBQlRZFZivxqvoeYrqbVDTAoYTY",
  database: "railway",
});

connection.connect((err) => {
  if (err) {
    console.error("MySQL bağlantısı başarısız:", err);
    return;
  }
  console.log("MySQL bağlantısı başarılı.");
});

module.exports = connection;
