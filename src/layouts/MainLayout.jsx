import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const MainLayout = () => {
  return (
    <div className="font-poppins">
      <Sidebar />
      <div className="ml-[260px]">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
