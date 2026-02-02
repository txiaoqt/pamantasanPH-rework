# UniversityCard Component - Local `AdmissionStatusBadge` Utility Function (`getStatusConfig`)

This document describes the `getStatusConfig` utility function utilized within the **locally defined** `AdmissionStatusBadge` sub-component in `UniversityCard.tsx`. This function dynamically determines the styling and text for the admission status badge based on the badge's `status` prop.

## `getStatusConfig` Function

```typescript
function AdmissionStatusBadge({ status }: { status: 'open' | 'not-yet-open' | 'closed' }) {
  const getStatusConfig = () => {
    switch (status) {
      case 'open':
        return {
          label: 'Open',
          color: 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-200 dark:border-green-700',
          dot: 'bg-green-500'
        };
      case 'not-yet-open':
        return {
          label: 'Soon',
          color: 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900 dark:text-yellow-200 dark:border-yellow-700',
          dot: 'bg-yellow-500'
        };
      case 'closed':
        return {
          label: 'Closed',
          color: 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900 dark:text-red-200 dark:border-red-700',
          dot: 'bg-red-500'
        };
    }
  };

  const config = getStatusConfig();
  // ... rest of the component's JSX
}
```
- **Parameters:** None (it implicitly uses the `status` prop passed to the `AdmissionStatusBadge` component).
- **Return Type:** An object with three properties:
    - `label`: `string` - The text to display within the badge (e.g., "Open", "Soon", "Closed").
    - `color`: `string` - A string of Tailwind CSS classes to apply for the background, text, and border of the badge container.
    - `dot`: `string` - A string of Tailwind CSS classes to apply for the background color of the small circular dot within the badge.
- **Functionality:**
    - Uses a `switch` statement to evaluate the `status` prop (`'open'`, `'not-yet-open'`, or `'closed'`).
    - For each status, it returns a predefined configuration object containing the appropriate label and Tailwind CSS classes for visual styling.
- **Purpose:** To centralize the logic for determining the visual representation of the admission status. This ensures consistency in styling and messaging across all instances of the `AdmissionStatusBadge` and simplifies updates to the status presentation.
- **Usage:** The returned `config` object is then deconstructed and its properties are applied directly to the JSX elements that form the `AdmissionStatusBadge`.
