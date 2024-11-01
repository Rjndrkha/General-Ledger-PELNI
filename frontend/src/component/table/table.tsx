import React, { useEffect, useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import type { GetRef, TableColumnsType, TableColumnType } from "antd";
import { Button, Input, Space, Table, message } from "antd";
import type { FilterDropdownProps } from "antd/es/table/interface";
import ButtonDefault from "../button/button";
import { IPerjadin } from "../interface/IPerjadin";
import EbsClient from "../../service/ebs/OracleClient";
import Highlighter from "react-highlight-words";

type InputRef = GetRef<typeof Input>;
type DataIndex = keyof IPerjadin;

const TablePerjalananDinas: React.FC<{ nama: string }> = ({ nama }) => {
  const [promotion, setPromotion] = useState<IPerjadin[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    getListPromotion();
  }, []);

  const getListPromotion = async () => {
    setLoading(true);

    const { error, errorMessage, response } = await EbsClient.GetAllSPJ({
      nama: nama,
    });

    if (error) {
      message.error(errorMessage);
      setLoading(false);
    }

    if (response) {
      setPromotion(response.data);
      setLoading(false);
    }
  };

  const addActionButton = (data: IPerjadin[]) => {
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
  ): TableColumnType<IPerjadin> => ({
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
  const columns: TableColumnsType<IPerjadin> = [
    {
      title: "ID INVOICE",
      dataIndex: "INVOICE_ID",
      key: "INVOICE_ID",
      ...getColumnSearchProps("INVOICE_ID"),
    },
    {
      title: "NO TAGIHAN",
      dataIndex: "NOMER_TAGIHAN",
      key: "NOMER_TAGIHAN",
      ...getColumnSearchProps("NOMER_TAGIHAN"),
    },
    {
      title: "NO INVOICE",
      dataIndex: "INVOICE_NUMBER",
      key: "INVOICE_NUMBER",
      ...getColumnSearchProps("INVOICE_NUMBER"),
    },
    {
      title: "TANGGAL INVOICE",
      dataIndex: "INVOICE_DATE",
      key: "INVOICE_DATE",
      render: (text) => {
        return new Intl.DateTimeFormat("id-ID").format(new Date(text));
      },
      // ...getColumnSearchProps("INVOICE_DATE"),
    },
    {
      title: "STATUS",
      dataIndex: "INV_STATUS",
      key: "INV_STATUS",
      ...getColumnSearchProps("INV_STATUS"),
    },
    {
      title: "AMOUNT SPJ",
      dataIndex: "INVOICE_AMOUNT",
      key: "INVOICE_AMOUNT",
      render: (text) => {
        return new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
        }).format(text);
      },
      // ...getColumnSearchProps("INVOICE_AMOUNT"),
    },
    {
      title: "PENERIMA",
      dataIndex: "DESCRIPTION",
      key: "DESCRIPTION",
      // render: (text) => {
      //   return text.split(" - ")[1];
      // },
      ...getColumnSearchProps("DESCRIPTION"),
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

export default TablePerjalananDinas;
