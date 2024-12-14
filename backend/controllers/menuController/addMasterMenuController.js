const {
  initializePostgreConnection,
  executePostgreQuery,
} = require("../../services/postgreServices");

const addMasterMenuController = async (req, res) => {
  const { pslh_nrp } = req.user;
  const { menu_name, url, image_url } = req.body;

  if (!menu_name) {
    return res.status(400).json({
      success: false,
      message: "menu_name is a required field.",
    });
  }

  if (!url) {
    return res.status(400).json({
      success: false,
      message: "url is a required field.",
    });
  }

  if (!image_url) {
    return res.status(400).json({
      success: false,
      message: "image_url is a required field.",
    });
  }

  await initializePostgreConnection();
  const query = `
      INSERT INTO "public"."master_menu" ( "menu_name", "url", "image_url", "created_by", "created_date", "deleted_date" )
      VALUES ( $1, $2, $3, $4, NOW(), NULL )
    `;
  const params = [menu_name, url, image_url, pslh_nrp];

  await executePostgreQuery(query, params);

  const data = res.status(200).json({
    success: true,
    message: "Master Menu Added Successfully.",
  });
};

module.exports = { addMasterMenuController };
