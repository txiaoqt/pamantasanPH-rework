# HeroSection - Lifecycle and Data Fetching (`useEffect` Hooks)

This document outlines the functionalities of the various `useEffect` hooks within the `HeroSection` component, which manage data fetching, external library initialization, and event listeners.

## `useEffect` Hooks

### 1. Fetch Universities on Mount

```typescript
// Fetch universities on mount
useEffect(() => {
  const fetchUniversities = async () => {
    try {
      const universities = await UniversityService.getAllUniversities();
      setAllUniversities(universities);
    } catch (error) {
      console.error('Failed to fetch universities:', error);
    }
  };
  fetchUniversities();
}, []); // Empty dependency array means this runs once on mount
```
- **Dependencies:** `[]` (runs once after the initial render).
- **Functionality:**
    - Defines an asynchronous function `fetchUniversities` that calls `UniversityService.getAllUniversities()` to retrieve a list of all universities.
    - Updates the `allUniversities` state with the fetched data.
    - Includes basic error handling to log any failures during the API call.
- **Purpose:** To populate the component with the initial dataset of universities required for search, filtering, and statistics.

### 2. Initialize Fuse.js

```typescript
// Initialize Fuse.js
useEffect(() => {
  if (allUniversities.length > 0) {
    fuseRef.current = new Fuse(allUniversities, {
      keys: ['name', 'acronym', 'subjects'],
      includeScore: true,
      threshold: 0.4,
    });
  }
}, [allUniversities]); // Runs when allUniversities changes
```
- **Dependencies:** `[allUniversities]` (runs when `allUniversities` state changes).
- **Functionality:**
    - Checks if `allUniversities` has been populated (i.e., its length is greater than 0).
    - If data is available, it initializes a new `Fuse` instance (fuzzy-search library) with the `allUniversities` data.
    - The `Fuse` instance is configured to search across `name`, `acronym`, and `subjects` fields, include a score for relevance, and use a search `threshold` of 0.4.
    - Stores the initialized `Fuse` object in `fuseRef.current`.
- **Purpose:** To prepare the fuzzy-search engine for efficient and flexible university searching as soon as the university data is available.

### 3. Calculate Stats when Universities Data is Available

```typescript
// Calculate stats when universities data is available
useEffect(() => {
  const fetchStats = async () => {
    if (allUniversities.length > 0) {
      const locations = new Set(allUniversities.map(uni => uni.location));
      
      try {
        const aggregatedPrograms = await AcademicProgramService.getAggregatedPrograms();
        setStats({
          universities: allUniversities.length,
          locations: locations.size,
          programs: aggregatedPrograms.length
        });
      } catch (error) {
        console.error('Failed to fetch aggregated programs:', error);
        // Fallback to total programs if fetching unique fails
        const totalPrograms = allUniversities.reduce((sum, uni) => sum + uni.programs, 0);
        setStats({
          universities: allUniversities.length,
          locations: locations.size,
          programs: totalPrograms
        });
      }
    }
  };
  fetchStats();
}, [allUniversities]); // Runs when allUniversities changes
```
- **Dependencies:** `[allUniversities]` (runs when `allUniversities` state changes).
- **Functionality:**
    - Checks if `allUniversities` is populated.
    - Calculates the number of unique locations based on the `province` field of universities.
    - Attempts to fetch aggregated program data using `AcademicProgramService.getAggregatedPrograms()`.
    - Updates the `stats` state with the total number of universities, unique locations, and fetched program count.
    - Includes a fallback mechanism: if `AcademicProgramService.getAggregatedPrograms()` fails, it calculates the total number of programs by summing the `programs` property of each university.
- **Purpose:** To compute and display summary statistics (total universities, locations, and programs) in the HeroSection.

### 4. Handle Search Suggestions

```typescript
// Handle search suggestions
useEffect(() => {
  if (searchQuery.trim().length > 1 && fuseRef.current) {
    const results = fuseRef.current.search(searchQuery.trim());
    setSearchSuggestions(results.map(result => result.item).slice(0, 5)); // Limit to 5
    setShowSearchSuggestions(true);
  } else {
    setShowSearchSuggestions(false);
  }
}, [searchQuery]); // Runs when searchQuery changes
```
- **Dependencies:** `[searchQuery]` (runs when `searchQuery` state changes).
- **Functionality:**
    - Triggers only if `searchQuery` has more than one non-whitespace character and `fuseRef.current` (the Fuse.js instance) is initialized.
    - Performs a fuzzy search using `fuseRef.current.search(searchQuery.trim())`.
    - Maps the search results to their original university items and limits the suggestions to the top 5.
    - Updates the `searchSuggestions` state with the filtered results.
    - Sets `showSearchSuggestions` to `true` to display the suggestions dropdown.
    - If `searchQuery` is too short or empty, it hides the suggestions.
- **Purpose:** To provide dynamic, real-time university suggestions as the user types in the search bar.

### 5. Handle Location Suggestions

```typescript
// Handle location suggestions
useEffect(() => {
  if (location.trim().length > 0) {
    const provinces = [...new Set(allUniversities.map(uni => uni.province))];
    const filtered = provinces.filter(province =>
      province.toLowerCase().includes(location.toLowerCase())
    ).slice(0, 5); // Limit to 5 suggestions
    setLocationSuggestions(filtered);
    setShowLocationSuggestions(true);
  } else {
    setShowLocationSuggestions(false);
  }
}, [location, allUniversities]); // Runs when location or allUniversities changes
```
- **Dependencies:** `[location, allUniversities]` (runs when either `location` or `allUniversities` state changes).
- **Functionality:**
    - Triggers only if `location` has at least one non-whitespace character.
    - Extracts all unique provinces from `allUniversities`.
    - Filters these provinces to include only those that match the `location` input (case-insensitive) and limits to the top 5.
    - Updates the `locationSuggestions` state.
    - Sets `showLocationSuggestions` to `true` to display the location suggestions dropdown.
    - If `location` is empty, it hides the suggestions.
- **Purpose:** To provide dynamic, real-time location (province) suggestions as the user types in the location filter bar.

### 6. Handle Clicks Outside to Close Suggestions

```typescript
// Handle clicks outside to close suggestions
useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
    if (searchInputRef.current && !searchInputRef.current.contains(event.target as Node)) {
      setShowSearchSuggestions(false);
    }
    if (locationInputRef.current && !locationInputRef.current.contains(event.target as Node)) {
      setShowLocationSuggestions(false);
    }
  };

  document.addEventListener('mousedown', handleClickOutside);
  return () => document.removeEventListener('mousedown', handleClickOutside);
}, []); // Empty dependency array means this runs once on mount and cleans up on unmount
```
- **Dependencies:** `[]` (runs once on mount and returns a cleanup function on unmount).
- **Functionality:**
    - Defines a `handleClickOutside` function that checks if a click event occurred outside of the `searchInputRef` or `locationInputRef` elements.
    - If a click is detected outside, it sets the corresponding `showSearchSuggestions` or `showLocationSuggestions` state to `false`, effectively closing the suggestion dropdowns.
    - Adds a global `mousedown` event listener to the `document` when the component mounts.
    - Returns a cleanup function that removes the `mousedown` event listener when the component unmounts to prevent memory leaks.
- **Purpose:** To enhance user experience by automatically dismissing suggestion dropdowns when the user clicks anywhere outside the relevant input fields.