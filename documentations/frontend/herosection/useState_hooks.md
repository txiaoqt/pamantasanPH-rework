# HeroSection - State Management (useState Hooks)

This document describes the various state variables managed by `useState` hooks within the `HeroSection` component. These states are crucial for handling user input, displaying dynamic content, and managing the visibility of UI elements.

## State Variables

### `searchQuery`
- **Type:** `string`
- **Description:** Holds the current value of the input field where users type their search queries for universities or courses.
- **Managed by:** `setSearchQuery`
- **Usage:** Updated directly by user input in the search bar. Drives the `useEffect` hook responsible for generating search suggestions.

### `location`
- **Type:** `string`
- **Description:** Stores the current value of the input field used for filtering universities by location (province).
- **Managed by:** `setLocation`
- **Usage:** Updated directly by user input in the location bar. Drives the `useEffect` hook responsible for generating location suggestions.

### `searchSuggestions`
- **Type:** `University[]`
- **Description:** An array of `University` objects that are presented to the user as suggestions based on their `searchQuery`. These are typically filtered and ranked by the Fuse.js library.
- **Managed by:** `setSearchSuggestions`
- **Usage:** Populated by the `useEffect` hook that performs fuzzy searching on `allUniversities` when `searchQuery` changes.

### `locationSuggestions`
- **Type:** `string[]`
- **Description:** An array of strings, where each string represents a suggested province based on the `location` input.
- **Managed by:** `setLocationSuggestions`
- **Usage:** Populated by the `useEffect` hook that filters unique provinces from `allUniversities` when `location` changes.

### `showSearchSuggestions`
- **Type:** `boolean`
- **Description:** Controls the visibility of the dropdown overlay that displays `searchSuggestions`.
- **Managed by:** `setShowSearchSuggestions`
- **Usage:** Set to `true` when `searchQuery` has significant input and suggestions are available, and `false` when the search input is cleared or a click occurs outside the search box.

### `showLocationSuggestions`
- **Type:** `boolean`
- **Description:** Controls the visibility of the dropdown overlay that displays `locationSuggestions`.
- **Managed by:** `setShowLocationSuggestions`
- **Usage:** Set to `true` when `location` input has content and suggestions are available, and `false` when the location input is cleared or a click occurs outside the location box.

### `allUniversities`
- **Type:** `University[]`
- **Description:** A comprehensive list of all university data fetched from the backend service. This serves as the primary data source for search, location filtering, and statistics.
- **Managed by:** `setAllUniversities`
- **Usage:** Populated by the initial `useEffect` hook that calls `UniversityService.getAllUniversities()`. This state is a dependency for `fuseRef` initialization and stats calculation.

### `stats`
- **Type:** `{ universities: number; locations: number; programs: number }`
- **Description:** An object containing aggregated statistics displayed in the HeroSection:
    - `universities`: Total count of all universities.
    - `locations`: Total count of unique locations (provinces).
    - `programs`: Total count of academic programs.
- **Managed by:** `setStats`
- **Usage:** Populated by a `useEffect` hook after `allUniversities` are fetched and processed, and `AcademicProgramService.getAggregatedPrograms()` is called.
