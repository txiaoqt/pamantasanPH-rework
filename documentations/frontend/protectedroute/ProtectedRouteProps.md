# ProtectedRouteProps Interface

This document describes the `ProtectedRouteProps` interface, which defines the expected properties for the `ProtectedRoute` React component. This single prop is critical for the component's core functionality of determining user authentication status.

## Interface Definition

```typescript
interface ProtectedRouteProps {
  session: Session | null;
}
```

## Properties

### `session`
- **Type:** `Session | null` (where `Session` is typically imported from `@supabase/supabase-js` or your authentication library)
- **Description:** An object representing the current authentication session of the user.
    - If a user is logged in, `session` will be an object containing details about the user's session (e.g., `user` object, `access_token`, `refresh_token`).
    - If no user is currently authenticated, `session` will be `null`.
- **Usage:** The `ProtectedRoute` component uses this prop directly in its conditional logic:
    - If `session` is `null` (no active session), the component renders a `Navigate` component to redirect the user to the login page.
    - If `session` is an object (an active session exists), the component renders an `Outlet`, allowing the child routes to be displayed.
- **Purpose:** To serve as the primary input for the `ProtectedRoute` to determine whether a user is authorized to access the nested routes. This prop is typically provided from a higher-order component or context that manages the global authentication state of the application.
