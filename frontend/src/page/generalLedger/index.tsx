import { useState } from "react";
import { IGeneralLedger } from "../../interface/IGeneralLedger";
import { LedgerItem } from "../../interface/LedgerItem";
import TextInput from "../../component/input/textInput";
import ButtonDefault from "../../component/button/button";
import DatePickerInput from "../../component/input/dateInput";
import SwitchComponent from "../../component/switch/switch";
import EbsClient from "../../service/ebs/OracleClient";
import ShowCoa from "../../component/showpicture/showpicture_coa";
import ShowComp from "../../component/showpicture/showpicture_comp";
import * as XLSX from "xlsx";
import Cookies from "js-cookie";
import { message } from "antd";

function IndexGeneralLedger() {
  const [generalLedger, setGeneralLedger] = useState<IGeneralLedger>({
    date: [],
    withAdj: false,
    withCompany: false,
    company1: "",
    company2: "",
    withCOA: false,
    coa1: "",
    coa2: "",
  });

  const [data, setData] = useState<LedgerItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isExport, setIsExport] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleSubmit = async () => {
    const token = Cookies.get("token") || "";
    const validationErrors: { [key: string]: string } = {};

    if (generalLedger.date.length === 0) {
      validationErrors.date = "This field is required";
    }
    if (!generalLedger.withAdj) {
      validationErrors.withAdj = "This switch is required";
    }

    if (generalLedger.withCompany) {
      if (!generalLedger.company1) {
        validationErrors.company1 = "Please Fill This Field!";
      }
      if (!generalLedger.company2) {
        validationErrors.company2 = "Please Fill This Field!";
      }
    }

    if (generalLedger.withCOA) {
      if (!generalLedger.coa1) {
        validationErrors.coa1 = "Please Fill This Field!";
      }
      if (!generalLedger.coa2) {
        validationErrors.coa2 = "Please Fill This Field!";
      }
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setLoading(true);
    const { error, errorMessage, response } = await EbsClient.PostGeneralLedger(
      {
        startDate: generalLedger.date[0],
        endDate: generalLedger.date[1],
        ...generalLedger,
      },
      token as string
    );

    if (error) {
      setLoading(false);
      message.error("Error");
    }

    if (response) {
      setLoading(false);
      setData(response.data!);
      setIsExport(true);
    }
  };

  const handleSwitch = (key: keyof IGeneralLedger) => {
    setIsExport(false);
    setGeneralLedger((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  const handleInputChange = (key: keyof IGeneralLedger, value: any) => {
    setIsExport(false);
    setGeneralLedger((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const downloadExcel = () => {
    const startDate =
      generalLedger.date[0] instanceof Date
        ? generalLedger.date[0]
        : new Date(generalLedger.date[0]);
    const endDate =
      generalLedger.date[1] instanceof Date
        ? generalLedger.date[1]
        : new Date(generalLedger.date[1]);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      message.error("Invalid date(s) provided.");
      return;
    }

    const formattedStartDateGB = startDate.toLocaleDateString("en-GB", {
      year: "numeric",
      month: "long",
      day: "2-digit",
    });
    const formattedEndDateGB = endDate.toLocaleDateString("en-GB", {
      year: "numeric",
      month: "long",
      day: "2-digit",
    });

    const segment1Value = data.length > 0 ? data[0].SEGMENT1 : "";
    const segment1DescriptionValue = data.length > 0 ? data[0].SEGMENT1_DESCRIPTION : "";
    const accountValue = data.length > 0 ? data[0].ACCOUNT : "";
    const accountDescriptionValue = data.length > 0 ? data[0].ACCOUNT_DESCRIPTION : "";

    const filename = `DATA GL ${segment1Value} ${segment1DescriptionValue} PERIODE ${formattedStartDateGB} - ${formattedEndDateGB}.xlsx`;

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Ledger Data");

    XLSX.writeFile(workbook, filename);
  };

  return (
    <>
      <div className="w-auto h-full flex flex-col gap-3 m-5">
        <h1>Penarikan Data General Ledger</h1>
        <div className="flex flex-col w-auto gap-4 max-w-[30rem]">
          <div className="flex flex-col">
            <label htmlFor="title" className="mb-1 text-base font-semibold">
              Masukkan Range Waktu<span className="text-red-500">*</span>
            </label>
            <DatePickerInput
              value={generalLedger.date}
              onChange={(value) => handleInputChange("date", value)}
            />
            {errors.date && (
              <p className="text-red-500 text-[13px]">{errors.date}</p>
            )}
          </div>
          <div className="flex flex-row items-center gap-3">
            <label htmlFor="title" className="text-base font-semibold">
              Dengan Adjustment?<span className="text-red-500">*</span>
            </label>
            <SwitchComponent
              checked={generalLedger.withAdj}
              onChange={() => handleSwitch("withAdj")}
            />
            {errors.withAdj && (
              <p className="text-red-500 text-[13px]">{errors.withAdj}</p>
            )}
          </div>

          <div className="flex flex-row items-center gap-3">
            <label htmlFor="title" className="text-base font-semibold">
              Dengan Company?
            </label>
            <SwitchComponent
              checked={generalLedger.withCompany}
              onChange={() => handleSwitch("withCompany")}
            />
            <div className="text-center">
              <ShowComp />
            </div>
          </div>

          <div className="flex flex-row items-center gap-2">
            <div className="flex flex-col">
              <TextInput
                placeholder="ID Company 1"
                value={generalLedger.company1}
                onChange={(e) => handleInputChange("company1", e)}
                disabled={!generalLedger.withCompany}
              />
              {errors.company1 && (
                <p className="text-red-500 text-[13px]">{errors.company1}</p>
              )}
            </div>
            <p className="text-sm font-bold">Between</p>
            <div className="flex flex-col">
              <TextInput
                placeholder="ID Company 2"
                value={generalLedger.company2}
                onChange={(e) => handleInputChange("company2", e)}
                disabled={!generalLedger.withCompany}
              />
              {errors.company2 && (
                <p className="text-red-500 text-[13px]">{errors.company2}</p>
              )}
            </div>
          </div>

          <div className="flex flex-row items-center gap-3">
            <label htmlFor="title" className="text-base font-semibold">
              Dengan Account?
            </label>
            <SwitchComponent
              checked={generalLedger.withCOA}
              onChange={() => handleSwitch("withCOA")}
            />
            <div className="text-center">
              <ShowCoa />
            </div>
          </div>
          <div className="flex flex-row items-center gap-2">
            <div className="flex flex-col">
              <TextInput
                placeholder="ID Account 1"
                value={generalLedger.coa1}
                onChange={(e) => handleInputChange("coa1", e)}
                disabled={!generalLedger.withCOA}
              />
              {errors.coa1 && (
                <p className="text-red-500 text-[13px]">{errors.coa1}</p>
              )}
            </div>

            <p className="text-sm font-bold">Between</p>

            <div className="flex flex-col">
              <TextInput
                placeholder="ID Account 2"
                value={generalLedger.coa2}
                onChange={(e) => handleInputChange("coa2", e)}
                disabled={!generalLedger.withCOA}
              />
              {errors.coa2 && (
                <p className="text-red-500 text-[13px]">{errors.coa2}</p>
              )}
            </div>
          </div>

          <ButtonDefault
            text={isExport ? "Download" : "Cari"}
            width="50%"
            onClick={isExport ? downloadExcel : handleSubmit}
            loading={loading}
          />
        </div>
      </div>
    </>
  );
}

export default IndexGeneralLedger;
