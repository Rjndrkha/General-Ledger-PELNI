const {
  initializePostgreConnection,
  executePostgreQuery,
} = require("../../services/postgreServices");

const viewImageController = async (req, res) => {
  const { imageId } = req.query;

  if (!imageId) {
    return res.status(400).json({ error: "Parameter 'imageId' is required." });
  }

  initializePostgreConnection();
  const query = `
        SELECT * FROM "public"."images_uploaded"
        WHERE id = $1;
    `;
  const params = [imageId];

  const { rows } = await executePostgreQuery(query, params);

  if (rows.length === 0) {
    return res.status(404).json({ error: "Image not found." });
  }

  res.status(200).json({
    message: "Image found.",
    data: rows[0],
  });
};

module.exports = { viewImageController };
