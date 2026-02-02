# SavedUniversitiesService - Local Storage Fallback Functions

This document describes the private static methods within the `SavedUniversitiesService` class that implement the `localStorage` fallback mechanism for managing saved universities when the user is unauthenticated or when Supabase operations fail. These functions operate directly on the browser's `localStorage`.

## Private Static Methods (Local Storage Fallback)

### `private static getLocalSavedUniversities(): number[]`
- **Purpose:** Retrieves the IDs of universities saved in the browser's `localStorage`.
- **Parameters:** None.
- **Return Type:** `number[]` - An array of `university_id`s. Returns an empty array if nothing is saved or an error occurs.
- **Functionality:**
    1.  Fetches the string value associated with the key `'savedUniversities'` from `localStorage`.
    2.  If a value exists, it attempts to parse it as JSON.
    3.  Maps the parsed `SavedUniversity` objects to an array of `id`s (which represent `university_id` in this context).
    4.  Includes error logging for parsing or retrieval issues, returning an empty array in such cases.
- **Usage:** Called by public methods when a user is unauthenticated or when a Supabase operation fails.

### `private static saveUniversityLocally(universityId: number): void`
- **Purpose:** Adds a specified university to the local saved list in `localStorage`.
- **Parameters:** `universityId`: `number` - The ID of the university to save.
- **Return Type:** `void`.
- **Functionality:**
    1.  Retrieves the current local saved list from `localStorage`.
    2.  Parses it into an array of `SavedUniversity` objects.
    3.  Checks if the `universityId` is already in the list to prevent duplicates.
    4.  If not already saved, it creates a new `SavedUniversity` object (using `'local-user'` as a placeholder `user_id`) and pushes it to the array.
    5.  Serializes the updated array back to a JSON string and stores it in `localStorage`.
    6.  Includes error logging for `localStorage` operations.
- **Usage:** Called by `saveUniversity()` when a user is unauthenticated or Supabase saving fails.

### `private static unsaveUniversityLocally(universityId: number): void`
- **Purpose:** Removes a specified university from the local saved list in `localStorage`.
- **Parameters:** `universityId`: `number` - The ID of the university to unsave.
- **Return Type:** `void`.
- **Functionality:**
    1.  Retrieves the current local saved list from `localStorage`.
    2.  Filters the array to exclude the `SavedUniversity` object with the matching `universityId`.
    3.  Serializes the modified array back to a JSON string and stores it in `localStorage`.
    4.  Includes error logging for `localStorage` operations.
- **Usage:** Called by `unsaveUniversity()` when a user is unauthenticated or Supabase unsaving fails.

### `private static isUniversitySavedLocally(universityId: number): boolean`
- **Purpose:** Checks if a specific university is currently saved in `localStorage`.
- **Parameters:** `universityId`: `number` - The ID of the university to check.
- **Return Type:** `boolean` - Returns `true` if the university is found in the local saved list, `false` otherwise.
- **Functionality:**
    1.  Calls `this.getLocalSavedUniversities()` to get the current list of locally saved IDs.
    2.  Uses `Array.prototype.includes()` to check for the presence of the `universityId`.
    3.  Includes error logging.
- **Usage:** Called by `isUniversitySaved()` when a user is unauthenticated or the primary check fails.

### `private static clearAllSavedUniversitiesLocally(): void`
- **Purpose:** Removes all saved universities from `localStorage`.
- **Parameters:** None.
- **Return Type:** `void`.
- **Functionality:**
    1.  Removes the item associated with the key `'savedUniversities'` from `localStorage`.
    2.  Includes error logging for `localStorage` operations.
- **Usage:** Called by `clearAllSavedUniversities()` when a user is unauthenticated or the primary Supabase clear operation fails.
