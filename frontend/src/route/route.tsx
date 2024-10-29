import { createBrowserRouter } from "react-router-dom";
import LayoutUser from "../component/layout/layout";
import Home from "../page";
import IndexPageOne from "../page/page1";
import IndexCheckSPJ from "../page/spjPerjadin";

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
        path: "/perjalanan-dinas",
        element: <IndexCheckSPJ />,
      },
      {
        path: "/page1",
        element: <IndexPageOne />,
      },
    ],
  },

  //   {
  //     path: "*",
  //     element: <ErrorPage />,
  //   },
]);

export default router;
