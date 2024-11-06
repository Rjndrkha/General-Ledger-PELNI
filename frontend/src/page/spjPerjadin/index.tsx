import React, { useEffect } from "react";
import TablePerjalananDinas from "./table";
import TextInput from "../../component/input/textInput";
import ButtonDefault from "../../component/button/button";

function IndexCheckSPJ() {
  const [nama, setNama] = React.useState<string>("");
  const [isSubmit, setSubmit] = React.useState<boolean>(false);
  const [validate, setValidate] = React.useState<boolean>(false);

  useEffect(() => {
    setValidate(false);
  }, [nama]);

  const handleSearch = () => {
    if (nama) {
      setValidate(true);
    } else {
      setSubmit(true);
    }
  };

  return (
    <>
      <div className="w-auto h-full flex flex-col gap-3 m-5">
        <h1>Cek Status SPJ Perjalanan Dinas</h1>
        <div className="flex flex-col gap-2 max-w-[50rem]">
          <label htmlFor="title" className="mb-1 text-base font-semibold">
            Nama
          </label>
          <div className="flex items-center gap-2">
            <TextInput
              placeholder="Masukan Nama"
              value={nama}
              onChange={(value) => setNama(value)}
              required
              isSubmit={isSubmit}
            />
            <ButtonDefault
              text={"Cari"}
              onClick={handleSearch}
              htmlType={"submit"}
              width="15%"
            />
          </div>
        </div>

        {validate && <TablePerjalananDinas nama={nama} />}
      </div>
    </>
  );
}

export default IndexCheckSPJ;
