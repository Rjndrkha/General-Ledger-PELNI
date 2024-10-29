import React, { useEffect } from "react";
import EbsClient from "../../service/ebs/ApiTodos";

function IndexCheckSPJ() {
  const [data, setData] = React.useState<any>([]);

  useEffect(() => {
    getDataSPJ("SPJ Perjadin");
  }, []);

  async function getDataSPJ(nama: string) {
    try {
      const { response, error, errorMessage } = await EbsClient.GetAllSPJ();

      if (error) {
        return setData([]);
      }

      if (!error) {
        if (response) {
          console.log(response);

          setData(response);
        }
      }
    } catch (error) {
      console.error("Error fetching spj:", error);
    }
  }

  return (
    <>
      {data.map((data: any) => (
        <div key={data.id}>
          <li>
            <span className="text-red-500">ID:</span> {data.NOMER_TAGIHAN}
            <h1 className="text-red-500 text-justify">{data.DESCRIPTION}</h1>
          </li>
        </div>
      ))}
      <p></p>
      IndexCheckSPJ
    </>
  );
}

export default IndexCheckSPJ;
