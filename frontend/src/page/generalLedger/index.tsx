import { useState } from "react";
import TextInput from "../../component/input/textInput";
import ButtonDefault from "../../component/button/button";
import DatePickerInput from "../../component/input/dateInput";
import SwitchComponent from "../../component/switch/switch";
import EbsClient from "../../service/ebs/OracleClient";
import ShowCoa from "../../component/showpicture/showpicture_coa"; // Mengimpor komponen ShowCoa
import ShowComp from "../../component/showpicture/showpicture_comp"; // Mengimpor komponen ShowComp
import * as XLSX from "xlsx"; // Import xlsx

interface IGeneralLedger {
  date: Date[];
  withAdj: boolean;
  withCompany: boolean;
  company1: string;
  company2: string;
  withCOA: boolean;
  coa1: string;
  coa2: string;
}

interface LedgerItem {
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

  const handleSubmit = async () => {
    setLoading(true);
    const { error, errorMessage, response } = await EbsClient.GetGeneralLedger({
      startDate: generalLedger.date[0],
      endDate: generalLedger.date[1],
      ...generalLedger,
    });

    if (error) {
      setLoading(false);
      alert(errorMessage);
    }

    if (response) {
      setLoading(false);
      setData(response.data!);
      setIsExport(true);
    }
  };

  const handleSwitch = (key: keyof IGeneralLedger) => {
    setGeneralLedger((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  const downloadExcel = () => {
    setIsExport(false);
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Ledger Data");
    XLSX.writeFile(workbook, "ledger_data.xlsx");
  };

  return (
    <>
      <div className="w-auto h-full flex flex-col gap-3 m-5">
        <h1>Penarikan Data General Ledger</h1>
        <div className="flex flex-col w-auto gap-4 max-w-[30rem]">
          <div className="flex flex-col">
            <label htmlFor="title" className="mb-1 text-base font-semibold">
              Masukkan Range Waktu
            </label>
            <DatePickerInput
              value={generalLedger.date}
              onChange={(value) =>
                setGeneralLedger({ ...generalLedger, date: value })
              }
            />
          </div>
          <div className="flex flex-row items-center gap-3">
            <label htmlFor="title" className="text-base font-semibold">
              Dengan Adjustmen?
            </label>
            <SwitchComponent
              checked={generalLedger.withAdj}
              onChange={() => handleSwitch("withAdj")}
            />
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex flex-row items-center gap-3">
              <label htmlFor="title" className="text-base font-semibold">
                Dengan Company?
              </label>
              <SwitchComponent
                checked={generalLedger.withCompany}
                onChange={() => handleSwitch("withCompany")}
              />
            </div>
            <ShowComp />
            <div className="flex flex-row items-center gap-2">
              {" "}
              {/* Ubah gap di sini */}
              <TextInput
                placeholder="ID Company 1"
                value={generalLedger.company1}
                onChange={(e) =>
                  setGeneralLedger({ ...generalLedger, company1: e })
                }
              />
              <p className="text-sm font-bold">Between</p>
              <TextInput
                placeholder="ID Company 2"
                value={generalLedger.company2}
                onChange={(e) =>
                  setGeneralLedger({ ...generalLedger, company2: e })
                }
              />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex flex-row items-center gap-3">
              <label htmlFor="title" className="text-base font-semibold">
                Dengan Account?
              </label>
              <SwitchComponent
                checked={generalLedger.withCOA}
                onChange={() => handleSwitch("withCOA")}
              />
            </div>
            <ShowCoa />
            <div className="flex flex-row items-center gap-2">
              {" "}
              {/* Ubah gap di sini */}
              <TextInput
                placeholder="ID Account 1"
                value={generalLedger.coa1}
                onChange={(e) =>
                  setGeneralLedger({ ...generalLedger, coa1: e })
                }
              />
              <p className="text-sm font-bold">Between</p>
              <TextInput
                placeholder="ID Account 2"
                value={generalLedger.coa2}
                onChange={(e) =>
                  setGeneralLedger({ ...generalLedger, coa2: e })
                }
              />
            </div>
          </div>

          <ButtonDefault
            className={!isExport ? "" : "hidden"}
            text="Cari"
            width="50%"
            onClick={handleSubmit}
            loading={loading}
          />
          <ButtonDefault
            className={isExport ? "" : "hidden"}
            text="Download"
            width="50%"
            onClick={downloadExcel}
          />
        </div>
      </div>
    </>
  );
}

export default IndexGeneralLedger;
