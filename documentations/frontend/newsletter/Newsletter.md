# Newsletter Component

## Functionality
The `Newsletter` component provides a dedicated section for users to subscribe to email updates from UniCentral. It features a visually appealing call-to-action, an email input field, and a submit button, all designed to encourage user engagement and keep them informed about new university information and application updates.

## Key Features
- **Prominent Call to Action:** A clear heading and descriptive text invite users to subscribe.
- **Email Input Field:** Allows users to easily enter their email address.
- **Submission Handler:** Captures the entered email and (currently) logs it to the console. In a real-world scenario, this would integrate with a backend service for actual subscription management.
- **Thematic Styling:** Uses a gradient background and vibrant colors (`bg-gradient-to-br from-red-900 via-red-800 to-amber-900`) to stand out.
- **Informational Points:** Highlights the benefits of subscribing with three key points: "New Universities", "Admission Alerts", and "Application Alerts".
- **Responsive Layout:** Adjusts the layout of the form and informational points for optimal viewing on different screen sizes.
- **Iconography:** Incorporates `Mail` and `Send` icons from `lucide-react` to enhance visual appeal and user understanding.

## Dependencies
- React hooks: `useState` (for managing the email input).
- Icons: `Mail`, `Send` from `lucide-react`.

## Props
The `Newsletter` component is a self-contained component and does not accept any external props.

## Usage
This component is typically placed in a prominent section of a landing page, a footer, or a dedicated "Stay Updated" section, aiming to capture user interest and grow an email subscriber base.

### Example (within any parent component or page):
```jsx
import React from 'react';
import Newsletter from './components/common/Newsletter';

function LandingPage() {
  return (
    <div>
      {/* Other page content */}
      <Newsletter />
      {/* More page content or footer */}
    </div>
  );
}

export default LandingPage;
```