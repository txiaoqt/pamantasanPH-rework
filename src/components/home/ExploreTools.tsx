import React from 'react';
import { Search, BarChart3, Map, Star } from 'lucide-react';

interface ToolCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

function ToolCard({ title, description, icon, color }: ToolCardProps) {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer border border-gray-100">
      <div className={`w-16 h-16 ${color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
        {icon}
      </div>
      
      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-red-900 transition-colors">
        {title}
      </h3>
      
      <p className="text-gray-600 leading-relaxed">
        {description}
      </p>
    </div>
  );
}

export default function ExploreTools() {
  const tools = [
    {
      title: 'Advanced Search',
      description: 'Find universities by location, programs, and more',
      icon: <Search className="h-8 w-8 text-white" />,
      color: 'bg-gradient-to-br from-blue-600 to-blue-500'
    },
    {
      title: 'Compare',
      description: 'Side-by-side comparison of universities',
      icon: <BarChart3 className="h-8 w-8 text-white" />,
      color: 'bg-gradient-to-br from-green-600 to-green-500'
    },
    {
      title: 'Map View',
      description: 'Explore universities on an interactive map',
      icon: <Map className="h-8 w-8 text-white" />,
      color: 'bg-gradient-to-br from-purple-600 to-purple-500'
    },
    {
      title: 'Reviews',
      description: 'Read authentic student reviews and ratings',
      icon: <Star className="h-8 w-8 text-white" />,
      color: 'bg-gradient-to-br from-yellow-600 to-yellow-500'
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Explore & Compare
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Tools to help you find the perfect university
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {tools.map((tool, index) => (
            <ToolCard key={index} {...tool} />
          ))}
        </div>
      </div>
    </section>
  );
}