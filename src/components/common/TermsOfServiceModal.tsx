import React from 'react';
import { User } from '@supabase/supabase-js';

interface TermsOfServiceModalProps {
  user: User;
  onAgree: () => void;
  onDisagree: () => void;
}

export default function TermsOfServiceModal({ user, onAgree, onDisagree }: TermsOfServiceModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        <div className="p-6 border-b">
          <h1 className="text-2xl font-bold text-gray-900">Welcome to UniCentral, {user.user_metadata.full_name}!</h1>
          <p className="mt-2 text-sm text-gray-600">Before you proceed, please review and accept our Terms of Service.</p>
        </div>
        <div className="p-6 overflow-y-auto">
          <div className="prose prose-lg max-w-none">
            <p className="text-sm text-gray-500 mb-8">Last updated: December 26, 2025</p>
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-700 mb-4">
                By accessing and using UniCentral, you accept and agree to be bound by the terms
                and provision of this agreement. If you do not agree to abide by the above,
                please do not use this service.
              </p>
            </section>
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Description of Service</h2>
              <p className="text-gray-700 mb-4">
                UniCentral is a platform that provides information about universities, programs,
                and admission processes in the Philippines. We offer:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>University search and comparison tools</li>
                <li>Program information and academic data</li>
                <li>Admission requirement details</li>
                <li>User accounts for saving preferences</li>
                <li>Educational resources and guides</li>
              </ul>
            </section>
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. User Accounts</h2>
              <p className="text-gray-700 mb-4">
                To access certain features, you may need to create an account. You are responsible for:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Maintaining the confidentiality of your account credentials</li>
                <li>All activities that occur under your account</li>
                <li>Providing accurate and up-to-date information</li>
                <li>Notifying us immediately of any unauthorized use</li>
              </ul>
            </section>
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Acceptable Use</h2>
              <p className="text-gray-700 mb-4">You agree not to use the service to:</p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Violate any applicable laws or regulations</li>
                <li>Infringe on intellectual property rights</li>
                <li>Transmit harmful or malicious code</li>
                <li>Harass, abuse, or harm others</li>
                <li>Access systems without authorization</li>
                <li>Interfere with the platform's operation</li>
              </ul>
            </section>
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Content and Information</h2>
              <p className="text-gray-700 mb-4">
                While we strive to provide accurate and up-to-date information, we cannot guarantee
                the completeness or accuracy of all content. University information, admission requirements,
                and deadlines may change. Users should verify information directly with universities.
              </p>
            </section>
          </div>
        </div>
        <div className="p-6 border-t flex justify-end space-x-4">
          <button onClick={onDisagree} className="px-6 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            Disagree
          </button>
          <button onClick={onAgree} className="px-6 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-maroon-800 hover:bg-maroon-700">
            Agree
          </button>
        </div>
      </div>
    </div>
  );
}
