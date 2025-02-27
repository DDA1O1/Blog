import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { deleteAccount } from '@store/actions/authActions';

const DeleteAccount = ({ onClose }) => {
  const [confirmation, setConfirmation] = useState('');
  const [success, setSuccess] = useState(false);
  const [deleteError, setDeleteError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { loading } = useSelector(state => state.auth);

  useEffect(() => {
    // Check if user just re-authenticated
    if (location.state?.reAuthSuccess) {
      handleDeleteAfterAuth();
    }
  }, [location.state]);

  const handleDelete = async (e) => {
    e.preventDefault();
    if (confirmation !== 'DELETE') return;
    
    setDeleteError(null);
    
    try {
      // First try to delete
      await dispatch(deleteAccount()).unwrap();
      setSuccess(true);
      setTimeout(() => navigate('/'), 5000);
    } catch (error) {
      // If re-auth needed, redirect to auth page
      if (error.code === 'auth/requires-recent-login') {
        navigate('/auth', { 
          state: { 
            message: 'Please verify your identity to delete your account',
            reAuth: true,
            onSuccess: '/settings/delete-account'  // Route to return to
          }
        });
        return;
      }
      setDeleteError(error.message);
    }
  };

  const handleDeleteAfterAuth = async () => {
    try {
      await dispatch(deleteAccount()).unwrap();
      setSuccess(true);
      setTimeout(() => navigate('/'), 5000);
    } catch (error) {
      setDeleteError(error.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-slate-800 p-6 rounded-xl max-w-md w-full border border-slate-700">
        {success ? (
          <div className="text-center space-y-4">
            <div className="text-green-400 text-xl font-semibold">
              Account Deleted Successfully
            </div>
            <p className="text-slate-300">
              Redirecting to home page in 5 seconds...
            </p>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-white mb-4">Delete Account</h2>
            
            <div className="space-y-4">
              <div className="bg-yellow-500/10 border border-yellow-500/50 rounded-lg p-4">
                <p className="text-yellow-300 text-sm">
                  Warning: This action cannot be undone. All your data will be permanently deleted.
                </p>
              </div>

              <form onSubmit={handleDelete} className="space-y-4">
                {(deleteError) && (
                  <div className="text-red-400 text-sm bg-red-500/10 border border-red-500/50 rounded-lg p-3">
                    {deleteError}
                  </div>
                )}

                <div>
                  <label className="text-slate-300 block mb-2">
                    Type DELETE to confirm
                  </label>
                  <input
                    type="text"
                    value={confirmation}
                    onChange={(e) => setConfirmation(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg bg-slate-700/50 border border-slate-600 
                      text-white placeholder:text-slate-500 focus:outline-none focus:border-red-500/50"
                    placeholder="DELETE"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    type="submit"
                    disabled={loading || confirmation !== 'DELETE'}
                    className={`px-4 py-2 rounded-lg font-medium flex-1
                      ${loading ? 'bg-slate-700 text-slate-400 cursor-not-allowed' :
                        confirmation === 'DELETE' 
                          ? 'bg-red-500 hover:bg-red-600 text-white' 
                          : 'bg-slate-700 text-slate-400 cursor-not-allowed'
                      }`}
                  >
                    {loading ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Deleting Account...</span>
                      </div>
                    ) : (
                      'Delete Account'
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    disabled={loading}
                    className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 disabled:opacity-50"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DeleteAccount; 