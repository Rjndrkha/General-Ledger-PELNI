import React, { useEffect, useState } from "react";
import { Menu, MenuProps } from "antd";
import { Link, useLocation } from "react-router-dom";
import { IRoute, menuItems } from "./listMenu";

type MenuItem = Required<MenuProps>["items"][number];

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

const getMenuItems = (routes: IRoute[] | undefined): MenuItem[] => {
  if (!routes) return [];

  return routes.map((item) => {
    const { label, icon, link, key } = item;
    return getItem(
      <Link to={link}>{label}</Link>,
      key ? key : "1",
      icon ? icon : undefined
    );
  });
};

const SideMenu: React.FC = () => {
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [openKeys, setOpenKeys] = useState<string[]>([]);

  useEffect(() => {
    const currentPath = location.pathname;
    const foundItem = menuItems.find((item) => {
      if (item.link === currentPath) {
        return true;
      } else if (item.children) {
        return item.children.some((child) => child.link === currentPath);
      }
      return false;
    });

    if (foundItem) {
      if (currentPath !== foundItem.link) {
        foundItem.children?.forEach((child) => {
          if (child.link === currentPath) {
            setSelectedKeys([child.key || ""]);
          }
        });
        setOpenKeys([foundItem.key || ""]);
      }

      if (currentPath === foundItem.link) {
        setSelectedKeys([foundItem.key || ""]);
        setOpenKeys([foundItem.key || ""]);
      }
    }
  }, [location.pathname]);

  const items: MenuItem[] = getMenuItems(menuItems);

  return (
    <>
      {/* <img src={ASSETS.LOGOMF} alt="logo" className="hidden md:block" /> */}
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
