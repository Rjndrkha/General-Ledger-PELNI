import Cookies from "js-cookie";
import { ReactNode } from "react";

export interface IRoute {
  key: string;
  label: string;
  link: string;
  icon?: ReactNode;
  children?: IRoute[];
}

export const staticMenuItems: IRoute[] = [
  {
    label: "Home",
    key: "1",
    link: "/",
  },
];

export const menuItemsUser: IRoute[] = [
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

export const menuItemsAdmin: IRoute[] = [
  {
    label: "Master Menu",
    key: "1",
    link: "/admin/master-menu",
  },
];
