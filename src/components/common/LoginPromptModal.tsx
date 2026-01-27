import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, X } from 'lucide-react';

interface LoginPromptModalProps {
  onClose: () => void;
}

export default function LoginPromptModal({ onClose }: LoginPromptModalProps) {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-sm p-8 text-center">
        <div className="flex justify-end">
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-6 w-6" />
          </button>
        </div>
        <LogIn className="mx-auto h-12 w-12 text-maroon-600" />
        <h2 className="mt-4 text-2xl font-bold text-gray-900">Please Log In</h2>
        <p className="mt-2 text-sm text-gray-600">
          You need to be logged in to view this content. Please log in or create an account to continue.
        </p>
        <div className="mt-6 flex justify-center space-x-4">
          <button onClick={onClose} className="px-6 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            Cancel
          </button>
          <button onClick={handleLogin} className="px-6 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-maroon-800 hover:bg-maroon-700">
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
