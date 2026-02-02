# UniversityCard Component (Main)

## Functionality
The `UniversityCard` component is a central, highly flexible, and interactive display unit designed to showcase detailed information about a single university. It supports two primary display modes: 'grid' and 'list', adapting its layout accordingly. This component is used across various parts of the application where university information needs to be presented concisely yet comprehensively, offering interactive features such as saving, comparing, and navigating to detailed university profiles.

## Key Features
- **Dual View Modes:** Renders university details in either a compact 'grid' layout (ideal for overviews) or an expanded 'list' layout (for more details in a linear display).
- **Comprehensive University Details:** Displays a wide array of information including name, location, establishment year, type, student count, program count, description, subjects, image, admission status, and admission deadline.
- **Dynamic Admission Status:** Features an `AdmissionStatusBadge` sub-component to visually represent the university's admission status (Open, Soon, Closed) with appropriate color coding.
- **Interactive Actions:**
    - **Save/Unsave University:** Users can save or remove a university from their personalized saved list, powered by the `useSavedUniversities` custom hook.
    - **Compare University:** Adds the university to a comparison list (managed in `localStorage`) and redirects the user to the `/compare` page. This logic is self-contained within the component.
    - **View Details:** Provides a direct link to the university's dedicated detail page, using its acronym or slugified name for the URL.
- **Responsive Design:** Adjusts its layout and content visibility based on screen size and `viewMode`. Includes an "See More/Less" toggle for descriptions on smaller screens.
- **Visual Enhancements:** Incorporates a hover effect on the university image and various icons from `lucide-react` to enhance visual appeal and user experience.

## Dependencies
- React hooks: `useState`
- Routing: `Link`, `useNavigate` from `react-router-dom`
- Icons: `MapPin`, `Users`, `BookOpen`, `Heart`, `BarChart3`, `ExternalLink` from `lucide-react`
- Utilities: `slugify` from `../../lib/utils`
- Custom Hooks: `useSavedUniversities` from `../../hooks/useSavedUniversities`
- Data Models: `University` interface (defined in this file), `AcademicProgram` (imported but not directly used in rendering)

## Props (`UniversityCardProps`)
The component accepts props that combine the `University` interface with a `viewMode` property. Refer to `UniversityCard_Main_Props.md` for full details.

## Sub-components
- `AdmissionStatusBadge`: A locally defined functional component used to display the admission status with color-coded labels and dots.

## Usage
The `UniversityCard` is a highly versatile component intended for use in university listing pages, search results, saved university lists, and any other part of the application that requires displaying individual university information.

### Example (within a university listing page):
```jsx
import React from 'react';
import UniversityCard from './UniversityCard'; // Assuming direct import
// ... other imports

function UniversitiesList({ universitiesData }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {universitiesData.map((university) => (
        <UniversityCard key={university.id} {...university} viewMode="grid" />
      ))}
    </div>
  );
}

export default UniversitiesList;
```