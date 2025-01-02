import Summary from "./components/home/Summary.tsx";

const UserDashboard = () => {
	return (
		<div className="w-full h-screen bg-[#0F5015]">
			{/* Main Content */}
			<div className="flex justify-center w-full p-8">
				<div className="w-full max-w-6xl bg-[#0F5015] rounded-lg shadow-md">
					<Summary />
				</div>
			</div>
		</div>
	);
};

export default UserDashboard;