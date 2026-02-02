# FeaturedUniversities - Local `UniversityCard` Sub-component Overview

This document provides an overview of the `UniversityCard` sub-component that is **defined locally within the `FeaturedUniversities.tsx` file**, distinct from any globally imported `UniversityCard`. This component is designed to render individual university details in a card format within the featured universities section, offering interactive elements for user engagement.

## Functionality
The local `UniversityCard` component is a rich, interactive display for a single university. It presents key information such as the university's name, location, establishment year, type, student count, number of programs, description, subjects offered, image, admission status, and deadline. It also includes action buttons for saving a university, adding it to a comparison list, and navigating to its detailed profile page.

## Key Features
- **Comprehensive Display:** Shows essential university details at a glance.
- **Image with Hover Effect:** Features an image that scales on hover, providing a dynamic visual.
- **Dynamic Status Badges:** Displays the university's type (Public/Private) and admission status (Open/Soon/Closed) with distinct colors and labels.
- **Key Statistics:** Highlights student count and number of programs.
- **Expandable Description:** On smaller screens, the description and subject tags can be expanded or collapsed.
- **Interactive Action Buttons:**
    - **Save/Unsave:** Allows users to save or unsave a university to their personalized list, leveraging the `useSavedUniversities` custom hook.
    - **Compare:** Adds the university to a comparison list (managed by the parent `FeaturedUniversities` component via `onCompare` prop).
    - **View:** Navigates to the full detail page of the university.
- **Styling:** Utilizes Tailwind CSS for a modern and responsive design, including hover effects and consistent branding colors.

## Dependencies
- React hooks: `useState`
- Routing: `Link` from `react-router-dom`
- Icons: `Star`, `Users`, `BookOpen`, `MapPin`, `Heart`, `BarChart3`, `ExternalLink` from `lucide-react`
- Utilities: `slugify` from `../../lib/utils`
- Custom Hooks: `useSavedUniversities` from `../../hooks/useSavedUniversities`

## Props
The `UniversityCard` component accepts a set of properties based on the `UniversityCardProps` interface (defined internally), with some specific fields omitted and an `onCompare` callback added. Refer to `UniversityCard_Local_Props.md` for full details.

## Usage
This component is instantiated by the `FeaturedUniversities` parent component for each university it needs to display. It is not intended for standalone use outside of this context or as a generic university card throughout the application (as a separate, globally imported `UniversityCard` might exist).

### Example (within `FeaturedUniversities.tsx`):
```jsx
// ... inside FeaturedUniversities component
// ... (definition of the local UniversityCard function)

// In the JSX of FeaturedUniversities:
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {featuredUniversities.map((university) => (
        <UniversityCard key={university.id} {...university} onCompare={handleCompare} />
    ))}
</div>
```