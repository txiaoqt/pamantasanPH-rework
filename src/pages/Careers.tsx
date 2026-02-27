import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Lightbulb, Sparkles, MapPin, Award } from 'lucide-react';
import alyssaImage from '../assets/Images/alyssa.jpg';
import daniImage from '../assets/Images/dani.png';
import namiImage from '../assets/Images/nami.jpg';
import toffImage from '../assets/Images/toff.jpg';

const teamMembers = [
  { name: 'Alyssa', role: 'Frontend Developer', image: alyssaImage },
  { name: 'Dani', role: 'UI/UX Designer', image: daniImage },
  { name: 'Nami', role: 'Backend Developer', image: namiImage },
  { name: 'Toff', role: 'Project Manager', image: toffImage },
];

const jobOpenings = [
  {
    title: 'Senior Frontend Developer',
    location: 'Remote',
    department: 'Engineering',
  },
  {
    title: 'Product Designer',
    location: 'Manila, Philippines',
    department: 'Design',
  },
  {
    title: 'Marketing Manager',
    location: 'Remote',
    department: 'Marketing',
  },
  {
    title: 'Data Scientist',
    location: 'Manila, Philippines',
    department: 'Data',
  },
];

const perks = [
    {
      name: 'Remote-First Culture',
      description: 'Work from anywhere in the world. We trust you to do your best work, wherever you are.',
      icon: <MapPin />,
    },
    {
      name: 'Flexible Work Hours',
      description: 'We believe in work-life balance. Set your own schedule and work when you\'re most productive.',
      icon: <Sparkles />,
    },
    {
      name: 'Generous Compensation',
      description: 'We offer competitive salaries and stock options to all our employees.',
      icon: <TrendingUp />,
    },
    {
      name: 'Health & Wellness',
      description: 'Comprehensive health insurance and wellness programs to keep you healthy and happy.',
      icon: <Award />,
    },
    {
      name: 'Professional Development',
      description: 'We invest in your growth with a generous budget for courses, books, and conferences.',
      icon: <Lightbulb />,
    },
    {
      name: 'Team Retreats',
      description: 'We get together twice a year for a week of fun, team-building, and planning.',
      icon: <Users />,
    },
  ];

export default function Careers() {
  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-red-900 to-amber-800 text-white py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
            Join Our Mission
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg sm:text-xl text-red-100">
            Help us build the future of education and empower students to achieve their dreams.
          </p>
          <div className="mt-8">
            <a href="#open-positions" className="inline-block bg-yellow-400 text-red-900 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-yellow-300 transition-colors">
              View Open Positions
            </a>
          </div>
        </div>
      </div>

      {/* Our Mission Section */}
      <div className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Why We Exist</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              UniCentral is dedicated to simplifying the college application process, making higher education more accessible to everyone. We believe that technology can bridge the gap between students and their future.
            </p>
          </div>
        </div>
      </div>

      {/* Perks & Benefits Section */}
      <div className="bg-white dark:bg-gray-800 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Perks & Benefits</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-4">
              We care about our team and want to provide the best environment for you to thrive.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {perks.map((perk) => (
              <div key={perk.name} className="p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300">
                  {perk.icon}
                </div>
                <h3 className="mt-6 text-lg font-medium text-gray-900 dark:text-white">{perk.name}</h3>
                <p className="mt-2 text-base text-gray-600 dark:text-gray-400">{perk.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Open Positions Section */}
      <div id="open-positions" className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Open Positions</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-4">
              We're always looking for talented people to join our team.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {jobOpenings.map((job) => (
                <li key={job.title}>
                  <Link to="#" className="block hover:bg-gray-50 dark:hover:bg-gray-700">
                    <div className="p-6">
                      <div className="flex items-center justify-between">
                        <p className="text-lg font-semibold text-red-800 dark:text-red-400">{job.title}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{job.department}</p>
                      </div>
                      <div className="mt-2 sm:flex sm:justify-between">
                        <div className="sm:flex">
                          <p className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                            <MapPin className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                            {job.location}
                          </p>
                        </div>
                        <div className="mt-2 flex items-center text-sm text-red-600 dark:text-red-400 sm:mt-0">
                          <p>Learn More & Apply</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Meet the Team Section */}
      <div className="bg-white dark:bg-gray-800 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Meet the Team</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-4">
              We're a small, passionate team dedicated to making a big impact.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <div key={member.name} className="text-center">
                <img className="mx-auto h-32 w-32 rounded-full object-cover" src={member.image} alt={member.name} />
                <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">{member.name}</h3>
                <p className="mt-1 text-base text-red-600 dark:text-red-400">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="bg-red-800">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to make a difference?</span>
            <span className="block text-yellow-300">Join us today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <a href="#open-positions" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-red-900 bg-yellow-400 hover:bg-yellow-300">
                Get started
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
