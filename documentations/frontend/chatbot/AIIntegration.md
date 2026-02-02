# Chatbot - AI Integration (`handleAiQuery`)

This document details the Artificial Intelligence (AI) integration within the `Chatbot` component, specifically focusing on the `handleAiQuery` function and the setup of the OpenAI client. This integration serves as a fallback mechanism for queries that are not addressed by the rule-based system.

## OpenAI Client Setup

```typescript
// --- SECURITY WARNING --- (omitted for brevity, but crucial)
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  baseURL: "https://openrouter.ai/api/v1", // OpenRouter base URL
  dangerouslyAllowBrowser: true // Required for client-side usage
});
```
- **Library:** `openai` from `openai` package.
- **Configuration:**
    - `apiKey`: Retrieved from `import.meta.env.VITE_OPENAI_API_KEY`. **This is the API key, and its client-side exposure is a major security concern highlighted in the component.**
    - `baseURL`: Set to `"https://openrouter.ai/api/v1"` to use OpenRouter as the AI provider, which acts as a unified interface for various LLMs.
    - `dangerouslyAllowBrowser`: Set to `true` to allow the client-side use of the API key. **This flag directly relates to the security warning.**
- **Purpose:** To initialize a client object that can make requests to the configured AI model for generating conversational responses.

## `handleAiQuery` Function

```typescript
const handleAiQuery = async (userMessage: string) => {
  try {
    if (!import.meta.env.VITE_OPENAI_API_KEY) {
      // ... (returns error message if API key is missing)
    }

    const universities = await UniversityService.getAllUniversities();
    const universityData = universities.map(u => ({ /* ... relevant university properties ... */ }));

    const SYSTEM_PROMPT = `You are UniBot, a friendly and helpful AI assistant specializing in Philippine state universities (PUP, TUP, and PLM) in Metro Manila. ... Use plain text only - NO markdown formatting. End with 2-4 relevant suggestion buttons when helpful.

UNIVERSITIES YOU KNOW (use this data):
${universityData.map(u => `
${u.name}:
- Location: ${u.location}
- Students: ${u.students}+ 
// ... more university details
`).join('
')}`;

    const completion = await openai.chat.completions.create({
      model: "meta-llama/llama-3.2-3b-instruct:free",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userMessage },
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    const aiResponse = completion.choices[0]?.message?.content || "Sorry, I couldn't process that request. ...";

    const cleanAiResponse = aiResponse.replace(/\*\*(.*?)\*\*/g, '$1').replace(/\*(.*?)\*/g, '$1').replace(/^\d+\.\s*/gm, '').replace(/^-\s*/gm, '').replace(/^###\s*/gm, '').replace(/^##\s*/gm, '').replace(/^#\s*/gm, '').replace(/^\s*[-*+]\s+/gm, '').trim();

    let suggestions: string[] = [];
    // ... (logic to generate basic suggestions based on AI response keywords)

    return {
      response: cleanAiResponse,
      suggestions: suggestions.slice(0, 4)
    };

  } catch (error) {
    // ... (error handling for AI API calls)
    return { response: ..., suggestions: ... };
  }
};
```
- **Parameters:** `userMessage`: `string` - The user's input message to be sent to the AI model.
- **Return Type:** `Promise<{response: string, suggestions?: string[]}>` - An asynchronous function that resolves to an object containing the AI-generated response and basic suggestions.
- **Functionality:**
    1.  **API Key Check:** Verifies if the `VITE_OPENAI_API_KEY` is configured.
    2.  **Dynamic System Prompt:** Fetches all university data from `UniversityService` and dynamically constructs a `SYSTEM_PROMPT`. This prompt instructs the AI on its persona (UniBot), its specialization (Philippine state universities PUP, TUP, PLM), desired tone (friendly, engaging, emojis), response length, and explicitly provides the AI with up-to-date university data it should use.
    3.  **API Call:** Sends a chat completion request to the OpenAI (OpenRouter) API using a specified model (`"meta-llama/llama-3.2-3b-instruct:free"`). The request includes the `SYSTEM_PROMPT` and the `userMessage`.
    4.  **Response Processing:** Extracts the content from the AI's response.
    5.  **Markdown/Formatting Removal:** Applies a series of `replace` operations to `cleanAiResponse`, stripping common markdown formatting (bold, lists, headers) to ensure the output is plain text as per the system prompt's instruction.
    6.  **Suggestion Generation:** Generates a basic set of suggestions based on keywords found in the AI's response (e.g., "program", "admission", "compare"). If fewer than 2 suggestions are generated, default suggestions are added.
    7.  **Error Handling:** Catches potential errors during the API call (e.g., network issues, invalid API key, rate limiting) and returns a user-friendly error message with fallback suggestions.
- **Purpose:** To provide intelligent, contextually aware responses for user queries that cannot be directly handled by predefined rule-based patterns. By dynamically injecting university data into the system prompt, it aims to keep the AI's responses factual and relevant to the application's domain.

```