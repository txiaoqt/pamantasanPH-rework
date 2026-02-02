# UniversityCard Component - Local `AdmissionStatusBadge` Props

This document describes the properties expected by the **locally defined** `AdmissionStatusBadge` sub-component within `UniversityCard.tsx`. This component is purely presentational and relies on a single prop to determine its display.

## Props

### `status`
- **Type:** `'open' | 'not-yet-open' | 'closed'`
- **Description:** A literal string union that indicates the current admission status of a university. The component uses this value to determine the text label, color, and dot style for the badge.
    - `'open'`: Signifies that admissions are currently open.
    - `'not-yet-open'`: Indicates that admissions will open soon, but are not yet available.
    - `'closed'`: Means that the admission period has ended.
- **Usage:** This is the sole input to the `AdmissionStatusBadge` component, controlling its entire visual output. It is typically passed directly from the `admissionStatus` property of a `University` object.

### Example Usage:
```jsx
import React from 'react';
// Assuming AdmissionStatusBadge is available in scope or imported
// function AdmissionStatusBadge({ status }: { status: 'open' | 'not-yet-open' | 'closed' }) { /* ... */ }

function MyComponent() {
  return (
    <div>
      <p>Current Status: <AdmissionStatusBadge status="open" /></p>
      <p>Future Status: <AdmissionStatusBadge status="not-yet-open" /></p>
      <p>Past Status: <AdmissionStatusBadge status="closed" /></p>
    </div>
  );
}

export default MyComponent;
```