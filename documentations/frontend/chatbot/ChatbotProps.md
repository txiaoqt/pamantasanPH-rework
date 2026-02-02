# ChatbotProps Interface

This document describes the `ChatbotProps` interface, which defines the expected properties for the `Chatbot` React component. These props are essential for controlling the visibility of the chatbot widget and providing a mechanism to toggle its state from a parent component.

## Interface Definition

```typescript
interface ChatbotProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}
```

## Properties

### `isOpen`
- **Type:** `boolean`
- **Description:** A boolean flag that determines the current visibility state of the chatbot window.
    - If `true`, the chatbot window is displayed.
    - If `false`, the chatbot window is hidden (only the floating chat button might be visible, depending on implementation).
- **Usage:** This prop is typically managed by a parent component (e.g., `App.tsx` or a layout component) that controls the overall state of the chatbot's presence.

### `setIsOpen`
- **Type:** `(isOpen: boolean) => void`
- **Description:** A callback function that allows the `Chatbot` component (or its internal elements like the close button) to request a change in its `isOpen` state. It accepts a single boolean argument (`isOpen`), which represents the new desired state for the chatbot's visibility.
- **Usage:** This function is invoked when the user interacts with UI elements that should toggle the chatbot's visibility, such as clicking the floating chat button to open it or clicking the 'X' button inside the chat window to close it.
