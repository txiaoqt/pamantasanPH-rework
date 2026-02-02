# SavedUniversitiesService - Supabase Interaction Functions

This document describes the static asynchronous methods within the `SavedUniversitiesService` class that primarily interact with the Supabase backend to manage a user's saved universities. These functions handle authentication checks and include error logging with fallbacks to `localStorage` operations if needed.

## Static Methods

### `static async getSavedUniversities(): Promise<number[]>`
- **Purpose:** Retrieves a list of IDs of all universities saved by the current user.
- **Parameters:** None.
- **Return Type:** `Promise<number[]>` - A promise that resolves to an array of `university_id`s (numbers).
- **Functionality:**
    1.  Attempts to get the current authenticated `user` from `supabase.auth.getUser()`.
    2.  If no `user` is found (unauthenticated), it calls `this.getLocalSavedUniversities()` as a fallback.
    3.  If a `user` is found, it queries the `'saved_universities'` table, filters by `user.id`, and selects only the `university_id`.
    4.  Maps the result to an array of numbers.
    5.  Includes error logging; if a Supabase error occurs, it falls back to `this.getLocalSavedUniversities()`.
- **Usage Example:**
    ```typescript
    const savedIds = await SavedUniversitiesService.getSavedUniversities();
    console.log('Saved university IDs:', savedIds);
    ```

### `static async saveUniversity(universityId: number): Promise<void>`
- **Purpose:** Adds a specified university to the current user's saved list.
- **Parameters:** `universityId`: `number` - The ID of the university to save.
- **Return Type:** `Promise<void>` - A promise that resolves when the operation is successful.
- **Functionality:**
    1.  Attempts to get the current authenticated `user`.
    2.  If no `user` is found, it calls `this.saveUniversityLocally(universityId)` as a fallback.
    3.  If a `user` is found, it inserts a new record into the `'saved_universities'` table with the `university_id` and `user.id`.
    4.  Includes error logging; if a Supabase error occurs, it falls back to `this.saveUniversityLocally(universityId)`.
- **Usage Example:**
    ```typescript
    await SavedUniversitiesService.saveUniversity(123);
    console.log('University saved.');
    ```

### `static async unsaveUniversity(universityId: number): Promise<void>`
- **Purpose:** Removes a specified university from the current user's saved list.
- **Parameters:** `universityId`: `number` - The ID of the university to unsave.
- **Return Type:** `Promise<void>` - A promise that resolves when the operation is successful.
- **Functionality:**
    1.  Attempts to get the current authenticated `user`.
    2.  If no `user` is found, it calls `this.unsaveUniversityLocally(universityId)` as a fallback.
    3.  If a `user` is found, it deletes the record from the `'saved_universities'` table that matches both `user.id` and `university_id`.
    4.  Includes error logging; if a Supabase error occurs, it falls back to `this.unsaveUniversityLocally(universityId)`.
- **Usage Example:**
    ```typescript
    await SavedUniversitiesService.unsaveUniversity(123);
    console.log('University unsaved.');
    ```

### `static async isUniversitySaved(universityId: number): Promise<boolean>`
- **Purpose:** Checks if a specific university is currently saved by the current user.
- **Parameters:** `universityId`: `number` - The ID of the university to check.
- **Return Type:** `Promise<boolean>` - A promise that resolves to `true` if saved, `false` otherwise.
- **Functionality:**
    1.  Internally calls `this.getSavedUniversities()` to get the current list of saved university IDs (handling both authenticated and local storage cases).
    2.  Checks if the `universityId` is present in the returned list.
    3.  Includes error logging; if an error occurs during `getSavedUniversities`, it falls back to `this.isUniversitySavedLocally(universityId)`.
- **Usage Example:**
    ```typescript
    const isPUP_Saved = await SavedUniversitiesService.isUniversitySaved(1);
    console.log(`PUP is saved: ${isPUP_Saved}`);
    ```

### `static async clearAllSavedUniversities(): Promise<void>`
- **Purpose:** Clears all universities from the current user's saved list.
- **Parameters:** None.
- **Return Type:** `Promise<void>` - A promise that resolves when the operation is successful.
- **Functionality:**
    1.  Attempts to get the current authenticated `user`.
    2.  If no `user` is found, it calls `this.clearAllSavedUniversitiesLocally()` as a fallback.
    3.  If a `user` is found, it deletes all records from the `'saved_universities'` table that match `user.id`.
    4.  Includes error logging; if a Supabase error occurs, it falls back to `this.clearAllSavedUniversitiesLocally()`.
- **Usage Example:**
    ```typescript
    await SavedUniversitiesService.clearAllSavedUniversities();
    console.log('All saved universities cleared.');
    ```
