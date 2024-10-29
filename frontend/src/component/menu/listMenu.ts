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
    label: "Content Management",
    link: "#",
    children: [
      {
        label: "All Content",
        key: "3",
        link: "/content",
      },
      {
        label: "Manage Content",
        key: "4",
        link: "/content/add",
      },
    ],
  },
];
