# Header Component

## Functionality
The `Header` component provides the main navigation bar at the top of the application. It includes branding, primary navigation links, user authentication status display, and a responsive mobile menu.

## Key Features
- **Branding:** Displays the application logo and name ("UniCentral - Prototype") with a tagline.
- **Primary Navigation:** Provides links to key sections of the application (Home, Universities, Programs, About, FAQ).
- **User Authentication Status:**
    - If a user is logged in, it shows their name/email and provides a dropdown menu with links to Profile, Saved items, and a Logout option.
    - If no user is logged in, it displays a "Login" button.
- **Active Link Highlighting:** Highlights the currently active navigation link based on the URL path.
- **Mobile Responsiveness:** Features a collapsible "hamburger" menu for smaller screens, which expands to show all navigation and user-related links.
- **Supabase Integration:** Fetches user profile data from Supabase if a session is active and handles user logout.

## Dependencies
- React hooks: `useState`, `useEffect`, `useRef`
- Routing: `Link`, `useLocation` from `react-router-dom`
- Icons: `GraduationCap`, `Menu`, `X`, `User`, `LogOut`, `Settings`, `Bookmark`, `GitCompareArrows`, `Info` from `lucide-react`
- Supabase: `Session` type, `supabase` client from `../../lib/supabase`

## Props (`HeaderProps`)
- `mobileMenuOpen`: `boolean` - Controls the visibility of the mobile navigation menu.
- `setMobileMenuOpen`: `(open: boolean) => void` - A function to toggle the `mobileMenuOpen` state from a parent component (e.g., `App.tsx`).
- `session`: `Session | null` - The current Supabase authentication session object, or `null` if no user is logged in.

## Usage
The `Header` component is typically rendered once at the top-level of the application's layout, providing consistent navigation across all pages.

### Example (within `App.tsx` or a similar layout component):
```jsx
import React, { useState, useEffect } from 'react';
import Header from './components/common/Header';
import { supabase } from './lib/supabase';

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div>
      <Header mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} session={session} />
      {/* Main content of the application */}
    </div>
  );
}

export default App;
```