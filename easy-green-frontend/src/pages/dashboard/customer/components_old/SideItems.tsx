import { NavLink } from "react-router-dom";
import HomeIcon from "../../../../assets/icons/home-2.svg";

const SideItems = () => {
  const navItems = [
    { name: "Home", path: "/client" },
    { name: "Loan Overview", path: "/client/loan" },
    { name: "Payment History", path: "/client/payment-history" },
    { name: "Settings", path: "/client/settings" },
    { name: "Help Support", path: "/help-support" },
  ];

  return (
    <div className="flex flex-col justify-between h-full">
      {/* Navigation Links */}
      <div>
        {navItems.slice(0, -1).map((item, index) => (
          <NavLink
            to={item.path}
            key={item.name}
            end={index === 0} // Add end prop only to the Home link
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 rounded-lg mb-4 cursor-pointer transition ${
                isActive
                  ? "bg-gray-200 text-black font-semibold"
                  : "text-gray-600 hover:bg-gray-100"
              }`
            }
          >
            <img src={HomeIcon} alt={item.name} className="w-5 h-5" />
            <span>{item.name}</span>
          </NavLink>
        ))}
      </div>

      {/* Help Support */}
      <NavLink
        to={navItems[navItems.length - 1].path}
        className={({ isActive }) =>
          `flex justify-center px-4 py-2 rounded-lg cursor-pointer transition ${
            isActive
              ? "bg-gray-200 text-black font-semibold"
              : "text-gray-600 hover:bg-gray-100"
          }`
        }
      >
        {navItems[navItems.length - 1].name}
      </NavLink>
    </div>
  );
};

export default SideItems;