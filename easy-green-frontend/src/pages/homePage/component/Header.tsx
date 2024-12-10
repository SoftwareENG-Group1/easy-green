import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate()
  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-md">
      <div className="text-2xl font-bold text-green-800">
        <span>Loan</span> Management
      </div>
      <nav className="flex items-center space-x-10">
        <a href="#about" className="text-gray-600 hover:text-green-800">
          About Us
        </a>
        <a href="#contact" className="text-gray-600 hover:text-green-800">
          Contact Us
        </a>
      
      <button onClick={handleLogin} className="px-4 py-2 text-white bg-green-800 rounded hover:bg-green-900">
        Login
      </button>
      </nav>
    </header>
  );
};

export default Header;