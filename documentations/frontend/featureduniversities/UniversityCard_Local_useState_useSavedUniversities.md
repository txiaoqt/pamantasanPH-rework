# FeaturedUniversities - Local `UniversityCard` State and Hooks (`useState`, `useSavedUniversities`)

This document describes the `useState` hook and the custom `useSavedUniversities` hook utilized within the **locally defined** `UniversityCard` sub-component in `FeaturedUniversities.tsx`. These hooks manage the interactive elements and user-specific data related to saving universities.

## State Variables (`useState` Hook)

### `isExpanded`
- **Type:** `boolean`
- **Description:** A boolean flag that controls the visibility of additional university details (like description, admission deadline, and subjects) within the `UniversityCard`.
- **Managed by:** `setIsExpanded`
- **Initial State:** `false`.
- **Usage:**
    - On small and medium screens (`lg:hidden`), a "See More/Less" button toggles this state.
    - When `isExpanded` is `true`, more detailed information is shown; otherwise, it is hidden.
    - On large screens (`lg:block`), the expanded content is always visible, so this state's effect is only relevant for smaller viewports.

## Custom Hooks

### `useSavedUniversities`
- **Hook:** `useSavedUniversities()` (imported from `../../hooks/useSavedUniversities`)
- **Functionality:** This is a custom React hook designed to manage the saving and unsaving of universities to a user's personalized list. It provides:
    - `isSaved(id: number)`: A function to check if a university with the given `id` is currently saved.
    - `toggleSaved(id: number)`: A function to add a university to the saved list if not already there, or remove it if it is.
    - `isLoaded`: A boolean indicating if the saved universities data has finished loading.
- **Usage within `UniversityCard`:**
    - `isSaved(id)`: Determines the initial visual state of the "Save" button and its text.
    - `toggleSaved(id)`: Is called when the user clicks the "Save" button, updating the saved status for the current university.
    - `isLoaded`: Used to disable the "Save" button temporarily while the saved status is being loaded, preventing premature interactions.
- **Purpose:** To abstract and centralize the logic for persisting user-saved universities, making it easy to integrate this functionality into any component that displays university information.
