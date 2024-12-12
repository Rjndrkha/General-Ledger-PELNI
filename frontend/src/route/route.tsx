import { createBrowserRouter } from "react-router-dom";
import LayoutUser from "../component/layout/layout";
import Home from "../page";
import IndexCheckSPJ from "../page/spjPerjadin";
import IndexGeneralLedger from "../page/generalLedger";
import Login from "../page/login/login";
import IndexNotFound from "../page/NotFound";
import {
  PrivateAdminRoute,
  PrivateGLRoute,
  PrivateRoute,
} from "./privateroute";
import LayoutAdmin from "../component/layout/layout_admin";
import IndexMasterMenu from "../page/admin/master_menu";

const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <PrivateRoute>
        <Login />
      </PrivateRoute>
    ),
    index: true,
  },
  {
    path: "/admin",
    element: (
      <PrivateAdminRoute>
        <LayoutAdmin />
      </PrivateAdminRoute>
    ),

    children: [
      {
        path: "/admin/master-menu",
        element: <IndexMasterMenu />,
        index: true,
      },
    ],
  },
  {
    path: "/",
    element: (
      <PrivateRoute>
        <LayoutUser />
      </PrivateRoute>
    ),

    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "cek-perjalanan-dinas",
        element: <IndexCheckSPJ />,
      },
      {
        path: "penarikan-general-ledger",
        element: (
          <PrivateGLRoute>
            <IndexGeneralLedger />
          </PrivateGLRoute>
        ),
      },
    ],
  },

  {
    path: "*",
    element: <IndexNotFound />,
  },
]);

export default router;