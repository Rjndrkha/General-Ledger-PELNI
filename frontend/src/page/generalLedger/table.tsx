import React, { useEffect, useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import type { GetRef, TableColumnsType, TableColumnType } from "antd";
import { Button, Input, Space, Table, message } from "antd";
import type { FilterDropdownProps } from "antd/es/table/interface";
import Highlighter from "react-highlight-words";
import Cookies from "js-cookie";
import EbsClient from "../../service/ebs/OracleClient";
import { ITableGeneralLedger } from "../../interface/ITableGeneralLedger";
import ButtonDefault from "../../component/button/button";
import { downloadExcelFile } from "../../utils/excelUtils";

type InputRef = GetRef<typeof Input>;
type DataIndex = keyof ITableGeneralLedger;

const TableGeneralLedger: React.FC = () => {
  const [data, setData] = useState<ITableGeneralLedger[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);

  useEffect(() => {
    fetchGeneralLedgerData();
  }, []);

  const fetchGeneralLedgerData = async () => {
    setLoading(true);

    const token = Cookies.get("token") || "";

    const { response, error } = await EbsClient.GetGeneralLedgerStatus({}, token);

    if (error) {
      message.error("Gagal mengambil data General Ledger");
      setLoading(false);
      return;
    }

    if (response.rows){
      setData(response.rows)

    }
    console.log("Fetched data:", response);

    setLoading(false);
  };

  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps["confirm"],
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleButtonStatus = 
  (status: string) => {
    if (status === "Completed") {
      return (
        <Button 
          type="primary"
          onClick={handleDownload}
          >
          Download
        </Button>
      );
    }
  
    if (status === "pending") {
      return (
        <Button type="primary" loading={true}>
          Pending
        </Button>
      );
    }
  
    if (status === "active") {
      return (
        <Button type="primary" loading={true}>
          Active
        </Button>
      );
    }

    if (status === "failed") {
      return (
        <Button type="primary" danger>
          Failed
        </Button>
      );
    }
  
    return status;
  };

  const handleDownload = async (token: {}) => {
    try {
      const completedData = data.filter(item => item.STATUS === "Completed");
  
      if (completedData.length === 0) {
        message.error("Tidak ada data dengan status 'Completed' untuk diunduh.");
        return;
      }
  
      const { response, error, errorMessage } = await EbsClient.GetGeneralLedgerDownload(
        { job_ids: completedData.map(item => item.JOB_ID) }, 
        token
      );
  
      if (error) {
        message.error(`Gagal Download Data ${errorMessage}`);
        return;
      }
  
      if (response && response.data) {
        downloadExcelFile(response.data, response.generalLedger);
      } else {
        message.error("Data tidak tersedia");
      }
    } catch (err) {
      message.error("Terjadi kesalahan saat mendownload file");
      console.error(err);
    }
  };
  

  const handleReset = (
    clearFilters: () => void,
    confirm: FilterDropdownProps["confirm"]
  ) => {
    clearFilters();
    setSearchText("");
    confirm();
  };

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): TableColumnType<ITableGeneralLedger> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters, confirm)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current, 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns: TableColumnsType<ITableGeneralLedger> = [
    {
      title: "Job Id",
      dataIndex: "job_id",
      key: "job_id",
    },
    {
      title: "Start Date",
      dataIndex: "start_date",
      key: "start_date",
    },
    {
      title: "End Date",
      dataIndex: "end_date",
      key: "end_date",
    },
    {
      title: "With Adjustment",
      dataIndex: "with_adjustment",
      key: "with_adjustment",
    },
    {
      title: "With Company",
      dataIndex: "with_company",
      key: "with_company",
    },
    {
      title: "Id Company",
      dataIndex: "id_company",
      key: "id_company",
    },
    {
      title: "With Account",
      dataIndex: "with_account",
      key: "with_account",
    },
    {
      title: "Id Account",
      dataIndex: "id_account",
      key: "id_account",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text) => handleButtonStatus(text), 
    },
  ];

  return (
    <div className="flex flex-col item-center gap-3">
      <div className="flex item-center gap-3">
        <label htmlFor="title" className="text-base font-semibold">
          Tabel Riwayat Penarikan Data
        </label>
        <ButtonDefault
          text="Refresh"
          onClick={fetchGeneralLedgerData}
        />
      </div>
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        pagination={{ pageSize: 5 }}
        rowKey="JOB_ID"
      />
    </div>
  );
};

export default TableGeneralLedger;
