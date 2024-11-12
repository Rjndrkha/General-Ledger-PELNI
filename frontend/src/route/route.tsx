import { createBrowserRouter } from "react-router-dom";
import LayoutUser from "../component/layout/layout";
import Home from "../page";
import IndexCheckSPJ from "../page/spjPerjadin";
import IndexGeneralLedger from "../page/generalLedger";
import Login from "../page/login/login";
import IndexNotFound from "../page/NotFound";
import { PrivateRoute } from "./privateroute";

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
        element: <IndexGeneralLedger />,
      },
    ],
  },

  {
    path: "*",
    element: <IndexNotFound />,
  },
]);

export default router;
