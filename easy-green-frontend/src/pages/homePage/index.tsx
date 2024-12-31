import { useNavigate } from 'react-router-dom';
import Header from "./component/Header";
import Body from "./component/body";
import Footer from "./component/footer";

const HomePage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/create-account'); 
  };

  return (
    <div className="flex flex-col w-full min-h-full bg-white">
      <Header />
      <main className="">
        <section className="py-12 flex flex-col justify-center items-center h-[30vh] text-center bg-white">
          <h1 className="max-w-lg mx-auto mt-2 text-4xl font-semibold tracking-tight text-center text-green-900 sm:text-5xl">
            Simplify Your Loan Management
          </h1>
          <p className="mt-4 text-gray-600">
            Track your loans, manage payments, and achieve financial success effortlessly.
          </p>
          <button
            onClick={handleGetStarted} 
            className="px-6 py-3 mt-6 text-white bg-green-800 rounded hover:bg-green-900"
          >
            Get Started Now
          </button>
        </section>
        <Body />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;