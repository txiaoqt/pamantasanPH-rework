# Footer Component

## Functionality
The `Footer` component serves as the persistent footer section at the bottom of the application. It provides brand information, contact details, social media links, and essential navigational links such as privacy policy, terms of service, and sitemap. It is purely a presentational component and does not manage any internal state or lifecycle effects.

## Key Features
- **Brand Information:** Displays the application's logo, name ("UniCentral"), and a descriptive tagline.
- **Mission Statement:** A brief paragraph outlining the application's purpose and value proposition.
- **Social Media Links:** Provides links to UniCentral's social media profiles (Facebook, Twitter, Instagram, YouTube) using `lucide-react` icons.
- **Contact Information:** Lists contact details including email, phone number, and physical address.
- **Legal & Utility Links:** Includes navigation links to important pages like Privacy Policy, Terms of Service, and Sitemap using `react-router-dom`'s `Link` component.
- **Copyright Notice:** Displays the current year and copyright holder information.
- **Responsive Design:** Adapts its layout for optimal display on various screen sizes.

## Dependencies
- React (for functional component structure)
- Routing: `Link` from `react-router-dom`
- Icons: `GraduationCap`, `Facebook`, `Twitter`, `Instagram`, `Youtube`, `Mail`, `Phone`, `MapPin` from `lucide-react`

## Usage
The `Footer` component is intended to be rendered once at the bottom of the application's main layout, providing a consistent user experience across all pages.

### Example (within `App.tsx` or a similar layout component):
```jsx
import React from 'react';
import Header from './components/common/Header'; // Assuming Header is also part of the layout
import Footer from './components/common/Footer';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Main content of the application */}
      </main>
      <Footer />
    </div>
  );
}

export default App;
```