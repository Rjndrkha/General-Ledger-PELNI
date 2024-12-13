const {
  executePostgreQuery,
  initializePostgreConnection,
} = require("../../services/postgreServices");
const fs = require("fs");

async function generalLedgerDownload(req, res) {
  const { jobId } = req.params;
  const { pslh_nrp } = req.user;

  try {
    const connection = await initializePostgreConnection();

    const query = `
      SELECT file_path
      FROM log_request_gl
      WHERE job_id = $1 AND status = 'Completed' AND pslh_nrp = $2
    `;
    const params = [jobId, pslh_nrp];
    const result = await executePostgreQuery(query, params);

    if (!result?.rows || result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: `File untuk job_id ${jobId} dengan NRP ${pslh_nrp} tidak ditemukan atau belum selesai.`,
      });
    }

    const file_path = result.rows[0].file_path;

    if (file_path) {
      if (!fs.existsSync(file_path)) {
        return res.status(404).json({
          success: false,
          message: `File tidak ditemukan di server: ${file_path}`,
        });
      }

      const readFile = fs.readFileSync(file_path, "utf8");
      const jsonData = JSON.parse(readFile);

      return res.status(200).json({
        success: true,
        jsonData,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Terjadi kesalahan pada server.",
      error: error.message,
    });
  }
}

module.exports = generalLedgerDownload;
