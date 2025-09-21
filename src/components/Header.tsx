import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GraduationCap, Menu, X } from 'lucide-react';

interface HeaderProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export default function Header({ mobileMenuOpen, setMobileMenuOpen }: HeaderProps) {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-gradient-to-br from-red-900 to-red-700 p-2 rounded-lg">
              <GraduationCap className="h-6 w-6 text-yellow-400" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-red-900">UniFinder PH</h1>
              <p className="text-xs text-gray-600">Excellence in Education</p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`transition-colors font-medium ${
                isActive('/') ? 'text-maroon-900' : 'text-gray-700 hover:text-maroon-900'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/universities" 
              className={`transition-colors font-medium ${
                isActive('/universities') ? 'text-maroon-900' : 'text-gray-700 hover:text-maroon-900'
              }`}
            >
              Universities
            </Link>
            <Link 
              to="/programs" 
              className={`transition-colors font-medium ${
                isActive('/programs') ? 'text-maroon-900' : 'text-gray-700 hover:text-maroon-900'
              }`}
            >
              Programs
            </Link>
            <Link 
              to="/compare" 
              className={`transition-colors font-medium ${
                isActive('/compare') ? 'text-maroon-900' : 'text-gray-700 hover:text-maroon-900'
              }`}
            >
              Compare
            </Link>
            <Link 
              to="/about" 
              className={`transition-colors font-medium ${
                isActive('/about') ? 'text-maroon-900' : 'text-gray-700 hover:text-maroon-900'
              }`}
            >
              About
            </Link>
          </nav>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden pb-4">
            <nav className="flex flex-col space-y-3">
              <Link 
                to="/" 
                className={`transition-colors font-medium py-2 ${
                  isActive('/') ? 'text-maroon-900' : 'text-gray-700 hover:text-maroon-900'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/universities" 
                className={`transition-colors font-medium py-2 ${
                  isActive('/universities') ? 'text-maroon-900' : 'text-gray-700 hover:text-maroon-900'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Universities
              </Link>
              <Link 
                to="/programs" 
                className={`transition-colors font-medium py-2 ${
                  isActive('/programs') ? 'text-maroon-900' : 'text-gray-700 hover:text-maroon-900'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Programs
              </Link>
              <Link 
                to="/compare" 
                className={`transition-colors font-medium py-2 ${
                  isActive('/compare') ? 'text-maroon-900' : 'text-gray-700 hover:text-maroon-900'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Compare
              </Link>
              <Link 
                to="/about" 
                className={`transition-colors font-medium py-2 ${
                  isActive('/about') ? 'text-maroon-900' : 'text-gray-700 hover:text-maroon-900'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}