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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server ${PORT} portunda çalışıyor.`);
});
