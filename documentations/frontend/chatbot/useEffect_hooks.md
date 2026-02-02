# Chatbot - Lifecycle and Effects (`useEffect` Hook)

This document describes the `useEffect` hook utilized within the `Chatbot` component. This hook manages the automatic scrolling behavior of the chat window.

## `useEffect` Hook

### Scroll to Bottom on Messages Update

```typescript
const scrollToBottom = () => {
  messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
};

useEffect(() => {
  scrollToBottom();
}, [messages]);
```
- **Dependencies:** `[messages]` (This effect runs whenever the `messages` state array changes).
- **Functionality:**
    - Calls the `scrollToBottom` function whenever a message is added to or removed from the `messages` array, or when any existing message object within the array is updated.
    - The `scrollToBottom` function uses the `messagesEndRef` (a `useRef` hook attached to a `div` element at the end of the chat messages) to programmatically scroll the chat container to its bottom.
    - `behavior: 'smooth'` provides a smooth scrolling animation, enhancing the user experience.
- **Purpose:** To ensure that the most recent message in the chat conversation is always visible to the user without manual scrolling, especially when new messages (from either user or bot) are added. This maintains a natural flow for the chat interaction.
