import * as XLSX from "xlsx";
import { LedgerItem } from "../interface/LedgerItem";
import { IGeneralLedger } from "../interface/IGeneralLedger";
import { DateFormatter, DateParser } from "./dateConverter";
import { message } from "antd";

export const downloadExcelFile = (data: LedgerItem[], generalLedger: any) => {
  const startDate = DateParser(generalLedger.date[0]);
  const endDate = DateParser(generalLedger.date[1]);

  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
    message.error("Invalid date(s) provided.");
    return;
  }

  const formattedStartDateGB = DateFormatter(startDate);
  const formattedEndDateGB = DateFormatter(endDate);

  const segment1DescriptionValue =
    data.length > 0 ? data[0].SEGMENT1_DESCRIPTION : "";

  const datePeriod =
    startDate.getTime() === endDate.getTime()
      ? formattedStartDateGB
      : `${formattedStartDateGB} - ${formattedEndDateGB}`;

  let filename = `DATA GL Gab All Cabang PERIODE ${datePeriod}.xlsx`;

  const { withCompany, company1, company2, withCOA, coa1, coa2 } =
    generalLedger;

  if (withCompany && company1 && company2) {
    filename =
      company1 === company2
        ? `DATA GL ${segment1DescriptionValue} PERIODE ${datePeriod}.xlsx`
        : `DATA GL ${company1}-${company2} PERIODE ${datePeriod}.xlsx`;
  }

  if (withCOA && coa1 && coa2) {
    filename =
      coa1 === coa2
        ? `DATA GL ${coa1} PERIODE ${datePeriod}.xlsx`
        : `DATA GL ${coa1}-${coa2} PERIODE ${datePeriod}.xlsx`;
  }

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  XLSX.writeFile(workbook, filename);

  message.success("File berhasil diunduh!");
};
