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
  }, [nama, validate]);

  const handleSearch = () => {
    setSubmit(true);
    setLoading(true);

    if (!nama || nama.includes(" ")) {
      setValidate(false);
      setLoading(false);
      return message.error("Nama hanya boleh satu kata");
    }

    if (nama) {
      setLoading(false);
      return setValidate(true);
    }
  };

  return (
    <div className="w-auto h-full flex flex-col gap-3 m-5">
      <div>
        <h1 className="text-base font-bold text-blue-950">
          Check Invoice Status
        </h1>
        <h1 className="font-extrabold text-blue-950">EBS Application</h1>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch();
          setLoading(true);
        }}
      >
        <div className="flex flex-col gap-2 max-w-[50rem]">
          <label htmlFor="title" className="mb-1 text-base font-semibold">
            Nama
          </label>
          <div className="flex items-center gap-2" style={{ width: "60%" }}>
            <TextInput
              placeholder="Masukan Nama"
              value={nama}
              onChange={(value) => setNama(value)}
              isSubmit={isSubmit}
              required
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
