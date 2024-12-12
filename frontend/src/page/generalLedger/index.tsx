import { useState } from "react";
import { IGeneralLedger } from "../../interface/IGeneralLedger";
import { LedgerItem } from "../../interface/LedgerItem";
import TextInput from "../../component/input/textInput";
import TextInputError from "../../component/input/textInputError";
import ButtonDefault from "../../component/button/button";
import DatePickerInput from "../../component/input/dateInput";
import SwitchComponent from "../../component/switch/switch";
import EbsClient from "../../service/ebs/OracleClient";
import ShowCoa from "../../component/showpicture/showpicture_coa";
import ShowComp from "../../component/showpicture/showpicture_comp";
import Cookies from "js-cookie";
import { message } from "antd";
import TableGeneralLedger from "./table";

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
  const [loading, setLoading] = useState(false);
  const [isExport, setIsExport] = useState(false);
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
        validationErrors.company1 = "This field is required";
      }
      if (!generalLedger.company2) {
        validationErrors.company2 = "This field is required";
      }
    }

    if (generalLedger.withCOA) {
      if (!generalLedger.coa1) {
        validationErrors.coa1 = "This field is required";
      }
      if (!generalLedger.coa2) {
        validationErrors.coa2 = "This field is required";
      }
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setLoading(true);
    const { error, response } = await EbsClient.PostGeneralLedger(
      {
        startDate: generalLedger.date[0],
        endDate: generalLedger.date[1],
        ...generalLedger,
      },
      token as string
    );

    setLoading(false);

    if (error) {
      message.error("Error");
    } else if (response) {
      if (!response.data || response.data.length === 0) {
        message.error("Data tidak tersedia!");
        setIsExport(false);
      } else {
        setData(response.data!);
        setIsExport(true);
      }
    }
  };

  const handleSwitch = (key: keyof IGeneralLedger) => {
    setIsExport(false);
    setGeneralLedger((prevState) => {
      const newState = { ...prevState, [key]: !prevState[key] };
      if (key === "withCompany" && !newState.withCompany) {
        newState.company1 = "";
        newState.company2 = "";
      }

      if (key === "withCOA" && !newState.withCOA) {
        newState.coa1 = "";
        newState.coa2 = "";
      }

      return newState;
    });
  };

  const handleInputChange = (key: keyof IGeneralLedger, value: any) => {
    setIsExport(false);
    setGeneralLedger((prevState) => ({ ...prevState, [key]: value }));
  };

  return (
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
            {errors.company1 ? (
              <TextInputError />
            ) : (
              <TextInput
                placeholder="ID Company 1"
                value={generalLedger.company1}
                onChange={(value: string) =>
                  /^\d*$/.test(value) &&
                  value.length <= 4 &&
                  handleInputChange("company1", value)
                }
                disabled={!generalLedger.withCompany}
              />
            )}
          </div>
          <p className="text-sm font-bold">Between</p>
          <div className="flex flex-col">
            {errors.company2 ? (
              <TextInputError />
            ) : (
              <TextInput
                placeholder="ID Company 2"
                value={generalLedger.company2}
                onChange={(value: string) =>
                  /^\d*$/.test(value) &&
                  value.length <= 4 &&
                  handleInputChange("company2", value)
                }
                disabled={!generalLedger.withCompany}
              />
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
            {errors.coa1 ? (
              <TextInputError />
            ) : (
              <TextInput
                placeholder="ID Account 1"
                value={generalLedger.coa1}
                onChange={(value: string) =>
                  /^\d*$/.test(value) &&
                  value.length <= 4 &&
                  handleInputChange("coa1", value)
                }
                disabled={!generalLedger.withCOA}
              />
            )}
          </div>
          <p className="text-sm font-bold">Between</p>
          <div className="flex flex-col">
            {errors.coa2 ? (
              <TextInputError />
            ) : (
              <TextInput
                placeholder="ID Account 2"
                value={generalLedger.coa2}
                onChange={(value: string) =>
                  /^\d*$/.test(value) &&
                  value.length <= 4 &&
                  handleInputChange("coa2", value)
                }
                disabled={!generalLedger.withCOA}
              />
            )}
          </div>
        </div>
        <ButtonDefault
          text="Cari"
          width="50%"
          onClick={handleSubmit}
          loading={loading}
        />
        <TableGeneralLedger />
      </div>
    </div>
  );
}

export default IndexGeneralLedger;