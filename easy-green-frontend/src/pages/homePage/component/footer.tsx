const Footer = () => {
  return (
    <footer className="py-6 text-center text-white bg-green-800 ">
      <p>&copy; 2023 Loan Management Platform. All rights reserved.</p>
      <div className="flex justify-center mt-2 space-x-6">
        <a href="#" className="hover:underline">Privacy Policy</a>
        <a href="#" className="hover:underline">Terms of Service</a>
      </div>
    </footer>
  );
};

export default Footer;