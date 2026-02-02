# Chatbot - Core Logic Functions (`processMessage`, `handleSendMessage`, `handleSuggestionClick`)

This document details the core logic functions within the `Chatbot` component that orchestrate the interaction flow. These functions are responsible for determining how UniBot responds to user input, sending messages, and handling suggested actions.

## Core Logic Functions

### `processMessage`
```typescript
const processMessage = async (userMessage: string): Promise<{response: string, suggestions?: string[]}> => {
  const message = userMessage.toLowerCase().trim();

  // Handle thank you and goodbye messages
  const thankYouMatch = message.match(/^(thanks?|thank you|thx|ty|appreciate it|thanks a lot|thank you so much|thanks for the help)$/i);
  if (thankYouMatch) {
    return handleThankYou();
  }

  const goodbyeMatch = message.match(/^(bye|goodbye|see you|see ya|later|farewell|cya|take care)$/i);
  if (goodbyeMatch) {
    return handleGoodbye();
  }

  // Handle navigation
  const navigationResponse = handleNavigation(message);
  if (navigationResponse) {
    return navigationResponse;
  }

  // Handle university-specific queries
  const universityResponse = await handleUniversityQuery(message);
  if (universityResponse) {
    return universityResponse;
  }

  // Check rule-based knowledge base
  const ruleBasedResponse = handleRuleBasedQuery(message);
  if (ruleBasedResponse) {
    return ruleBasedResponse;
  }

  // Fallback to AI
  return await handleAiQuery(userMessage);
};
```
- **Parameters:** `userMessage`: `string` - The raw message input by the user.
- **Return Type:** `Promise<{response: string, suggestions?: string[]}>` - An asynchronous function that resolves to an object containing UniBot's response and optional suggestions.
- **Functionality:** This is the central decision-making function for UniBot. It evaluates the user's message against a hierarchy of response mechanisms:
    1.  **Direct Matches:** Checks for "thank you" or "goodbye" phrases and returns a canned response.
    2.  **Navigation Handling:** Checks for messages that indicate a desire to navigate to specific app pages (e.g., compare page) and provides appropriate responses with links.
    3.  **University-Specific Queries:** Identifies if the message is asking about a particular university (PUP, TUP, PLM) and attempts to retrieve specific details from the database.
    4.  **Rule-Based Knowledge Base:** Attempts to match the message against predefined patterns in the `knowledgeBase`.
    5.  **AI Fallback:** If none of the above rules generate a response, the query is sent to the integrated AI model for a more dynamic and general reply.
- **Purpose:** To provide a robust and flexible system for generating UniBot's responses, prioritizing direct and rule-based answers while leveraging AI for more complex or unhandled queries.

### `handleSendMessage`
```typescript
const handleSendMessage = async () => {
  if (!inputMessage.trim()) return; // Prevent sending empty messages

  const userMessage: Message = {
    id: Date.now().toString(),
    type: 'user',
    content: inputMessage,
    timestamp: new Date()
  };

  setMessages(prev => [...prev, userMessage]); // Add user message to chat
  setInputMessage(''); // Clear input field
  setIsTyping(true); // Show typing indicator

  try {
    const result = await processMessage(inputMessage); // Get bot's response

    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: result.response,
        timestamp: new Date(),
        suggestions: result.suggestions
      };

      setMessages(prev => [...prev, botMessage]); // Add bot message to chat
      setIsTyping(false); // Hide typing indicator
    }, 1000); // Simulate typing delay
  } catch (error) {
    console.error('Error processing message:', error);
    setIsTyping(false); // Hide typing indicator on error
  }
};
```
- **Functionality:** This asynchronous function is triggered when the user explicitly sends a message (e.g., by clicking the send button or pressing Enter).
    - It first validates that the `inputMessage` is not empty.
    - It creates a `Message` object for the user's input and adds it to the `messages` state.
    - The input field is cleared, and the `isTyping` indicator is activated.
    - It then calls `processMessage` to get UniBot's response.
    - After a simulated delay (1 second), UniBot's response is formatted as a `Message` object and added to the `messages` state.
    - The `isTyping` indicator is deactivated.
    - Includes error handling for issues during message processing.
- **Purpose:** To manage the full lifecycle of a user-initiated message, from input to displaying both the user's and UniBot's replies in the chat window.

### `handleSuggestionClick`
```typescript
const handleSuggestionClick = async (suggestion: string) => {
  // ... (updates conversationContext based on suggestion content)

  // Add the user's "clicked" message to the chat (but show it as a suggestion click)
  const userMessage: Message = {
    id: Date.now().toString(),
    type: 'user',
    content: `💡 ${suggestion}`, // Show as suggestion click
    timestamp: new Date()
  };

  setMessages(prev => [...prev, userMessage]);
  setIsTyping(true);

  try {
    let response: string;
    let suggestions: string[] = [];

    // Use RULE-BASED responses for all suggestion clicks (no AI)
    // ... (extensive conditional logic for various hardcoded suggestions)
    // For other suggestions, falls back to processMessage(suggestion.toLowerCase());

    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: response,
        timestamp: new Date(),
        suggestions: suggestions
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 500); // Shorter delay for suggestion clicks
  } catch (error) {
    console.error('Error processing suggestion:', error);
    setIsTyping(false);
  }
};
```
- **Parameters:** `suggestion`: `string` - The text of the suggestion button that the user clicked.
- **Functionality:** This asynchronous function is triggered when a user clicks on one of the suggested reply buttons.
    - It first attempts to update the `conversationContext` based on the content of the clicked `suggestion` (e.g., if it mentions a university).
    - It adds the suggestion text (prefixed with `💡`) to the `messages` state as a user message, mimicking a user input.
    - The `isTyping` indicator is activated.
    - It then uses extensive conditional logic to provide specific rule-based responses for a variety of hardcoded suggestions (e.g., 'Explore state universities', 'Technology & IT', 'PUP vs TUP'). For these, it might also fetch data from `UniversityService` or `AcademicProgramService`.
    - If a suggestion doesn't match a hardcoded rule, it falls back to calling `processMessage` with the suggestion text.
    - After a shorter simulated delay (0.5 seconds), UniBot's response and new suggestions are added to the `messages` state.
    - The `isTyping` indicator is deactivated.
    - Includes error handling for issues during suggestion processing.
- **Purpose:** To allow users to easily guide the conversation using predefined prompts, ensuring quick and relevant rule-based responses where possible, and integrating with data services for dynamic program and university comparisons.
