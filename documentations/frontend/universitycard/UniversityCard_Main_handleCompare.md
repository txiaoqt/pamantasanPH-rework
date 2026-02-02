# UniversityCard Component (Main) - Comparison Logic (`handleCompare`)

This document describes the `handleCompare` function within the main `UniversityCard` component. This function is responsible for managing the user's selection of universities for comparison and initiating the navigation to the comparison page. This logic is self-contained within the `UniversityCard` and is identical to the `handleCompare` function found in `FeaturedUniversities.tsx`.

## `handleCompare` Function

```typescript
const handleCompare = () => {
  const compareList = JSON.parse(localStorage.getItem('compareUniversities') || '[]');
  const universityData = {
    id: university.id,
    name: university.name,
    imageUrl: university.imageUrl,
    type: university.type,
    location: university.location,
    programs: university.programs
  };

  // Check if university is already in compare list
  const existingIndex = compareList.findIndex((item: any) => item.id === university.id);

  if (existingIndex >= 0) {
    // Remove from compare list if already present
    compareList.splice(existingIndex, 1);
  } else {
    // Add to compare list (max 3 universities)
    if (compareList.length >= 3) {
      alert('You can compare up to 3 universities at a time. Please remove one first.');
      return; // Stop function execution
    }
    compareList.push(universityData); // Add new university
  }

  localStorage.setItem('compareUniversities', JSON.stringify(compareList)); // Update localStorage

  // Navigate to compare page
  navigate('/compare');
};
```
- **Parameters:** None (it implicitly uses the `university` prop of the `UniversityCard` component and the `navigate` function from `useNavigate`).
- **Functionality:**
    1.  **Retrieve Comparison List:** It first retrieves the current list of universities selected for comparison from `localStorage`, parsing it from a JSON string to a JavaScript array. If no list exists (first time accessing comparison), it initializes an empty array.
    2.  **Prepare University Data:** Creates a simplified `universityData` object containing only essential properties (`id`, `name`, `imageUrl`, `type`, `location`, `programs`) relevant for display on the comparison page. This minimizes the data stored in `localStorage`.
    3.  **Check Existing:** Determines if the `university` (passed as a prop to the `UniversityCard`) is already present in the `compareList` by checking its `id`.
    4.  **Add/Remove Logic:**
        - If the university is found (`existingIndex >= 0`), it's removed from the `compareList` using `splice`.
        - If the university is not found:
            - It first checks if the `compareList` already contains 3 universities. If the limit is reached, it displays a native `alert` to the user and halts the function's execution.
            - Otherwise, the `universityData` for the current university is added to the `compareList`.
    5.  **Update `localStorage`:** The updated `compareList` (whether an item was added or removed) is then serialized back into a JSON string and saved back to `localStorage` under the key `'compareUniversities'`.
    6.  **Navigate:** Finally, it calls `navigate('/compare')` to redirect the user to the `/compare` page, where they can view the side-by-side comparison of their chosen universities.
- **Purpose:** To provide users with an interactive way to select and manage universities for comparison. This function ensures that the comparison list is updated correctly and the user is directed to the appropriate view.
- **Triggered by:** Clicking the "Compare" button within the `UniversityCard` component.
