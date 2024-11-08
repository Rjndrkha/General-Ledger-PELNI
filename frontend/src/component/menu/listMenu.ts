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
    label: "Penarikan General Ledger",
    key: "2",
    link: "/penarikan-general-ledger",
  },
  {
    label: "Cek Perjalanan Dinas",
    key: "3",
    link: "/cek-perjalanan-dinas",
  },
];