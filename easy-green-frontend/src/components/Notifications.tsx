import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Notification = () => <ToastContainer />;

export const showToast = (message: string, type: 'success' | 'error') => {
  toast[type](message);
};

export default Notification;