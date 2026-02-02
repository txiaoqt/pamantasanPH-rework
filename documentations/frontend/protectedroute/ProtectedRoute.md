# ProtectedRoute Component

## Functionality
The `ProtectedRoute` component acts as a gatekeeper for routes in a React application using `react-router-dom`. Its primary function is to enforce authentication: it checks if a user `session` exists. If a session is present, it renders the child routes; otherwise, it redirects the user to the login page. This pattern is crucial for securing parts of an application that require user authentication.

## Key Features
- **Authentication Enforcement:** Ensures that only authenticated users can access the routes nested within it.
- **Declarative Redirection:** Automatically redirects unauthenticated users to a specified login page (`/login` in this case) using `react-router-dom`'s `Navigate` component.
- **Nested Routing Support:** Utilizes `react-router-dom`'s `Outlet` component to correctly render the child routes when the user is authenticated, making it compatible with nested route structures.
- **Simple and Reusable:** Provides a clean and concise way to protect multiple routes without repeating authentication logic across different route definitions.

## Dependencies
- React (for functional component structure and `React.FC` type)
- Routing: `Navigate`, `Outlet` from `react-router-dom`
- Authentication: `Session` type from `@supabase/supabase-js` (or any authentication library used)

## Props (`ProtectedRouteProps`)
- `session`: `Session | null` - The current authentication session object. This prop determines the authentication status of the user. If it's `null`, the user is considered unauthenticated.

## Usage
The `ProtectedRoute` component is used within the route configuration of your application (typically in `App.tsx` or a dedicated routing file) to wrap routes that should only be accessible by logged-in users.

### Example (within `App.tsx` using `react-router-dom` v6+):
```jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/common/ProtectedRoute';
import HomePage from './pages/HomePage';
import Dashboard from './pages/Dashboard';
import LoginPage from './pages/Login';
import { supabase } from './lib/supabase'; // Assuming Supabase client is available

function App() {
  const [session, setSession] = useState(null);
  const [loadingSession, setLoadingSession] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoadingSession(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoadingSession(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loadingSession) {
    return <div>Loading authentication...</div>; // Or a spinner
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute session={session} />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<ProfilePage />} />
          {/* Add more protected routes here */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```
In this example, `/dashboard` and `/profile` routes will only be accessible if `session` is not `null`. If `session` is `null`, the user will be redirected to `/login`.
