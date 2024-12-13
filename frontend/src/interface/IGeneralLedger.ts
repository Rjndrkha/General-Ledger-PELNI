export interface IGeneralLedger {
  date: Date[];
  withAdj: boolean;
  withCompany: boolean;
  company1: string;
  company2: string;
  withCOA: boolean;
  coa1: string;
  coa2: string;
}

export interface GeneralLedgerItem {
  TRANSACTION_DATE_FROM: string;
  TRANSACTION_DATE_TO: string;
  TANGGAL_PENARIKAN: string;
  ACCOUNT: string;
  ACCOUNT_DESCRIPTION: string;
  SEGMENT1: string;
  SEGMENT1_DESCRIPTION: string;
  SEGMENT2: string;
  SEGMENT2_DESCRIPTION: string;
  SEGMENT3: string;
  SEGMENT3_DESCRIPTION: string;
  SEGMENT4: string;
  SEGMENT4_DESCRIPTION: string;
  SEGMENT5: string;
  SEGMENT5_DESCRIPTION: string;
  SEGMENT6: string;
  SEGMENT6_DESCRIPTION: string;
  SEGMENT7: string;
  SEGMENT7_DESCRIPTION: string;
  SEGMENT8: string;
  SEGMENT8_DESCRIPTION: string;
  SEGMENT9: string;
  SEGMENT9_DESCRIPTION: string;
  GL_DATE: string;
  SOURCE: string;
  CATEGORY: string;
  DOCUMENT_NUMBER: string;
  CURRENCY: string;
  LINE_DESCRIPTION: string;
  NILAI_DEBIT: number;
  NILAI_CREDIT: number;
  BALANCE: number;
}

export interface ITableGeneralLedger {
  job_id: Number;
  status: string;
  start_date: string;
  end_date: string;
  with_adjustment: boolean;
  with_company: boolean;
  id_company: string;
  with_account: boolean;
  id_account: string;
}
