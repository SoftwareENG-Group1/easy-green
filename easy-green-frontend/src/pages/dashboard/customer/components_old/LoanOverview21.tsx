export const LoanOverview2 = () => {
	return (
		<div className="grid grid-cols-2 gap-6 mt-8">
			<div className="bg-white p-6 rounded-lg shadow-lg">
				<h3 className="text-xl font-semibold">Loan Balance</h3>
				<p className="text-3xl font-bold mt-4">$3,530.24</p>
			</div>
			<div className="bg-white p-6 rounded-lg shadow-lg">
				<h3 className="text-xl font-semibold">Upcoming Payments</h3>
				<table className="w-full mt-4 text-sm text-gray-600">
					<thead>
						<tr>
							<th>Amount</th>
							<th>Date</th>
							<th>Status</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>$450</td>
							<td>Dec 25, 2024</td>
							<td>Paid</td>
						</tr>
						<tr>
							<td>$500</td>
							<td>Jan 25, 2025</td>
							<td>Pending</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	);
};
