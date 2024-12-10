import React, { useEffect, useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import type { GetRef, TableColumnsType, TableColumnType } from "antd";
import { Button, Input, Space, Table, message } from "antd";
import type { FilterDropdownProps } from "antd/es/table/interface";
import Highlighter from "react-highlight-words";
import Cookies from "js-cookie";
import EbsClient from "../../service/ebs/OracleClient";
import { ITableGeneralLedger } from "../../interface/ITableGeneralLedger";

type InputRef = GetRef<typeof Input>;
type DataIndex = keyof ITableGeneralLedger;

const TableGeneralLedger: React.FC = () => {
  const [data, setData] = useState<ITableGeneralLedger[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

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

    if (response) {
      setData(response.data);
    }

    setLoading(false);
  };

  const addActionButton = (data: ITableGeneralLedger[]) => {
    return data.map((item) => {
      return {
        ...item,
        Action: (
          <div className="flex justify-center gap-5">
            {/* Tombol aksi dapat ditambahkan di sini */}
          </div>
        ),
      };
    });
  };

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);

  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps["confirm"],
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
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
      title: "Job ID",
      dataIndex: "JOB_ID",
      key: "JOB_ID",
    },
    {
      title: "Start Date",
      dataIndex: "START_DATE",
      key: "START_DATE",
    },
    {
      title: "End Date",
      dataIndex: "END_DATE",
      key: "END_DATE",
    },
    {
      title: "With Adjustment",
      dataIndex: "WITH_ADJUSTMENT",
      key: "WITH_ADJUSTMENT",
      render: (boolean) => (boolean ? "Yes" : "No"),
    },
    {
      title: "With Company",
      dataIndex: "WITH_COMPANY",
      key: "WITH_COMPANY",
      render: (boolean) => (boolean ? "Yes" : "No"),
    },
    {
      title: "Company ID",
      dataIndex: "ID_COMPANY",
      key: "ID_COMPANY",
    },
    {
      title: "With Account",
      dataIndex: "WITH_ACCOUNT",
      key: "WITH_ACCOUNT",
      render: (boolean) => (boolean ? "Yes" : "No"),
    },
    {
      title: "Account ID",
      dataIndex: "ID_ACCOUNT",
      key: "ID_ACCOUNT",
    },
  ];

  return (
    <div>
      <Button
        type="primary"
        onClick={fetchGeneralLedgerData}
        style={{ marginBottom: "16px" }}
      >
        Refresh Data
      </Button>
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
