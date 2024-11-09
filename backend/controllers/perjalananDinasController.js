const {
  executeOracleQuery,
  OracleConnection,
} = require("../services/oracleServices");

const perjalananDinasControllers = async (req, res) => {
  const { nama } = req.body;

  let connection;
  connection = await OracleConnection();

  console.log("Connection Success!");

  if (!nama) {
    return res.status(400).json({ error: "Nama harus diberikan" });
  }

  if (!/^[a-zA-Z]+$/.test(nama)) {
    return res.status(400).json({ error: "Parameter Harus Alfabet" });
  }

  const upperNama = `%${nama.toUpperCase()}%`;
  const query = `
      SELECT
      hou.name AS ou_name,
      decode(
        ap_invoices_utility_pkg.get_approval_status ( aih.invoice_id, aih.invoice_amount, aih.payment_status_flag, aih.invoice_type_lookup_code ),
        'FULL',
        'Fully Applied',
        'NEVER APPROVED',
        'Never Validated',
        'NEEDS REAPPROVAL',
        'Needs Revalidation',
        'CANCELLED',
        'Cancelled',
        'UNPAID',
        'Unpaid',
        'AVAILABLE',
        'Available',
        'UNAPPROVED',
        'Unvalidated',
        'APPROVED',
        'Validated',
        'PERMANENT',
        'Permanent Prepayment',
      NULL 
      ) AS inv_status,
      aih.payment_status_flag,
      aps.vendor_name,
      aih.invoice_id,
      aih.invoice_num AS nomer_tagihan,
      aih.doc_sequence_value AS invoice_number,
      aih.gl_date,
      aih.invoice_date,
      aih.invoice_currency_code,
      pay.check_date AS payment_date,
      aih.invoice_amount,
      NVL( pph.pph_amt, 0 ) AS pph_amt,
      NVL( prepay.prepay_amt, 0 ) AS prepay_amt,
      NVL( pay.paid_amt, 0 ) AS paid_amt,
      aih.invoice_amount + NVL( pph.pph_amt, 0 ) + NVL( prepay.prepay_amt, 0 ) - NVL( pay.paid_amt, 0 ) AS amt_remaining,
      REPLACE ( REPLACE ( aih.description, chr( 13 ), '' ), chr( 10 ), '' ) AS description 
    FROM
      ap_invoices_all aih
      JOIN hr_operating_units hou ON aih.org_id = hou.organization_id
      JOIN ap_suppliers aps ON aih.vendor_id = aps.vendor_id
      JOIN fnd_user fu ON aih.created_by = fu.user_id
      LEFT JOIN (
      SELECT
        aipa.invoice_id,
        aca.check_date,
        SUM( aipa.amount ) AS paid_amt 
      FROM
        ap_invoice_payments_all aipa
        JOIN ap_checks_all aca ON aipa.check_id = aca.check_id 
      GROUP BY
        aipa.invoice_id,
        aca.check_date 
      ) pay ON aih.invoice_id = pay.invoice_id
      LEFT JOIN ( SELECT invoice_id, SUM( amount ) AS pph_amt FROM ap_invoice_distributions_all WHERE line_type_lookup_code = 'AWT' GROUP BY invoice_id ) pph ON aih.invoice_id = pph.invoice_id
      LEFT JOIN ( SELECT invoice_id, SUM( amount ) AS prepay_amt FROM ap_invoice_distributions_all WHERE line_type_lookup_code = 'PREPAY' GROUP BY invoice_id ) prepay ON aih.invoice_id = prepay.invoice_id 
    WHERE
      aih.description LIKE '%${upperNama}%' 
      AND hou.name = 'PELNI Kantor Pusat' 
    ORDER BY
      aih.invoice_date,
      aih.invoice_num,
      pay.check_date
  `;

  const json = await executeOracleQuery(connection, query);

  res.json(json);
};

module.exports = { perjalananDinasControllers };
