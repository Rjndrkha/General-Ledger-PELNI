import { createBrowserRouter } from "react-router-dom";
import LayoutUser from "../component/layout/layout";
import Home from "../page";
import IndexCheckSPJ from "../page/spjPerjadin";
import IndexGeneralLedger from "../page/generalLedger";
import Login from "../page/login/login";
import PrivateRoute from "./privateroute";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/",
    element: <LayoutUser />,
    children: [
      {
        path: "",
        element: (
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        ),
      },
      {
        path: "cek-perjalanan-dinas",
        element: (
          <PrivateRoute>
            <IndexCheckSPJ />
          </PrivateRoute>
        ),
      },
      {
        path: "penarikan-general-ledger",
        element: (
          <PrivateRoute>
            <IndexGeneralLedger />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
