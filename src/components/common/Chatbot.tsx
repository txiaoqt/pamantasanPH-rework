import React from 'react';
import { X } from 'lucide-react';
import { MessageCircle, Bot } from 'lucide-react';

interface ChatbotProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function Chatbot({ isOpen, setIsOpen }: ChatbotProps) {
  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 md:bottom-6 md:right-6 bg-maroon-800 hover:bg-maroon-700 text-white p-3 md:p-4 rounded-full shadow-lg transition-all duration-300 z-50 group"
          aria-label="Open chat"
        >
          <MessageCircle className="h-5 w-5 md:h-6 md:w-6" />
          <div className="absolute -top-2 -left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
            Ask me!
          </div>
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 md:left-auto md:right-6 md:bottom-6 md:translate-x-0 w-[calc(100vw-2rem)] max-w-sm md:w-96 h-[500px] bg-white rounded-lg shadow-2xl z-50 flex flex-col">
          <div className="bg-maroon-800 text-white p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bot className="h-5 w-5" />
              <span className="font-semibold">UniBot</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-maroon-700 p-1 rounded transition-colors"
              aria-label="Close chat"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center p-4">
            <p className="text-gray-500 text-center">
              UniBot is not available for now, will be implemented soon.
            </p>
          </div>
        </div>
      )}
    </>
  );
}