import React, { useEffect } from "react";
import TablePerjalananDinas from "./table";
import TextInput from "../../component/input/textInput";
import ButtonDefault from "../../component/button/button";
import { message } from "antd";

function IndexCheckSPJ() {
  const [nama, setNama] = React.useState<string>("");
  const [isSubmit, setSubmit] = React.useState<boolean>(false);
  const [validate, setValidate] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);

  useEffect(() => {
    setValidate(false);
  }, [nama,validate]);

  const handleSearch = () => {
    setSubmit(true);
    setLoading(true); 

    if (nama) {
      setValidate(true);
      setLoading(true); 
    }

    if (nama.includes(" ")) {
      setValidate(false);
      setLoading(false);
      return message.error("Nama hanya boleh satu kata!");
    }

    if (!nama) {
      setValidate(false);
      setLoading(false);
    }
  };

  return (
    <div className="w-auto h-full flex flex-col gap-3 m-5">
      <h1>Cek Status SPJ Perjalanan Dinas</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch();
        }}
      >
        <div className="flex flex-col gap-2 max-w-[50rem]">
          <label htmlFor="title" className="mb-1 text-base font-semibold">
            Nama
          </label>
          <div className="flex items-center gap-2" style={{ width: "60%" }}>
            <TextInput
              type={"perjadin"}
              placeholder="Masukkan Nama"
              value={nama}
              onChange={(value) => setNama(value)}
              isSubmit={isSubmit}
            />
            <ButtonDefault
              text="Cari"
              onClick={handleSearch}
              htmlType="submit"
              width="30%"
              loading={loading}
            />
          </div>
        </div>
      </form>

      {validate && (
        <TablePerjalananDinas
          nama={nama}
          loading={loading}
          setLoading={setLoading}
        />
      )}
    </div>
  );
}

export default IndexCheckSPJ;