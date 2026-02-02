# SavedUniversitiesService - `SavedUniversity` Interface

This document describes the `SavedUniversity` interface, which defines the structure for a record representing a university saved by a user. This interface is used both when storing data in the Supabase database and for the `localStorage` fallback mechanism.

## Interface Definition

```typescript
export interface SavedUniversity {
  id: number;
  university_id: number;
  user_id: string;
  saved_at: string; // ISO timestamp
}
```

## Properties

### `id`
- **Type:** `number`
- **Description:** This field represents the unique identifier of the saved university record. **Crucially, when used with `localStorage` fallback, this `id` is repurposed to store the `university_id` directly for simpler local management.** When interacting with the Supabase database, this `id` typically refers to the primary key of the `saved_universities` table itself.

### `university_id`
- **Type:** `number`
- **Description:** The unique numerical identifier of the university that has been saved. This links the saved record back to a specific university entry in the main `universities` table.

### `user_id`
- **Type:** `string`
- **Description:** The unique identifier (UUID) of the user who saved the university. This links the saved record to a specific user. For `localStorage` fallback, a placeholder like `'local-user'` is used.

### `saved_at`
- **Type:** `string`
- **Description:** An ISO-formatted timestamp indicating when the university was saved.

## Usage
The `SavedUniversity` interface is used internally by the `SavedUniversitiesService` to define the shape of data records. It's particularly important for:
- Typing the data fetched from or inserted into the `saved_universities` table in Supabase.
- Structuring the JSON data stored in `localStorage` when the service falls back to local storage for unauthenticated users.

It's important to note the dual role of the `id` field, where it can refer to the record's primary key in the database, but functions as the `university_id` when dealing with `localStorage` (as `localStorage` items don't typically have their own auto-incrementing primary keys like database records).
