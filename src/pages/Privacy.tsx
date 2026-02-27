import React from 'react';

export default function Privacy() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-maroon-800 text-white py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3">Privacy Policy</h1>
          <p className="text-xs sm:text-sm text-maroon-100 max-w-3xl">
            Your privacy is important to us. Here’s how we collect, use, and protect your data.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="prose prose-lg max-w-none">
            <p className="text-sm text-gray-500 mb-8">Last updated: January 27, 2026</p>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Information We Collect</h2>
              <p className="text-gray-700 mb-4">
                We collect information to provide and improve our services. The types of information we collect depend on how you use our platform.
              </p>
              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">a. Information You Provide to Us</h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li><strong>Account Information:</strong> When you sign up for a UniCentral account, we collect your full name, email address, and a securely hashed password.</li>
                <li><strong>Profile Information:</strong> You may choose to provide additional information in your profile, such as your location, a profile picture (avatar), and a personal website.</li>
                <li><strong>Social Login Information:</strong> If you sign up using a social media account (like Google or GitHub), we receive your name, email address, and avatar URL from that service.</li>
              </ul>
              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">b. Information We Collect Automatically</h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li><strong>Usage Information:</strong> We collect information about your interactions with our platform, such as the universities you save to your list and the universities you add to your comparison list.</li>
                <li><strong>Device and Log Information:</strong> Like most websites, we may collect standard log information, including your IP address, browser type, and access times. This is used for analytics and security purposes.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How We Use Your Information</h2>
              <p className="text-gray-700 mb-4">
                We use your information for the following purposes:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>To create and maintain your UniCentral account.</li>
                <li>To provide the core features of our service, such as saving and comparing universities.</li>
                <li>To personalize your experience, for example, by showing your name in the header.</li>
                <li>To communicate with you, including sending important service-related notifications.</li>
                <li>To understand how our users interact with the platform so we can improve it.</li>
                <li>To ensure the security and integrity of our platform.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Data Storage and Sharing</h2>
              <p className="text-gray-700 mb-4">
                Your data is securely stored and managed by our backend provider, Supabase. We do not sell, trade, or rent your personal information to third parties.
              </p>
              <p className="text-gray-700 mb-4">
                We may share your information only in the following limited circumstances:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>With your explicit consent.</li>
                <li>To comply with a legal obligation or a valid governmental request.</li>
                <li>To protect the security or integrity of our service.</li>
                <li>With third-party service providers who help us operate our platform (e.g., Supabase for database and authentication), who are bound by strict confidentiality agreements.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Your Rights and Choices</h2>
              <p className="text-gray-700 mb-4">You have control over your personal information. You have the right to:</p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Access and update your profile information (full name and location) at any time through your Profile page.</li>
                <li>Change your password.</li>
                <li>Request the deletion of your account and all associated data by contacting us.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Contact Us</h2>
              <p className="text-gray-700 mb-4">
                If you have any questions or concerns about this Privacy Policy, please contact us at:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700">
                  <strong>Email:</strong> privacy@unicentral.com<br />
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
