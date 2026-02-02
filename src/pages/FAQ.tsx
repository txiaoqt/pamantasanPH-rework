import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqData = [
  {
    category: 'General Questions',
    questions: [
      {
        question: 'What is UniCentral?',
        answer: 'UniCentral is a comprehensive online platform designed to help students in the Philippines discover, compare, and learn about state universities. Our goal is to simplify the college application process by providing all the necessary information in one accessible place.',
      },
      {
        question: 'Is UniCentral free to use?',
        answer: 'Yes, UniCentral is completely free for all users. Our mission is to make university information accessible to every aspiring student.',
      },
      {
        question: 'Which universities are featured on this platform?',
        answer: 'We feature a growing list of State Universities and Colleges (SUCs) in Metro Manila. Our database includes, but is not limited to: Polytechnic University of the Philippines (PUP), Technological University of the Philippines (TUP), Pamantasan ng Lungsod ng Maynila (PLM), Rizal Technological University (RTU), University of the Philippines (UP), Philippine Normal University (PNU), Eulogio "Amang" Rodriguez Institute of Science and Technology (EARIST), Marikina Polytechnic College (MPC), and Philippine State College of Aeronautics (PhilsCA). We are continuously working to add more universities.',
      },
    ],
  },
  {
    category: 'Using the Website',
    questions: [
      {
        question: 'How do I search for universities?',
        answer: 'You can use the "Universities" link in the main navigation to browse a list of all featured institutions. You can also use the search bar to find universities by name.',
      },
      {
        question: 'How does the "Compare" feature work?',
        answer: 'The "Compare" tool allows you to select up to three universities and view their details side-by-side. This includes information on programs, tuition fees, admission requirements, and campus facilities, helping you make an informed decision.',
      },
      {
        question: 'What is the "Saved" page for?',
        answer: 'By creating a free account, you can save universities and programs that you are interested in. The "Saved" page provides a personalized list for you to easily access and review your top choices.',
      },
    ],
  },
  {
    category: 'University Information',
    questions: [
      {
        question: 'Is the information on UniCentral accurate and up-to-date?',
        answer: 'We strive to provide the most accurate and current information possible. Our data is gathered from the official websites of the universities and other reliable sources. However, we always recommend cross-referencing with the university\'s official website for the most recent updates, especially for admission dates and requirements.',
      },
      {
        question: 'Can I apply to universities directly through UniCentral?',
        answer: 'Currently, UniCentral does not support direct applications. We provide all the necessary information and links to the official university application portals to guide you through the process.',
      },
    ],
  },
  {
    category: 'Technical Issues',
    questions: [
      {
        question: 'The website is not loading correctly. What should I do?',
        answer: 'First, try clearing your browser\'s cache and cookies. If the problem persists, please check your internet connection or try accessing the site from a different browser. If you continue to experience issues, please contact us.',
      },
      {
        question: 'I found incorrect information on the website. How can I report it?',
        answer: 'We appreciate your help in keeping our data accurate. Please use the contact information in the footer to send us an email with the details of the incorrect information and a link to the page.',
      },
    ],
  },
];

const FaqItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 dark:border-gray-700 py-4">
      <button
        className="w-full flex justify-between items-center text-left text-lg font-medium text-gray-800 dark:text-gray-200"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{question}</span>
        <ChevronDown
          className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      {isOpen && (
        <div className="mt-4 text-gray-600 dark:text-gray-400">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

export default function FAQ() {
  return (
    <div className="bg-white dark:bg-gray-900 py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <HelpCircle className="mx-auto h-12 w-12 text-red-600" />
          <h1 className="mt-4 text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
            Frequently Asked Questions
          </h1>
          <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
            Find answers to common questions about UniCentral and its features.
          </p>
        </div>

        <div className="space-y-10">
          {faqData.map((category) => (
            <div key={category.category}>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {category.category}
              </h2>
              <div className="space-y-4">
                {category.questions.map((faq) => (
                  <FaqItem key={faq.question} question={faq.question} answer={faq.answer} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
