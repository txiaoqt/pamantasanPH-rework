import React, { useState } from 'react';
import { Mail, Send } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  
    console.log('Newsletter subscription:', email);
    setEmail('');
  };

  return (
    <section className="py-8 md:py-16 bg-gradient-to-br from-red-900 via-red-800 to-amber-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-12">
          <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-full mb-3 sm:mb-4">
            <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400" />
          </div>

          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">
            Stay Updated
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-gray-200 max-w-3xl mx-auto leading-relaxed">
            Get the latest updates on new universities, admission deadlines, admission requirements, and application process.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <div className="flex-1">
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl border-0 text-gray-900 placeholder-gray-500 text-sm sm:text-base focus:ring-2 focus:ring-yellow-400 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="bg-yellow-400 hover:bg-yellow-300 text-red-900 px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 flex items-center justify-center"
            >
              <Send className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-2" />
              <span className="hidden sm:inline">Subscribe to Updates</span>
              <span className="sm:hidden">Subscribe</span>
            </button>
          </form>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-12 pt-8 sm:pt-12 border-t border-white/20">
          <div className="text-center">
            <h3 className="text-base sm:text-lg font-semibold text-white mb-2 sm:mb-3">New Universities</h3>
            <p className="text-gray-300 text-xs sm:text-sm">
              Be informed about newly added university application opportunities.
            </p>
          </div>

          <div className="text-center">
            <h3 className="text-base sm:text-lg font-semibold text-white mb-2 sm:mb-3">Admission Alerts</h3>
            <p className="text-gray-300 text-xs sm:text-sm">
              Get notified about university application deadline updates.
            </p>
          </div>

          <div className="text-center">
            <h3 className="text-base sm:text-lg font-semibold text-white mb-2 sm:mb-3">Application Alerts</h3>
            <p className="text-gray-300 text-xs sm:text-sm">
              Stay updated on university application process changes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}