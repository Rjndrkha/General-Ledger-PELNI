const { upload } = require("../../services/imageService");
const {
  initializePostgreConnection,
  executePostgreQuery,
} = require("../../services/postgreServices");

const UploadImageController = (req, res, next) => {
  upload.single("image")(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    const { pslh_nrp } = req.body;
    if (!req.file) {
      return res.status(400).json({ error: "File 'image' is required." });
    }

    if (!pslh_nrp) {
      return res
        .status(400)
        .json({ error: "Parameter 'pslh_nrp' is required." });
    }

    await initializePostgreConnection();
    const fileUrl = `${req.protocol}://${req.get("host")}/images/view-images/${
      req.file.filename
    }`;

    const query = `
      INSERT INTO "public"."images_uploaded" ("pslh_nrp", "image_url")
      VALUES ($1, $2)
      RETURNING id, created_date;
    `;
    const params = [pslh_nrp, fileUrl];
    await executePostgreQuery(query, params);

    res.status(201).json({
      message: "File uploaded successfully.",
      file: {
        filename: req.file.filename,
        url: fileUrl,
        size: req.file.size,
      },
    });
  });
};

module.exports = { UploadImageController };
