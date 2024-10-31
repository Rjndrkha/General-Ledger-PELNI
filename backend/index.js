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
const PORT = 4000;

const post = {};

app.get("/ping", (req, res) => {
  res.json("Pong");
});

app.post("/GeneralLedger", async (req, res) => {
  try {
    const {
      startDate,
      endDate,
      withAdj,
      withCompany,
      company1,
      company2,
      withCOA,
      coa1,
      coa2,
    } = req.body;

    if (!startDate || !endDate) {
      return res
        .status(400)
        .json({ error: "startDate dan endDate harus diberikan" });
    }

    if (!withAdj) {
      return res.status(400).json({ error: "withAdj harus diberikan" });
    }

    if (withCompany == "true" && (!company1 || !company2)) {
      return res.status(400).json({ error: "Company harus diberikan" });
    }

    if (withCOA == "true" && (!coa1 || !coa2)) {
      return res.status(400).json({ error: "COA harus diberikan" });
    }

    // Panggil fungsi oracleGeneralLedger dengan parameter
    const data = await oracleGeneralLedger(
      startDate,
      endDate,
      withAdj,
      withCompany,
      company1,
      company2,
      withCOA,
      coa1,
      coa2
    );

    // Kirim hasil query sebagai response
    res.json(data);
  } catch (error) {
    console.error("Error connecting to Oracle:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/getDataSPJ", async (req, res) => {
  try {
    const { nama } = req.body;
    const upperNama = `%${nama.toUpperCase()}%`;

    if (!nama) {
      return res.status(400).json({ error: "Nama harus diberikan" });
    }

    const data = await OracleCheckSPJ(upperNama);
    res.json(data);
  } catch (error) {
    console.error("Error connecting to Oracle:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log("Server is running on Port", PORT);
});

app.get("/todos", (req, res) => {
  const data = axios
    .get("https://jsonplaceholder.typicode.com/todos")
    .then((response) => {
      res.json(response.data);
    });
});
