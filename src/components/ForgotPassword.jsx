import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '@store/actions/authActions';

const ForgotPassword = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(resetPassword(email));
      setSuccess(true);
    } catch (err) {
      // Error handled by reducer
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-slate-800 p-6 rounded-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-white mb-4">Reset Password</h2>
        
        {success ? (
          <div className="text-green-400 mb-4">
            Check your email for password reset instructions.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="text-red-400 text-sm">{error}</div>
            )}
            <div>
              <label className="text-slate-300 block mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded bg-slate-700 text-white"
                required
              />
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
              >
                {loading ? 'Sending...' : 'Send Reset Link'}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-slate-700 text-white rounded hover:bg-slate-600"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
// Flow Summary:
// 1. User clicks "Forgot Password?" → showForgotPassword becomes true
// 2. Modal appears because showForgotPassword is true
// 3. User clicks "Cancel" → onClose function runs → showForgotPassword becomes false
// 4. Modal disappears because showForgotPassword is false
export default ForgotPassword; 