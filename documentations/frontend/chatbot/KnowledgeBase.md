# Chatbot - Rule-Based `knowledgeBase`

This document describes the `knowledgeBase` object, which is a core part of UniBot's rule-based response system in the `Chatbot` component. It consists of a collection of predefined rules that map user input patterns to specific bot responses and suggestions.

## Structure
The `knowledgeBase` is an object where each key represents a category of user intent (e.g., 'greetings', 'admission', 'programs'). The value associated with each key is an object conforming to the `ConversationFlow` interface:

```typescript
interface ConversationFlow {
  pattern: RegExp;
  responses: string[];
  suggestions?: string[];
  nextFlow?: string; // Not extensively used in provided code
  action?: () => void; // Not extensively used in provided code
}
```

- **`pattern`**: A regular expression (`RegExp`) used to match against the user's message.
- **`responses`**: An array of strings. When a pattern matches, UniBot randomly selects one response from this array.
- **`suggestions`**: An optional array of strings, providing clickable suggestions to the user after the response.

## Functionality
When a user sends a message, the `processMessage` function (via `handleRuleBasedQuery`) iterates through the entries in the `knowledgeBase`. For each entry, it tests if the `pattern` regex matches the user's input. The first matching pattern dictates the bot's response. This allows for quick, predictable, and highly relevant answers to common questions.

## Examples of `knowledgeBase` Entries

### 1. Greetings
- **Purpose:** To respond to common greetings.
- **Pattern:** `/^(hi+|hello+|hey+|good\s+(morning|afternoon|evening)|howdy|sup|yo|heyy|hellooo)$/i`
- **Example Responses:**
    - `'Hey there! 😄 I\'m UniBot, your friendly university guide! What are you curious about today—programs, admission rules, or just browsing options?'`
    - `'Hi! 👋 Great to see you! I\'m UniBot, here to help you navigate university choices. What would you like to explore?'`
- **Example Suggestions:**
    - `'Tell me about state universities'`, `'What programs are available?'`, `'How do I apply?'`, `'Compare universities'`

### 2. Best Universities
- **Purpose:** To respond to queries about top or best-rated universities.
- **Pattern:** `/\b(best|top|highest|highly).*(universities?|schools?|rated)\b/i`
- **Example Responses:**
    - `'Our top state universities in Metro Manila are consistently ranked highly! 🏆 PUP leads as the largest with excellent programs, TUP excels in engineering and technology, and PLM shines in medicine and law. Rankings vary by source, but all three perform exceptionally well.'`
- **Example Suggestions:**
    - `'PUP rankings'`, `'TUP rankings'`, `'PLM rankings'`, `'Compare universities'`

### 3. Programs (General)
- **Purpose:** To respond to general inquiries about academic programs.
- **Pattern:** `/\b(programs?|courses?|degrees?|majors?)\b/i`
- **Example Responses:**
    - `'We have over 200 amazing programs across ALL these categories: Technology 💻, Business 💼, Engineering 🔧, Healthcare ⚕️, Education 📚, Arts 🎨, Sciences 🔬, and more! What field gets you excited? Tell me what you love and I\'ll guide you! 🌟'`
- **Example Suggestions:**
    - `'Technology & IT'`, `'Business & Finance'`, `'Engineering fields'`, `'Healthcare programs'`, `'Education programs'`, `'Arts & Sciences'`

### 4. Creator/Developer Information
- **Purpose:** To respond to questions about who created the bot or the platform.
- **Pattern:** `/\b(who\s+(created|made|owns?|is\s+behind|developed|coded)|creator|owner|developer|who'\s?s?\s+(toff|tadz|tadzpuge|genius))\b/i`
- **Example Responses:**
    - `'Hey! 👋 I was created by Toff (also known as Tadz)! 😊 He loves making friends and connecting with awesome people. Want to connect with him?'`
- **Example Suggestions:**
    - `'Connect with Toff'`, `'View social media'`, `'GitHub profile'`, `'Follow on Instagram'`

## How it Works in the Chatbot Logic
The `handleRuleBasedQuery` function iterates through these patterns. If a user's message matches `greetings.pattern`, one of the `greetings.responses` is randomly chosen and returned. If no pattern matches, the query is typically escalated to the AI model (`handleAiQuery`).
