const {
  initializePostgreConnection,
  executePostgreQuery,
} = require("../../services/postgreServices");

const getUserMenuController = async (req, res) => {
  const { pslh_nrp } = req.user;

  if (!pslh_nrp) {
    return res.status(400).json({
      success: false,
      message: "NRP is required.",
    });
  }

  initializePostgreConnection();

  try {
    const userMenuQuery = `
      SELECT a.menu_id
      FROM "user_access_pdd" a 
      WHERE a.pslh_nrp = $1
    `;
    const userMenuParams = [pslh_nrp];
    const userMenuResult = await executePostgreQuery(
      userMenuQuery,
      userMenuParams
    );

    const userMenuIds = userMenuResult.rows.map((row) => row.menu_id);

    const allMenuQuery = `
      SELECT 
        id AS key,
        menu_name AS label,
        url AS link,
        image_url
      FROM master_menu
      ORDER BY id ASC
    `;
    const allMenuResult = await executePostgreQuery(allMenuQuery);

    let transformedData = allMenuResult.rows.map((item) => ({
      key: String(item.key),
      label: item.label,
      image_url: item.image_url,
      link: userMenuIds.includes(item.key) ? item.link : "#",
      active: userMenuIds.includes(item.key),
    }));

    transformedData = transformedData.sort((a, b) => b.active - a.active);

    return res.status(200).json({
      success: true,
      data: transformedData,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Terjadi kesalahan pada server.",
      error: error.message,
    });
  }
};

module.exports = { getUserMenuController };
