# AdmissionRequirementService - Functions

This document provides a detailed description of each static asynchronous method available in the `AdmissionRequirementService` class, outlining their purpose, parameters, return types, and specific functionalities for managing user admission requirement checklists.

## Static Methods

### `static async getUserChecklistProgress(userId: string, universityId: number): Promise<Map<string, boolean>>`
- **Purpose:** Fetches the completion status for all admission requirements a specific user is tracking for a given university.
- **Parameters:**
    - `userId`: `string` - The ID of the logged-in user.
    - `universityId`: `number` - The ID of the university.
- **Return Type:** `Promise<Map<string, boolean>>` - A promise that resolves to a `Map`. The keys of the map are the `requirement_text` strings, and the values are their corresponding `is_completed` boolean status.
- **Functionality:**
    - Queries the `'user_requirement_checklist'` table.
    - Filters records by both `user_id` and `university_id`.
    - Selects only `requirement_text` and `is_completed` fields.
    - Iterates through the fetched data to populate and return a `Map` for easy lookup.
    - Includes error logging and re-throws errors.
- **Usage Example:**
    ```typescript
    const progress = await AdmissionRequirementService.getUserChecklistProgress('user-123', 1);
    console.log(progress.get('Submit Application Form')); // true or false
    ```

### `static async toggleRequirementCompletion(userId: string, universityId: number, requirementText: string, isCompleted: boolean): Promise<void>`
- **Purpose:** Toggles (or sets) the `is_completed` status of a specific admission requirement for a user and university. This method uses an `upsert` operation.
- **Parameters:**
    - `userId`: `string` - The ID of the logged-in user.
    - `universityId`: `number` - The ID of the university.
    - `requirementText`: `string` - The exact text of the requirement to update.
    - `isCompleted`: `boolean` - The new completion status (`true` for completed, `false` for not completed).
- **Return Type:** `Promise<void>` - A promise that resolves when the operation is successful.
- **Functionality:**
    - Uses `supabase.from('user_requirement_checklist').upsert()`.
    - If a record with the given `user_id`, `university_id`, and `requirement_text` exists, it updates its `is_completed` status.
    - If no such record exists, it inserts a new one with the provided details.
    - `onConflict: 'user_id, university_id, requirement_text'` ensures that conflicts are resolved by updating the existing record.
    - Includes error logging and re-throws errors.
- **Usage Example:**
    ```typescript
    await AdmissionRequirementService.toggleRequirementCompletion('user-123', 1, 'Submit Application Form', true);
    ```

### `static async trackAllRequirements(userId: string, universityId: number, requirements: string[]): Promise<void>`
- **Purpose:** Initiates tracking for a list of admission requirements for a specific user and university. It inserts new requirements as "not completed" and leaves existing ones untouched.
- **Parameters:**
    - `userId`: `string` - The ID of the logged-in user.
    - `universityId`: `number` - The ID of the university.
    - `requirements`: `string[]` - An array of strings, where each string is the text of a requirement to track.
- **Return Type:** `Promise<void>` - A promise that resolves when the operation is successful.
- **Functionality:**
    - Maps the input `requirements` array into an array of objects suitable for `upsert`, setting `is_completed` to `false` for all new entries.
    - Uses `supabase.from('user_requirement_checklist').upsert()` with `ignoreDuplicates: true`. This means if a checklist item already exists for the `user_id`, `university_id`, and `requirement_text`, it will not be modified by this operation.
    - Includes error logging and re-throws errors.
- **Usage Example:**
    ```typescript
    const newReqs = ['Submit Essay', 'Attend Interview'];
    await AdmissionRequirementService.trackAllRequirements('user-123', 1, newReqs);
    ```

### `static async untrackAllRequirements(userId: string, universityId: number): Promise<void>`
- **Purpose:** Removes all admission requirement checklist entries associated with a specific user and university.
- **Parameters:**
    - `userId`: `string` - The ID of the logged-in user.
    - `universityId`: `number` - The ID of the university.
- **Return Type:** `Promise<void>` - A promise that resolves when the deletion is successful.
- **Functionality:**
    - Uses `supabase.from('user_requirement_checklist').delete()`.
    - Filters records by both `user_id` and `university_id`, deleting all matching entries.
    - Includes error logging and re-throws errors.
- **Usage Example:**
    ```typescript
    await AdmissionRequirementService.untrackAllRequirements('user-123', 1);
    console.log('Untracked all requirements for university 1 for user user-123');
    ```

### `static async isUniversityBeingTracked(userId: string, universityId: number): Promise<boolean>`
- **Purpose:** Checks if a user has any admission requirements currently being tracked for a specific university.
- **Parameters:**
    - `userId`: `string` - The ID of the logged-in user.
    - `universityId`: `number` - The ID of the university.
- **Return Type:** `Promise<boolean>` - A promise that resolves to `true` if at least one requirement is being tracked, `false` otherwise.
- **Functionality:**
    - Queries the `'user_requirement_checklist'` table.
    - Selects only the `id` column with an `exact` count (`count: 'exact'`).
    - Filters by `user_id` and `university_id`.
    - Uses `limit(1)` for efficiency, as only the presence of one record is needed to determine tracking status.
    - Returns `true` if the count is greater than 0, `false` otherwise.
    - Includes error logging and re-throws errors.
- **Usage Example:**
    ```typescript
    const isTracked = await AdmissionRequirementService.isUniversityBeingTracked('user-123', 1);
    ```

### `static async getAllTrackedRequirements(userId: string): Promise<UserRequirementChecklistItem[]>`
- **Purpose:** Fetches all admission requirement checklist items for a given user, including related university information.
- **Parameters:** `userId`: `string` - The ID of the logged-in user.
- **Return Type:** `Promise<UserRequirementChecklistItem[]>` - A promise that resolves to an array of `UserRequirementChecklistItem` objects. The items will include nested `universities` data (name, image_url) due to the `select('*', { foreignTable: 'universities' })` syntax.
- **Functionality:**
    - Queries the `'user_requirement_checklist'` table.
    - Filters records by `user_id`.
    - Uses a `select` statement with embedded foreign table syntax (`universities ( name, image_url )`) to perform a join and fetch related university data directly.
    - Orders results by `created_at` in descending order.
    - Includes error logging and re-throws errors.
- **Usage Example:**
    ```typescript
    const allUserReqs = await AdmissionRequirementService.getAllTrackedRequirements('user-123');
    console.log(allUserReqs[0].universities.name); // Accesses joined university name
    ```
