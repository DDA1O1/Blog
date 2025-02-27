# React Authentication Project

A React application with multi-provider authentication support (Firebase, Supabase, Appwrite).

## Project Structure

```
src/
├── assets/
│ └── react.svg
├── components/
│ ├── DeleteAccount.jsx # Account deletion modal
│ ├── ForgotPassword.jsx # Password reset modal
│ ├── LoadingSpinner.jsx # Loading animation
│ └── ProtectedRoute.jsx # Auth route wrapper
├── pages/
│ ├── AuthPage.jsx # Login/Signup page
│ ├── DashboardPage.jsx # User dashboard
│ └── LandingPage.jsx # Home page
├── services/
│ ├── api/ # API service layer
│ │ ├── auth.service.js
│ │ ├── blog.service.js
│ │ └── storage.service.js
│ ├── config/ # Provider configurations
│ │ ├── appwrite.config.js
│ │ ├── firebase.config.js
│ │ └── supabase.config.js
│ └── lib/ # Core functionality
│ ├── auth.js # Auth provider class
│ └── database.js # Database operations
├── store/ # Redux state management
│ ├── actions/
│ │ └── authActions.js
│ ├── slices/
│ │ └── authSlice.js
│ └── index.js
├── App.jsx # Root component
├── index.css # Global styles
└── main.jsx # Entry point
```

## Key Features

- Multi-provider authentication (Firebase/Supabase/Appwrite)
- Protected routes
- User management (login/signup/delete)
- Social auth (Google/GitHub)
- Password reset
- Email verification
- Account deletion

## Tech Stack

- React
- Redux Toolkit
- React Router
- Tailwind CSS
- Framer Motion

- Dirst the use r will land in the landing page
- Then the user will be redirected to the auth page
- After the user is authenticated, the user will be redirected to the dashboard

## Authentication

# AuthPage Component Documentation

The `AuthPage` component is the central authentication page managing both login and signup flows. It supports multiple authentication providers (Firebase, Supabase, Appwrite) and offers social sign-in options (Google and GitHub). Below is an outline of its logic flow and key functionalities with code examples.

---

## Overview

- **Purpose:**  
  - Handles user authentication (login/signup) via email and password.
  - Provides OAuth options (Google and GitHub).
  - Enables provider selection (Firebase, Supabase, Appwrite) to streamline multi-provider setups.
  - Redirects authenticated users to the dashboard.

- **Key Features:**  
  - **Auth Check on Mount:** Automatically checks if a user is already authenticated.
  - **Dynamic Form Mode:** Allows toggling between Login and Signup.
  - **Provider Selection:** Lets users choose an authentication provider.
  - **Error & Loading Handling:** Displays errors and a loading spinner during async operations.
  - **Password Reset:** Includes a modal for password reset functionality.

---

## Logic Flow

1. **Authentication Check on Component Mount**
   - A `useEffect` hook dispatches the `checkAuth` action to verify if the user is already logged in.  
   - If authenticated, the user is immediately redirected to the dashboard.
   
   ```javascript:src/pages/AuthPage.jsx
   useEffect(() => {
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
   ```

2. **State Management**
   - Uses local state to manage inputs: `email`, `password`, and UI toggles (`isSignup`, `showForgotPassword`).
   - Uses Redux for global states such as `user`, `loading`, `error`, and the selected `provider`.

3. **Provider Selection**
   - Renders a grid of buttons representing each authentication provider.
   - Clicking a provider button updates the Redux state with the selected provider.
   
   ```javascript:src/pages/AuthPage.jsx
   const providers = [
     { id: 'firebase', name: 'Firebase', icon: '🔥', options: [ ... ] },
     { id: 'supabase', name: 'Supabase', icon: '⚡', options: [ ... ] },
     { id: 'appwrite', name: 'Appwrite', icon: '📝', options: [ ... ] }
   ];

   // Button example (inside JSX):
   <button onClick={() => dispatch(setProvider(p.id))}>
     <span>{p.icon}</span>
     <span>{p.name}</span>
   </button>
   ```

