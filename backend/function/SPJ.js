require("dotenv").config();

const oracledb = require("oracledb");
oracledb.initOracleClient({
  libDir: process.env.ORACLE_CLIENT,
});

async function OracleCheckSPJ(nama) {
  let connection;
  let result;

  try {
    // Konfigurasi koneksi mirip dengan yang ada di PHP
    const config = {
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      connectString: `(DESCRIPTION=(ADDRESS_LIST=(ADDRESS=(PROTOCOL=${process.env.PROTOCOL})(HOST=${process.env.DB_HOST})(PORT=${process.env.DB_PORT})))(CONNECT_DATA=(SID=${process.env.DB_SID})))`,
    };

    // Membuat koneksi ke Oracle
    connection = await oracledb.getConnection(config);

    console.log("Koneksi berhasil!");

    const result = await connection.execute(`
      select hou.name                 ou_name
      ,fu.user_name
      ,decode(ap_invoices_utility_pkg.get_approval_status(aih.invoice_id,aih.invoice_amount,aih.payment_status_flag,aih.invoice_type_lookup_code),
                'FULL'            , 'Fully Applied',
                'NEVER APPROVED'  , 'Never Validated',
                'NEEDS REAPPROVAL', 'Needs Revalidation',
                'CANCELLED'       , 'Cancelled',
                'UNPAID'          , 'Unpaid',
                'AVAILABLE'       , 'Available',
                'UNAPPROVED'      , 'Unvalidated',
                'APPROVED'        , 'Validated',
                'PERMANENT'       , 'Permanent Prepayment',
                NULL) 
       inv_status     
      ,aih.payment_status_flag
      ,aih.vendor_id 
      ,aps.vendor_name
      ,aih.invoice_id
      ,aih.invoice_num        nomer_tagihan
      ,aih.doc_sequence_value invoice_number
      ,aih.gl_date
      ,aih.invoice_date
      ,aih.invoice_currency_code
      ,pay.check_date           payment_date
      ,aih.invoice_amount
      ,nvl(pph.pph_amt,0)  pph_amt
      ,nvl(prepay.prepay_amt,0)  prepay_amt
      ,nvl(pay.paid_amt,0) paid_amt
      ,aih.invoice_amount + nvl(pph.pph_amt,0) + nvl(prepay.prepay_amt,0) - nvl(pay.paid_amt,0) amt_remaining
      ,aih.invoice_type_lookup_code
      ,replace(replace(aih.description, chr(13), ''), chr(10), '')  description
  from ap_invoices_all          aih
      ,hr_operating_units       hou
      ,ap_suppliers             aps
      ,fnd_user                 fu
      ,(
        select aca.check_date
              ,aipa.invoice_id
              ,sum(aipa.amount) paid_amt
          from ap_invoice_payments_all  aipa
              ,ap_checks_all            aca
         where 1 = 1
--           and aipa.invoice_id in (1930764,1729863)
           and aipa.check_id = aca.check_id
         group by
               aipa.invoice_id
              ,aca.check_date
       )
       pay
      ,(
        select invoice_id
              ,sum(amount)  pph_amt
          from ap_invoice_distributions_all
         where 1 = 1
--           and invoice_id = 1729863
           and line_type_lookup_code = 'AWT'
         group by
               invoice_id
       )
       pph
      ,(
        select invoice_id
              ,sum(amount)  prepay_amt
          from ap_invoice_distributions_all
         where 1 = 1
--           and invoice_id = 1729863
           and line_type_lookup_code = 'PREPAY'
         group by
               invoice_id
       )
       prepay
 where 1 = 1
   and aih.created_by = fu.user_id
   and aih.invoice_id = pay.invoice_id(+)
   and aih.invoice_id = pph.invoice_id(+)
   and aih.invoice_id = prepay.invoice_id(+) 
   and aih.org_id = hou.organization_id
   and aih.vendor_id = aps.vendor_id
 	 and aih.description like '%${nama}%'
	 and hou.name = 'PELNI Kantor Pusat'

 order by
       aih.invoice_date
      ,aih.invoice_num
      ,pay.check_date
			,aih.invoice_num
    `);

    const json = {
      totalData: result.rows.length,
      data: result.rows.map((row) => {
        return row.reduce((acc, cur, i) => {
          acc[result.metaData[i].name] = cur;
          return acc;
        }, {});
      }),
    };
    return json;
  } catch (err) {
    console.error("Error saat koneksi:", err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error("Error saat menutup koneksi:", err);
      }
    }
  }
}

module.exports = { OracleCheckSPJ };
