import walletAdd from "../../../assets/icons/wallet-add.svg";
import moneyBag from "../../../assets/icons/money-3.svg";
import walletMinus from "../../../assets/icons/wallet-minus.svg";

const PaymentHistory = () => {
  // Sample data for the history
  const paymentHistory = [
    { date: "Dec 1, 2024", description: "$500 paid", status: "Successful", icon: moneyBag },
    { date: "Nov 30, 2024", description: "$300 added to wallet", status: "Successful", icon: walletAdd },
    { date: "Nov 28, 2024", description: "$200 withdrawn", status: "Successful", icon: walletMinus },
    { date: "Nov 15, 2024", description: "$500 paid", status: "Successful", icon: moneyBag },
    { date: "Nov 10, 2024", description: "$100 added to wallet", status: "Successful", icon: walletAdd },
    { date: "Nov 5, 2024", description: "$150 withdrawn", status: "Failed", icon: walletMinus },
    { date: "Oct 31, 2024", description: "$300 paid", status: "Successful", icon: moneyBag },
    { date: "Oct 25, 2024", description: "$200 added to wallet", status: "Successful", icon: walletAdd },
    { date: "Oct 20, 2024", description: "$400 withdrawn", status: "Successful", icon: walletMinus },
    { date: "Oct 10, 2024", description: "$50 paid", status: "Failed", icon: moneyBag },
    { date: "Oct 5, 2024", description: "$250 added to wallet", status: "Successful", icon: walletAdd },
    { date: "Sep 30, 2024", description: "$100 withdrawn", status: "Successful", icon: walletMinus },
    { date: "Sep 15, 2024", description: "$200 paid", status: "Successful", icon: moneyBag },
    { date: "Sep 1, 2024", description: "$150 added to wallet", status: "Successful", icon: walletAdd },
    { date: "Aug 28, 2024", description: "$50 withdrawn", status: "Successful", icon: walletMinus },
    { date: "Aug 15, 2024", description: "$500 paid", status: "Successful", icon: moneyBag },
    { date: "Aug 10, 2024", description: "$300 added to wallet", status: "Failed", icon: walletAdd },
    { date: "Aug 1, 2024", description: "$100 withdrawn", status: "Successful", icon: walletMinus },
    { date: "Jul 25, 2024", description: "$600 paid", status: "Successful", icon: moneyBag },
    { date: "Jul 20, 2024", description: "$200 added to wallet", status: "Successful", icon: walletAdd },
    { date: "Jul 10, 2024", description: "$300 withdrawn", status: "Successful", icon: walletMinus },
    { date: "Jul 1, 2024", description: "$50 paid", status: "Failed", icon: moneyBag },
    { date: "Jun 28, 2024", description: "$250 added to wallet", status: "Successful", icon: walletAdd },
    { date: "Jun 20, 2024", description: "$100 withdrawn", status: "Successful", icon: walletMinus },
    { date: "Jun 15, 2024", description: "$200 paid", status: "Successful", icon: moneyBag },
    { date: "Jun 1, 2024", description: "$150 added to wallet", status: "Successful", icon: walletAdd },
    { date: "May 28, 2024", description: "$50 withdrawn", status: "Failed", icon: walletMinus },
    { date: "May 20, 2024", description: "$400 paid", status: "Successful", icon: moneyBag },
    { date: "May 10, 2024", description: "$300 added to wallet", status: "Successful", icon: walletAdd },
    { date: "May 1, 2024", description: "$200 withdrawn", status: "Successful", icon: walletMinus },
    { date: "Apr 25, 2024", description: "$600 paid", status: "Successful", icon: moneyBag },
  ];

  return (
    <div className="w-full min-h-screen bg-[#0F5015]">

      {/* Main Content */}
      <main className="max-w-6xl px-8 py-6 mx-auto space-y-8">
        {/* Summary Section */}
        <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="p-4 bg-white rounded-lg shadow-md">
            <h3 className="mb-2 text-lg font-semibold text-gray-800">Total Payments</h3>
            <p className="text-2xl font-bold text-green-500">$2,000</p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-md">
            <h3 className="mb-2 text-lg font-semibold text-gray-800">Withdrawals</h3>
            <p className="text-2xl font-bold text-red-500">$200</p>
          </div>
        </section>

        {/* Payment History Table */}
		<div className="p-8 bg-white rounded-lg shadow-lg h-[78vh] overflow-y-auto">
      <h2 className="text-2xl font-semibold text-black">
        Payment History
      </h2>
      {/* Table */}
      <table className="min-w-full mt-6 text-sm table-auto">
        <thead>
          <tr className="text-left text-gray-700 border-b">
            <th className="px-6 py-3">Date</th>
            <th className="px-6 py-3">Description</th>
            <th className="px-6 py-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {paymentHistory.map((item, index) => (
            <tr key={index} className="border-b hover:bg-gray-50">
              <td className="px-6 py-3 text-gray-600">{item.date}</td>
              <td className="px-6 py-3 text-gray-600">{item.description}</td>
              <td className="px-6 py-3">
                <span
                  className={`px-2 py-1 text-sm rounded-lg ${
                    item.status === "Successful"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  } font-medium`}
                >
                  {item.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
      </main>
    </div>
  );
};

export default PaymentHistory;