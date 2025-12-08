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
    <section className="py-20 bg-gradient-to-br from-red-900 via-red-800 to-amber-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
            <Mail className="h-8 w-8 text-yellow-400" />
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Stay Updated
          </h2>
          
          <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
            Get the latest updates on new universities, admission deadlines, and
            educational opportunities across the Philippines.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-6 py-4 rounded-xl border-0 text-gray-900 placeholder-gray-500 text-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="bg-yellow-400 hover:bg-yellow-300 text-red-900 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center"
            >
              <Send className="h-5 w-5 mr-2" />
              Subscribe to Updates
            </button>
          </form>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 pt-16 border-t border-white/20">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-white mb-3">New Universities</h3>
            <p className="text-gray-300">
              Be first to know about newly added institutions
            </p>
          </div>
          
          <div className="text-center">
            <h3 className="text-xl font-semibold text-white mb-3">Admission Alerts</h3>
            <p className="text-gray-300">
              Get notified about application deadlines
            </p>
          </div>
          
          <div className="text-center">
            <h3 className="text-xl font-semibold text-white mb-3">Educational News</h3>
            <p className="text-gray-300">
              Stay updated with Philippine education trends
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}