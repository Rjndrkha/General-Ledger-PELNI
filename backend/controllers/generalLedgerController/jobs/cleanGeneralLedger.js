const fs = require("fs");
const path = require("path");
const {
  initializePostgreConnection,
  executePostgreQuery,
} = require("../../../services/postgreServices");

async function cleanOldFiles() {
  const daysLimit = 10;

  try {
    const connection = await initializePostgreConnection();

    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - daysLimit);
    const formattedDate = currentDate.toISOString().split("T")[0]; // YYYY-MM-DD

    const query = `
      SELECT id, file_path
      FROM log_request_gl
      WHERE completed_at < $1
    `;
    const params = [formattedDate];
    const result = await executePostgreQuery(query, params);

    if (result?.rows.length > 0) {
      for (const row of result.rows) {
        const { id, file_path } = row;

        if (fs.existsSync(file_path)) {
          fs.unlinkSync(file_path);
          console.log(`File ${file_path} berhasil dihapus.`);
        } else {
          console.warn(`File ${file_path} tidak ditemukan.`);
        }

        const deleteQuery = `DELETE FROM log_request_gl WHERE id = $1`;
        await executePostgreQuery(deleteQuery, [id]);
        console.log(`Data untuk id ${id} berhasil dihapus.`);
      }
    } else {
      console.log("Tidak ada file lama yang ditemukan untuk dihapus.");
    }
  } catch (error) {
    console.error(
      "Terjadi kesalahan saat membersihkan file lama:",
      error.message
    );
  }
}

module.exports = cleanOldFiles;
