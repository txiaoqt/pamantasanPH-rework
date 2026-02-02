# UniversityCard Component - Local `AdmissionStatusBadge` Sub-component Overview

This document provides an overview of the `AdmissionStatusBadge` sub-component that is **defined locally within the `UniversityCard.tsx` file**. This component is a small, presentational badge designed to clearly indicate the current admission status of a university (Open, Soon, or Closed) using a color-coded label and dot.

## Functionality
The `AdmissionStatusBadge` component receives an `admissionStatus` prop and, based on its value, dynamically determines the appropriate text label, background color, text color, border color, and a small colored dot for visual emphasis. This ensures consistent and intuitive visual feedback regarding admission timelines.

## Key Features
- **Dynamic Status Display:** Renders a label and a colored dot corresponding to the `admissionStatus` ('open', 'not-yet-open', 'closed').
- **Color-Coded Feedback:** Uses green for 'Open', yellow for 'Soon', and red for 'Closed' admissions, making it easy for users to quickly interpret the status.
- **Styling:** Utilizes Tailwind CSS classes to apply rounded corners, borders, and text styling, ensuring it blends seamlessly with the overall design.
- **Self-Contained Logic:** Contains its own `getStatusConfig` function to map the status string to its visual properties.

## Dependencies
- React (for functional component structure)

## Props (`status`)
The `AdmissionStatusBadge` component accepts a single prop:
- `status`: `'open' | 'not-yet-open' | 'closed'` - A literal string representing the current admission status.

## Usage
This component is used exclusively within the `UniversityCard` component to display the admission status of the university in a standardized and visually distinct manner.

### Example (within `UniversityCard.tsx`):
```jsx
// ... inside UniversityCard component
function AdmissionStatusBadge({ status }: { status: 'open' | 'not-yet-open' | 'closed' }) {
  // ... getStatusConfig function definition ...
  const config = getStatusConfig();

  return (
    <div className={`flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${config.color}`}>
      <div className={`w-2 h-2 rounded-full mr-1 ${config.dot}`}></div>
      {config.label}
    </div>
  );
}
// ...
// In the JSX of UniversityCard:
// <AdmissionStatusBadge status={university.admissionStatus} />
```