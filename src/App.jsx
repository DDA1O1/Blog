import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '@store/index';

// Pages
import LandingPage from '@pages/LandingPage';
import AuthPage from '@pages/AuthPage';
import DashboardPage from '@pages/DashboardPage';

// Components
import ProtectedRoute from '@components/ProtectedRoute';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        } 
      />
    </Routes>
    </BrowserRouter>
  );
};

const App = () => {
  return (
    <Provider store={store}>
        <AppRoutes />
    </Provider>
  );
};

export default App;
