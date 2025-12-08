import React from 'react';
import { Users, Target, Heart, Globe, BookOpen, TrendingUp, Shield } from 'lucide-react';

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
      name: 'Alyssa Marie Dela Cruz',
      role: 'Project Manager, Frontend Developer',
      image: 'Images/alyssa.jpg',
      description: 'lorem ipsum dolor'
    },
    {
      name: 'Christopher Natada',
      role: 'Full stack Vibecoder',
      image: 'Images/toff.jpg',
      description: 'lorem ipsum'
    },
    {
      name: 'Naomi Erika Angel De Guzman',
      role: 'UI/UX Designer',
      image: 'Images/nami.jpg',
      description: 'lorem ipsum'
    },
    {
      name: 'Daniella Simara',
      role: 'Full stack Developer',
      image: 'Images/dani.png',
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
      <div className="bg-gradient-to-br from-maroon-900 via-maroon-800 to-red-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">About PamantasanPH</h1>
            <p className="text-xl md:text-2xl text-maroon-100 max-w-4xl mx-auto leading-relaxed">
              Empowering Filipino students to find their perfect university match through
              comprehensive data, authentic reviews, and innovative tools.
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                We believe every Filipino student deserves access to quality education. Our mission is to
                democratize university information and make the college selection process transparent,
                accessible, and student-centered.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Since 2024, we've helped over 50,000 students discover universities that align with
                their goals, budget, and aspirations across all 81 provinces of the Philippines.
              </p>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/1595391/pexels-photo-1595391.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
                alt="Students studying"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center space-x-4">
                  <div className="bg-maroon-100 p-3 rounded-full">
                    <Users className="h-6 w-6 text-maroon-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">50K+</div>
                    <div className="text-gray-600">Students Helped</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do at PamantasanPH
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <ValueCard key={index} {...value} />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-maroon-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Impact</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Numbers that reflect our commitment to Filipino students
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center bg-white p-8 rounded-xl shadow-lg">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-maroon-100 rounded-full mb-4">
                <BookOpen className="h-8 w-8 text-maroon-600" />
              </div>
              <div className="text-4xl font-bold text-maroon-800 mb-2">124</div>
              <div className="text-gray-600">Universities Listed</div>
            </div>

            <div className="text-center bg-white p-8 rounded-xl shadow-lg">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-maroon-100 rounded-full mb-4">
                <Users className="h-8 w-8 text-maroon-600" />
              </div>
              <div className="text-4xl font-bold text-maroon-800 mb-2">50K+</div>
              <div className="text-gray-600">Students Helped</div>
            </div>

            <div className="text-center bg-white p-8 rounded-xl shadow-lg">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-maroon-100 rounded-full mb-4">
                <Globe className="h-8 w-8 text-maroon-600" />
              </div>
              <div className="text-4xl font-bold text-maroon-800 mb-2">81</div>
              <div className="text-gray-600">Provinces Covered</div>
            </div>

            <div className="text-center bg-white p-8 rounded-xl shadow-lg">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-maroon-100 rounded-full mb-4">
                <TrendingUp className="h-8 w-8 text-maroon-600" />
              </div>
              <div className="text-4xl font-bold text-maroon-800 mb-2">95%</div>
              <div className="text-gray-600">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Meet Our Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Passionate learners and tech enthusiasts working to make college admissions smarter, simpler, and more accessible to the Philippines.
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
              PamantasanPH was born from a simple observation: choosing the right university in the Philippines
              was unnecessarily difficult and often unfair. Students from remote provinces had limited access
              to information, while those in Metro Manila had overwhelming choices but little guidance.
            </p>

            <p className="text-lg leading-relaxed mb-6">
              Our founder, Maria Santos, experienced this firsthand when helping her younger siblings navigate
              university selection. Despite her background in education consulting, she found it challenging
              to gather comprehensive, unbiased information about universities across the archipelago.
            </p>

            <p className="text-lg leading-relaxed mb-6">
              In 2024, we launched PamantasanPH with a vision: every Filipino student, regardless of their
              location or background, should have access to the same quality of information when making one
              of the most important decisions of their lives.
            </p>

            <p className="text-lg leading-relaxed">
              Today, we're proud to be the Philippines' most comprehensive university discovery platform,
              trusted by students, parents, and educators nationwide. But we're just getting started –
              our goal is to help every Filipino student find their perfect educational match.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-maroon-900 via-maroon-800 to-red-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Our Mission</h2>
          <p className="text-xl text-maroon-100 mb-8 leading-relaxed">
            Whether you're a student, educator, or university administrator,
            you can be part of transforming Philippine higher education.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-maroon-800 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors">
              Partner With Us
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-maroon-800 transition-colors">
              Contact Our Team
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
