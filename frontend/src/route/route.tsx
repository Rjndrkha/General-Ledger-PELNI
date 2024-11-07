import { createBrowserRouter } from "react-router-dom";
import LayoutUser from "../component/layout/layout";
import Home from "../page";
import IndexCheckSPJ from "../page/spjPerjadin";
import IndexGeneralLedger from "../page/generalLedger";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutUser />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/cek-perjalanan-dinas",
        element: <IndexCheckSPJ />,
      },
      {
        path: "/penarikan-general-ledger",
        element: <IndexGeneralLedger />,
      },
    ],
  },

  //   {
  //     path: "*",
  //     element: <ErrorPage />,
  //   },
]);

export default router;
