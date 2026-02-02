# Chatbot Component (UniBot)

## Functionality
The `Chatbot` component implements an interactive AI assistant named UniBot, designed to help users find information about Philippine state universities (PUP, TUP, PLM). It provides a conversational interface, combining rule-based responses with a fallback to an AI model (OpenRouter/OpenAI) for more complex queries. The chatbot handles displaying messages, processing user input, generating bot replies, and managing conversation context.

## Key Features
- **Conversational Interface:** Presents a chat window where users can type questions and receive UniBot's responses.
- **Rule-Based Responses:** Contains a comprehensive `knowledgeBase` with predefined patterns and responses for common university-related queries (greetings, programs, admissions, rankings, etc.).
- **AI Integration:** For queries not matched by the rule-based system, UniBot leverages an external AI model (via OpenRouter/OpenAI) to generate more dynamic and contextual responses.
- **Dynamic Suggestions:** Provides clickable suggestion buttons to guide the user's conversation and explore topics further.
- **University-Specific Information:** Can fetch and present detailed information about PUP, TUP, and PLM, including programs, admission requirements, facilities, and rankings, by interacting with `UniversityService` and `AcademicProgramService`.
- **Navigation Links:** Embeds direct links within responses to guide users to relevant pages within the application (e.g., `/compare` page, specific university detail pages).
- **Conversation Context:** Maintains a basic conversational context (`ConversationContext`) to enhance future interactions, tracking explored universities, current topics, and user preferences.
- **Responsive UI:** Provides a fixed, collapsible chat widget that opens into a full chat window, designed for both desktop and mobile use.
- **Typing Indicator:** Displays a "UniBot is typing..." animation to indicate when the bot is generating a response.
- **Security Warning:** **Critically, the component includes an explicit security warning about exposing the OpenAI API key on the client-side, recommending moving AI logic to a secure backend.**

## Dependencies
- React hooks: `useState`, `useEffect`, `useRef`
- Routing: `Link` from `react-router-dom`
- Icons: `MessageCircle`, `X`, `Send`, `Bot`, `User`, `ExternalLink` from `lucide-react`
- Services: `UniversityService`, `AcademicProgramService` (for fetching university and program data)
- AI Client: `OpenAI` from `openai` (configured for OpenRouter)

## Props (`ChatbotProps`)
- `isOpen`: `boolean` - Controls the visibility of the chatbot window.
- `setIsOpen`: `(isOpen: boolean) => void` - Callback function to open or close the chatbot.

## Usage
The `Chatbot` component is typically rendered at a high level in the application hierarchy, often alongside a main layout, to provide an accessible support and information interface across all pages.

### Example (within `App.tsx` or a similar layout component):
```jsx
import React, { useState } from 'react';
import Chatbot from './components/common/Chatbot';

function App() {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  return (
    <div>
      {/* Other application components */}
      <Chatbot isOpen={isChatbotOpen} setIsOpen={setIsChatbotOpen} />
      {/* A button or other UI element to toggle the chatbot */}
      <button onClick={() => setIsChatbotOpen(true)}>Open Chat</button>
    </div>
  );
}

export default App;
```