const {
  executeOracleQuery,
  OracleConnection,
} = require("../services/oracleServices");

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

  let connection;

  if (!startDate || !endDate) {
    return res
      .status(400)
      .json({ error: "startDate dan endDate harus diberikan" });
  }

  if (!withAdj && withAdj !== "true" && withAdj !== "false") {
    return res.status(400).json({ error: "withAdj harus diberikan" });
  }

  if (withCompany === "true") {
    if (!company1 || !company2) {
      return res.status(400).json({ error: "Company harus diberikan" });
    }
    if (isNaN(company1) || isNaN(company2)) {
      return res.status(400).json({ error: "Company harus berupa angka" });
    }
  }

  if (withCOA === "true") {
    if (!coa1 || !coa2) {
      return res.status(400).json({ error: "Account harus diberikan" });
    }
    if (isNaN(coa1) || isNaN(coa2)) {
      return res.status(400).json({ error: "Account harus berupa angka" });
    }
  }

  connection = await OracleConnection();

  console.log("Connection Success!");

  const query = `
  SELECT
  TO_CHAR( gjh.default_effective_date, 'DD-MON-RRRR' ) transaction_date_from,
  TO_CHAR( gjh.default_effective_date, 'DD-MON-RRRR' ) transaction_date_to,
  TO_CHAR( SYSDATE, 'DD-MON-RRRR' ) tanggal_penarikan,
  gcc.CONCATENATED_SEGMENTS ACCOUNT,
  gl_flexfields_pkg.Get_Concat_Description ( x_coa_id => gcc.CHART_OF_ACCOUNTS_ID, x_ccid => gcc.CODE_COMBINATION_ID, x_enforce_value_security => NULL ) account_description,
  gcc.segment1,
  gl_flexfields_pkg.get_description_sql ( x_coa_id => gcc.CHART_OF_ACCOUNTS_ID, x_seg_num => 1, x_seg_val => gcc.segment1 ) segment1_description,
  gcc.segment2,
  gl_flexfields_pkg.get_description_sql ( x_coa_id => gcc.CHART_OF_ACCOUNTS_ID, x_seg_num => 2, x_seg_val => gcc.segment2 ) segment2_description,
  gcc.segment3,
  gl_flexfields_pkg.get_description_sql ( x_coa_id => gcc.CHART_OF_ACCOUNTS_ID, x_seg_num => 3, x_seg_val => gcc.segment3 ) segment3_description,
  gcc.segment4,
  gl_flexfields_pkg.get_description_sql ( x_coa_id => gcc.CHART_OF_ACCOUNTS_ID, x_seg_num => 4, x_seg_val => gcc.segment4 ) segment4_description,
  gcc.segment5,
  gl_flexfields_pkg.get_description_sql ( x_coa_id => gcc.CHART_OF_ACCOUNTS_ID, x_seg_num => 5, x_seg_val => gcc.segment5 ) segment5_description,
  gcc.segment6,
  gl_flexfields_pkg.get_description_sql ( x_coa_id => gcc.CHART_OF_ACCOUNTS_ID, x_seg_num => 6, x_seg_val => gcc.segment6 ) segment6_description,
  gcc.segment7,
  gl_flexfields_pkg.get_description_sql ( x_coa_id => gcc.CHART_OF_ACCOUNTS_ID, x_seg_num => 7, x_seg_val => gcc.segment7 ) segment7_description,
  gcc.segment8,
  gl_flexfields_pkg.get_description_sql ( x_coa_id => gcc.CHART_OF_ACCOUNTS_ID, x_seg_num => 8, x_seg_val => gcc.segment8 ) segment8_description,
  gcc.segment9,
  gl_flexfields_pkg.get_description_sql ( x_coa_id => gcc.CHART_OF_ACCOUNTS_ID, x_seg_num => 9, x_seg_val => gcc.segment9 ) segment9_description,
  gjh.default_effective_date GL_Date,
  DECODE( gjh.je_source, '21', 'General Ledger', gjh.je_source ) Source,
  gjc.user_je_category_name Category,
  CASE

      WHEN gjh.je_category IN ( '143', '142', '141' ) THEN
      CHR( 39 ) || gjh.external_reference ELSE CHR( 39 ) || pel_report_utility_pkg.getdocumentnumber ( p_je_source => gjh.je_source, p_entity_code => xte.entity_code, p_source_id_int_1 => xte.source_id_int_1, p_doc_sequence_value => gjh.doc_sequence_value )
    END document_number,
  -- 	xte.entity_code,
    gjh.currency_code Currency,
  CASE

    WHEN gjh.je_source = 'Receivables'
    AND xte.entity_code = 'RECEIPTS' THEN
    pel_report_utility_pkg.getCustNumberType ( xte.source_id_int_1, xah.event_id ) || gjl.description ELSE gjl.description
    END line_description,
    NVL( gjl.accounted_dr, 0 ) Nilai_Debit,
    NVL( gjl.accounted_cr, 0 ) Nilai_Credit,
    NVL( gjl.accounted_dr, 0 ) - NVL( gjl.accounted_cr, 0 ) balance
  FROM
    gl.gl_je_headers gjh,
    gl.gl_je_lines gjl,
    gl_code_combinations_kfv gcc,
    gl.gl_import_references gir,
    gl_je_categories gjc,
    xla.xla_ae_lines xal,
    xla.xla_ae_headers xah,
    xla.xla_transaction_entities xte
  WHERE
    gjh.ledger_id = 2023
    AND trunc( gjh.default_effective_date ) BETWEEN '${startDate}' AND  '${endDate}'
    AND (
      ('${withAdj}' = 'true')
      OR ('${withAdj}' = 'false' AND substr(upper(gjh.period_name),1,3) NOT IN ('ADJ', 'AUD'))
    )
    AND gjh.actual_flag = 'A'

    AND gjh.status = 'P'
    AND gjh.currency_code NOT IN ( 'STAT' )
    AND gjl.je_header_id = gjh.je_header_id
    AND gcc.code_combination_id = gjl.code_combination_id
    AND gjl.je_header_id = gir.je_header_id ( + )
    AND gjl.je_line_num = gir.je_line_num ( + )
    AND gir.gl_sl_link_id = xal.gl_sl_link_id ( + )
    AND xal.ae_header_id = xah.ae_header_id ( + )
    AND xah.entity_id = xte.entity_id ( + )
    AND xah.application_id = xte.application_id ( + )
    AND xah.ledger_id = xte.ledger_id ( + )
    AND NVL( gjl.accounted_dr, 0 ) - NVL( gjl.accounted_cr, 0 ) <> 0
    AND gjh.je_category = gjc.je_category_name

    AND
    (('${withCompany}' = 'false')
      OR ('${withCompany}' = 'true' AND gcc.segment1 BETWEEN '${company1}' AND '${company2}'))

    AND
      (('${withCOA}' = 'false')
        OR ('${withCOA}' = 'true' AND gcc.segment3 BETWEEN '${coa1}' AND '${coa2}'))

  -- 	AND gcc.segment2 IN ('1015' , '1024' )--
  -- 	AND gcc.segment3 in ('11060202','11060203','41010301', '52900199')

  -- 	AND gcc.segment4 BETWEEN '00000' AND 'zzzzz'
  -- 	AND gcc.segment5 BETWEEN '00000' AND 'zzzzz'
    --AND gcc.segment6 BETWEEN '1000' AND '1027'
  -- 	AND gcc.segment7 BETWEEN '0000' AND 'zzzz'
  -- 	AND gcc.segment8 BETWEEN '0000' AND 'zzzz'
  -- 	AND gcc.segment9 BETWEEN '000' AND 'zzz'
  --AND ROWNUM <=10

  ORDER BY
    account,
    default_effective_date,
    je_source,
    je_category,
    document_number ASC
  `;

  const json = await executeOracleQuery(connection, query);

  res.json(json);
};

module.exports = { generalLedgerControllers };
