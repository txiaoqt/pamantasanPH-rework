import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Building2, BookOpen, GitCompare, Info, UserCircle, Heart, LogIn, UserPlus, Map, FileText, Shield, Briefcase, Rss, HelpCircle, GitBranch } from 'lucide-react';

interface SitemapProps {
  isChatbotOpen: boolean;
}

const sitemapData = [
  {
    category: 'Main Navigation',
    icon: <GitBranch className="h-6 w-6 text-red-500" />,
    links: [
      { name: 'Home', path: '/', icon: <Home className="h-5 w-5 mr-3 text-gray-400" /> },
      { name: 'Universities', path: '/universities', icon: <Building2 className="h-5 w-5 mr-3 text-gray-400" /> },
      { name: 'Programs', path: '/programs', icon: <BookOpen className="h-5 w-5 mr-3 text-gray-400" /> },
      { name: 'Compare', path: '/compare', icon: <GitCompare className="h-5 w-5 mr-3 text-gray-400" /> },
      { name: 'About Us', path: '/about', icon: <Info className="h-5 w-5 mr-3 text-gray-400" /> },
    ],
  },
  {
    category: 'User Account',
    icon: <UserCircle className="h-6 w-6 text-red-500" />,
    links: [
      { name: 'Profile', path: '/profile', icon: <UserCircle className="h-5 w-5 mr-3 text-gray-400" /> },
      { name: 'Saved Items', path: '/saved', icon: <Heart className="h-5 w-5 mr-3 text-gray-400" /> },
      { name: 'Login', path: '/login', icon: <LogIn className="h-5 w-5 mr-3 text-gray-400" /> },
      { name: 'Sign Up', path: '/signup', icon: <UserPlus className="h-5 w-5 mr-3 text-gray-400" /> },
    ],
  },
  {
    category: 'Resources',
    icon: <BookOpen className="h-6 w-6 text-red-500" />,
    links: [
      { name: 'Universities Map', path: '/universities?view=map', icon: <Map className="h-5 w-5 mr-3 text-gray-400" /> },
      { name: 'Blog', path: '/blog', icon: <Rss className="h-5 w-5 mr-3 text-gray-400" /> },
      { name: 'FAQ', path: '/faq', icon: <HelpCircle className="h-5 w-5 mr-3 text-gray-400" /> },
    ],
  },
  {
    category: 'Legal & Company',
    icon: <Briefcase className="h-6 w-6 text-red-500" />,
    links: [
      { name: 'Privacy Policy', path: '/privacy', icon: <Shield className="h-5 w-5 mr-3 text-gray-400" /> },
      { name: 'Terms of Service', path: '/terms', icon: <FileText className="h-5 w-5 mr-3 text-gray-400" /> },

    ],
  },
];

export default function Sitemap({ isChatbotOpen }: SitemapProps) {
  return (
    <div className={`bg-gray-50 dark:bg-gray-900 py-12 sm:py-16 ${isChatbotOpen ? 'pb-[520px]' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">Website Sitemap</h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            A complete overview of all pages on UniCentral to help you navigate our services.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {sitemapData.map((section) => (
            <div key={section.category} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-4">
                {section.icon}
                <h2 className="ml-3 text-xl font-bold text-gray-900 dark:text-white">{section.category}</h2>
              </div>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link to={link.path} className="flex items-center text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors">
                      {link.icon}
                      <span>{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}