# Chatbot - State Management (`useState` Hooks)

This document describes the various state variables managed by `useState` hooks within the `Chatbot` component. These states are fundamental for controlling the chatbot's UI, managing the conversation history, tracking user input, and maintaining conversational context.

## State Variables

### `messages`
- **Type:** `Message[]`
- **Description:** An array of `Message` objects, representing the entire conversation history between the user and UniBot. Each `Message` object includes details like `id`, `type` (user/bot), `content`, `timestamp`, and optional `suggestions`.
- **Managed by:** `setMessages`
- **Initial State:** Starts with an initial welcome message from UniBot, along with a set of introductory suggestions.
- **Usage:**
    - New messages (from user or bot) are appended to this array.
    - The UI maps over this array to render the chat bubbles.
    - Triggers a `useEffect` hook to scroll the chat window to the bottom whenever updated.

### `inputMessage`
- **Type:** `string`
- **Description:** Holds the current text content of the user's input field in the chatbot.
- **Managed by:** `setInputMessage`
- **Initial State:** `''` (an empty string).
- **Usage:**
    - Updated as the user types in the message input box.
    - Cleared after the user sends a message.

### `isTyping`
- **Type:** `boolean`
- **Description:** A boolean flag that indicates whether UniBot is currently processing a user's message and generating a response (`true`) or is idle (`false`).
- **Managed by:** `setIsTyping`
- **Initial State:** `false`.
- **Usage:** Controls the visibility of the "UniBot is typing..." indicator in the chat UI, providing visual feedback to the user. Also disables the input field and send button while the bot is typing.

### `conversationContext`
- **Type:** `ConversationContext`
- **Description:** An object that stores various pieces of information about the ongoing conversation, allowing UniBot to maintain context and provide more relevant responses. Its structure is defined by the `ConversationContext` interface.
- **Managed by:** `setConversationContext`
- **Initial State:**
    ```typescript
    {
      exploredUniversities: [],
      currentUniversity: null,
      lastTopic: null,
      explorationLevel: 'overview',
      userPreferences: []
    }
    ```
- **Usage:**
    - Updated when specific universities are mentioned or when suggestions related to universities are clicked (e.g., updating `currentUniversity`, adding to `exploredUniversities`).
    - Intended to be used to influence bot responses, though its full potential for advanced contextual understanding might be further developed.
