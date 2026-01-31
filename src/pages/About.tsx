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
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300">
      <div className="h-64 aspect-w-16 aspect-h-9 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-50 mb-1">{name}</h3>
        <p className="text-maroon-600 dark:text-maroon-400 font-medium mb-3">{role}</p>
        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{description}</p>
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
      <div className="inline-flex items-center justify-center w-16 h-16 bg-maroon-100 dark:bg-maroon-900 rounded-full mb-4 group-hover:bg-maroon-200 dark:group-hover:bg-maroon-800 transition-colors">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-gray-50 mb-3">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{description}</p>
    </div>
  );
}

export default function About() {
  const teamMembers = [
    {
      name: 'The FullStack VibeCoder',
      role: 'Full stack Vibecoder',
      image: memeImage,
      description: 'The solo developer behind UniCentral, passionately creating a one-stop portal for university information. Bringing the vision to life with code and creativity.'
    }
  ];

  const values = [
    {
      icon: <Target className="h-8 w-8 text-maroon-600 dark:text-maroon-400" />,
      title: 'Accessibility',
      description: 'Making quality education information accessible to every Filipino student, regardless of background or location.'
    },
    {
      icon: <Shield className="h-8 w-8 text-maroon-600 dark:text-maroon-400" />,
      title: 'Transparency',
      description: 'Providing honest, unbiased information about universities to help students make informed decisions.'
    },
    {
      icon: <Heart className="h-8 w-8 text-maroon-600 dark:text-maroon-400" />,
      title: 'Student-First',
      description: 'Every feature and decision is made with the student\'s best interests and success in mind.'
    },
    {
      icon: <Globe className="h-8 w-8 text-maroon-600 dark:text-maroon-400" />,
      title: 'Innovation',
      description: 'Continuously improving our platform with the latest technology to serve students better.'
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header */}
      <div className="bg-maroon-800 dark:bg-maroon-700 text-white py-6 sm:py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 text-center">About UniCentral</h1>
          <p className="text-xs sm:text-sm text-maroon-100 dark:text-gray-400 max-w-3xl mx-auto text-center">
            Your one-stop portal for state university application information.
          </p>
        </div>
      </div>


      <section className="py-10 sm:py-12 md:py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-4">Our Core Values</h2>
            <p className="text-base text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Our commitment to providing the best possible support for your academic journey.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-6 md:gap-x-8 md:gap-y-8">
            {values.map((value, index) => (
              <ValueCard key={index} {...value} />
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-10 sm:py-12 md:py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-4">Meet the Visionary Behind UniCentral</h2>
            <p className="text-base text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Meet the visionary behind UniCentral's development and mission.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <TeamMember key={index} {...member} />
            ))}
          </div>
        </div>
      </section>

      {/* Story Section - Updated Content */}
      <section className="py-10 sm:py-12 md:py-16 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-4">Our Journey</h2>
            <p className="text-base text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              From identifying a common problem to developing an innovative solution.
            </p>
          </div>

          <div className="prose mx-auto text-gray-700 dark:text-gray-400 space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-50">The Challenge</h3>
            <p>
              Applying to universities requires careful preparation and submission of numerous documents. The research process is time-consuming for Grade 12 students, especially those applying to multiple state universities. Students commonly rely on university websites and other information sources, but each website presents information differently. This requires applicants to navigate from one website to another, tracking requirements, schedules, deadlines, course offerings, and university details. This lack of uniformity increases cognitive load, resulting in stress, inefficiency, and a higher risk of overlooking important application information, particularly with overlapping application periods among state universities in Metro Manila.
            </p>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-50">The UniCentral Solution</h3>
            <p>
              UniCentral is a one-stop web-based portal designed to consolidate and streamline application information into a single platform. It provides centralized access to essential application details, including admission requirements, application schedules and deadlines, available academic programs, entrance examination information, and general university profiles such as location and areas of specialization.
            </p>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-50">Our Impact</h3>
            <p>
              By centralizing these resources, UniCentral aims to enhance your research process, enabling you to efficiently access, understand, and compare application information across multiple universities. We address existing gaps in current practices, particularly the lack of a centralized platform and the fragmented, time-consuming nature of navigating multiple information sources. This means less stress, more efficiency, and a reduced risk of missing crucial information.
            </p>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-50">Important Disclaimer</h3>
            <p>
              The information on UniCentral is based on data from university websites. While we strive for accuracy, this information is for general guidance only. University details, such as admission requirements and program availability, can change. UniCentral is not an official representative of any university. We strongly recommend that you verify all critical information directly with the respective university's official website or admissions office. Additionally, UniCentral focuses on the presentation and organization of application information only. It does not support online application submission, document uploading, admission processing, or integration with official university enrollment systems.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
