import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, loginWithGoogle, loginWithGithub, checkAuth, signupUser } from '@store/actions/authActions';
import { setProvider, setError } from '@store/slices/authSlice';
import ForgotPassword from '@components/ForgotPassword';

const AuthPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, provider, user } = useSelector(state => state.auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);

  useEffect(() => {
    /* Checks authentication state on component mount:
     - Dispatches checkAuth action
     - Redirects to dashboard if user exists
     - Handles errors in console */
    const checkAuthState = async () => {
      try {
        const currentUser = await dispatch(checkAuth());
        if (currentUser) {
          navigate('/dashboard');
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      }
    };

    checkAuthState();
  }, [dispatch, navigate]);

  if (loading) {
    /* Shows loading spinner when:
     - Authentication is in progress
     - Provider operations are running */
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-4 border-purple-500/50 border-t-purple-500 rounded-full" />
      </div>
    );
  }

  if (user) {
    return null;
  } // Prevents flash of login form while redirect happens

  const providers = [
    /* Defines authentication providers configuration:
     - Firebase with email, Google, GitHub options
     - Supabase with email, Google, GitHub options
     - Appwrite with email, Google, GitHub options
     Each provider has:
     - Unique ID
     - Display name
     - Icon
     - Available authentication options */
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
        { id: 'github', name: 'GitHub' }
      ]
    },
    {
      id: 'appwrite',
      name: 'Appwrite',
      icon: '📝',
      options: [
        { id: 'email', name: 'Email/Password' },
        { id: 'google', name: 'Google' },
        { id: 'github', name: 'GitHub' }
      ]
    }
  ];

  const selectedProvider = providers.find(p => p.id === provider);

  const handleSubmit = async (e) => {
    /* Handles form submission:
     - Prevents default form behavior
     - Validates provider selection
     - Dispatches login/signup action based on isSignup state
     - Redirects to dashboard on success
     - Sets error message on failure */
    e.preventDefault();
    if (!provider) {
      dispatch(setError('Please select a database provider'));
      return;
    }
    dispatch(setError(null)); // Clears any previous error messages
    try {
      const result = await dispatch(isSignup ? signupUser(email, password) : loginUser(email, password));
      if (result) navigate('/dashboard');
    } catch (err) {
      dispatch(setError(isSignup ? 'Signup failed' : 'Invalid credentials'));
    }
  };

  const handleGoogleLogin = async () => {
    /* Handles Google OAuth:
     - Dispatches Google login action with selected provider
     - Redirects to dashboard on success
     - Silently handles errors */
    try {
      await dispatch(loginWithGoogle(provider));
      navigate('/dashboard');
    } catch (err) {}
  };

  const handleGithubLogin = async () => {
    /* Handles GitHub OAuth:
     - Dispatches GitHub login action with selected provider
     - Redirects to dashboard on success
     - Silently handles errors */
    try {
      await dispatch(loginWithGithub(provider));
      navigate('/dashboard');
    } catch (err) {}
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      {/* Creates a page container with:
       - Full viewport height (min-h-screen)
       - Purple gradient background (bg-gradient-to-br + from/via/to colors)
       - Centered content (flex + items-center + justify-center)
       - Padding on all sides (p-4) */}

      <div className="bg-slate-800/50 backdrop-blur-xl p-8 rounded-2xl shadow-2xl w-full max-w-md border border-slate-700/50">
        {/* Creates a container with:
         - Semi-transparent slate background (bg-slate-800/50)
         - Blur effect (backdrop-blur-xl)
         - Padding (p-8)
         - Rounded corners (rounded-2xl)
         - Shadow (shadow-2xl)
         - Full width (w-full)
         - Max width of 28rem/448px (max-w-md)
         - Semi-transparent border (border border-slate-700/50) */}

        <div className="text-center mb-8">
          {/* Creates a header section with:
           - Centered text (text-center)
           - Bottom margin (mb-8) */}

          <h2 className="text-3xl font-bold text-white mb-3">
            {/* Creates a heading with:
             - Large text size (text-3xl)
             - Bold weight (font-bold)
             - White color (text-white)
             - Bottom margin (mb-3) */}
            {isSignup ? 'Create Account' : 'Welcome Back'}
          </h2>
          {/* Creates a button that toggles the signup state when clicked */}
          <button
            onClick={() => setIsSignup(!isSignup)}
            className="text-purple-400 hover:text-purple-300 text-sm"
          >
            {isSignup ? 'Already have an account? Login' : 'Need an account? Sign up'}
          </button>
        </div>

        <div className="mb-8">
          {/* Creates a label with a text color of slate-300, a block display, a margin-bottom of 3 units, and a font weight of medium */}
          <label className="text-slate-300 block mb-3 font-medium">Choose Provider</label>
          {/* Creates a grid with 3 columns and a gap of 3 units */}
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

        {/* Error Alert Component
         * Industry standard practice for auth forms
         * 
         * Purpose:
         * - Provides immediate user feedback
         * - Improves UX by showing what went wrong
         * - Helps with debugging issues
         * - Maintains application reliability
         * 
         * Common Error Cases:
         * - Invalid login credentials
         * - Network connectivity issues 
         * - Server availability problems
         * - Email already exists during signup
         * - Password requirement failures
         * 
         * Security Best Practices:
         * - Shows generic error messages
         * - Avoids exposing system details
         * - Prevents security exploits
         * 
         * Implementation:
         * - Uses Redux error state
         * - Conditionally renders when error exists
         * - Styled as a visible but non-intrusive alert
         */}
        {error && (
          <div className="bg-red-500/10 border-2 border-red-500/50 rounded-lg p-4 mb-6">
            <p className="text-red-300 text-sm">{error}</p>
          </div>
        )}

        {selectedProvider && (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Creates a form with:
             - Vertical spacing between children (space-y-5) */}

            <div>
              <label className="text-slate-300 block mb-2 font-medium">Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-slate-800/50 border-2 border-slate-700/50 text-slate-200"
                required
              />
            </div>
            
            <div>
              <label className="text-slate-300 block mb-2 font-medium">Password</label>
              <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-slate-800/50 border-2 border-slate-700/50 text-slate-200"
                required
              />
            </div>

            <button
              type="button"
              onClick={() => setShowForgotPassword(true)}
              className="text-sm text-purple-400 hover:text-purple-300 text-right block w-full"
            >
              Forgot Password?
            </button>

            <div className="space-y-3">
              {/* Creates a social buttons container with:
               - Vertical spacing between children (space-y-3) */}

              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full py-3 rounded-lg font-semibold text-white bg-red-500 hover:bg-red-600 flex items-center justify-center gap-2"
              >
                <span>Continue with Google</span>
              </button>

              <button
                type="button"
                onClick={handleGithubLogin}
                className="w-full py-3 rounded-lg font-semibold text-white bg-gray-700 hover:bg-gray-800 flex items-center justify-center gap-2"
              >
                <span>Continue with GitHub</span>
              </button>
            </div>
            {/* Submit Button:
               - disabled={loading}: Prevents clicking when auth is in progress
               - Changes appearance based on loading state:
                 - If loading=true:
                   - Button is disabled
                   - Background becomes gray
                   - Text shows "Processing..."
                 - If loading=false:
                   - Button is clickable
                   - Background is purple
                   - Text shows "Sign Up" or "Login"
          */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg font-semibold text-white
                ${loading ? 'bg-slate-700' : 'bg-purple-500 hover:bg-purple-600'}`}
            >
              {loading ? 'Processing...' : isSignup ? 'Sign Up' : 'Login'}
            </button>
          </form>
        )}

        {showForgotPassword && (// We pass a function reference, NOT executing it
          // WRONG:  onClose={setShowForgotPassword(false)} - This would execute immediately
            // RIGHT:  onClose={() => setShowForgotPassword(false)} - This passes a function to be called later
          <ForgotPassword onClose={() => setShowForgotPassword(false)} />
        )}
      </div>
    </div>
  );
};

export default AuthPage; 