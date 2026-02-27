import React from 'react';
import { Link } from 'react-router-dom';

export default function Terms() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-maroon-800 text-white py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3">Terms of Service</h1>
          <p className="text-xs sm:text-sm text-maroon-100 max-w-3xl">
            Please read these terms carefully before using our platform.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="prose prose-lg max-w-none">
            <p className="text-sm text-gray-500 mb-8">Last updated: January 27, 2026</p>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-700 mb-4">
                Welcome to UniCentral. By creating an account and using our platform, you accept and agree to be bound by these Terms of Service and our Privacy Policy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Description of Service</h2>
              <p className="text-gray-700 mb-4">
                UniCentral is a platform designed to simplify the college admission process in the Philippines. Our services include:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Detailed information about state universities, including academic programs, admission requirements, and campus life.</li>
                <li>Tools to compare universities side-by-side.</li>
                <li>A feature to save universities to a personalized list for easy access.</li>
                <li>An interactive map to explore university locations.</li>
                <li>An AI-powered chatbot (UniBot) to answer your questions about universities.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. User Accounts</h2>
              <p className="text-gray-700 mb-4">
                To access features like saving and comparing universities, you must create a user account. By creating an account, you agree to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Provide accurate and complete information, including your full name and email address.</li>
                <li>Maintain the confidentiality of your password and account.</li>
                <li>Be responsible for all activities that occur under your account.</li>
                <li>Notify us immediately of any unauthorized use of your account.</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Content and Information Accuracy</h2>
              <p className="text-gray-700 mb-4">
                The information on UniCentral is based on data from university websites, including PUP, TUP, and PLM. While we strive for accuracy, this information is for general guidance only. University details, such as admission requirements and program availability, can change.
              </p>
              <p className="text-gray-700 mb-4">
                <strong>UniCentral is not an official representative of any university.</strong> We strongly recommend that you verify all critical information directly with the respective university's official website or admissions office.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Privacy and Your Data</h2>
              <p className="text-gray-700 mb-4">
                Your privacy is important to us. Our <Link to="/privacy" className="text-maroon-600 hover:text-maroon-500">Privacy Policy</Link> explains how we collect, use, and protect your personal information. By using UniCentral, you agree to the collection and use of your information in accordance with our Privacy Policy.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Termination</h2>
              <p className="text-gray-700 mb-4">
                We reserve the right to terminate or suspend your account at our discretion, without prior notice, if you violate these Terms of Service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Changes to Terms</h2>
              <p className="text-gray-700 mb-4">
                We may modify these terms at any time. We will do our best to notify you of any significant changes. Your continued use of the platform after such changes constitutes your acceptance of the new terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Contact Us</h2>
              <p className="text-gray-700 mb-4">
                If you have any questions about these Terms of Service, please contact us at:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700">
                  <strong>Email:</strong> legal@unicentral.com
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
