# SavedUniversitiesService - Overview

## Purpose
The `SavedUniversitiesService` class is responsible for managing a user's list of saved universities within the UniCentral application. A key feature of this service is its ability to seamlessly switch between storing saved university data in a Supabase database (for authenticated users) and in the browser's `localStorage` (for unauthenticated users), providing a consistent experience regardless of login status.

## Key Responsibilities
- **Persistent Storage:** Saves and retrieves lists of university IDs that a user has marked as "saved."
- **Authentication Agnostic:** Automatically detects the user's authentication status:
    - If authenticated (via Supabase), it uses the `saved_universities` table in the database.
    - If unauthenticated, it falls back to using `localStorage` to store the saved list locally in the browser.
- **CRUD-like Operations:** Provides methods to:
    - Fetch all saved university IDs.
    - Save a new university.
    - Remove a previously saved university.
    - Check if a specific university is saved.
    - Clear all saved universities.
- **Data Integrity:** Ensures that the `university_id` is consistently managed across both storage mechanisms.
- **Error Handling:** Includes `try-catch` blocks for all operations, logging errors to the console and gracefully falling back to `localStorage` operations if Supabase interactions fail.

## Dependencies
- `supabase`: The initialized Supabase client instance (from `../lib/supabase`).
- `SavedUniversity`: An interface defining the structure of a saved university record, used internally and for local storage parsing.

## Usage
Frontend components that need to interact with a user's saved university list (e.g., displaying a "heart" icon, showing a list of saved items) should utilize the static methods of `SavedUniversitiesService`. The service handles the underlying storage mechanism automatically.

### Example Usage:
```typescript
import { SavedUniversitiesService } from '../services/savedUniversitiesService';

async function manageSavedStatus(universityId: number) {
  try {
    // Check if university is saved
    const isSaved = await SavedUniversitiesService.isUniversitySaved(universityId);
    console.log(`University ${universityId} saved status: ${isSaved}`);

    if (isSaved) {
      // Unsave it
      await SavedUniversitiesService.unsaveUniversity(universityId);
      console.log(`University ${universityId} unsaved.`);
    } else {
      // Save it
      await SavedUniversitiesService.saveUniversity(universityId);
      console.log(`University ${universityId} saved.`);
    }

    const allSaved = await SavedUniversitiesService.getSavedUniversities();
    console.log('All saved university IDs:', allSaved);

  } catch (error) {
    console.error('Error managing saved universities:', error);
  }
}

// Example usage:
// manageSavedStatus(1);
```

## Methods
The `SavedUniversitiesService` class exposes several static asynchronous methods for managing saved universities, along with private static methods that handle the `localStorage` fallback logic. For a detailed description of each method and the `SavedUniversity` interface, refer to the other documentation files in this directory.
