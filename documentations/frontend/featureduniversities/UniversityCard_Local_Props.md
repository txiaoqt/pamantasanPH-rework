# FeaturedUniversities - Local `UniversityCard` Props

This document describes the specific interface for the props expected by the **locally defined** `UniversityCard` sub-component within `FeaturedUniversities.tsx`. This interface is derived from a base `UniversityCardProps` (which appears to be a broader interface used elsewhere) but is specifically tailored for the `FeaturedUniversities` context.

## Interface Definition

The `UniversityCard` sub-component uses props defined as:
```typescript
Omit<UniversityCardProps, 'tuitionRange' | 'accreditation'> & { onCompare?: (university: University) => void }
```
This means it inherits most properties from a global `UniversityCardProps` interface (likely `../university/UniversityCard` in other parts of the app, though defined as a local interface for clarity within `FeaturedUniversities.tsx`), but specifically omits `tuitionRange` and `accreditation`, and adds an optional `onCompare` function.

For clarity, the effective properties are:

### `id`
- **Type:** `number`
- **Description:** The unique identifier for the university.

### `name`
- **Type:** `string`
- **Description:** The full name of the university.

### `location`
- **Type:** `string`
- **Description:** The specific location (e.g., city, district) of the university.

### `province`
- **Type:** `string`
- **Description:** The province where the university is located. (Although omitted in the `onCompare` university object, it's present in the underlying `University` type).

### `established`
- **Type:** `string`
- **Description:** The year the university was established.

### `type`
- **Type:** `string` (`'Public'` or `'Private'`)
- **Description:** The type of the university (e.g., Public, Private).

### `students`
- **Type:** `string`
- **Description:** The number of students attending the university (formatted as a string, e.g., "65,000+").

### `programs`
- **Type:** `number`
- **Description:** The total count of academic programs offered by the university.

### `description`
- **Type:** `string`
- **Description:** A brief descriptive text about the university.

### `subjects`
- **Type:** `string[]`
- **Description:** An array of key subject areas or program categories offered by the university.

### `imageUrl`
- **Type:** `string`
- **Description:** The URL of the image to display for the university card.

### `admissionStatus`
- **Type:** `'open' | 'not-yet-open' | 'closed'`
- **Description:** The current status of university admissions.

### `admissionDeadline`
- **Type:** `string`
- **Description:** The date or period for admission application deadlines.

### `onCompare?`
- **Type:** `(university: University) => void` (Optional)
- **Description:** A callback function that is triggered when the "Compare" button on the card is clicked. It receives a `University` object (with some properties potentially omitted or simplified) as an argument, allowing the parent component (`FeaturedUniversities`) to handle the comparison logic.
- **Usage:** This prop is used to communicate the user's intent to compare a specific university back to the `FeaturedUniversities` component.
