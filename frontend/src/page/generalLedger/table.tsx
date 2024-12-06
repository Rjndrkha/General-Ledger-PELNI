import React, { useEffect, useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import type { GetRef, TableColumnsType, TableColumnType } from "antd";
import { Button, Input, Space, Table, message } from "antd";
import type { FilterDropdownProps } from "antd/es/table/interface";
import { ITableGeneralLedger } from "../../interface/ITableGeneralLedger";
import EbsClient from "../../service/ebs/OracleClient";
import Highlighter from "react-highlight-words";
import Cookies from "js-cookie";

type InputRef = GetRef<typeof Input>;
type DataIndex = keyof ITableGeneralLedger;

const TableGeneralLedger: React.FC<{
  nama: string;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}> = ({ nama, loading, setLoading }) => {
  const [promotion, setPromotion] = useState<ITableGeneralLedger[]>([]);

  useEffect(() => {
    getListPromotion();
  }, []);

  const getListPromotion = async () => {
    setLoading(true);

    const token = Cookies.get("token") || "";

    const { error, errorMessage, response } = await EbsClient.GetGeneralLedgerStatus(
      {
        // nama: nama,
      },
      token
    );

    if (error) {
      message.error("Error");
      setLoading(false);
    }

    if (response) {
      setPromotion(response.data);
      setLoading(false);
    }
  };

  const addActionButton = (data: ITableGeneralLedger[]) => {
    return data.map((item) => {
      return {
        ...item,
        Action: (
          <div className="flex justify-center gap-5">
            {/* <ButtonDefault
              color="#f4b63c"
              text={"Edit"}
              onClick={() => {
                window.location.href = `/content/edit/${item.id_promo}`;
              }}
            />

            <ButtonDefault
              color="#2a9928"
              text={"Show"}
              onClick={() => {
                window.location.href = `/content/show/${item.id_promo}`;
              }}
            /> */}
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
    getListPromotion();
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
      title: "JOB_ID",
      dataIndex: "JOB_ID",
      key: "JOB_ID",
      ...getColumnSearchProps("JOB_ID"),
    },
    {
      title: "STATUS",
      dataIndex: "STATUS",
      key: "STATUS",
      ...getColumnSearchProps("STATUS"),
    },
    // {
    //   align: "center",
    //   title: "Action",
    //   dataIndex: "Action",
    //   key: "Action",
    // },
  ];

  return (
    <Table
      loading={loading}
      size="small"
      columns={columns}
      style={{ overflow: "auto", textAlign: "center" }}
      dataSource={addActionButton(promotion)}
      pagination={{ pageSize: 5, position: ["bottomLeft"], defaultCurrent: 1 }}
    />
  );
};

export default TableGeneralLedger;
