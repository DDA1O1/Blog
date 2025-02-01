import { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth } from '@store/actions/authActions';

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector(state => state.auth);
  const location = useLocation();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-violet-500"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute; 