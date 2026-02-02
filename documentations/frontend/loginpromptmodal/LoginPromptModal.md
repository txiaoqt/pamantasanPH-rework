# LoginPromptModal Component

## Functionality
The `LoginPromptModal` component is a reusable modal dialog designed to inform users that they need to be logged in to access certain content or features. It provides clear options to either cancel (close the modal) or proceed to the login page.

## Key Features
- **Modal Overlay:** Displays as a fixed overlay, dimming the background content to ensure user focus.
- **Clear Call to Action:** Prominently presents a message explaining the need for login.
- **Navigation to Login:** Provides a button that navigates the user to the dedicated login page.
- **Cancel Option:** Allows the user to close the modal without proceeding to login.
- **Iconography:** Uses a `LogIn` icon from `lucide-react` to visually reinforce its purpose.
- **Responsive Design:** Adapts to different screen sizes, centering the modal content.

## Dependencies
- React (for functional component structure)
- Routing: `useNavigate` from `react-router-dom`
- Icons: `LogIn`, `X` from `lucide-react`

## Props (`LoginPromptModalProps`)
- `onClose`: `() => void` - A function to call when the modal should be closed (e.g., when the user clicks 'Cancel' or the close button).

## Usage
This modal can be triggered by any component or page that requires user authentication to access its content. When the user attempts to access protected content, this modal can be displayed to guide them towards logging in.

### Example (within a parent component that manages its visibility):
```jsx
import React, { useState } from 'react';
import LoginPromptModal from './components/common/LoginPromptModal';

function ProtectedContent() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Assume this comes from auth context

  const handleAccessProtectedFeature = () => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
    } else {
      // Proceed to protected feature
      alert("Accessing protected feature!");
    }
  };

  return (
    <div>
      <button onClick={handleAccessProtectedFeature}>Access Restricted Area</button>
      {showLoginModal && (
        <LoginPromptModal onClose={() => setShowLoginModal(false)} />
      )}
    </div>
  );
}

export default ProtectedContent;
```