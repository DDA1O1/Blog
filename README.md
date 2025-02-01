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
