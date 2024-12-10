import { Drawer } from "@mui/material";
import { Outlet } from "react-router-dom";
import SidebarContent from "./sidebar";

const Layout = () => {

  return (
    <div className="flex w-screen h-full">
      {/* Sidebar Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          "& .MuiDrawer-paper": {
            backgroundColor: "#003300",
            color: "white",
            width: '15%',
          },
        }}
      >
        <SidebarContent />
      </Drawer>

      {/* Main Content Area */}
      <div
        className="flex-1 ml-[15%] bg-white"
      >
        <Outlet /> {/* Render nested routes */}
      </div>
    </div>
  );
};

export default Layout;