import React, { useEffect, useState } from "react";
import { Menu, MenuProps } from "antd";
import { Link, useLocation } from "react-router-dom";
import { IRoute, staticMenuItems } from "./listMenu";
import Cookies from "js-cookie";

export type MenuItem = Required<MenuProps>["items"][number];

// const getItem = (
//   label: React.ReactNode,
//   key: React.Key,
//   icon?: React.ReactNode
// ): MenuItem => {
//   return {
//     key: key as string,
//     icon,
//     label,
//   };
// };

// export const getMenuItems = (routes: IRoute[] | undefined): MenuItem[] => {
//   if (!routes) return [];

//   return routes.map((item) => {
//     const { label, icon, link, key } = item;
//     return getItem(
//       <Link to={link}>{label}</Link>,
//       key ? key : "1",
//       icon ? icon : undefined
//     );
//   });
// };

// Fungsi untuk membuat item menu

const getItem = (
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode
): MenuItem => {
  return {
    key: key as string,
    icon,
    label,
  };
};

const getDynamicMenuItems = () => {
  const menuFromCookie = Cookies.get("menu");
  if (!menuFromCookie) return [];

  try {
    const parsedMenu = JSON.parse(menuFromCookie);
    return parsedMenu.map(
      (item: { label: string; key: string; link: string }) =>
        getItem(<Link to={item.link}>{item.label}</Link>, item.key)
    );
  } catch (error) {
    console.error("Error parsing dynamic menu from cookie:", error);
    return [];
  }
};

export const getMenuItems = (): MenuItem[] => {
  const dynamicMenu = getDynamicMenuItems();
  const staticMenu = staticMenuItems.map((item) =>
    getItem(<Link to={item.link}>{item.label}</Link>, item.key)
  );
  return [...staticMenu, ...dynamicMenu];
};

interface SideMenuProps {
  items: MenuItem[];
  menuItems: IRoute[];
}

const SideMenu: React.FC<SideMenuProps> = ({ items, menuItems }) => {
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  useEffect(() => {
    const currentPath = location.pathname;

    const foundItem = menuItems.find((item) => {
      if (item.link === currentPath) return true;
      if (item.children) {
        return item.children.some((child) => child.link === currentPath);
      }
      return false;
    });

    if (foundItem) {
      if (foundItem.link === currentPath) {
        setSelectedKeys([foundItem.key || ""]);
      } else if (foundItem.children) {
        const foundChild = foundItem.children.find(
          (child) => child.link === currentPath
        );
        if (foundChild) {
          setSelectedKeys([foundChild.key || ""]);
        }
      }
    }
  }, [location.pathname, menuItems]);

  return (
    <>
      <Menu
        style={{ backgroundColor: "none" }}
        mode="inline"
        items={items}
        selectedKeys={selectedKeys}
      />
    </>
  );
};

export default SideMenu;
