import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GraduationCap, Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { AcademicProgramService } from '../../services/academicProgramService';

export default function Footer() {
  const navigate = useNavigate();
  const [programCategories, setProgramCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const programs = await AcademicProgramService.getAggregatedPrograms();
        const categories = [...new Set(programs.map(p => p.category))];
        // Take only first 4 categories
        setProgramCategories(categories.slice(0, 4));
      } catch (error) {
        console.error('Failed to fetch program categories:', error);
        // Fallback to some default categories
        setProgramCategories(['Technology', 'Business', 'Engineering', 'Healthcare']);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (category: string) => {
    navigate(`/programs?category=${encodeURIComponent(category)}`);
  };
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-br from-red-600 to-red-500 p-2 rounded-lg">
                <GraduationCap className="h-6 w-6 text-yellow-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold">UniCentral</h3>
                <p className="text-sm text-gray-400">Excellence in Education</p>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Empowering students to make smarter college choices — find, compare, and enroll with confidence.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"><Facebook className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer transition-colors" /></a>
              <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"><Twitter className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer transition-colors" /></a>
              <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"><Instagram className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer transition-colors" /></a>
              <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"><Youtube className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer transition-colors" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-yellow-400">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/universities" className="text-gray-400 hover:text-white transition-colors">Find Universities</Link></li>
              <li><Link to="/compare" className="text-gray-400 hover:text-white transition-colors">Compare Programs</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/map" className="text-gray-400 hover:text-white transition-colors">Universities Map</Link></li>
            </ul>
          </div>

          {/* Program Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-yellow-400">Program Categories</h3>
            <ul className="space-y-2">
              {programCategories.map((category) => (
                <li key={category}>
                  <button
                    onClick={() => handleCategoryClick(category)}
                    className="text-gray-400 hover:text-white transition-colors text-left"
                  >
                    {category}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-yellow-400">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-red-400 shrink-0" />
                <span className="text-gray-400">info@UniCentral.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-red-400 shrink-0" />
                <span className="text-gray-400">+63 945 552 3661</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-red-400 shrink-0" />
                <span className="text-gray-400">Metro Manila, Philippines</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 UniCentral Philippines. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</Link>
              <Link to="/about" className="text-gray-400 hover:text-white text-sm transition-colors">About Us</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
