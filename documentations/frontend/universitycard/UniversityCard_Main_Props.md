# UniversityCard Component (Main) - Props (`UniversityCardProps`)

This document describes the `UniversityCardProps` interface, which defines the expected properties for the main `UniversityCard` React component. This interface extends the comprehensive `University` interface and adds a `viewMode` property to control the layout.

## Interface Definition

```typescript
export interface UniversityCardProps extends University {
  viewMode: 'grid' | 'list';
  admissionStatus: 'open' | 'not-yet-open' | 'closed'; // Redefined for clarity, already in University
}
```
The `UniversityCardProps` essentially includes all properties from the `University` interface (see `University.md` for full details) plus the `viewMode`. The `admissionStatus` is explicitly redefined here, though it's already part of the `University` interface.

## Specific Properties for `UniversityCardProps`

### `viewMode`
- **Type:** `'grid' | 'list'`
- **Description:** A literal string union that dictates the layout presentation of the university card.
    - `'grid'`: Renders the card in a more compact, grid-friendly format, typically used in overview listings.
    - `'list'`: Renders the card in a more extended, list-friendly format, potentially showing more details or a different arrangement.
- **Usage:** This prop is crucial for adapting the card's appearance to different contexts within the application (e.g., a grid of universities on the homepage vs. a list on a search results page).

### `admissionStatus`
- **Type:** `'open' | 'not-yet-open' | 'closed'`
- **Description:** (Redefined here for emphasis, as it's inherited from `University`) The current status of admission applications for the university. This property drives the styling and text of the `AdmissionStatusBadge` sub-component.
- **Usage:** Used by the `AdmissionStatusBadge` to dynamically display the appropriate label and color for the admission status.

## Inherited Properties from `University` Interface
All other properties of the `University` interface (e.g., `id`, `name`, `location`, `students`, `programs`, `imageUrl`, `description`, etc.) are also expected as props for the `UniversityCard` component. Please refer to `University.md` for a detailed description of these inherited properties.

## Usage
When instantiating the `UniversityCard` component, ensure all required `University` properties are passed along with the desired `viewMode`.

### Example:
```jsx
import React from 'react';
import UniversityCard from './UniversityCard';
import { University } from './UniversityCard'; // Assuming University interface is exported from here

const myUniversity: University = {
  id: 1,
  name: "Polytechnic University of the Philippines",
  location: "Sta. Mesa, Manila",
  province: "Metro Manila",
  established: "1904",
  type: "State",
  students: "65,000+",
  programs: 125,
  description: "The largest state university in the Philippines...",
  subjects: ["Engineering", "Business", "IT"],
  imageUrl: "pup.jpg",
  accreditation: ["AACCUP"],
  admissionStatus: "open",
  admissionDeadline: "March 31"
};

function App() {
  return (
    <div>
      {/* Grid View */}
      <UniversityCard {...myUniversity} viewMode="grid" />

      {/* List View */}
      <UniversityCard {...myUniversity} viewMode="list" />
    </div>
  );
}

export default App;
```