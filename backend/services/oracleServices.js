require("dotenv").config();
const oracledb = require("oracledb");

const oracleClient = oracledb.initOracleClient({
  libDir: process.env.ORACLE_CLIENT,
});

async function OracleConnection() {
  const config = {
    user: process.env.DB_USER_ORACLE_FINANCE,
    password: process.env.DB_PASSWORD_ORACLE_FINANCE,
    connectString: `(DESCRIPTION=(ADDRESS_LIST=(ADDRESS=(PROTOCOL=${process.env.PROTOCOL})(HOST=${process.env.DB_HOST_ORACLE_FINANCE})(PORT=${process.env.DB_PORT_ORACLE_FINANCE})))(CONNECT_DATA=(SID=${process.env.DB_SID_ORACLE_FINANCE})))`,
  };

  return await oracledb.getConnection(config);
}

async function executeOracleQuery(connection, query, params) {
  const result = await connection.execute(query, params, {
    outFormat: oracledb.OUT_FORMAT_OBJECT,
  });
  return {
    totalData: result.rows.length,
    // data: result.rows.map((row) =>
    //   row.reduce((acc, cur, i) => {
    //     acc[result.metaData[i].name] = cur;
    //     return acc;
    //   }, {})
    // ),
    data: result.rows,
  };
}

module.exports = {
  oracleClient,
  OracleConnection,
  executeOracleQuery,
};
