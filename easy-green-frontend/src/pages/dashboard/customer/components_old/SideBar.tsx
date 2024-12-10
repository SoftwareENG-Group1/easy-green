import SideItems from "./SideItems";
import EasyGreenLogo from "../../../../assets/images/Easy-Green.png";

export const SideBar = () => {
	return (
		<div className="flex flex-col w-full h-screen px-6 py-10 text-white bg-white ">
			<div className="mb-4"></div>
			<img src={EasyGreenLogo} alt="Easy Green Logo" className="mb-8" />
			<SideItems />
		</div>
	);
};