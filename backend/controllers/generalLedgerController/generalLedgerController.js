const {
  initializePostgreConnection,
  executePostgreQuery,
} = require("../../services/postgreServices");
const generalLedgerQueue = require("./jobs/generalLedgerJob");

const generalLedgerControllers = async (req, res) => {
  const {
    startDate,
    endDate,
    withAdj,
    withCompany,
    company1,
    company2,
    withCOA,
    coa1,
    coa2,
  } = req.body;

  const { pslh_nrp } = req.user;

  if (!startDate || !endDate) {
    return res
      .status(400)
      .json({ error: "startDate dan endDate harus diberikan" });
  }

  await initializePostgreConnection();

  const query = `
    SELECT COUNT ( * ) AS total_jobs 
    FROM
      "log_request_gl" 
    WHERE
      pslh_nrp = $1
      AND status != 'Completed'
      AND status != 'failed'
  `;

  const params = [pslh_nrp];

  const datalength = await executePostgreQuery(query, params);

  if (datalength.rows[0].total_jobs >= 10) {
    return res.status(400).json({
      error: "Maksimal Tarikan 10 Data , Tarikan Saat ini",
      total_jobs: datalength.rows[0].total_jobs,
    });
  }

  try {
    const job = await generalLedgerQueue.add({
      startDate,
      endDate,
      withAdj,
      withCompany,
      company1,
      company2,
      withCOA,
      coa1,
      coa2,
    });

    const query = `
    INSERT INTO log_request_gl (
      job_id,
      status,
      pslh_nrp,
      start_date,
      end_date,
      with_adjustment,
      with_company,
      id_company,
      with_account,
      id_account
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);
  `;

    const params = [
      job.id,
      "pending",
      pslh_nrp,
      startDate,
      endDate,
      withAdj,
      withCompany,
      `${company1}-${company2}`,
      withCOA,
      `${coa1}-${coa2}`,
    ];

    await executePostgreQuery(query, params);

    res.status(202).json({
      message: "Permintaan Data Diterima, Silahkan Cek Status Secara Berkala.",
      jobId: job.id,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Gagal Melakukan Permintaan Penarikan Data!" });
  }
};

const generalLedgerStatusControllers = async (req, res) => {
  const { pslh_nrp } = req.user;

  await initializePostgreConnection();

  const query = `
    SELECT
      job_id,
      status,
      start_date,
      end_date,
      with_adjustment,
      with_company,
      id_company,
      with_account,
      id_account 
    FROM
      "log_request_gl" 
    WHERE
      pslh_nrp = $1
    ORDER BY
      job_id ASC 
  `;

  const params = [pslh_nrp];

  try {
    const data = await executePostgreQuery(query, params);

    return res.status(200).json({
      success: true,
      ...data,
    });
  } catch (error) {
    res.status(500).json({ error: "Gagal Data!" });
  }
};

module.exports = { generalLedgerControllers, generalLedgerStatusControllers };
