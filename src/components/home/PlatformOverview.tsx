import React, { useState, useEffect } from 'react';
import { MapPin, BookOpen, Building } from 'lucide-react';
import { UniversityService } from '../../services/universityService';
import { University } from '../university/UniversityCard';

interface StatCardProps {
  title: string;
  value: string;
  subtitle: string;
  highlight: string;
  icon: React.ReactNode;
}

function StatCard({ title, value, subtitle, highlight, icon }: StatCardProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-red-50 rounded-lg group-hover:bg-red-100 transition-colors">
          {icon}
        </div>
        <div className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-amber-400 rounded-full text-xs font-semibold text-red-900">
          {highlight}
        </div>
      </div>

      <div className="space-y-1">
        <h3 className="text-gray-600 text-sm font-medium">{title}</h3>
        <div className="text-3xl font-bold text-gray-900 group-hover:text-red-900 transition-colors">
          {value}
        </div>
        <p className="text-gray-500 text-sm">{subtitle}</p>
      </div>
    </div>
  );
}

export default function PlatformOverview() {
  const [universities, setUniversities] = useState<University[]>([]);
  const [stats, setStats] = useState([
    {
      title: 'Total Universities',
      value: '200+',
      subtitle: 'Registered Institutions',
      highlight: 'Growing',
      icon: <Building className="h-5 w-5 text-red-700" />
    },
    {
      title: 'Locations Covered',
      value: '17',
      subtitle: 'In Metro Manila',
      highlight: 'Local',
      icon: <MapPin className="h-5 w-5 text-red-700" />
    },
    {
      title: 'Programs Available',
      value: '1,500+',
      subtitle: 'Degree programs',
      highlight: 'Diverse',
      icon: <BookOpen className="h-5 w-5 text-red-700" />
    },
  ]);

  // Fetch universities and calculate real stats
  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const data = await UniversityService.getAllUniversities();
        setUniversities(data);

        // Calculate real stats
        const locations = new Set(data.map(uni => uni.location));
        const totalPrograms = data.reduce((sum, uni) => sum + uni.programs, 0);
        const allSubjects = new Set(data.flatMap(uni => uni.subjects));

        setStats([
          {
            title: 'Total Universities',
            value: data.length.toString(),
            subtitle: 'Registered Institutions',
            highlight: 'State Universities',
            icon: <Building className="h-5 w-5 text-red-700" />
          },
          {
            title: 'Locations Covered',
            value: locations.size.toString(),
            subtitle: 'In Metro Manila',
            highlight: 'Local Focus',
            icon: <MapPin className="h-5 w-5 text-red-700" />
          },
          {
            title: 'Subjects Offered',
            value: allSubjects.size.toString(),
            subtitle: 'Academic disciplines',
            highlight: 'Comprehensive',
            icon: <BookOpen className="h-5 w-5 text-red-700" />
          },
        ]);
      } catch (error) {
        console.error('Failed to fetch universities for stats:', error);
      }
    };

    fetchUniversities();
  }, []);

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Platform Overview
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            A centralized portal providing comprehensive admission requirements, deadlines, and guidance for admission processes across state universities in Manila.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
