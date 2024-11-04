import React, { useEffect } from "react";
import TextInput from "../../component/input/textInput";
import ButtonDefault from "../../component/button/button";
import DatePickerInput from "../../component/input/dateInput";
import SwitchComponent from "../../component/switch/switch";

function IndexGeneralLedger() {
  const [date, setDate] = React.useState<Array<Date>>([]);

  useEffect(() => {
    console.log(date);
  }, [date]);
  return (
    <>
      <div className="w-auto h-full flex flex-col gap-3 m-5">
        <h1>Penarikan Data General Ledger 1</h1>
        <div className="flex flex-col w-auto gap-1 max-w-[50rem]">
          <div className=" flex flex-col">
            <label htmlFor="title" className="mb-1 text-base font-semibold">
              Masukkan Range Waktu
            </label>
            <DatePickerInput
              value={date}
              onChange={(value: any) => setDate(value)}
            />
          </div>
          <div className=" flex flex-col">
            <label htmlFor="title" className="mb-1 text-base font-semibold">
              Dengan Adjustmen ?
            </label>
            <SwitchComponent />
          </div>

          <div className=" flex flex-col gap-2">
            <label htmlFor="title" className="mb-1 text-base font-semibold">
              Dengan Company ?
            </label>
            <SwitchComponent />

            <div className=" flex flex-row gap-4 items-center">
              <TextInput
                placeholder="ID Company 1"
                // value={nama}
                // onChange={(value) => setNama(value)}
                // required
                // isSubmit={isSubmit}
              />

              <p className="text-sm font-bold">Between</p>

              <TextInput
                placeholder="ID Company 1"
                // value={nama}
                // onChange={(value) => setNama(value)}
                // required
                // isSubmit={isSubmit}
              />
            </div>
          </div>

          <div className=" flex flex-col gap-2">
            <label htmlFor="title" className="mb-1 text-base font-semibold">
              Dengan Company ?
            </label>
            <SwitchComponent />

            <div className=" flex flex-row gap-4 items-center">
              <TextInput
                placeholder="ID Company 1"
                // value={nama}
                // onChange={(value) => setNama(value)}
                // required
                // isSubmit={isSubmit}
              />

              <p className="text-sm font-bold">Between</p>

              <TextInput
                placeholder="ID Company 2"
                // value={nama}
                // onChange={(value) => setNama(value)}
                // required
                // isSubmit={isSubmit}
              />
            </div>
          </div>

          <div className=" flex flex-col gap-2">
            <label htmlFor="title" className="mb-1 text-base font-semibold">
              Dengan Account ?
            </label>
            <SwitchComponent />

            <div className=" flex flex-row gap-4 items-center">
              <TextInput
                placeholder="ID Account 1"
                // value={nama}
                // onChange={(value) => setNama(value)}
                // required
                // isSubmit={isSubmit}
              />

              <p className="text-sm font-bold">Between</p>

              <TextInput
                placeholder="ID Account 2"
                // value={nama}
                // onChange={(value) => setNama(value)}
                // required
                // isSubmit={isSubmit}
              />
            </div>
          </div>

          <ButtonDefault
            text={"Cari"}
            // onClick={handleSearch}
            htmlType={"submit"}
            width="50%"
          />
        </div>
      </div>
    </>
  );
}

export default IndexGeneralLedger;
