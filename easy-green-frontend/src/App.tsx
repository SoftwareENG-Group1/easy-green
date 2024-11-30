import React from 'react';
import AppRoutes from './routes/appRoutes';
import Notification from './components/Notifications';

const App = () => {
  return (
    <div className="App">
      <Notification />
      <AppRoutes />
    </div>
  );
};

export default App;