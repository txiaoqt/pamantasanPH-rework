# LoginPromptModalProps Interface

This document describes the `LoginPromptModalProps` interface, which defines the expected properties for the `LoginPromptModal` React component. This prop is essential for controlling the modal's lifecycle, allowing it to be closed from its parent component.

## Interface Definition

```typescript
interface LoginPromptModalProps {
  onClose: () => void;
}
```

## Properties

### `onClose`
- **Type:** `() => void`
- **Description:** A callback function that is invoked when the modal needs to be closed. This function is typically provided by the parent component that renders `LoginPromptModal`.
- **Usage:** This function is called in two scenarios within the `LoginPromptModal`:
    1.  When the user clicks the 'X' button in the top right corner of the modal.
    2.  When the user clicks the 'Cancel' button at the bottom of the modal.
    3.  After the user clicks the 'Login' button, before navigating to the login page.
- **Purpose:** To allow the parent component to manage the modal's open/closed state. By calling `onClose`, the parent component can update its state (e.g., set `showLoginModal` to `false`), which in turn unmounts the modal from the DOM.
