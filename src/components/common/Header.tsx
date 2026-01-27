import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GraduationCap, Menu, X, User, LogOut, Settings } from 'lucide-react';
import { Session } from '@supabase/supabase-js';
import { supabase } from '../../lib/supabase';

interface HeaderProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  session: Session | null;
}

export default function Header({ mobileMenuOpen, setMobileMenuOpen, session }: HeaderProps) {
  const location = useLocation();
  const [profile, setProfile] = useState<any>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  useEffect(() => {
    if (session?.user) {
      setLoadingProfile(true);
      const fetchProfile = async () => {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
        if (data) {
          setProfile(data);
        }
        setLoadingProfile(false);
      };
      fetchProfile();
    } else {
      setLoadingProfile(false);
    }
  }, [session]);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      window.location.reload(); // Reload the page to ensure full UI reset
    } else {
      alert('Error logging out: ' + error.message);
    }
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
              <h1 className="text-lg sm:text-xl font-bold text-red-900">UniCentral - Prototype</h1>
              <p className="text-xs text-gray-600">Simplifying College Admissions</p>
            </div>
          </Link>

          <div className="flex items-center">
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/" className={`transition-colors text-sm font-medium ${isActive('/') ? 'text-maroon-900' : 'text-gray-700 hover:text-maroon-900'}`}>Home</Link>
              <Link to="/universities" className={`transition-colors text-sm font-medium ${isActive('/universities') ? 'text-maroon-900' : 'text-gray-700 hover:text-maroon-900'}`}>Universities</Link>
              <Link to="/programs" className={`transition-colors text-sm font-medium ${isActive('/programs') ? 'text-maroon-900' : 'text-gray-700 hover:text-maroon-900'}`}>Programs</Link>
              <Link to="/compare" className={`transition-colors text-sm font-medium ${isActive('/compare') ? 'text-maroon-900' : 'text-gray-700 hover:text-maroon-900'}`}>Compare</Link>
              <Link to="/about" className={`transition-colors text-sm font-medium ${isActive('/about') ? 'text-maroon-900' : 'text-gray-700 hover:text-maroon-900'}`}>About</Link>
              <Link to="/saved" className={`transition-colors text-sm font-medium ${isActive('/saved') ? 'text-maroon-900' : 'text-gray-700 hover:text-maroon-900'}`}>Saved</Link>
            </nav>

            <div className="hidden md:flex items-center ml-8">
              {session ? (
                <div className="relative">
                  <button onClick={() => setProfileMenuOpen(!profileMenuOpen)} className="flex items-center space-x-2 text-sm">
                    <User className="h-5 w-5 text-gray-700" />
                    <span>{loadingProfile ? 'Loading...' : (profile?.full_name || session.user.email)}</span>
                  </button>
                  {profileMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                      <Link to="/profile" className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <Settings className="mr-2 h-4 w-4" />
                        Profile
                      </Link>
                      <button onClick={handleLogout} className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link to="/login" className="px-3 py-1 text-sm border border-transparent font-medium rounded-md text-white bg-maroon-800 hover:bg-maroon-700">
                  Login
                </Link>
              )}
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors ml-4"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden pb-4">
            <nav className="flex flex-col space-y-3">
              <Link to="/" className={`transition-colors text-sm font-medium py-2 ${isActive('/') ? 'text-maroon-900' : 'text-gray-700 hover:text-maroon-900'}`} onClick={() => setMobileMenuOpen(false)}>Home</Link>
              <Link to="/universities" className={`transition-colors text-sm font-medium py-2 ${isActive('/universities') ? 'text-maroon-900' : 'text-gray-700 hover:text-maroon-900'}`} onClick={() => setMobileMenuOpen(false)}>Universities</Link>
              <Link to="/programs" className={`transition-colors text-sm font-medium py-2 ${isActive('/programs') ? 'text-maroon-900' : 'text-gray-700 hover:text-maroon-900'}`} onClick={() => setMobileMenuOpen(false)}>Programs</Link>
              <Link to="/compare" className={`transition-colors text-sm font-medium py-2 ${isActive('/compare') ? 'text-maroon-900' : 'text-gray-700 hover:text-maroon-900'}`} onClick={() => setMobileMenuOpen(false)}>Compare</Link>
              <Link to="/about" className={`transition-colors text-sm font-medium py-2 ${isActive('/about') ? 'text-maroon-900' : 'text-gray-700 hover:text-maroon-900'}`} onClick={() => setMobileMenuOpen(false)}>About</Link>
              <Link to="/saved" className={`transition-colors text-sm font-medium py-2 ${isActive('/saved') ? 'text-maroon-900' : 'text-gray-700 hover:text-maroon-900'}`} onClick={() => setMobileMenuOpen(false)}>Saved</Link>
              <div className="border-t border-gray-200 pt-4">
                {session ? (
                  <div className="space-y-3">
                    <Link 
                      to="/profile" 
                      className="flex items-center py-2 text-sm text-gray-700 hover:text-maroon-900"
                      onClick={() => setMobileMenuOpen(false)} // Close mobile menu
                    >
                        <Settings className="mr-2 h-5 w-5" />
                        Profile
                    </Link>
                    <button 
                      onClick={() => {
                        handleLogout();
                        setMobileMenuOpen(false); // Close mobile menu
                      }} 
                      className="flex items-center w-full text-left py-2 text-sm text-gray-700 hover:text-maroon-900"
                    >
                        <LogOut className="mr-2 h-5 w-5" />
                        Logout
                    </button>
                  </div>
                ) : (
                  <Link to="/login" className="w-full text-center block px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-maroon-800 hover:bg-maroon-700">
                    Login
                  </Link>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
