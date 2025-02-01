import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, signupUser, loginWithGoogle, sendVerificationEmail, loginWithGithub } from '@store/actions/authActions';
import { setProvider, setError } from '@store/slices/authSlice';
import ForgotPassword from '@components/ForgotPassword';

const AuthPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, provider } = useSelector(state => state.auth);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const location = useLocation();
  const reAuthMessage = location.state?.message;

  const providers = [
    { 
      id: 'firebase', 
      name: 'Firebase', 
      icon: '🔥',
      options: [
        { id: 'email', name: 'Email/Password' },
        { id: 'google', name: 'Google' },
        { id: 'github', name: 'GitHub' }
      ]
    },
    { 
      id: 'supabase', 
      name: 'Supabase', 
      icon: '⚡',
      options: [
        { id: 'email', name: 'Email/Password' },
        { id: 'google', name: 'Google' },
        { id: 'github', name: 'GitHub' },
        { id: 'discord', name: 'Discord' }
      ]
    },
    { 
      id: 'appwrite', 
      name: 'Appwrite', 
      icon: '📝',
      options: [
        { id: 'email', name: 'Email/Password' },
        { id: 'google', name: 'Google' },
        { id: 'github', name: 'GitHub' },
        { id: 'facebook', name: 'Facebook' }
      ]
    }
  ];

  const selectedProvider = providers.find(p => p.id === provider);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!provider) {
      dispatch(setError('Please select a database provider'));
      return;
    }
    
    dispatch(setError(null));
    
    if (isLogin) {
      try {
        const result = await dispatch(loginUser(email, password));
        if (result) {
          navigate('/dashboard');
        }
      } catch (err) {
        // Simple error message for invalid credentials
        if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found') {
          dispatch(setError('Invalid credentials'));
        } else {
          dispatch(setError('Something went wrong. Please try again.'));
        }
      }
    } else {
      try {
        await dispatch(signupUser(email, password, provider));
        await dispatch(sendVerificationEmail());
        const loginResult = await dispatch(loginUser(email, password, provider));
        if (loginResult) {
          navigate('/dashboard');
        }
      } catch (err) {
        dispatch(setError('Signup failed. Please try a different email.'));
      }
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await dispatch(loginWithGoogle(provider));
      navigate('/dashboard');
    } catch (err) {
      // Error is handled by the reducer
    }
  };

  const handleGithubLogin = async () => {
    try {
      await dispatch(loginWithGithub(provider));
      navigate('/dashboard');
    } catch (err) {
      // Error is handled by the reducer
    }
  };

  const handleModeSwitch = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="bg-slate-800/50 backdrop-blur-xl p-8 rounded-2xl shadow-2xl w-full max-w-md border border-slate-700/50">
        {reAuthMessage && (
          <div className="bg-yellow-500/10 border border-yellow-500/50 rounded-lg p-4 mb-4">
            <p className="text-yellow-300 text-sm">{reAuthMessage}</p>
          </div>
        )}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-3">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-slate-400">
            {isLogin ? 'Login to continue' : 'Sign up to get started'}
          </p>
        </div>

        <div className="mb-8">
          <label className="text-slate-300 block mb-3 font-medium">Choose Database</label>
          <div className="grid grid-cols-3 gap-3">
            {providers.map((p) => (
              <button
                key={p.id}
                onClick={() => dispatch(setProvider(p.id))}
                className={`p-3 rounded-xl border-2 transition-all duration-200 flex flex-col items-center gap-2
                  ${provider === p.id 
                    ? 'border-purple-500/50 bg-purple-500/10 text-purple-300' 
                    : 'border-slate-700 hover:border-slate-600 text-slate-400'
                  }`}
              >
                <span className="text-xl">{p.icon}</span>
                <span className="text-sm font-medium">{p.name}</span>
              </button>
            ))}
          </div>
        </div>

        {selectedProvider && (
          <div className="mb-8">
            <label className="text-slate-300 block mb-3 font-medium">Login Options</label>
            <div className="space-y-2">
              {selectedProvider.options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => {
                    if (option.id === 'google' && provider === 'firebase') {
                      handleGoogleLogin();
                    } else if (option.id === 'github' && 
                              (provider === 'firebase' || provider === 'supabase')) {
                      handleGithubLogin();
                    } else if (option.id === 'email') {
                      return null;
                    } else {
                      alert('Coming soon!');
                    }
                  }}
                  className={`w-full p-3 rounded-lg border border-slate-700 
                    ${option.id === 'email' 
                      ? 'bg-transparent' 
                      : 'bg-slate-800 hover:bg-slate-700'} 
                    text-slate-300 transition-colors flex items-center justify-center gap-2`}
                  disabled={option.id !== 'email' && 
                            !(
                              (provider === 'firebase' && 
                               (option.id === 'google' || option.id === 'github')) ||
                              (provider === 'supabase' && option.id === 'github')
                            )}
                >
                  {option.name}
                  {option.id !== 'email' && 
                   !((provider === 'firebase' && 
                      (option.id === 'google' || option.id === 'github')) ||
                     (provider === 'supabase' && option.id === 'github')) && (
                    <span className="text-xs text-slate-500">(Coming soon)</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-500/10 border-2 border-red-500/50 rounded-lg p-4 mb-6">
            <p className="text-red-300 text-sm">{error}</p>
            {error.includes('does not exist') && (
              <button 
                onClick={() => setIsLogin(false)}
                className="text-purple-400 hover:text-purple-300 text-sm mt-2"
              >
                Create an account →
              </button>
            )}
          </div>
        )}

        {selectedProvider && (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-slate-300 block mb-2 font-medium">Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-slate-800/50 border-2 border-slate-700/50 text-slate-200 
                  placeholder:text-slate-500 focus:outline-none focus:border-purple-500/50"
                placeholder="your@email.com"
                required
              />
            </div>
            
            <div>
              <label className="text-slate-300 block mb-2 font-medium">Password</label>
              <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-slate-800/50 border-2 border-slate-700/50 text-slate-200 
                  placeholder:text-slate-500 focus:outline-none focus:border-purple-500/50"
                placeholder="••••••••"
                required
              />
            </div>

            {isLogin && (
              <button
                type="button"
                onClick={() => setShowForgotPassword(true)}
                className="text-sm text-purple-400 hover:text-purple-300 text-right block w-full mb-4"
              >
                Forgot Password?
              </button>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg font-semibold text-white
                ${loading 
                  ? 'bg-slate-700 cursor-not-allowed' 
                  : 'bg-purple-500 hover:bg-purple-600'
                }`}
            >
              {loading ? 'Processing...' : (isLogin ? 'Login' : 'Sign Up')}
            </button>
          </form>
        )}

        <div className="mt-8 text-center text-slate-400">
          <span>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
          </span>
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-purple-400 hover:text-purple-300 font-semibold"
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </div>

        {showForgotPassword && (
          <ForgotPassword onClose={() => setShowForgotPassword(false)} />
        )}
      </div>
    </div>
  );
};

export default AuthPage; 