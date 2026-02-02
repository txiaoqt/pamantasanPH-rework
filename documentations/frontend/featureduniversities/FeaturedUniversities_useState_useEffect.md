# FeaturedUniversities - State Management and Data Fetching (`useState`, `useEffect`)

This document describes the `useState` and `useEffect` hooks utilized within the main `FeaturedUniversities` component. These hooks are responsible for managing the component's internal state, controlling data loading, handling errors, and fetching the list of featured universities.

## State Variables (`useState` Hooks)

### `featuredUniversities`
- **Type:** `University[]`
- **Description:** An array that holds the `University` objects representing the featured universities fetched from the backend.
- **Managed by:** `setFeaturedUniversities`
- **Initial State:** `[]` (an empty array).
- **Usage:** This array is mapped over in the component's JSX to render individual `UniversityCard` components.

### `isLoading`
- **Type:** `boolean`
- **Description:** A flag that indicates whether the university data is currently being fetched (`true`) or if the fetching process has completed (`false`).
- **Managed by:** `setIsLoading`
- **Initial State:** `true`.
- **Usage:** Controls the display of a loading skeleton UI while data is being loaded, and then switches to displaying the actual content once data is available.

### `error`
- **Type:** `string | null`
- **Description:** Stores an error message if any issues occur during the data fetching process. It is `null` if no errors have occurred.
- **Managed by:** `setError`
- **Initial State:** `null`.
- **Usage:** Controls the display of an error message UI if data fetching fails, providing feedback to the user.

## Data Fetching (`useEffect` Hook)

### Fetch Fixed Featured Universities
```typescript
useEffect(() => {
  const fetchFixedFeaturedUniversities = async () => {
    try {
      setIsLoading(true); // Set loading to true before fetch
      // Fetch specific universities by their IDs: PUP (main), TUP (main), PLM
      const specificUniversityIds = [1, 2, 3]; // Assuming these are the IDs for PUP-main, TUP-main, PLM
      const universities = await UniversityService.getUniversitiesByIds(specificUniversityIds);
      setFeaturedUniversities(universities); // Update state with fetched data
    } catch (err) {
      console.error('Failed to fetch fixed featured universities:', err);
      setError('Failed to load featured universities'); // Set error state
    } finally {
      setIsLoading(false); // Set loading to false regardless of success or failure
    }
  };

  fetchFixedFeaturedUniversities();
}, []); // Empty dependency array: runs only once on component mount
```
- **Dependencies:** `[]` (This effect runs only once after the initial render of the component).
- **Functionality:**
    - Defines an asynchronous inner function `fetchFixedFeaturedUniversities`.
    - Sets `isLoading` to `true` to display the loading indicator.
    - Calls `UniversityService.getUniversitiesByIds` to retrieve data for specific universities (PUP, TUP, PLM, identified by IDs 1, 2, and 3).
    - If the fetch is successful, `setFeaturedUniversities` updates the state with the received data.
    - If an error occurs, it's caught, logged to the console, and `setError` is called to set a user-friendly error message.
    - Finally, `setIsLoading` is set to `false` in a `finally` block, ensuring the loading indicator is removed regardless of the outcome.
- **Purpose:** To asynchronously load the initial set of featured university data from the backend when the `FeaturedUniversities` component first mounts, and to manage the loading and error states during this process.
