# FeaturedUniversities - Local `UniversityCard` Utility Function (`getStatusConfig`)

This document describes the `getStatusConfig` utility function utilized within the **locally defined** `UniversityCard` sub-component in `FeaturedUniversities.tsx`. This function dynamically determines the styling and text for the admission status badge based on the university's `admissionStatus` prop.

## `getStatusConfig` Function

```typescript
const getStatusConfig = () => {
  switch (admissionStatus) {
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
```
- **Parameters:** None (it implicitly uses the `admissionStatus` prop of the `UniversityCard` component).
- **Return Type:** An object with `label: string`, `color: string`, and `dot: string`.
- **Functionality:**
    - Uses a `switch` statement to evaluate the `admissionStatus` of the university.
    - Based on the status:
        - `'open'`: Returns a configuration for an "Open" label with green-themed styling.
        - `'not-yet-open'`: Returns a configuration for a "Soon" label with yellow-themed styling.
        - `'closed'`: Returns a configuration for a "Closed" label with red-themed styling.
- **Purpose:** To provide a consistent and visually intuitive way to display the admission status of each university. By centralizing this logic, it ensures that all `UniversityCard` instances present admission status information uniformly and correctly based on their data.
- **Usage:** The returned configuration object is used directly in the JSX of the `UniversityCard` to apply dynamic classes to the admission status badge.
    ```jsx
    <div className={`flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${statusConfig.color}`}>
        <div className={`w-2 h-2 rounded-full mr-1 ${statusConfig.dot}`}></div>
        {statusConfig.label}
    </div>
    ```
