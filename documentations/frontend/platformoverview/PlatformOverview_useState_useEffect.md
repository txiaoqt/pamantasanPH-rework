# PlatformOverview - State Management and Data Fetching (`useState`, `useEffect`)

This document describes the `useState` and `useEffect` hooks utilized within the `PlatformOverview` component. These hooks are responsible for managing the component's internal state, particularly the dynamic statistics displayed, and for fetching the necessary data to calculate these statistics.

## State Variables (`useState` Hooks)

### `universities`
- **Type:** `University[]`
- **Description:** An array that stores all `University` objects fetched from the backend. This data is primarily used to calculate the dynamic statistics displayed by the component.
- **Managed by:** `setUniversities`
- **Initial State:** `[]` (an empty array).
- **Usage:** This state is populated by the `useEffect` hook that fetches university data.

### `stats`
- **Type:** `Array<Object>` (specifically, an array of objects conforming to `StatCardProps` structure)
- **Description:** An array of objects, where each object represents a single statistic to be displayed by a `StatCard`. It holds the `title`, `value`, `subtitle`, `highlight`, and `icon` for each stat.
- **Managed by:** `setStats`
- **Initial State:** Initialized with placeholder values for "Total Universities", "Locations Covered", and "Student Reach".
- **Usage:**
    - The initial placeholder values are displayed until real data is fetched.
    - Once university data is loaded, this state is updated with dynamically calculated `value`s and potentially refined `highlight` texts.

## Data Fetching and Calculation (`useEffect` Hook)

### Fetch Universities and Calculate Real-time Statistics
```typescript
useEffect(() => {
  const fetchUniversities = async () => {
    try {
      const data = await UniversityService.getAllUniversities(); // Fetch all universities
      setUniversities(data); // Store fetched data

      // Calculate real stats
      const locations = new Set(data.map(uni => uni.location)); // Count unique locations
      const totalStudentReach = data.reduce((sum, uni) => sum + parseInt(uni.students.replace(/\D/g, '') || '0'), 0); // Calculate total students

      setStats([ // Update stats state with calculated values
        {
          title: 'Total Universities',
          value: data.length.toString(),
          subtitle: 'Registered Institutions',
          highlight: 'State Universities',
          icon: <Building className="h-5 w-5 text-red-700 dark:text-red-400" />
        },
        {
          title: 'Locations Covered',
          value: locations.size.toString(),
          subtitle: 'In Metro Manila',
          highlight: 'Local Focus',
          icon: <MapPin className="h-5 w-5 text-red-700 dark:text-red-400" />
        },
        {
          title: 'Student Reach',
          value: totalStudentReach.toLocaleString(), // Format number for readability
          subtitle: 'Across Metro Manila',
          highlight: 'Impact',
          icon: <Users className="h-5 w-5 text-red-700 dark:text-red-400" />
        },
      ]);
    } catch (error) {
      console.error('Failed to fetch universities for stats:', error); // Log errors
    }
  };

  fetchUniversities(); // Execute the fetch function
}, []); // Empty dependency array: runs only once on component mount
```
- **Dependencies:** `[]` (This effect runs only once after the initial render of the component).
- **Functionality:**
    - Defines an asynchronous inner function `fetchUniversities`.
    - Calls `UniversityService.getAllUniversities()` to fetch all university data available in the system.
    - Stores the fetched data in the `universities` state.
    - **Calculates Statistics:**
        - Determines the number of unique locations by creating a `Set` from the `location` property of all universities.
        - Calculates the `totalStudentReach` by summing the student counts from all universities. It performs a cleanup (`replace(/\D/g, '')`) to ensure only numeric parts of the `students` string are parsed.
    - Updates the `stats` state with the newly calculated `value`s and appropriate `highlight` texts.
    - Includes basic error handling to log any failures during the API call.
- **Purpose:** To dynamically load and process data from the backend to display accurate, real-time statistics about the UniCentral platform, thereby enhancing the credibility and informational value of the overview section.
