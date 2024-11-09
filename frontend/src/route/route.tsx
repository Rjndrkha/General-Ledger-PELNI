import { createBrowserRouter } from "react-router-dom";
import LayoutUser from "../component/layout/layout";
import Home from "../page";
import IndexCheckSPJ from "../page/spjPerjadin";
import IndexGeneralLedger from "../page/generalLedger";
import Login from "../page/login/login";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <LayoutUser />,
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

  //   {
  //     path: "*", // Add a wildcard route for error handling if needed
  //     element: <ErrorPage />,
  //   },
]);

export default router;
