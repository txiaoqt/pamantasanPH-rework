import React from 'react';
import { Users, Target, Heart, Globe, BookOpen, TrendingUp, Shield } from 'lucide-react';
import memeImage from '../assets/Images/meme.png';

interface TeamMemberProps {
  name: string;
  role: string;
  image: string;
  description: string;
}

function TeamMember({ name, role, image, description }: TeamMemberProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300">
      <div className="h-64 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-1">{name}</h3>
        <p className="text-maroon-600 font-medium mb-3">{role}</p>
        <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

interface ValueCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function ValueCard({ icon, title, description }: ValueCardProps) {
  return (
    <div className="text-center group">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-maroon-100 rounded-full mb-4 group-hover:bg-maroon-200 transition-colors">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}

export default function About() {
  const teamMembers = [
    {
      name: 'The FullStack VibeCoder',
      role: 'Full stack Vibecoder',
      image: memeImage,
      description: 'lorem ipsum'
    }
  ];

  const values = [
    {
      icon: <Target className="h-8 w-8 text-maroon-600" />,
      title: 'Accessibility',
      description: 'Making quality education information accessible to every Filipino student, regardless of background or location.'
    },
    {
      icon: <Shield className="h-8 w-8 text-maroon-600" />,
      title: 'Transparency',
      description: 'Providing honest, unbiased information about universities to help students make informed decisions.'
    },
    {
      icon: <Heart className="h-8 w-8 text-maroon-600" />,
      title: 'Student-First',
      description: 'Every feature and decision is made with the student\'s best interests and success in mind.'
    },
    {
      icon: <Globe className="h-8 w-8 text-maroon-600" />,
      title: 'Innovation',
      description: 'Continuously improving our platform with the latest technology to serve students better.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-maroon-900 via-maroon-800 to-red-900 text-white py-10 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">About UniCentral</h1>
            <p className="text-xl md:text-2xl text-maroon-100 max-w-4xl mx-auto leading-relaxed">
              lorem ipsum dolor
            </p>
          </div>
        </div>
      </div>





      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Meet Our Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              lorem ipsum dolor
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <TeamMember key={index} {...member} />
            ))}
          </div>

        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
          </div>

          <div className="prose prose-lg mx-auto text-gray-600">
            <p className="text-xl leading-relaxed mb-6">
              lorem ipsum dolor
            </p>
          </div>
        </div>
      </section>


    </div>
  );
}
