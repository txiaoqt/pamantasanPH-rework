# FeaturedUniversities - Comparison Logic (`handleCompare`)

This document describes the `handleCompare` function within the `FeaturedUniversities` component. This function is responsible for managing the user's selection of universities for comparison and initiating the navigation to the comparison page.

## `handleCompare` Function

```typescript
const handleCompare = (university: University) => {
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
- **Parameters:** `university`: `University` - The `University` object of the university to be added to or removed from the comparison list.
- **Functionality:**
    1.  **Retrieve Comparison List:** It first retrieves the current list of universities marked for comparison from `localStorage`, parsing it from a JSON string to a JavaScript array. If no list exists, it initializes an empty array.
    2.  **Prepare University Data:** Creates a simplified `universityData` object containing only essential properties (`id`, `name`, `imageUrl`, `type`, `location`, `programs`) relevant for the comparison page. This prevents storing unnecessary large objects in `localStorage`.
    3.  **Check Existing:** Determines if the `university` is already present in the `compareList`.
    4.  **Add/Remove Logic:**
        - If the university is found (`existingIndex >= 0`), it's removed from the `compareList`.
        - If the university is not found:
            - It first checks if the `compareList` already contains 3 universities. If so, it shows an `alert` to the user and stops the function execution, enforcing the comparison limit.
            - Otherwise, the `universityData` is added to the `compareList`.
    5.  **Update `localStorage`:** The modified `compareList` is then serialized back into a JSON string and saved to `localStorage` under the key `'compareUniversities'`.
    6.  **Navigate:** Finally, it navigates the user to the `/compare` route, where they can view the selected universities side-by-side.
- **Purpose:** To provide a robust mechanism for users to dynamically select up to three universities for comparison, persisting their choices across sessions (via `localStorage`) and directing them to the comparison tool.
- **Triggered by:** The "Compare" button within each `UniversityCard` sub-component.
