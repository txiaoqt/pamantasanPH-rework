# UniversityCard Component (Main) - State and Hooks (`useState`, `useSavedUniversities`)

This document describes the `useState` hook and the custom `useSavedUniversities` hook utilized within the main `UniversityCard` component. These hooks are responsible for managing the interactive elements and user-specific data related to saving universities.

## State Variables (`useState` Hook)

### `isExpanded`
- **Type:** `boolean`
- **Description:** A boolean flag that controls the visibility of additional university details (like the full description, admission deadline, and subjects) within the `UniversityCard`.
- **Managed by:** `setIsExpanded`
- **Initial State:** `false`.
- **Usage:**
    - On smaller screens (defined by `lg:hidden` in Tailwind, meaning below large breakpoint), a "See More/See Less" button toggles this state.
    - When `isExpanded` is `true`, more detailed information is shown; otherwise, it is hidden.
    - On large screens (`lg:block`), the expanded content is typically always visible, so this state primarily controls the behavior for smaller viewports or specific `viewMode` layouts.

## Custom Hooks

### `useSavedUniversities`
- **Hook:** `useSavedUniversities()` (imported from `../../hooks/useSavedUniversities`)
- **Functionality:** This is a custom React hook designed to abstract and manage the client-side logic for saving and unsaving universities to a user's personalized list. It provides:
    - `isSaved(id: number)`: A function that returns `true` if the university with the given `id` is currently in the saved list, `false` otherwise.
    - `toggleSaved(id: number)`: A function that, when called, adds the university to the saved list if it's not already there, or removes it if it is.
    - `isLoaded`: A boolean indicating whether the saved universities data has finished loading from storage (e.g., `localStorage`). This is useful for disabling UI elements until the data is ready.
- **Usage within `UniversityCard`:**
    - The `isSaved(university.id)` function is used to conditionally apply styling to the "Save" button (e.g., change its color or icon to reflect whether the university is saved).
    - The `toggleSaved(university.id)` function is called when the user clicks the "Save" button, thereby updating the saved status for the current university.
    - The `isLoaded` boolean is used to disable the "Save" button temporarily (`disabled={!isLoaded}`) while the saved status is being fetched or synchronized, preventing users from attempting to save/unsave before the data is ready.
- **Purpose:** To provide a consistent and easy-to-use API for managing user preferences related to saved universities, enhancing reusability and keeping component logic clean.
