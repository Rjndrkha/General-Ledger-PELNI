require("dotenv").config();
const oracledb = require("oracledb");

const oracleClient = oracledb.initOracleClient({
  libDir: process.env.ORACLE_CLIENT,
});

async function OracleConnection() {
  const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    connectString: `(DESCRIPTION=(ADDRESS_LIST=(ADDRESS=(PROTOCOL=${process.env.PROTOCOL})(HOST=${process.env.DB_HOST})(PORT=${process.env.DB_PORT})))(CONNECT_DATA=(SID=${process.env.DB_SID})))`,
  };

  return await oracledb.getConnection(config);
}

async function executeOracleQuery(connection, query) {
  const result = await connection.execute(query);
  return {
    totalData: result.rows.length,
    data: result.rows.map((row) =>
      row.reduce((acc, cur, i) => {
        acc[result.metaData[i].name] = cur;
        return acc;
      }, {})
    ),
  };
}

module.exports = {
  oracleClient,
  OracleConnection,
  executeOracleQuery,
};
