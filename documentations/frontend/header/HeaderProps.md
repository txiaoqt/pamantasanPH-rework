# HeaderProps Interface

This document describes the `HeaderProps` interface, which defines the expected properties for the `Header` React component. These props allow for external control over the mobile menu's state and provide session information for user-specific UI elements.

## Interface Definition

```typescript
interface HeaderProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  session: Session | null;
}
```

## Properties

### `mobileMenuOpen`
- **Type:** `boolean`
- **Description:** A boolean flag indicating whether the mobile navigation menu is currently open (`true`) or closed (`false`). This prop is typically managed by a parent component (e.g., `App.tsx`) and passed down to `Header` to control its mobile menu's visual state.
- **Usage:** Internally within `Header`, this prop determines if the mobile menu content should be rendered and visible.

### `setMobileMenuOpen`
- **Type:** `(open: boolean) => void`
- **Description:** A callback function that allows the `Header` component to request a change in the `mobileMenuOpen` state. It takes a boolean argument (`open`) which represents the new desired state for the mobile menu.
- **Usage:** This function is typically called when the user interacts with the mobile menu toggle button (e.g., the hamburger icon or close icon) to open or close the menu.

### `session`
- **Type:** `Session | null` (where `Session` is from `@supabase/supabase-js`)
- **Description:** An object containing the current user's authentication session information from Supabase, or `null` if no user is currently logged in. This object includes details like `user`, `access_token`, `refresh_token`, etc.
- **Usage:** The `Header` component uses this prop to:
    - Determine whether to display authenticated user-specific elements (like profile link, saved items, logout button) or a login button.
    - Access user information (e.g., `session.user.email` or profile `full_name`) for display.
    - Trigger fetching of additional user profile data if a session is present.