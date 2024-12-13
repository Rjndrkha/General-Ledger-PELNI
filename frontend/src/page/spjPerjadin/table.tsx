import React, { useEffect, useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import type { GetRef, TableColumnsType, TableColumnType } from "antd";
import { Button, Input, Space, Table, message } from "antd";
import type { FilterDropdownProps } from "antd/es/table/interface";
import { IPerjadin } from "../../interface/IPerjadin";
import EbsClient from "../../service/ebs/OracleClient";
import Highlighter from "react-highlight-words";
import Cookies from "js-cookie";

type InputRef = GetRef<typeof Input>;
type DataIndex = keyof IPerjadin;

const TablePerjalananDinas: React.FC<{
  nama: string;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}> = ({ nama, loading, setLoading }) => {
  const [promotion, setPromotion] = useState<IPerjadin[]>([]);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    getListPromotion();
  }, [page, limit]);

  const getListPromotion = async () => {
    setLoading(true);
    const token = Cookies.get("token") || "";

    const { error, errorMessage, response } = await EbsClient.PostAllSPJ(
      {
        nama: nama,
        page: page,
        limit: limit,
      },
      token
    );

    if (error) {
      message.error(errorMessage || "Failed to get data");
      setPromotion([]);
      setTotal(0);
      setLoading(false);
      return;
    }

    if (response) {
      setPromotion(response.data);
      setTotal(response.total || 0);
      setLoading(false);
    }
  };

  const handleTableChange = (pagination: any) => {
    if (pagination.current !== page) setPage(pagination.current);
    if (pagination.pageSize !== limit) setLimit(pagination.pageSize);
  };

  const loadData = (data: IPerjadin[]) => {
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
    // {
    //   title: "ID",
    //   dataIndex: "INVOICE_ID",
    //   key: "INVOICE_ID",
    //   ...getColumnSearchProps("INVOICE_ID"),
    // },
    {
      title: "Nomer Tagihan",
      dataIndex: "NOMER_TAGIHAN",
      key: "NOMER_TAGIHAN",
      ...getColumnSearchProps("NOMER_TAGIHAN"),
      align: "center",
    },
    {
      title: "No Invoice",
      dataIndex: "INVOICE_NUMBER",
      key: "INVOICE_NUMBER",
      ...getColumnSearchProps("INVOICE_NUMBER"),
      align: "center",
    },
    {
      title: "Tanggal Invoice",
      dataIndex: "INVOICE_DATE",
      key: "INVOICE_DATE",
      render: (text) => {
        return new Intl.DateTimeFormat("id-ID").format(new Date(text));
      },
      align: "center",
    },
    {
      title: "Status",
      dataIndex: "INV_STATUS",
      key: "INV_STATUS",
      ...getColumnSearchProps("INV_STATUS"),
      align: "center",
    },
    {
      title: "Amount",
      dataIndex: "INVOICE_AMOUNT",
      key: "INVOICE_AMOUNT",
      render: (text) => {
        return new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
        }).format(text);
      },
      align: "center",
    },
    {
      title: "Penerima",
      dataIndex: "DESCRIPTION",
      key: "DESCRIPTION",
      ...getColumnSearchProps("DESCRIPTION"),
      align: "center",
    },
    {
      title: "Status Pembayaran",
      key: "PAYMENT_STATUS",
      render: (_, record) => {
        if (record.PAYMENT_STATUS_FLAG === "Y")
          return (
            <>
              <p className="bg-green-500 text-white text-sm font-medium">
                PAID
              </p>
            </>
          );

        if (
          record.INV_STATUS === "Validated" &&
          (!record.PAYMENT_STATUS_FLAG || record.PAYMENT_STATUS_FLAG === "N")
        ) {
          return (
            <>
              <p className="bg-yellow-500 text-white text-sm font-medium">
                Waiting Payment
              </p>
            </>
          );
        }

        return (
          <>
            <p className="bg-red-500 text-white text-sm font-medium">
              Waiting Validated
            </p>
          </>
        );
      },
      align: "center",
    },
  ];

  return (
    <Table
      loading={loading}
      size="small"
      columns={columns}
      dataSource={loadData(promotion)}
      style={{ overflow: "auto", textAlign: "center" }}
      pagination={{
        current: page,
        pageSize: limit,
        total: total,
        showSizeChanger: true,
      }}
      onChange={handleTableChange}
    />
  );
};

export default TablePerjalananDinas;
