# TermsOfServiceModalProps Interface

This document describes the `TermsOfServiceModalProps` interface, which defines the expected properties for the `TermsOfServiceModal` React component. These props are crucial for personalizing the modal and managing the user's interaction with the Terms of Service.

## Interface Definition

```typescript
interface TermsOfServiceModalProps {
  user: User;
  onAgree: () => void;
  onDisagree: () => void;
}
```

## Properties

### `user`
- **Type:** `User` (from `@supabase/supabase-js`)
- **Description:** A Supabase `User` object that contains detailed information about the currently authenticated user. This prop is used to personalize the welcome message displayed at the top of the modal, typically by accessing `user.user_metadata.full_name`.
- **Usage:** Essential for making the modal feel more integrated and welcoming, by addressing the user by name.

### `onAgree`
- **Type:** `() => void`
- **Description:** A callback function that is invoked when the user clicks the "Agree" button within the modal.
- **Usage:** The parent component providing this prop should implement the logic to handle the user's agreement. This typically involves:
    - Recording the user's agreement in a persistent storage (e.g., a database table, user profile metadata).
    - Closing the modal.
    - Allowing the user to proceed to the main application content.
- **Purpose:** To explicitly capture the user's consent to the Terms of Service.

### `onDisagree`
- **Type:** `() => void`
- **Description:** A callback function that is invoked when the user clicks the "Disagree" button within the modal.
- **Usage:** The parent component providing this prop should implement the logic to handle the user's disagreement. This typically involves:
    - Closing the modal.
    - Restricting access to the application's features.
    - Potentially logging the user out.
    - Displaying an error or informative message.
- **Purpose:** To handle scenarios where a user chooses not to accept the mandatory terms, often leading to restricted access.
