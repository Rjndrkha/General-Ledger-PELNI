const { executePostgreQuery } = require("../../../services/postgreServices");

const jobStatusHandler = async (status, job, err = null) => {
  const message = err
    ? err.message
    : status === "active"
    ? "Job is active"
    : null;
  await updateLogStatus(job.id, status, err?.message || null, null);
  return { process: status, message };
};

async function updateLogStatus(jobId, status, errorMessage = null, filepath) {
  const query = `
    UPDATE log_request_gl
    SET status = $1, error_message = $2, completed_at = CASE WHEN $1 = 'completed' THEN NOW() ELSE NULL END, file_path = $4
    WHERE job_id = $3
  `;
  const params = [status, errorMessage, jobId, filepath];
  await executePostgreQuery(query, params);
}

module.exports = { jobStatusHandler, updateLogStatus };
