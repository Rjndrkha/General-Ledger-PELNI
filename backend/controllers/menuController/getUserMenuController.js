const {
  initializePostgreConnection,
  executePostgreQuery,
} = require("../../services/postgreServices");

const getUserMenuController = async (req, res) => {
  const { pslh_nrp } = req.user;

  initializePostgreConnection();
  const query = `
    SELECT 
        a.pslh_nrp,
        a.menu_id,
        b.menu_name,
        b.url,
        b.image_url 
    FROM
        "user_access_pdd" a 
    JOIN master_menu b ON a.menu_id = b."id" 
    WHERE
        a.pslh_nrp = $1
    ORDER BY a.menu_id ASC
    `;
  const params = [pslh_nrp];

  if (!pslh_nrp) {
    return res.status(400).json({
      message: "NRP is required.",
    });
  }

  const { rows } = await executePostgreQuery(query, params);
  const transformedData = rows.map((item) => ({
    key: String(item.menu_id),
    label: item.menu_name,
    image_url: item.image_url,
    link: item.url,
  }));

  const data = res.status(200).json({
    success: true,
    data: transformedData,
  });
};

module.exports = { getUserMenuController };
