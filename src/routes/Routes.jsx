import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import SendMoney from "../pages/SendMoney";
import CashOut from "../pages/CashOut";
import CashIn from "../pages/CashIn";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/send",
        element: <SendMoney />,
      },
      {
        path: "/cashout",
        element: <CashOut />,
      },
      {
        path: "/cashin",
        element: <CashIn />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

export default router;
