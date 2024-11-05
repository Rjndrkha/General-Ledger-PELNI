import { useState } from "react";
import TextInput from "../../component/input/textInput";
import ButtonDefault from "../../component/button/button";
import DatePickerInput from "../../component/input/dateInput";
import SwitchComponent from "../../component/switch/switch";
import EbsClient from "../../service/ebs/OracleClient";

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

  const handleSubmit = async () => {
    console.log(generalLedger);
    const { error, errorMessage, response } = await EbsClient.GetGeneralLedger({
      startDate: generalLedger.date[0],
      endDate: generalLedger.date[1],
      ...generalLedger,
    });

    if (error) {
      // message.error(errorMessage);
      // setLoading(false);
      console.log(errorMessage);
    }

    if (response) {
      // setPromotion(response.data);
      // setLoading(false);
      console.log(response);
    }
  };

  const handleSwitch = (key: keyof IGeneralLedger) => {
    setGeneralLedger((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };
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
            <div className="flex flex-row items-center gap-4">
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
            <div className="flex flex-row items-center gap-4">
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

          <ButtonDefault text="Cari" width="50%" onClick={handleSubmit} />
        </div>
      </div>
    </>
  );
}

export default IndexGeneralLedger;
