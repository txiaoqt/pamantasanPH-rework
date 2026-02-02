# FeaturedUniversities Component

## Functionality
The `FeaturedUniversities` component is responsible for fetching and displaying a curated list of "featured" universities on a prominent section of the application, typically the homepage. It presents each university using a specialized `UniversityCard` sub-component (defined locally within this file) that offers details, quick stats, and interactive options like saving, comparing, and viewing full profiles.

## Key Features
- **Curated University Display:** Fetches a predefined set of universities (e.g., based on their IDs) and displays them.
- **Loading State:** Shows a skeleton loading animation while university data is being fetched, improving user experience.
- **Error Handling:** Displays an error message if fetching featured universities fails.
- **"View All" Navigation:** Provides buttons to navigate to the full list of universities (`/universities`).
- **University Card Integration:** Renders each featured university using a highly detailed and interactive `UniversityCard` sub-component.
- **University Comparison Logic:** Integrates `handleCompare` function to manage a list of universities selected for comparison, stored in `localStorage`, and navigates to the `/compare` page.

## Dependencies
- React hooks: `useState`, `useEffect`
- Routing: `Link`, `useNavigate` from `react-router-dom`
- Icons: `Star`, `Users`, `BookOpen`, `MapPin`, `Heart`, `BarChart3`, `ExternalLink` from `lucide-react` (used by the local `UniversityCard`)
- Services: `UniversityService` (for fetching university data)
- Data Models: `University` from `../university/UniversityCard` (interface for university data)
- Utilities: `slugify` from `../../lib/utils` (used by the local `UniversityCard`)
- Custom Hooks: `useSavedUniversities` (used by the local `UniversityCard` to manage saved universities)

## Sub-components
- `UniversityCard`: A **locally defined** functional component within `FeaturedUniversities.tsx` that displays individual university details, admission status, stats, and interactive buttons (Save, Compare, View).

## Usage
This component is typically placed on the homepage or a dashboard to highlight key institutions and encourage users to explore further.

### Example (within a parent component or page):
```jsx
import React from 'react';
import FeaturedUniversities from './components/home/FeaturedUniversities';

function HomePage() {
  return (
    <div>
      {/* Other sections of the homepage */}
      <FeaturedUniversities />
      {/* More homepage content */}
    </div>
  );
}

export default HomePage;
```