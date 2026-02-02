# Header - Lifecycle and Data Fetching (`useEffect` Hooks)

This document outlines the functionalities of the various `useEffect` hooks within the `Header` component, which manage event listeners for UI interactions and data fetching from Supabase.

## `useEffect` Hooks

### 1. Close Profile Menu on Click Outside

```typescript
useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
    if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
      setProfileMenuOpen(false);
    }
  };
  document.addEventListener('mousedown', handleClickOutside);
  return () => {
    document.removeEventListener('mousedown', handleClickOutside);
  };
}, []); // Empty dependency array means this runs once on mount and cleans up on unmount
```
- **Dependencies:** `[]` (runs once after the initial render and cleans up on component unmount).
- **Functionality:**
    - Defines a `handleClickOutside` function that checks if a click event occurred outside the `profileMenuRef` element (the profile dropdown menu).
    - If an outside click is detected, it sets `profileMenuOpen` to `false`, thereby closing the profile menu.
    - Attaches a global `mousedown` event listener to the `document` when the component mounts.
    - Returns a cleanup function that removes the `mousedown` event listener when the component unmounts.
- **Purpose:** To enhance user experience by automatically dismissing the profile dropdown menu when the user clicks anywhere outside of it.

### 2. Fetch User Profile on Session Change

```typescript
useEffect(() => {
  if (session?.user) {
    setLoadingProfile(true);
    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();
      if (data) {
        setProfile(data);
      }
      setLoadingProfile(false);
    };
    fetchProfile();
  } else {
    setLoadingProfile(false);
  }
}, [session]); // Runs when the 'session' object changes
```
- **Dependencies:** `[session]` (runs when the `session` object changes).
- **Functionality:**
    - Checks if a user `session` exists.
    - If a session and user are present:
        - Sets `loadingProfile` to `true`.
        - Defines an asynchronous `fetchProfile` function to query the `profiles` table in Supabase for the current user's profile data, identified by `session.user.id`.
        - If data is returned, updates the `profile` state with the fetched data.
        - Sets `loadingProfile` to `false` after the fetch operation completes (regardless of success or failure).
    - If no session exists, it sets `loadingProfile` to `false` immediately.
- **Purpose:** To dynamically fetch and display the authenticated user's profile information in the header whenever the authentication state changes (e.g., user logs in or out).