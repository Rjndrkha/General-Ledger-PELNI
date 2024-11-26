require("dotenv").config();
const oracledb = require("oracledb");

const oracleClient = oracledb.initOracleClient({
  libDir: process.env.ORACLE_CLIENT,
});

async function OracleConnection(dbType, dbSchema) {
  let database = "";
  let config = {};

  if (dbType === "sdm") {
    if (dbSchema === "bl") {
      database = process.env.DB_DATABASE_ORACLE_BL;
    } else {
      config = {
        user: process.env.DB_USER_ORACLE_SDM,
        password: process.env.DB_PASSWORD_ORACLE_SDM,
        connectString: `(DESCRIPTION=(ADDRESS_LIST=(ADDRESS=(PROTOCOL=${process.env.PROTOCOL})(HOST=${process.env.DB_HOST_ORACLE_SDM})(PORT=${process.env.DB_PORT_ORACLE_SDM})))(CONNECT_DATA=(SID=${process.env.DB_SID_ORACLE_SDM})))`,
        database: database,
      };
    }
  } else {
    config = {
      user: process.env.DB_USER_ORACLE_FINANCE,
      password: process.env.DB_PASSWORD_ORACLE_FINANCE,
      connectString: `(DESCRIPTION=(ADDRESS_LIST=(ADDRESS=(PROTOCOL=${process.env.PROTOCOL})(HOST=${process.env.DB_HOST_ORACLE_FINANCE})(PORT=${process.env.DB_PORT_ORACLE_FINANCE})))(CONNECT_DATA=(SID=${process.env.DB_SID_ORACLE_FINANCE})))`,
    };
  }

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
