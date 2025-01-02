import { SideBar } from "./components_old/SideBar.tsx";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
	return (
		<div className="flex h-screen bg-[#0F5015]">
			<div className="w-[15%] min-w-[240px] h-screen bg-gray-800">
				<SideBar />
			</div>

			<div className="w-[85%] flex justify-center items-center bg-white">
				<Outlet />
			</div>
		</div>
	);
};

export default DashboardLayout;