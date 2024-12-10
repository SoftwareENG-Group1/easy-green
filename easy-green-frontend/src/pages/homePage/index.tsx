import Header from "./component/Header";
import Body from "./component/body";
import Footer from "./component/footer";
import imgPlaceholder from '../../assets/images/placeholder.png'

const HomePage = () => {
  return (
    <div className="flex flex-col w-[99vw] min-h-full bg-white">
      <Header />
      <main className="flex-grow">
        <section className="py-12 flex flex-col justify-center items-center h-[30vh] text-center bg-white"  
         style={{ 
            backgroundImage: `url(${imgPlaceholder})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',  
            backgroundRepeat: 'no-repeat', 
            backgroundAttachment: 'fixed', }}>
          <h1 className="text-3xl font-bold text-green-800">
            Simplify Your Loan Management
          </h1>
          <p className="mt-4 text-gray-600">
            Track your loans, manage payments, and achieve financial success effortlessly.
          </p>
          <button className="px-6 py-3 mt-6 text-white bg-green-800 rounded hover:bg-green-900">
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