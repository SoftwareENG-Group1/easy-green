// import Sidebar from "../../../components/sidebar";
import SummaryCards from "./components/summary-cards";
import LoanTable from "./components/loan-table";
import LoanChart from "./components/chart";
import RecentActivites from "./components/recent-activities";
const AdminDashboard = () => {
  return (
    <div className="flex overflow-hidden bg-white">
      <div className="p-6">
        <SummaryCards />
        <div className="grid grid-cols-1 gap-4 mt-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="col-span-2">
            <LoanTable />
          </div>
          <div className="col-span-1">
            <RecentActivites/>
          </div>
          <div className="col-span-1">
            <LoanChart />
          </div>
          </div>          
        </div>
    </div>
  );
};

export default AdminDashboard;