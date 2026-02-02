# Chatbot - Rule-Based Handler Functions

This document details the functions within the `Chatbot` component responsible for generating rule-based responses. These handlers detect specific user intents and provide structured, predefined replies, often interacting with backend services to fetch relevant data.

## Handler Functions

### `handleThankYou`
```typescript
const handleThankYou = () => {
  const thankResponses = [/* ... responses ... */];
  return {
    response: thankResponses[Math.floor(Math.random() * thankResponses.length)]
  };
};
```
- **Functionality:** Returns a random "thank you" response from a predefined list.
- **Purpose:** To provide a polite and varied acknowledgment when the user expresses gratitude.

### `handleGoodbye`
```typescript
const handleGoodbye = () => {
  const goodbyeResponses = [/* ... responses ... */];
  return {
    response: goodbyeResponses[Math.floor(Math.random() * goodbyeResponses.length)]
  };
};
```
- **Functionality:** Returns a random "goodbye" response from a predefined list.
- **Purpose:** To provide a friendly farewell when the user signals the end of the conversation.

### `handleNavigation`
```typescript
const handleNavigation = (message: string) => {
  // ... logic to match navigation phrases and construct response with links
  return null; // or { response: ..., suggestions: ... }
};
```
- **Parameters:** `message`: `string` - The user's input message.
- **Functionality:** Checks the `message` for phrases indicating a desire to navigate to specific application pages (e.g., "learn more about PUP", "go to compare page"). If a match is found, it constructs a response that includes a direct `Link` to the relevant page.
- **Purpose:** To provide quick access to key features or detailed information within the application directly from the chat.

### `handleUniversityQuery`
```typescript
const handleUniversityQuery = async (message: string) => {
  const uniKeywords: {[key: string]: string[]} = { /* ... keywords for PUP, TUP, PLM ... */ };
  for (const uni in uniKeywords) {
    if (uniKeywords[uni].some(keyword => message.includes(keyword))) {
      return await getUniversityDetails(uni, message);
    }
  }
  return null;
};
```
- **Parameters:** `message`: `string` - The user's input message.
- **Functionality:** Scans the `message` to identify if any of the predefined university keywords (for PUP, TUP, PLM) are present. If a university is identified, it delegates the query to `getUniversityDetails` to fetch and format specific information about that university.
- **Purpose:** To act as a dispatcher for university-specific questions, directing them to a more specialized handler.

### `getUniversityDetails`
```typescript
const getUniversityDetails = async (university: string, message: string) => {
  // ... fetches all universities and finds the specific uniData
  if (message.includes('programs')) {
    return await getProgramDetails(uniData, message);
  }
  // ... checks for admission, facilities, rankings
  // ... returns general university overview if no specific sub-query
  return null; // or { response: ..., suggestions: ... }
};
```
- **Parameters:**
    - `university`: `string` - The keyword for the university (e.g., 'pup').
    - `message`: `string` - The full user's input message.
- **Functionality:**
    - Fetches detailed data for the specified `university` using `UniversityService.getAllUniversities()`.
    - Further analyzes the `message` to determine if the user is asking about `programs`, `admission`, `facilities`, or `rankings` for that university. It then calls the appropriate helper function (`getProgramDetails`, `getAdmissionDetails`, etc.).
    - If no specific sub-query is found, it provides a general overview of the university.
- **Purpose:** To retrieve and structure detailed information about a specific university based on the user's intent.

### `getProgramDetails`
```typescript
const getProgramDetails = async (uniData: University, message: string) => {
  // ... fetches programs by university ID
  // ... counts undergraduate, graduate, diploma programs
  // ... constructs detailed response, optionally listing specific programs
  return { response: ..., suggestions: ... };
};
```
- **Parameters:**
    - `uniData`: `University` - The data object for the specific university.
    - `message`: `string` - The full user's input message.
- **Functionality:**
    - Fetches academic programs for the given `uniData` using `AcademicProgramService.getProgramsByUniversityId()`.
    - Calculates counts for different program types (undergraduate, graduate, diploma).
    - Constructs a detailed response about the programs, potentially listing specific program names if the user's message indicates a desire for a list (e.g., "list undergraduate programs").
- **Purpose:** To provide comprehensive information about the academic programs offered by a specific university.

### `getAdmissionDetails`
```typescript
const getAdmissionDetails = (uniData: University) => {
  // ... checks for admission requirements in uniData
  // ... formats requirements into a response
  return null; // or { response: ..., suggestions: ... }
};
```
- **Parameters:** `uniData`: `University` - The data object for the specific university.
- **Functionality:** If `uniData` contains admission requirements, it formats them into a clear, bulleted list for the response.
- **Purpose:** To provide detailed admission requirements for a given university.

### `getFacilitiesDetails`
```typescript
const getFacilitiesDetails = (uniData: University) => {
  // ... checks for facilities in uniData
  // ... formats facilities into a response
  return null; // or { response: ..., suggestions: ... }
};
```
- **Parameters:** `uniData`: `University` - The data object for the specific university.
- **Functionality:** If `uniData` contains facility information, it formats a list of key facilities into the response.
- **Purpose:** To describe the campus facilities available at a specific university.

### `getRankingDetails`
```typescript
const getRankingDetails = (uniData: University) => {
  // ... checks for ranking details in uniData
  // ... formats ranking information into a response
  return null; // or { response: ..., suggestions: ... }
};
```
- **Parameters:** `uniData`: `University` - The data object for the specific university.
- **Functionality:** If `uniData` contains ranking details, it formats this information into the response.
- **Purpose:** To provide information about the rankings and academic standing of a specific university.

### `handleRuleBasedQuery`
```typescript
const handleRuleBasedQuery = (userMessage: string) => {
  for (const [key, value] of Object.entries(knowledgeBase)) {
    if (value.pattern.test(userMessage)) {
      const randomResponse = value.responses[Math.floor(Math.random() * value.responses.length)];
      return {
        response: randomResponse,
        suggestions: value.suggestions
      };
    }
  }
  return null;
};
```
- **Parameters:** `userMessage`: `string` - The user's input message.
- **Functionality:**
    - Iterates through all entries in the `knowledgeBase`.
    - For each entry, it tests if the `pattern` (regular expression) matches the `userMessage`.
    - If a match is found, it randomly selects one response from the `responses` array of that entry and returns it along with any associated `suggestions`.
    - The loop breaks on the first match, ensuring that the most specific rule (if ordered correctly in `knowledgeBase`) takes precedence.
- **Purpose:** To serve as the primary engine for UniBot's rule-based responses, providing quick and consistent answers to frequently asked questions and common conversational patterns.
