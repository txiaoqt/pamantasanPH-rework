import React from 'react';
import Chatbot from '../components/common/Chatbot';

export default function ChatbotPage() {
  return (
    // This div sets the overall height for the chatbot page content.
    // min-h-[calc(100vh-64px-64px)] assumes a fixed header (64px) and footer (64px)
    // and makes this content area fill the remaining height.
    <div className="flex flex-grow min-h-[calc(100vh-64px-64px)] overflow-hidden">
      {/* The Chatbot component now includes its own sidebars and full layout internally. */}
      {/* We simply render it here, and its internal flex-1 will make it fill this container's height. */}
      <Chatbot />
    </div>
  );
}