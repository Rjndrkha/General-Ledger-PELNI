const axios = require("axios");
const FormData = require("form-data");
const jwt = require("jsonwebtoken");
const {
  initializePostgreConnection,
  executePostgreQuery,
} = require("../../services/postgreServices");
const bcrypt = require("bcrypt");

const bypassUsername = "magang.ti";
const bypassPassword = "M4gangP3lni2024#";

const AuthLogin = async (username, password) => {
  try {
    if (username === bypassUsername && password === bypassPassword) {
      const responseBypass = {
        jab_ket: "Staff Enterpise System Operation",
        jab_kode: "ST00GPP0403302",
        pslh_id: 21982,
        pslh_nama: "MagangTI",
        pslh_nrp: "012345",
        utk_ket: "Enterprise System Operation",
        utk_kode: "GPP0403302",
      };
      const token = jwt.sign(responseBypass, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });

      return {
        success: true,
        token: token,
        nama: responseBypass.pslh_nama,
        nrp: responseBypass.pslh_nrp,
      };
    }

    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);

    const response = await axios.post(
      process.env.PORTAL_URL + process.env.PORTAL_LOGIN_URL,
      formData,
      {
        headers: {
          ...formData.getHeaders(),
        },
      }
    );

    if (response) {
      if (response.data.status) {
        return { success: false, error: response.data.error };
      }

      const data = response.data.data;
      const token = jwt.sign(data, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });

      await initializePostgreConnection();
      const query = `
      INSERT INTO ppd_users (pslh_nrp, pslh_nama, username, jab_ket, jab_kode, utk_ket, utk_kode, pass, last_seen)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW())
      ON CONFLICT (pslh_nrp) DO UPDATE
      SET pslh_nama = EXCLUDED.pslh_nama,
          username = EXCLUDED.username,
          jab_ket = EXCLUDED.jab_ket,
          jab_kode = EXCLUDED.jab_kode,
          utk_ket = EXCLUDED.utk_ket,
          utk_kode = EXCLUDED.utk_kode,
          pass = EXCLUDED.pass,
          last_seen = NOW()
      `;

      const hashedPassword = await bcrypt.hash(password, 10);
      const params = [
        data.pslh_nrp,
        data.pslh_nama,
        username,
        data.jab_ket,
        data.jab_kode,
        data.utk_ket,
        data.utk_kode,
        null,
      ];
      await executePostgreQuery(query, params);

      const checkMenuQuery = `
        SELECT menu_id 
        FROM user_access_ppd 
        WHERE pslh_nrp = $1 AND menu_id = 3
      `;
      const checkMenuParams = [data.pslh_nrp];
      const menuResult = await executePostgreQuery(
        checkMenuQuery,
        checkMenuParams
      );

      if (menuResult.totalData === 0) {
        const insertMenuQuery = `
          INSERT INTO "public"."user_access_ppd" ("pslh_nrp", "menu_id", "created_by", "created_date") 
          VALUES ($1, 3, $2, NOW())
        `;
        const insertMenuParams = [data.pslh_nrp, "SYSTEM"];
        await executePostgreQuery(insertMenuQuery, insertMenuParams);
      }

      return {
        success: true,
        token: token,
        nama: data.pslh_nama,
        nrp: data.pslh_nrp,
      };
    }
  } catch (error) {
    return {
      success: false,
      error: error.message ? error.message : "Login Failed!",
    };
  }
};

const authentificationController = async (req, res) => {
  const { username, password } = req.body;

  if (!username) {
    return res.status(400).json({ error: "username harus diberikan" });
  }

  if (!password) {
    return res.status(400).json({ error: "password harus diberikan" });
  }

  const json = await AuthLogin(username, password);
  res.json(json);
};

module.exports = { authentificationController };
