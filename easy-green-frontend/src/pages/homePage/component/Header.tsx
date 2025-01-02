import { useNavigate } from 'react-router-dom';
import logo from "../../../assets/images/Easy-Green.png"; // Ensure this path is correct

const Header = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <header className="flex items-center justify-between p-4 text-white bg-green-900 shadow-md">
      {/* Logo or App Name */}
      <div className="text-2xl font-bold">
        <img src={logo} alt="Easy Green" className="w-40 h-20 mr-2" />
      </div>

      {/* Navigation Links */}
      <nav className="flex items-center space-x-10">
        <a href="#about" className="transition-colors hover:text-green-200">
          About Us
        </a>
        <a href="#contact" className="transition-colors hover:text-green-200">
          Contact Us
        </a>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          className="px-4 py-2 text-green-900 transition-colors bg-white rounded hover:bg-gray-100 "
        >
          Login
        </button>
      </nav>
    </header>
  );
};

export default Header;