# UniversityService - Functions

This document provides a detailed description of each static asynchronous method available in the `UniversityService` class, outlining their purpose, parameters, return types, and specific functionalities.

## Static Methods

### `static async getAllUniversities(): Promise<University[]>`
- **Purpose:** Fetches all university records available in the Supabase database.
- **Parameters:** None.
- **Return Type:** `Promise<University[]>` - A promise that resolves to an array of `University` objects, sorted alphabetically by name.
- **Functionality:**
    - Queries the `'universities'` table in Supabase.
    - Selects all columns (`*`).
    - Orders the results by the `name` column in ascending order.
    - Transforms the raw Supabase data (`DatabaseUniversity[]`) into the `University` interface using `transformDbUniversityToUniversity`.
    - Includes error logging and re-throws any encountered errors.
- **Usage Example:**
    ```typescript
    const allUnis = await UniversityService.getAllUniversities();
    console.log(allUnis); // [{ id: 1, name: "PUP", ... }]
    ```

### `static async getUniversityById(id: number): Promise<University | null>`
- **Purpose:** Fetches a single university record based on its unique numerical ID.
- **Parameters:** `id`: `number` - The unique identifier of the university.
- **Return Type:** `Promise<University | null>` - A promise that resolves to a `University` object if found, or `null` if no university matches the provided ID.
- **Functionality:**
    - Queries the `'universities'` table.
    - Selects all columns and filters by `id` using an equality (`.eq('id', id)`) condition.
    - Uses `.single()` to expect exactly one row.
    - Transforms the result.
    - Includes error logging and re-throws errors.
- **Usage Example:**
    ```typescript
    const university = await UniversityService.getUniversityById(1);
    if (university) console.log(university.name);
    ```

### `static async getUniversityByName(name: string): Promise<University | null>`
- **Purpose:** Fetches a single university record based on its exact name.
- **Parameters:** `name`: `string` - The exact name of the university.
- **Return Type:** `Promise<University | null>` - A promise that resolves to a `University` object if found, or `null`.
- **Functionality:**
    - Queries the `'universities'` table, filtering by exact `name`.
    - Uses `.single()`.
    - Transforms the result.
    - Includes error logging and re-throws errors.
- **Usage Example:**
    ```typescript
    const pup = await UniversityService.getUniversityByName('Polytechnic University of the Philippines');
    ```

### `static async getUniversityByAcronym_CaseInsensitive(acronym: string): Promise<University | null>`
- **Purpose:** Fetches a single university record by its acronym, performing a case-insensitive search.
- **Parameters:** `acronym`: `string` - The acronym of the university (e.g., "PUP").
- **Return Type:** `Promise<University | null>` - A promise that resolves to a `University` object if found, or `null` if no university matches or multiple matches are found (due to `.single()`).
- **Functionality:**
    - Queries the `'universities'` table, filtering by `acronym` using a case-insensitive `ilike` condition.
    - Specifically handles Supabase's `PGRST116` error code (no rows found) by returning `null` instead of throwing an error, indicating no match.
    - Transforms the result.
    - Includes error logging and re-throws other errors.
- **Usage Example:**
    ```typescript
    const pup = await UniversityService.getUniversityByAcronym_CaseInsensitive('pup');
    ```

### `static async getUniversityByName_CaseInsensitive(name: string): Promise<University | null>`
- **Purpose:** Fetches a single university record by its name, performing a case-insensitive search.
- **Parameters:** `name`: `string` - The name of the university.
- **Return Type:** `Promise<University | null>` - A promise that resolves to a `University` object if found, or `null`.
- **Functionality:**
    - Queries the `'universities'` table, filtering by `name` using a case-insensitive `ilike` condition.
    - Handles `PGRST116` error by returning `null`.
    - Transforms the result.
    - Includes error logging and re-throws other errors.
- **Usage Example:**
    ```typescript
    const plm = await UniversityService.getUniversityByName_CaseInsensitive('pamantasan ng lungsod ng maynila');
    ```

### `static async getUniversitiesByIds(ids: number[]): Promise<University[]>`
- **Purpose:** Fetches multiple university records based on an array of their IDs.
- **Parameters:** `ids`: `number[]` - An array of unique university identifiers.
- **Return Type:** `Promise<University[]>` - A promise that resolves to an array of `University` objects corresponding to the provided IDs, sorted by name.
- **Functionality:**
    - Queries the `'universities'` table.
    - Uses the `.in('id', ids)` filter to match any `id` within the provided array.
    - Orders the results by `name`.
    - Transforms the result.
    - Includes error logging and re-throws errors.
