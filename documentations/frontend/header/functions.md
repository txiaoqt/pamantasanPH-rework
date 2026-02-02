# Header - Utility and Event Handler Functions

This document describes the utility function and the event handler function within the `Header` component, responsible for dynamic styling and user authentication management.

## Functions

### `isActive`
```typescript
const isActive = (path: string) => {
  return location.pathname === path;
};
```
- **Parameters:**
    - `path`: `string` - The path of a navigation link to compare against the current URL.
- **Functionality:**
    - Compares the `pathname` property of the `useLocation` hook's current `location` object with the `path` argument.
    - Returns `true` if the current URL's path exactly matches the provided `path`, and `false` otherwise.
- **Purpose:** Used to conditionally apply CSS classes or styles to navigation links (`<Link>`) to visually indicate which page the user is currently on (e.g., active link highlighting).
- **Usage Example (within JSX):**
    ```jsx
    <Link to="/" className={`... ${isActive('/') ? 'text-maroon-900' : 'text-gray-700'}`}>Home</Link>
    ```

### `handleLogout`
```typescript
const handleLogout = async () => {
  const { error } = await supabase.auth.signOut();
  if (!error) {
    window.location.reload(); 
  } else {
    alert('Error logging out: ' + error.message);
  }
};
```
- **Functionality:**
    - Asynchronously calls the `signOut()` method from the `supabase.auth` object. This function attempts to terminate the current user session.
    - If the logout operation is successful (i.e., `error` is `null`):
        - It reloads the entire browser window (`window.location.reload()`). This is done to ensure all client-side state, including any session data, is completely reset, effectively logging the user out from the application's perspective.
    - If an error occurs during logout:
        - An alert box is displayed to the user with a descriptive error message.
- **Purpose:** To provide a mechanism for authenticated users to securely log out of their account, clearing their session and resetting the application state.
- **Triggered by:** Clicking the "Logout" button in the user's profile dropdown menu (both for desktop and mobile views).