# TermsOfServiceModal Component

## Functionality
The `TermsOfServiceModal` component displays a comprehensive Terms of Service agreement within a modal dialog. It is designed to be presented to users, particularly upon initial login or registration, to ensure they review and explicitly agree to the application's terms before proceeding. It provides options for the user to either agree or disagree, triggering respective callback functions.

## Key Features
- **Modal Overlay:** Appears as a fixed overlay, dimming the background content to focus user attention on the terms.
- **Personalized Welcome:** Greets the user by their full name, pulled from the provided `User` object, enhancing the user experience.
- **Scrollable Content:** The main terms and conditions content is placed within a scrollable area, accommodating lengthy legal texts without overflowing the modal.
- **Clear Call to Action:** Provides distinct "Agree" and "Disagree" buttons, which trigger specific callback functions (`onAgree`, `onDisagree`).
- **Static Content:** The terms of service content itself is static HTML embedded directly within the component, making it suitable for agreements that do not frequently change.
- **Prose Styling:** Uses `prose prose-lg max-w-none` classes (likely from Tailwind Typography) to format the textual content for readability.

## Dependencies
- React (for functional component structure)
- Supabase: `User` type from `@supabase/supabase-js` (used in `TermsOfServiceModalProps`).

## Props (`TermsOfServiceModalProps`)
- `user`: `User` - A Supabase `User` object containing information about the currently logged-in user. It is used to personalize the welcome message at the top of the modal (e.g., `user.user_metadata.full_name`).
- `onAgree`: `() => void` - A callback function that is invoked when the user clicks the "Agree" button. This typically signals acceptance of the terms and allows the parent component to grant access or proceed with the user's journey.
- `onDisagree`: `() => void` - A callback function that is invoked when the user clicks the "Disagree" button. This typically signals rejection of the terms and might lead to actions like logging out the user or restricting access.

## Usage
This modal is typically displayed when a user first logs in or registers, or if the terms of service have been updated and require re-acceptance. The parent component is responsible for managing the modal's visibility and handling the `onAgree` and `onDisagree` actions.

### Example (within a parent component managing authentication and terms acceptance):
```jsx
import React, { useState, useEffect } from 'react';
import TermsOfServiceModal from './components/common/TermsOfServiceModal';
import { supabase } from './lib/supabase'; // Assuming Supabase client is available

function App() {
  const [session, setSession] = useState(null);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false); // This would likely be stored in DB

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      // In a real app, you'd check a database if the user has agreed to terms
      // For this example, we'll just show the modal if session exists and not agreed.
      if (session && !agreedToTerms) {
        setShowTermsModal(true);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session && !agreedToTerms) {
        setShowTermsModal(true);
      }
    });

    return () => subscription.unsubscribe();
  }, [agreedToTerms]);

  const handleAgree = () => {
    // Logic to record user agreement in database
    setAgreedToTerms(true);
    setShowTermsModal(false);
    console.log("User agreed to terms!");
  };

  const handleDisagree = () => {
    // Logic to handle disagreement, e.g., log out user, show error
    alert("You must agree to the Terms of Service to use UniCentral.");
    supabase.auth.signOut(); // Example: force logout
    setShowTermsModal(false);
    console.log("User disagreed to terms!");
  };

  return (
    <div>
      {/* Main application content */}
      {showTermsModal && session && (
        <TermsOfServiceModal
          user={session.user}
          onAgree={handleAgree}
          onDisagree={handleDisagree}
        />
      )}
    </div>
  );
}

export default App;
```