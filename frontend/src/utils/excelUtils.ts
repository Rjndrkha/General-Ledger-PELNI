import * as XLSX from "xlsx";
import { DateFormatter, DateParser } from "./dateConverter";
import { message } from "antd";
import { GeneralLedgerItem } from "../interface/IGeneralLedger";

export const downloadExcelFile = (
  generalLedger: GeneralLedgerItem[],
  inputField: any
) => {
  const startDate = DateParser(generalLedger[0].TRANSACTION_DATE_FROM);
  const endDate = DateParser(generalLedger[0].TRANSACTION_DATE_TO);

  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
    message.error("Invalid date(s) provided.");
    return;
  }

  const formattedStartDateGB = DateFormatter(startDate);
  const formattedEndDateGB = DateFormatter(endDate);

  const segment1DescriptionValue =
    generalLedger.length > 0 ? generalLedger[0].SEGMENT1_DESCRIPTION : "";

  const datePeriod =
    startDate.getTime() === endDate.getTime()
      ? formattedStartDateGB
      : `${formattedStartDateGB} - ${formattedEndDateGB}`;

  let filename = `DATA GL Gab All Cabang PERIODE ${datePeriod}.xlsx`;

  const { with_company, id_company, with_account, id_account } = inputField;

  let company1 = id_company.split("-")[0];
  let company2 = id_company.split("-")[1];

  if (with_company && company1 && company2) {
    filename =
      company1 === company2
        ? `DATA GL ${segment1DescriptionValue} PERIODE ${datePeriod}.xlsx`
        : `DATA GL ${company1}-${company2} PERIODE ${datePeriod}.xlsx`;
  }

  let coa1 = id_account.split("-")[0];
  let coa2 = id_account.split("-")[1];

  if (with_account && coa1 && coa2) {
    filename =
      coa1 === coa2
        ? `DATA GL ${coa1} PERIODE ${datePeriod}.xlsx`
        : `DATA GL ${coa1}-${coa2} PERIODE ${datePeriod}.xlsx`;
  }

  const worksheet = XLSX.utils.json_to_sheet(generalLedger);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  XLSX.writeFile(workbook, filename);

  message.success("File berhasil diunduh!");
};
