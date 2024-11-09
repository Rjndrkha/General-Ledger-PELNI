const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const {
  authentificationController,
} = require("./controllers/authentificationController");
const {
  generalLedgerControllers,
} = require("./controllers/generalLedgerController");
const {
  errorHandler,
  asyncHandler,
  errorRouteHandler,
} = require("./middleware/errorHandler");
const {
  perjalananDinasControllers,
} = require("./controllers/perjalananDinasController");
const { authenticateToken } = require("./middleware/middleware");
require("dotenv").config();

const app = express();
// Middleware untuk parsing data form application/x-www-form-urlencoded
// app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(errorRouteHandler);
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log("Server is running on Port", process.env.PORT);
});

//Routes
app.get("/ping", (req, res) => {
  res.json("Up and Running");
});

app.post(
  "/GeneralLedger",
  authenticateToken,
  asyncHandler(generalLedgerControllers)
);

app.post(
  "/getDataSPJ",
  authenticateToken,
  asyncHandler(perjalananDinasControllers)
);

app.post("/auth/login", asyncHandler(authentificationController));
