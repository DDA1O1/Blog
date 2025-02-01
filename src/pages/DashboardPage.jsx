import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/store/actions/authActions';
import DeleteAccount from '@/components/DeleteAccount';
import { useState } from 'react';

const DashboardPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleLogout = async () => {
    try {
      await dispatch(logout());
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900">
      <nav className="bg-white dark:bg-slate-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <h1 className="text-xl font-bold text-slate-800 dark:text-white">Dashboard</h1>
            <div className="flex items-center gap-4">
              <span className="text-slate-600 dark:text-slate-300">{user?.email}</span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 rounded-lg text-slate-700 dark:text-white transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Account Status Card */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Account Status</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">Email Verification</p>
                <p className={`text-sm font-medium ${user?.emailVerified ? 'text-green-500' : 'text-red-500'}`}>
                  {user?.emailVerified ? 'Verified' : 'Not Verified'}
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">Provider</p>
                <p className="text-sm font-medium text-slate-800 dark:text-slate-200 capitalize">
                  {user?.providerData?.[0]?.providerId || 'email'}
                </p>
              </div>
            </div>
          </div>

          {/* Danger Zone Card */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow border border-red-200 dark:border-red-900">
            <h2 className="text-lg font-semibold text-red-600 dark:text-red-500 mb-4">Danger Zone</h2>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="w-full px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
            >
              Delete Account
            </button>
          </div>
        </div>
      </main>

      {showDeleteModal && (
        <DeleteAccount onClose={() => setShowDeleteModal(false)} />
      )}
    </div>
  );
};

export default DashboardPage; 