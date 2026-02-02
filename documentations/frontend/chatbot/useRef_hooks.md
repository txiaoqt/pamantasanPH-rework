# Chatbot - DOM References (`useRef` Hooks)

This document describes the `useRef` hook utilized within the `Chatbot` component. This hook is essential for directly interacting with a specific DOM element, in this case, to manage scrolling behavior.

## Reference

### `messagesEndRef`
- **Hook:** `useRef<HTMLDivElement>(null)`
- **Functionality:** Creates a mutable ref object that persists across renders. This specific ref is attached to an empty `div` element placed at the very end of the chat messages container.
- **Usage:**
    - The primary purpose of `messagesEndRef` is to facilitate automatic scrolling to the bottom of the chat window whenever new messages are added.
    - A `useEffect` hook (`scrollToBottom`) monitors changes in the `messages` state. When `messages` are updated, it calls `messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })`, which programmatically scrolls the referenced `div` (and thus the chat view) into view with a smooth animation.
- **Example Usage:**
    ```typescript
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
      scrollToBottom();
    }, [messages]); // Scrolls to bottom whenever messages change
    ```
