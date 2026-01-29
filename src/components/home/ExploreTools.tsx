import React from 'react';
import { Search, BarChart3, Map, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ToolCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  onClick?: () => void;
}

function ToolCard({ title, description, icon, color, onClick }: ToolCardProps) {
  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer border border-gray-100 dark:border-gray-700"
      onClick={onClick}
    >
      <div className={`w-12 h-12 ${color} rounded-lg flex items-center justify-center mb-4 transition-colors`}>
        {React.cloneElement(icon as React.ReactElement, { className: `h-6 w-6 text-white` })}
      </div>
      <h3 className="text-lg font-bold text-gray-800 dark:text-gray-50 mb-2 group-hover:text-maroon-800 dark:group-hover:text-maroon-400 transition-colors">
        {title}
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
        {description}
      </p>
    </div>
  );
}

export default function ExploreTools() {
  const navigate = useNavigate();

  const handleToolClick = (toolTitle: string) => {
    switch (toolTitle) {
      case 'Advanced Search':
        navigate('/universities');
        break;
      case 'Compare Universities':
        navigate('/compare');
        break;
      case 'Interactive Map':
        navigate('/map');
        break;
      case 'Student Reviews':
        // This can be linked to a future reviews page or modal
        break;
      default:
        break;
    }
  };

  const tools = [
    {
      title: 'Advanced Search',
      description: 'Filter universities by location, programs, and more to find the best fit for you.',
      icon: <Search />,
      color: 'bg-maroon-700 dark:bg-maroon-800',
      onClick: () => handleToolClick('Advanced Search')
    },
    {
      title: 'Compare Universities',
      description: 'Select and compare universities side-by-side to evaluate their key differences.',
      icon: <BarChart3 />,
      color: 'bg-indigo-600 dark:bg-indigo-700',
      onClick: () => handleToolClick('Compare Universities')
    },
    {
      title: 'Interactive Map',
      description: 'Visually explore the locations of universities across different regions.',
      icon: <Map />,
      color: 'bg-maroon-700 dark:bg-maroon-800',
      onClick: () => handleToolClick('Interactive Map')
    },
    {
      title: 'Student Reviews',
      description: 'Gain insights from authentic student reviews and ratings to make an informed choice.',
      icon: <Star />,
      color: 'bg-indigo-600 dark:bg-indigo-700',
      onClick: () => handleToolClick('Student Reviews')
    }
  ];

  return (
    <section className="py-12 md:py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-3">
            Find Your Perfect University
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Our powerful tools are designed to simplify your search and decision-making process.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tools.map((tool, index) => (
            <ToolCard key={index} {...tool} />
          ))}
        </div>
      </div>
    </section>
  );
}