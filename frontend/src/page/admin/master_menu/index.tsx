import { useState } from "react";

function IndexMasterMenu() {
  const [generalLedger, setGeneralLedger] = useState<any>({
    date: [],
    withAdj: false,
    withCompany: false,
    company1: "",
    company2: "",
    withCOA: false,
    coa1: "",
    coa2: "",
  });

  return (
    <>
      <div className="w-auto h-full flex flex-col gap-3 m-5">
        <h1>Master Menu</h1>
        {/* <div className="flex flex-col w-auto gap-4 max-w-[30rem]">
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
                onChange={(value: string) => {
                  if (/^\d*$/.test(value) && value.length <= 4) {
                    handleInputChange("company1", value);
                  }
                }}
                disabled={!generalLedger.withCompany}
              />
            </div>
            <p className="text-sm font-bold">Between</p>
            <div className="flex flex-col">
              <TextInput
                placeholder="ID Company 2"
                value={generalLedger.company2}
                onChange={(value: string) => {
                  if (/^\d*$/.test(value) && value.length <= 4) {
                    handleInputChange("company2", value);
                  }
                }}
                disabled={!generalLedger.withCompany}
              />
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
                onChange={(value: string) => {
                  if (/^\d*$/.test(value) && value.length <= 4) {
                    handleInputChange("coa1", value);
                  }
                }}
                disabled={!generalLedger.withCOA}
              />
            </div>

            <p className="text-sm font-bold">Between</p>

            <div className="flex flex-col">
              <TextInput
                placeholder="ID Account 2"
                value={generalLedger.coa2}
                onChange={(value: string) => {
                  if (/^\d*$/.test(value) && value.length <= 4) {
                    handleInputChange("coa2", value);
                  }
                }}
                disabled={!generalLedger.withCOA}
              />
            </div>
          </div>

          <ButtonDefault
            text={isExport ? "Download" : "Cari"}
            width="50%"
            onClick={isExport ? downloadExcel : handleSubmit}
            loading={loading}
          />
        </div> */}
      </div>
    </>
  );
}

export default IndexMasterMenu;
