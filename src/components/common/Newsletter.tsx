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
    <section className="py-10 md:py-20 bg-gradient-to-br from-red-900 via-red-800 to-amber-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-white/20 rounded-full mb-4 sm:mb-6">
            <Mail className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-400" />
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
            Stay Updated
          </h2>

          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
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
                className="w-full px-4 sm:px-6 py-3 sm:py-4 rounded-xl border-0 text-gray-900 placeholder-gray-500 text-sm sm:text-base md:text-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="bg-yellow-400 hover:bg-yellow-300 text-red-900 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-sm sm:text-base md:text-lg transition-all duration-300 flex items-center justify-center"
            >
              <Send className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              <span className="hidden sm:inline">Subscribe to Updates</span>
              <span className="sm:hidden">Subscribe</span>
            </button>
          </form>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mt-12 sm:mt-16 pt-12 sm:pt-16 border-t border-white/20">
          <div className="text-center">
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-3">New Universities</h3>
            <p className="text-gray-300 text-sm sm:text-base">
              Be informed about newly added university application opportunities.
            </p>
          </div>

          <div className="text-center">
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-3">Admission Alerts</h3>
            <p className="text-gray-300 text-sm sm:text-base">
              Get notified about university application deadline updates.
            </p>
          </div>

          <div className="text-center">
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-3">Application Alerts</h3>
            <p className="text-gray-300 text-sm sm:text-base">
              Stay updated on university application process changes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
