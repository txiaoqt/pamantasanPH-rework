# Header - State Management and References (`useState`, `useRef`, `useLocation`)

This document details the state variables managed by `useState` hooks, the references managed by `useRef` hooks, and the `useLocation` hook within the `Header` component. These elements are crucial for controlling UI behavior, managing data, and interacting with the DOM.

## State Variables (`useState` Hooks)

### `profile`
- **Type:** `any | null`
- **Description:** Stores the user's profile data fetched from the Supabase `profiles` table. This data typically includes information like `full_name`, `avatar_url`, etc. It is `null` if no profile data is found or if the user is not logged in.
- **Managed by:** `setProfile`
- **Usage:** Used to display the user's name or email in the header when they are logged in.

### `loadingProfile`
- **Type:** `boolean`
- **Description:** A boolean flag indicating whether the user's profile data is currently being fetched from Supabase (`true`) or if the fetching process has completed (`false`).
- **Managed by:** `setLoadingProfile`
- **Usage:** Used to display a "Loading..." message in the header while the profile data is being retrieved.

### `profileMenuOpen`
- **Type:** `boolean`
- **Description:** A boolean flag that controls the visibility of the user's profile dropdown menu (`true` for open, `false` for closed). This menu contains options like "Profile", "Saved", and "Logout".
- **Managed by:** `setProfileMenuOpen`
- **Usage:** Toggled by clicking the user icon/name in the header. Its state is also managed by an `useEffect` hook to close the menu when a click occurs outside of it.

## References (`useRef` Hooks)

### `profileMenuRef`
- **Hook:** `useRef<HTMLDivElement>(null)`
- **Functionality:** Creates a mutable ref object that persists across renders. This specific ref is attached to the `div` element that wraps the user's profile dropdown menu.
- **Usage:** Primarily used in conjunction with the `handleClickOutside` event listener (within a `useEffect` hook) to detect when a user clicks outside this menu. This mechanism ensures the dropdown menu closes automatically when focus is lost.

## Location Hook (`useLocation`)

### `useLocation`
- **Hook:** `useLocation` from `react-router-dom`
- **Functionality:** This hook returns the current `Location` object, which contains information about the current URL, including `pathname`, `search`, `hash`, and `state`.
- **Usage:** The `location.pathname` property is used by the `isActive` utility function to determine if a given navigation link matches the current route, allowing for active link highlighting.
    ```typescript
    const location = useLocation();
    // ...
    const isActive = (path: string) => {
      return location.pathname === path;
    };
    ```