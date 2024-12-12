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