- **Usage Example:**
    ```typescript
    const featured = await UniversityService.getUniversitiesByIds([1, 2, 3]);
    ```

### `static async filterUniversities(filters: { location?: string; type?: string; maxTuition?: number; subjects?: string[] }): Promise<University[]>`
- **Purpose:** Filters universities based on various criteria.
- **Parameters:** `filters`: `{ location?: string; type?: string; maxTuition?: number; subjects?: string[] }` - An object containing optional filter criteria.
    - `location?`: `string` - Filters by partial, case-insensitive match on the `location` field.
    - `type?`: `string` - Filters by exact match on the `type` field.
    - `maxTuition?`: `number` - (Note: Currently skipped in the backend query and handled client-side).
    - `subjects?`: `string[]` - (Note: Currently handled client-side after initial database query).
- **Return Type:** `Promise<University[]>` - A promise that resolves to an array of `University` objects matching the filters.
- **Functionality:**
    - Constructs a Supabase query dynamically based on the provided `filters`.
    - Applies `ilike` for partial, case-insensitive location matching and `eq` for exact type matching.
    - Orders results by `name`.
    - Performs additional client-side filtering for `subjects` after fetching from the database, as complex array filtering is often easier on the client for Supabase RLS.
    - Includes error logging and re-throws errors.
- **Usage Example:**
    ```typescript
    const manilaPublicUnis = await UniversityService.filterUniversities({ location: 'manila', type: 'Public' });
    ```

### `static async searchUniversities(query: string): Promise<University[]>`
- **Purpose:** Searches university records by a given query string against their name or description.
- **Parameters:** `query`: `string` - The search string.
- **Return Type:** `Promise<University[]>` - A promise that resolves to an array of `University` objects where the name or description matches the query.
- **Functionality:**
    - Queries the `'universities'` table.
    - Uses an `.or()` condition to search for the `query` string (case-insensitive partial match via `ilike`) in both the `name` and `description` fields.
    - Transforms the result.
    - Includes error logging and re-throws errors.
- **Usage Example:**
    ```typescript
    const searchResults = await UniversityService.searchUniversities('technology');
    ```

### `static async getFeaturedUniversities(limit: number = 6): Promise<University[]>`
- **Purpose:** Fetches a limited number of universities, typically for display in a "featured" section.
- **Parameters:** `limit?`: `number` - The maximum number of universities to fetch (defaults to 6).
- **Return Type:** `Promise<University[]>` - A promise that resolves to an array of `University` objects.
- **Functionality:**
    - Queries the `'universities'` table.
    - Orders by `name` and applies a `limit`.
    - Transforms the result.
    - Includes error logging and re-throws errors.
- **Usage Example:**
    ```typescript
    const top3Featured = await UniversityService.getFeaturedUniversities(3);
    ```

### `static async getUniversitiesByAdmissionStatus(status: 'open' | 'not-yet-open' | 'closed'): Promise<University[]>`
- **Purpose:** Fetches universities based on their current admission status.
- **Parameters:** `status`: `'open' | 'not-yet-open' | 'closed'` - The desired admission status to filter by.
- **Return Type:** `Promise<University[]>` - A promise that resolves to an array of `University` objects matching the status.
- **Functionality:**
    - Queries the `'universities'` table.
    - Filters by the `admission_status` column using an equality (`.eq('admission_status', status)`) condition.
    - Transforms the result.
    - Includes error logging and re-throws errors.
- **Usage Example:**
    ```typescript
    const openAdmissionUnis = await UniversityService.getUniversitiesByAdmissionStatus('open');
    ```

### `static async getUniversitiesByLocation(location: string): Promise<University[]>`
- **Purpose:** Fetches universities located in a specific province.
- **Parameters:** `location`: `string` - The province name (or part of it) to filter by.
- **Return Type:** `Promise<University[]>` - A promise that resolves to an array of `University` objects located in the specified province.
- **Functionality:**
    - Queries the `'universities'` table.
    - Filters by the `province` column using a case-insensitive `ilike` condition for partial matching.
    - Transforms the result.
    - Includes error logging and re-throws errors.
- **Usage Example:**
    ```typescript
    const lagunaUnis = await UniversityService.getUniversitiesByLocation('laguna');
    ```
