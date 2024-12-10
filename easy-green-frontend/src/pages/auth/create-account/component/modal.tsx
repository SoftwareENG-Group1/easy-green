import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isVisible, onClose }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
        navigate("/login");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, navigate, onClose]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="w-full p-8 mx-auto text-center transition-all duration-300 ease-in-out transform bg-white border border-gray-100 rounded-lg shadow-lg sm:w-96 hover:scale-105">
        <h3 className="mb-4 text-2xl font-semibold text-green-800">Success!</h3>
        <p className="mb-6 text-sm text-gray-600">
          Your account has been created successfully. You will be redirected to
          the login page shortly.
        </p>
      </div>
    </motion.div>
  );
};

export default Modal;
