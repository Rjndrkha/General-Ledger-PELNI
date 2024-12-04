const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const {
  authentificationController,
} = require("./controllers/authentificationController");
const {
  generalLedgerControllers,
  downloadGLFile,
} = require("./controllers/generalLedgerController/generalLedgerController");
const {
  errorHandler,
  asyncHandler,
  errorRouteHandler,
} = require("./middleware/errorHandler");
const {
  perjalananDinasControllers,
} = require("./controllers/perjalananDinasController");
const { authenticateToken } = require("./middleware/middleware");
const { BLControllers } = require("./controllers/blController");
const {
  viewImageController,
} = require("./controllers/imageController/viewController");
const {
  UploadImageController,
} = require("./controllers/imageController/uploadController");
const serverAdapter = require("./controllers/bullController/bullController");
const generalLedgerDownload = require("./controllers/generalLedgerController/downloadController");

require("dotenv").config();

const app = express();
// Middleware untuk parsing data form application/x-www-form-urlencoded
// app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
// app.use(errorRouteHandler);
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log("Server is running on Port", process.env.PORT);
});

//Routes
app.get("/ping", (req, res) => {
  res.json("Up and Running");
});

app.use("/admin/bull-queues", serverAdapter.getRouter());

app.post(
  "/bl",
  // authenticateToken,
  asyncHandler(BLControllers)
);

app.post(
  "/uploadImage",
  // authenticateToken,
  asyncHandler(UploadImageController)
);

app.post(
  "/images/detail",
  // authenticateToken,
  asyncHandler(viewImageController)
);

app.use("/images/view-images", express.static("upload-images"));

app.post(
  "/GeneralLedger",
  authenticateToken,
  asyncHandler(generalLedgerControllers)
);

app.get(
  "/GeneralLedger/download/:jobId",
  authenticateToken,
  asyncHandler(generalLedgerDownload)
);

app.post(
  "/getDataSPJ",
  authenticateToken,
  asyncHandler(perjalananDinasControllers)
);

app.post("/auth/login", asyncHandler(authentificationController));
