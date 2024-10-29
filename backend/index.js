const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { default: axios } = require("axios");
const { oracleGeneralLedger } = require("./function/GeneralLedger");
const { OracleCheckSPJ } = require("./function/SPJ");

const app = express();
// Middleware untuk parsing data form application/x-www-form-urlencoded
// app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const post = {};

app.get("/api/ping", (req, res) => {
  res.send("Pong");
});

app.post("/api/GeneralLedger", async (req, res) => {
  try {
    // Mengambil parameter dari body POST request
    const { startDate, endDate } = req.body;

    // Pastikan parameter diterima dengan benar
    if (!startDate || !endDate) {
      return res
        .status(400)
        .json({ error: "startDate dan endDate harus diberikan" });
    }

    // Panggil fungsi oracleGeneralLedger dengan parameter
    const data = await oracleGeneralLedger(startDate, endDate);

    // Kirim hasil query sebagai response
    res.json(data);
  } catch (error) {
    console.error("Error connecting to Oracle:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/api/getDataSPJ/:nama", async (req, res) => {
  try {
    const descriptionParam = `%${req.params.nama.toUpperCase()}%`;

    const data = await OracleCheckSPJ(descriptionParam);
    res.json(data);
  } catch (error) {
    console.error("Error connecting to Oracle:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 4000");
});

app.get("/todos", (req, res) => {
  const data = axios
    .get("https://jsonplaceholder.typicode.com/todos")
    .then((response) => {
      res.json(response.data);
    });
});
