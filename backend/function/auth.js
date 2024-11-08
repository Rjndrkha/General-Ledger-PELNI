const axios = require("axios");
const FormData = require("form-data");
const jwt = require("jsonwebtoken");

const AuthLogin = async (username, password) => {
  try {
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
      const token = jwt.sign(response.data.data, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      return {
        success: true,
        token: token,
        nama: response.data.data.pslh_nama,
        nrp: response.data.data.pslh_nrp,
      };
    }
  } catch (error) {
    return { success: false, error: error.message };
  }
};

module.exports = { AuthLogin };
