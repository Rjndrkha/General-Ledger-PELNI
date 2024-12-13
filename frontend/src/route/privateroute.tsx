import { ReactNode, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { message } from "antd";

export const PrivateRoute: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();
  const token = Cookies.get("token");

  useEffect(() => {
    if (!token) {
      message.error("Anda harus login terlebih dahulu!");
      navigate("/login");
    }

    if (token) {
      navigate("/");
    }
  }, [token]);

  return <>{children}</>;
};

export const PrivateGLRoute: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();
  const menu = Cookies.get("menu");
  const location = useLocation();
  const token = Cookies.get("token");

  useEffect(() => {
    if (!token) {
      message.error("Anda harus login terlebih dahulu!");
      navigate("/login");
    }
    const allowedRoutes = menu
      ? JSON.parse(menu).map((item: any) => item.link)
      : [];

    if (
      !allowedRoutes.includes(location.pathname) &&
      location.pathname !== "/"
    ) {
      message.error("Anda tidak memiliki akses ke halaman ini!");
      navigate("/");
    }
  }, [token, menu, location.pathname, navigate]);

  return <>{children}</>;
};

export const PrivateAdminRoute: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/admin/master-menu");
  }, []);

  return <>{children}</>;
};
