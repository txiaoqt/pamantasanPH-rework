import React from 'react';
import { MapPin, BookOpen } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  subtitle: string;
  change: string;
  icon: React.ReactNode;
  changeType: 'positive' | 'neutral';
}

function StatCard({ title, value, subtitle, change, icon, changeType }: StatCardProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-red-50 rounded-lg group-hover:bg-red-100 transition-colors">
          {icon}
        </div>
        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
          changeType === 'positive' 
            ? 'bg-green-100 text-green-700' 
            : 'bg-blue-100 text-blue-700'
        }`}>
          {change}
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
  const stats = [
    {
      title: 'Total Universities',
      value: 'TBA',
      subtitle: 'Registered Institutions',
      change: 'TBA',
      icon: <BookOpen className="h-5 w-5 text-red-700" />,
      changeType: 'positive' as const
    },
    {
      title: 'Provinces Covered',
      value: 'TBA',
      subtitle: 'Across the Philippines',
      change: 'TBA',
      icon: <MapPin className="h-5 w-5 text-red-700" />,
      changeType: 'positive' as const
    },
    {
      title: 'Programs Available',
      value: 'TBA',
      subtitle: 'Degree programs',
      change: 'TBA',
      icon: <BookOpen className="h-5 w-5 text-red-700" />,
      changeType: 'positive' as const
    },
    
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Platform Overview
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            A centralized portal providing comprehensive admission requirements, deadlines, and guidance for Philippine colleges and universities.
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
