# HeroSection - Event Handler Functions

This document outlines the event handler functions defined within the `HeroSection` component, which respond to user interactions such as button clicks, input changes, and suggestion selections.

## Event Handlers

### `handleSearch`
```typescript
const handleSearch = () => {
  const params = new URLSearchParams();
  if (searchQuery.trim()) params.set('search', searchQuery.trim());
  if (location.trim()) params.set('location', location.trim());

  navigate(`/universities?${params.toString()}`);
};
```
- **Functionality:**
    - Creates a new `URLSearchParams` object.
    - If `searchQuery` has a trimmed value, it adds it as a 'search' parameter.
    - If `location` has a trimmed value, it adds it as a 'location' parameter.
    - Navigates the user to the `/universities` route, appending the constructed query parameters.
- **Purpose:** To initiate a search for universities based on the current `searchQuery` and `location` input fields, directing the user to the universities listing page with the applied filters.
- **Triggered by:** Clicking the "Search Universities" button.

### `handleBrowseAll`
```typescript
const handleBrowseAll = () => {
  navigate('/universities');
};
```
- **Functionality:**
    - Navigates the user directly to the `/universities` route without any search parameters.
- **Purpose:** To allow users to view all available universities without applying any initial filters.
- **Triggered by:** Clicking the "Browse All" button.

### `handleSearchSuggestionSelect`
```typescript
const handleSearchSuggestionSelect = (university: University) => {
  navigate(`/universities/${slugify(university.name)}`);
};
```
- **Parameters:** `university` (type `University`) - The selected university object from the search suggestions.
- **Functionality:**
    - Generates a URL path for the selected university using its `name` after slugifying it (converting it into a URL-friendly format).
    - Navigates the user to the detailed page of the selected university.
- **Purpose:** To provide a quick way for users to jump to a specific university's detail page directly from the search suggestions.
- **Triggered by:** Clicking on a university suggestion in the search dropdown.

### `handleLocationSuggestionSelect`
```typescript
const handleLocationSuggestionSelect = (province: string) => {
  setLocation(province);
  setShowLocationSuggestions(false);
};
```
- **Parameters:** `province` (type `string`) - The selected province name from the location suggestions.
- **Functionality:**
    - Updates the `location` state with the selected `province`.
    - Hides the location suggestions dropdown by setting `setShowLocationSuggestions` to `false`.
- **Purpose:** To allow users to quickly select a location from suggestions, populating the location input field and closing the dropdown.
- **Triggered by:** Clicking on a location suggestion in the location dropdown.

### `handleSearchSubmit`
```typescript
const handleSearchSubmit = () => {
  if (searchQuery.trim()) {
    navigate(`/programs?search=${encodeURIComponent(searchQuery.trim())}`);
  } else {
    navigate('/programs');
  }
};
```
- **Functionality:**
    - If `searchQuery` has a trimmed value, it navigates the user to the `/programs` route, appending the `searchQuery` as an encoded 'search' parameter.
    - If `searchQuery` is empty, it navigates to the `/programs` route without any parameters.
- **Purpose:** To specifically search for academic programs based on the current `searchQuery`, directing the user to the programs listing page. This function handles the "Enter" key press in the search input.
- **Triggered by:** Pressing "Enter" in the main search input field.
