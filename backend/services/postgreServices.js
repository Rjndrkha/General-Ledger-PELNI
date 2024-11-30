require("dotenv").config();
const { Client } = require("pg");

const PostgreClient = new Client({
  host: process.env.DB_HOST_POSTGRE_PPD,
  user: process.env.DB_USER_POSTGRE_PPD,
  password: process.env.DB_PASSWORD_POSTGRE_PPD,
  database: process.env.DB_DATABASE_POSTGRE_PPD,
  port: process.env.DB_PORT_POSTGRE_PPD,
});

async function initializePostgreConnection() {
  try {
    await PostgreClient.connect();
    console.log("Connected to PostgreSQL");
  } catch (error) {
    console.error("Failed to initialize PostgreSQL connection", error.stack);
    process.exit(1);
  }
}

async function executePostgreQuery(query, params) {
  try {
    const result = await PostgreClient.query(query, params);
    if (result.command === "INSERT" || result.command === "UPDATE") {
      return {
        totalData: result.rowCount,
        message: "Data executed successfully",
      };
    }
    return {
      totalData: result.rows.length,
      rows: result.rows,
      message: "Data fetched successfully",
    };
  } catch (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
}

module.exports = {
  initializePostgreConnection,
  executePostgreQuery,
};
