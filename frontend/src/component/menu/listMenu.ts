import { ReactNode } from "react";

export interface IRoute {
  key?: string;
  label: string;
  link: string;
  icon?: ReactNode;
  children?: IRoute[];
}

export const menuItems: IRoute[] = [
  {
    label: "Home",
    key: "1",
    link: "/",
  },
  {
    label: "Check Perjalanan Dinas",
    key: "2",
    link: "/perjalanan-dinas",
  },
  {
    label: "General Ledger",
    link: "#",
    children: [
      {
        label: "Penarikan Data 1",
        key: "3",
        link: "/general-ledger/penarikan-data-1",
      },
      // {
      //   label: "Manage Content",
      //   key: "4",
      //   link: "/content/add",
      // },
    ],
  },
];
