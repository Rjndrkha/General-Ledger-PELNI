import React, { useEffect, useState } from "react";
import type { TableColumnsType } from "antd";
import { Button, Table, message } from "antd";
import Cookies from "js-cookie";
import EbsClient from "../../service/ebs/OracleClient";
import ButtonDefault from "../../component/button/button";
import { downloadExcelFile } from "../../utils/excelUtils";
import { ITableGeneralLedger } from "../../interface/IGeneralLedger";

interface TableGeneralLedgerProps {
  fetchData: () => Promise<any[]>;
}

const TableGeneralLedger: React.FC<TableGeneralLedgerProps> = ({
  fetchData,
}) => {
  const [dataInput, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const token = Cookies.get("token");

  useEffect(() => {
    const fetchDataWrapper = async () => {
      setLoading(true);
      const data = await fetchData();
      setData(data);
      setLoading(false);
    };

    fetchDataWrapper();
  }, [fetchData]);

  const handleButtonStatus = (status: string, job_id: Number) => {
    const statusMap: { [key: string]: JSX.Element } = {
      Completed: (
        <Button
          type="primary"
          style={{ backgroundColor: "#52c41a", borderColor: "#52c41a" }}
          onClick={async () => await handleDownload(job_id)}
        >
          Download
        </Button>
      ),
      pending: <ButtonDefault text="Pending" loading={true} />,
      active: <ButtonDefault text="Active" loading={true} />,
      failed: (
        <Button type="primary" danger>
          Failed
        </Button>
      ),
    };

    return statusMap[status] || status;
  };

  const handleDownload = async (job_id: Number) => {
    const { error, errorMessage, response } =
      await EbsClient.GetGeneralLedgerDownload(job_id, token || "");

    if (error) {
      message.error(errorMessage || "Failed to download data");
      return;
    }

    if (response) {
      downloadExcelFile(response.jsonData.data, dataInput[0]);
    }
  };

  const formatDate = (dateString: string): string => {
    if (!dateString) return "-";
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    return new Date(dateString).toLocaleDateString("id-ID", options);
  };

  const columns: TableColumnsType<ITableGeneralLedger> = [
    {
      title: "ID",
      dataIndex: "job_id",
      key: "job_id",
      align: "center",
    },
    {
      title: "Start Date",
      dataIndex: "start_date",
      key: "start_date",
      align: "center",
      render: (text) => formatDate(text),
    },
    {
      title: "End Date",
      dataIndex: "end_date",
      key: "end_date",
      align: "center",
      render: (text) => formatDate(text),
    },
    {
      title: "With Adjustment",
      dataIndex: "with_adjustment",
      key: "with_adjustment",
      align: "center",
      render: (text) => (text === "true" ? "Yes" : "No"),
    },
    {
      title: "With Company",
      dataIndex: "with_company",
      key: "with_company",
      align: "center",
      render: (text) => (text === "true" ? "Yes" : "No"),
    },
    {
      title: "Id Company",
      dataIndex: "id_company",
      key: "id_company",
      align: "center",
    },
    {
      title: "With Account",
      dataIndex: "with_account",
      key: "with_account",
      align: "center",
      render: (text) => (text === "true" ? "Yes" : "No"),
    },
    {
      title: "Id Account",
      dataIndex: "id_account",
      key: "id_account",
      align: "center",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (text, record) => handleButtonStatus(text, Number(record.job_id)),
    },
  ];

  return (
    <div className="flex flex-col item-center gap-3">
      <div className="flex item-center gap-3">
        <label htmlFor="title" className="text-sm md:text-base font-semibold">
          Tabel Riwayat Penarikan Data
        </label>
        {/* <ButtonDefault
          text="Refresh"
          onClick={async () => {
            setLoading(true);
            await fetchData();
            setLoading(false);
          }}
        /> */}
      </div>
      <Table
        columns={columns}
        dataSource={dataInput}
        loading={loading}
        pagination={{ pageSize: 5 }}
        rowKey="JOB_ID"
      />
    </div>
  );
};

export default TableGeneralLedger;
