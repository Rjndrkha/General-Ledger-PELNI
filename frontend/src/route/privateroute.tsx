import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { message } from "antd";

export const PrivateRoute: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();
  const token = Cookies.get("token");

  useEffect(() => {
    if (!token) {
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
  const nrp = atob(Cookies.get("nrp") || "");
  const allowedUsers = "16391,012345,15713,8738,8656";
  const split = allowedUsers.split(",");

  useEffect(() => {
    if (nrp && !split.includes(nrp)) {
      message.error("Anda tidak memiliki akses ke halaman ini!");
      navigate("/");
    }
  }, [nrp, allowedUsers]);

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
