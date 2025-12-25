import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText } from 'lucide-react';

export default function Terms() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-maroon-900 via-maroon-800 to-red-900 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center mb-4">
                <FileText className="h-8 w-8 mr-3" />
                <h1 className="text-3xl md:text-4xl font-bold">Terms of Service</h1>
              </div>
              <p className="text-lg text-maroon-100">
                Please read these terms carefully before using our platform.
              </p>
            </div>
            <Link
              to="/"
              className="flex items-center px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Home
            </Link>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-lg p-8">
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

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Intellectual Property</h2>
              <p className="text-gray-700 mb-4">
                The service and its original content, features, and functionality are owned by UniCentral
                and are protected by copyright, trademark, and other intellectual property laws.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Privacy</h2>
              <p className="text-gray-700 mb-4">
                Your privacy is important to us. Please review our Privacy Policy, which also governs
                your use of the service, to understand our practices.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Termination</h2>
              <p className="text-gray-700 mb-4">
                We may terminate or suspend your account and access to the service immediately,
                without prior notice, for any reason, including breach of these terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Disclaimer</h2>
              <p className="text-gray-700 mb-4">
                The service is provided on an "as is" and "as available" basis. We make no warranties,
                expressed or implied, and hereby disclaim all warranties of any kind.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Limitation of Liability</h2>
              <p className="text-gray-700 mb-4">
                In no event shall UniCentral be liable for any indirect, incidental, special,
                consequential, or punitive damages arising out of or related to your use of the service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Changes to Terms</h2>
              <p className="text-gray-700 mb-4">
                We reserve the right to modify these terms at any time. We will notify users of
                any material changes by posting the new terms on this page.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Governing Law</h2>
              <p className="text-gray-700 mb-4">
                These terms shall be governed by and construed in accordance with the laws of
                the Republic of the Philippines.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Contact Information</h2>
              <p className="text-gray-700 mb-4">
                If you have any questions about these terms, please contact us at:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700">
                  <strong>Email:</strong> legal@unicentral.com<br />
                  <strong>Address:</strong> Metro Manila, Philippines
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
