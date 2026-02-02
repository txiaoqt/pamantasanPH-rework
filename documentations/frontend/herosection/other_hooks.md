# HeroSection - Hooks (`useRef`, `useNavigate`)

This document details the `useRef` and `useNavigate` hooks utilized within the `HeroSection` component for managing DOM references and programmatic navigation.

## Hooks

### `useNavigate`
- **Hook:** `useNavigate` from `react-router-dom`
- **Functionality:** Provides a function (`navigate`) that allows for programmatic navigation within the application. This is used to redirect users to different routes (e.g., `/universities`, `/programs`, or specific university detail pages) based on their interactions within the HeroSection, such as submitting a search query or selecting a suggestion.
- **Usage:**
    ```typescript
    const navigate = useNavigate();
    // ...
    navigate('/universities');
    navigate(`/universities?${params.toString()}`);
    navigate(`/universities/${slugify(university.name)}`);
    navigate(`/programs?search=${encodeURIComponent(searchQuery.trim())}`);
    ```

### `searchInputRef`
- **Hook:** `useRef<HTMLInputElement>(null)`
- **Functionality:** Creates a mutable ref object that persists across renders. This specific ref is attached to the main university/course search `<input>` element.
- **Usage:** Primarily used in conjunction with the `handleClickOutside` event listener (within a `useEffect` hook) to detect when a user clicks outside this input field. This detection mechanism is essential for automatically hiding the search suggestions dropdown when the input loses focus.

### `locationInputRef`
- **Hook:** `useRef<HTMLInputElement>(null)`
- **Functionality:** Similar to `searchInputRef`, this ref object is attached to the location search `<input>` element.
- **Usage:** Also used within the `handleClickOutside` event listener to determine if a click occurred outside the location input field. This allows for the automatic closing of the location suggestions dropdown when the input loses focus.

### `fuseRef`
- **Hook:** `useRef<Fuse<University> | null>(null)`
- **Functionality:** This ref holds an instance of the `Fuse.js` fuzzy-search library. By storing the `Fuse` instance in a ref, it can be initialized once (when `allUniversities` data is available) and then reused across renders without being re-created unnecessarily, optimizing performance.
- **Usage:**
    - Initialized within a `useEffect` hook once `allUniversities` has been fetched.
    - Accessed within another `useEffect` hook to perform fuzzy searches on the `allUniversities` data based on the `searchQuery`.
    ```typescript
    // Initialization:
    fuseRef.current = new Fuse(allUniversities, {
      keys: ['name', 'acronym', 'subjects'],
      includeScore: true,
      threshold: 0.4,
    });

    // Usage for search:
    const results = fuseRef.current.search(searchQuery.trim());
    ```