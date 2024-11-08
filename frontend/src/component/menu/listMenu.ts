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
    label: "Login",
    key: "1",
    link: "/login",  // This route will point to the login page
  },
  {
    label: "Home",
    key: "2",
    link: "/",
  },
  {
    label: "Penarikan General Ledger",
    key: "3",
    link: "/penarikan-general-ledger",
  },
  {
    label: "Cek Perjalanan Dinas",
    key: "4",
    link: "/cek-perjalanan-dinas",
  },
];