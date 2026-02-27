import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GraduationCap, Menu, X, User, LogOut, Settings, Bookmark, GitCompareArrows, MessageCircle } from 'lucide-react'; // Added MessageCircle
import { Session } from '@supabase/supabase-js';
import { supabase } from '../../lib/supabase';

interface UserProfile {
  full_name?: string;
  avatar_url?: string;
}

interface HeaderProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  session: Session | null;
}

export default function Header({ mobileMenuOpen, setMobileMenuOpen, session }: HeaderProps) {
  const location = useLocation();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setProfileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (session?.user) {
      setLoadingProfile(true);
      const fetchProfile = async () => {
        const { data } = await supabase
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
      window.location.reload(); 
    } else {
      alert('Error logging out: ' + error.message);
    }
  };

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200 dark:bg-gray-900/95 dark:border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-gradient-to-br from-red-900 to-red-700 p-2 rounded-lg">
              <GraduationCap className="h-6 w-6 text-yellow-400" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-red-900 dark:text-[#FF4D4D]">UniCentral - Prototype</h1>
              <p className="text-xs text-gray-600 dark:text-gray-400">Simplifying College Admissions</p>
            </div>
          </Link>

          <div className="flex items-center">
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/" className={`transition-colors text-sm font-medium ${isActive('/') ? 'text-maroon-900 dark:text-white' : 'text-gray-700 dark:text-gray-400 hover:text-maroon-900 dark:hover:text-white'}`}>Home</Link>
              <Link to="/universities" className={`transition-colors text-sm font-medium ${isActive('/universities') ? 'text-maroon-900 dark:text-white' : 'text-gray-700 dark:text-gray-400 hover:text-maroon-900 dark:hover:text-white'}`}>Universities</Link>
              <Link to="/programs" className={`transition-colors text-sm font-medium ${isActive('/programs') ? 'text-maroon-900 dark:text-white' : 'text-gray-700 dark:text-gray-400 hover:text-maroon-900 dark:hover:text-white'}`}>Programs</Link>
              <Link to="/about" className={`transition-colors text-sm font-medium ${isActive('/about') ? 'text-maroon-900 dark:text-white' : 'text-gray-700 dark:text-gray-400 hover:text-maroon-900 dark:hover:text-white'}`}>About</Link>
              <Link to="/faq" className={`transition-colors text-sm font-medium ${isActive('/faq') ? 'text-maroon-900 dark:text-white' : 'text-gray-700 dark:text-gray-400 hover:text-maroon-900 dark:hover:text-white'}`}>FAQ</Link>
            </nav>

            <div className="hidden md:flex items-center ml-8">
              {session ? (
                (
                  <>

                    <div className="relative" ref={profileMenuRef}>
                      <button onClick={() => setProfileMenuOpen(!profileMenuOpen)} className="flex items-center space-x-2 text-sm">
                        <User className="h-5 w-5 text-gray-700 dark:text-gray-400" />
                        <span className="dark:text-gray-400">{loadingProfile ? 'Loading...' : (profile?.full_name || session.user.email)}</span>
                      </button>
                      {profileMenuOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5">
                          <Link to="/profile" className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                            <Settings className="mr-3 h-5 w-5" />
                            Profile
                          </Link>
                          <Link to="/saved" className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                            <Bookmark className="mr-3 h-5 w-5" />
                            Saved
                          </Link>
                          <Link to="/compare" className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                            <GitCompareArrows className="mr-3 h-5 w-5" />
                            Compare
                          </Link>

                          <Link
                            to="/chatbot" // Link to the new chatbot page
                            onClick={() => setProfileMenuOpen(false)} // Close profile menu when navigating
                            className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            <MessageCircle className="mr-3 h-5 w-5" />
                            Chatbot
                          </Link>

                          <button onClick={handleLogout} className="flex items-center w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20">
                            <LogOut className="mr-3 h-5 w-5" />
                            Logout
                          </button>
                        </div>
                      )}
                    </div>
                  </>
                )
              ) : (
                <Link to="/login" className="px-3 py-1 text-sm border border-transparent font-medium rounded-md text-white bg-maroon-800 hover:bg-maroon-700">
                  Login
                </Link>
              )}
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ml-4"
            >
              {mobileMenuOpen ? <X className="h-6 w-6 dark:text-white" /> : <Menu className="h-6 w-6 dark:text-white" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden pb-4 bg-white dark:bg-gray-900/95">
            <nav className="flex flex-col space-y-3">
              <Link to="/" className={`transition-colors text-sm font-medium py-2 ${isActive('/') ? 'text-maroon-900 dark:text-white' : 'text-gray-700 dark:text-gray-400 hover:text-maroon-900 dark:hover:text-white'}`} onClick={() => setMobileMenuOpen(false)}>Home</Link>
              <Link to="/universities" className={`transition-colors text-sm font-medium py-2 ${isActive('/universities') ? 'text-maroon-900 dark:text-white' : 'text-gray-700 dark:text-gray-400 hover:text-maroon-900 dark:hover:text-white'}`} onClick={() => setMobileMenuOpen(false)}>Universities</Link>
              <Link to="/programs" className={`transition-colors text-sm font-medium py-2 ${isActive('/programs') ? 'text-maroon-900 dark:text-white' : 'text-gray-700 dark:text-gray-400 hover:text-maroon-900 dark:hover:text-white'}`} onClick={() => setMobileMenuOpen(false)}>Programs</Link>
              <Link to="/about" className={`transition-colors text-sm font-medium py-2 ${isActive('/about') ? 'text-maroon-900 dark:text-white' : 'text-gray-700 dark:text-gray-400 hover:text-maroon-900 dark:hover:text-white'}`} onClick={() => setMobileMenuOpen(false)}>About</Link>
              <Link to="/faq" className={`transition-colors text-sm font-medium py-2 ${isActive('/faq') ? 'text-maroon-900 dark:text-white' : 'text-gray-700 dark:text-gray-400 hover:text-maroon-900 dark:hover:text-white'}`} onClick={() => setMobileMenuOpen(false)}>FAQ</Link>
            </nav>
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                {session ? (
                  <div className="space-y-3">
                    <Link 
                      to="/profile" 
                      className="flex items-center py-2 text-sm text-gray-700 dark:text-gray-400 hover:text-maroon-900 dark:hover:text-white"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                        <Settings className="mr-2 h-5 w-5 dark:text-gray-400" />
                        Profile
                    </Link>
                    <Link 
                      to="/saved" 
                      className="flex items-center py-2 text-sm text-gray-700 dark:text-gray-400 hover:text-maroon-900 dark:hover:text-white"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                        <Bookmark className="mr-2 h-5 w-5 dark:text-gray-400" />
                        Saved
                    </Link>
                                        <Link
                                          to="/compare"
                                          className="flex items-center py-2 text-sm text-gray-700 dark:text-gray-400 hover:text-maroon-900 dark:hover:text-white"
                                          onClick={() => setMobileMenuOpen(false)}
                                        >
                                            <GitCompareArrows className="mr-2 h-5 w-5 dark:text-gray-400" />
                                            Compare
                                        </Link>
                                        <Link
                                          to="/chatbot" // Added Chatbot link to mobile menu
                                          className="flex items-center py-2 text-sm text-gray-700 dark:text-gray-400 hover:text-maroon-900 dark:hover:text-white"
                                          onClick={() => setMobileMenuOpen(false)}
                                        >
                                            <MessageCircle className="mr-2 h-5 w-5 dark:text-gray-400" />
                                            Chatbot
                                        </Link>
                                        <button
                                          onClick={() => {
                                            handleLogout();
                                            setMobileMenuOpen(false);
                                          }}                      className="flex items-center w-full text-left py-2 text-sm text-gray-700 dark:text-gray-400 hover:text-maroon-900 dark:hover:text-white"
                    >
                        <LogOut className="mr-2 h-5 w-5 dark:text-gray-400" />
                        Logout
                    </button>
                  </div>
                ) : (
                  <Link to="/login" className="w-full text-center block px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-maroon-800 hover:bg-maroon-700" onClick={() => setMobileMenuOpen(false)}>
                    Login
                  </Link>
                )}
              </div>
          </div>
        )}
      </div>
    </header>
  );
}
