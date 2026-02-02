import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {/* Brand */}
          <div className="space-y-3 sm:space-y-4 lg:col-span-2">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-br from-red-600 to-red-500 p-2 rounded-lg">
                <GraduationCap className="h-6 w-6 text-yellow-400" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold">UniCentral</h3>
                <p className="text-sm text-gray-400">Excellence in Education</p>
              </div>
            </div>
            <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
              Empowering students to make smarter college choices — find, compare, and enroll with confidence.
            </p>
            <div className="flex space-x-3">
              <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"><Facebook className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer transition-colors" /></a>
              <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"><Twitter className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer transition-colors" /></a>
              <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"><Instagram className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer transition-colors" /></a>
              <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"><Youtube className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer transition-colors" /></a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-3 text-yellow-400">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-red-400 shrink-0" />
                <span className="text-gray-400 text-sm">info@UniCentral.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-red-400 shrink-0" />
                <span className="text-gray-400 text-sm">+63 945 552 3661</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-red-400 shrink-0" />
                <span className="text-gray-400 text-sm">Metro Manila, Philippines</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 UniCentral Philippines. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link to="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</Link>
              <Link to="/sitemap" className="text-gray-400 hover:text-white text-sm transition-colors">Sitemap</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}