4. **Form Submission & Authentication Handling**
   - The form submission is handled by `handleSubmit`, which:
     - Prevents the default event.
     - Validates that a provider is selected.
     - Dispatches either `loginUser` or `signupUser` based on the current mode.
     - Redirects the user to `/dashboard` upon successful authentication.
     - Sets an error message if authentication fails.
   
   ```javascript:src/pages/AuthPage.jsx
   const handleSubmit = async (e) => {
     e.preventDefault();
     if (!provider) {
       dispatch(setError('Please select a database provider'));
       return;
     }
     dispatch(setError(null));
     try {
       const result = await dispatch(isSignup ? signupUser(email, password) : loginUser(email, password));
       if (result) navigate('/dashboard');
     } catch (err) {
       dispatch(setError(isSignup ? 'Signup failed' : 'Invalid credentials'));
     }
   };
   ```

5. **OAuth Login Handling**
   - Separate functions handle social login via Google and GitHub:
     - Dispatch `loginWithGoogle` or `loginWithGithub` with the selected provider.
     - Redirect to `/dashboard` on success.
   
   ```javascript:src/pages/AuthPage.jsx
   const handleGoogleLogin = async () => {
     try {
       await dispatch(loginWithGoogle(provider));
       navigate('/dashboard');
     } catch (err) {}
   };

   const handleGithubLogin = async () => {
     try {
       await dispatch(loginWithGithub(provider));
       navigate('/dashboard');
     } catch (err) {}
   };
   ```

6. **Password Reset Flow**
   - A "Forgot Password?" link toggles the display of the `ForgotPassword` modal.
   - It passes a callback to close the modal (`onClose={() => setShowForgotPassword(false)}`).

---

## UI & Error Handling

- **Loading State:**  
  When an authentication process is ongoing, a spinner is displayed:
  
  ```jsx
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br ...">
        <div className="animate-spin w-12 h-12 border-4 ... rounded-full" />
      </div>
    );
  }
  ```

- **Error Alerts:**  
  If there's an error (e.g., failed login or signup), an alert box displays the message:
  
  ```jsx
  {error && (
    <div className="bg-red-500/10 border-2 ... rounded-lg p-4 mb-6">
      <p className="text-red-300 text-sm">{error}</p>
    </div>
  )}
  ```

- **Conditional Rendering:**  
  The component avoids premature form rendering if the user is already authenticated (returns `null`).

---

## Summary

The `AuthPage` component is structured to:
- Immediately check authentication and redirect if needed.
- Provide a clear UI for choosing an authentication provider.
- Support toggling between login and signup.
- Handle both traditional email/password authentication and OAuth through Google and GitHub.
- Manage loading and error states to provide immediate user feedback.
- Include a secure password reset workflow via a modal component.

This design ensures a smooth and user-friendly authentication experience within the application.

## ForgotPassword Component Documentation

## Overview
The `ForgotPassword` component is a modal that handles password reset functionality. It provides a simple interface for users to request a password reset link via email.

## Key Features
- Modal interface with backdrop
- Email validation
- Loading states
- Success/Error feedback
- Cancel functionality

## Implementation

### State Management
```javascript
const [email, setEmail] = useState('');
const [success, setSuccess] = useState(false);
const { loading, error } = useSelector(state => state.auth);
```

### Password Reset Flow
1. User enters email
2. Form submission triggers `resetPassword` action
3. Success message shown on completion
4. Error displayed if request fails

```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await dispatch(resetPassword(email));
    setSuccess(true);
  } catch (err) {
    // Error handled by reducer
  }
};
```

### UI States

1. **Initial Form**
```jsx
<form onSubmit={handleSubmit} className="space-y-4">
  <input
    type="email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    required
  />
  <button type="submit" disabled={loading}>
    {loading ? 'Sending...' : 'Send Reset Link'}
  </button>
</form>
```

2. **Success State**
```jsx
{success && (
  <div className="text-green-400">
    Check your email for password reset instructions.
  </div>
)}
```

3. **Error State**
```jsx
{error && (
  <div className="text-red-400">{error}</div>
)}
```

### Modal Control
- Opens when parent sets `showForgotPassword` to true
- Closes via `onClose` prop callback
```jsx
<button onClick={onClose} className="...">
  Cancel
</button>
```

## Flow Summary
1. User clicks "Forgot Password?" → Modal opens
2. User enters email → Submits form
3. System sends reset link → Shows success message
4. User clicks "Cancel" or completes flow → Modal closes
