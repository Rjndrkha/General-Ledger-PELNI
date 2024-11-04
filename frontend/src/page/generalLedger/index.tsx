import { useState } from "react";
import TextInput from "../../component/input/textInput";
import ButtonDefault from "../../component/button/button";
import DatePickerInput from "../../component/input/dateInput";
import SwitchComponent from "../../component/switch/switch";

interface IGeneralLedger {
  date: [];
  withAdj: boolean;
  withCompany: boolean;
  company1: string;
  company2: string;
  withCOA: boolean;
  coa1: string;
  coa2: string;
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

  // useEffect(() => {
  //   console.log(date);
  // }, [date]);

  // const handleCompanyChange = (index: any, value: any) => {
  //   const updatedCompany = [...company];
  //   updatedCompany[index] = value;
  //   setCompany(updatedCompany);
  // };

  // const handleCoaChange = (index: any, value: any) => {
  //   const updatedCoa = [...coa];
  //   updatedCoa[index] = value;
  //   setCoa(updatedCoa);
  // };

  return (
    <>
      <div className="w-auto h-full flex flex-col gap-3 m-5">
        <h1>Penarikan Data General Ledger 1</h1>
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
            <SwitchComponent checked={generalLedger.withAdj} />
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex flex-row items-center gap-3">
              <label htmlFor="title" className="text-base font-semibold">
                Dengan Company?
              </label>
              <SwitchComponent checked={generalLedger.withCompany} />
            </div>
            <div className="flex flex-row items-center gap-4">
              <TextInput
                placeholder="ID Company 1"
                value={generalLedger.company1}
                // onChange={(e) => setGeneralLedger({ ...generalLedger, company1: e.target.value })}
              />
              <p className="text-sm font-bold">Between</p>
              <TextInput
                placeholder="ID Company 2"
                value={generalLedger.company2}
                // onChange={(e) => handleCompanyChange(1, e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex flex-row items-center gap-3">
              <label htmlFor="title" className="text-base font-semibold">
                Dengan Account?
              </label>
              <SwitchComponent checked={generalLedger.withCOA} />
            </div>
            <div className="flex flex-row items-center gap-4">
              <TextInput
                placeholder="ID Account 1"
                value={generalLedger.coa1}
              />
              <p className="text-sm font-bold">Between</p>
              <TextInput
                placeholder="ID Account 2"
                value={generalLedger.coa2}
              />
            </div>
          </div>

          <ButtonDefault text="Cari" width="50%" />
        </div>
      </div>
    </>
  );
}

export default IndexGeneralLedger;
