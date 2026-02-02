# Chatbot Component - Interfaces (`Message`, `ConversationFlow`, `KnowledgeBase`, `ConversationContext`)

This document details the various TypeScript interfaces used within the `Chatbot` component. These interfaces define the structure of data related to chat messages, conversational flow rules, the knowledge base, and the overall conversation context.

## Interfaces

### `Message`
This interface defines the structure for a single chat message, whether it's from the user or the bot.

```typescript
interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}
```
- **`id`**: `string`
    - A unique identifier for the message.
- **`type`**: `'user' | 'bot'`
    - Indicates whether the message originated from the user or the chatbot.
- **`content`**: `string`
    - The actual text content of the message.
- **`timestamp`**: `Date`
    - The `Date` object representing when the message was created.
- **`suggestions?`**: `string[]` (Optional)
    - An array of strings, each representing a suggested follow-up question or action that the user can click.

### `ConversationFlow`
This interface defines the structure for a single rule within the chatbot's rule-based response system. `KnowledgeBase` in the component uses this structure.

```typescript
interface ConversationFlow {
  pattern: RegExp;
  responses: string[];
  suggestions?: string[];
  nextFlow?: string; // Not extensively used in provided code
  action?: () => void; // Not extensively used in provided code
}
```
- **`pattern`**: `RegExp`
    - A regular expression that the chatbot uses to match against the user's input message. If the pattern matches, this rule's responses are considered.
- **`responses`**: `string[]`
    - An array of possible string responses. The chatbot typically selects one randomly from this array when the `pattern` matches.
- **`suggestions?`**: `string[]` (Optional)
    - An array of suggested follow-up questions or actions presented to the user after this response.
- **`nextFlow?`**: `string` (Optional)
    - Intended to define a transition to a different conversational state or flow. (Not extensively used in the provided component's logic).
- **`action?`**: `() => void` (Optional)
    - Intended to define a specific function to be executed when this rule is triggered. (Not extensively used in the provided component's logic).

### `KnowledgeBase`
This type alias simply represents a collection of `ConversationFlow` rules, indexed by a string key. In the `Chatbot` component, this is the main object that stores all rule-based interaction logic.

```typescript
interface KnowledgeBase {
  [key: string]: {
    pattern: RegExp;
    responses: string[];
    suggestions?: string[];
    nextFlow?: string;
    action?: () => void;
  };
}
```

### `ConversationContext`
This interface defines the structure for storing context about the ongoing conversation. This context can be used to tailor responses or guide the flow based on previous user interactions.

```typescript
interface ConversationContext {
  exploredUniversities: string[];
  currentUniversity: string | null;
  lastTopic: string | null;
  explorationLevel: 'overview' | 'detailed' | 'deep';
  userPreferences: string[]; // Not extensively used in provided code
}
```
- **`exploredUniversities`**: `string[]`
    - An array containing the names of universities that the user has discussed or shown interest in during the current conversation.
- **`currentUniversity`**: `string | null`
    - The name of the university that was most recently the main subject of the conversation. `null` if no specific university is being discussed.
- **`lastTopic`**: `string | null`
    - A string indicating the last topic of discussion (e.g., "programs", "admission"). `null` if no specific topic.
- **`explorationLevel`**: `'overview' | 'detailed' | 'deep'`
    - An enum indicating the depth of the conversation about a topic. This can be used to provide more specific information as the user delves deeper into a subject.
- **`userPreferences`**: `string[]` (Not extensively used in the provided code)
    - Intended to store any preferences expressed by the user during the conversation.
