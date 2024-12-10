export const ProfileOverview = () => {
	return (
		<div className="bg-white p-6 rounded-lg shadow-lg mt-8">
			<h3 className="text-xl font-semibold">Profile Overview</h3>
			<div className="space-y-4 mt-4">
				<div>
					<strong>Full Name:</strong> Helen Hendricks Apojie
				</div>
				<div>
					<strong>Phone Number:</strong> +234XXXXXXXXXX
				</div>
				<div>
					<strong>Email:</strong> helen.apojie@hotmail.ng
				</div>
				<div>
					<strong>Bank:</strong> 0pay
				</div>
				<div className="mt-4 flex space-x-4">
					<button className="px-6 py-2 text-gray-800 border-2 border-[#D6DEE0] rounded-[6px] text-[14px] hover:bg-gray-100">
						Request Change
					</button>
					<button className="px-6 py-2 bg-green-600 text-white rounded-[6px]">
						Continue
					</button>
				</div>
			</div>
		</div>
	);
};
