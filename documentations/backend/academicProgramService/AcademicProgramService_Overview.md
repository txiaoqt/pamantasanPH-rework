# AcademicProgramService - Overview

## Purpose
The `AcademicProgramService` class is a crucial part of the UniCentral application's backend services layer, dedicated to managing and providing data related to academic programs. It interacts with the Supabase database to perform standard CRUD (Create, Read, Update, Delete) operations on program records. Beyond basic data access, it features advanced logic to aggregate and enrich program data from multiple universities, making it suitable for display on the "Programs" page.

## Key Responsibilities
- **Program Data Access (CRUD):** Provides methods for fetching programs by university, grouping them by college, creating new programs, updating existing ones, and deleting programs. It also offers a method to get a total count of programs for a university.
- **Data Aggregation for Frontend Display:** Implements complex logic in `getAggregatedPrograms()` to transform raw program data into a more usable `AggregatedProgram` format. This includes:
    - Normalizing program names to group similar programs across universities.
    - Categorizing programs into broader fields (e.g., Technology, Business).
    - Estimating degree levels, durations, average salaries, popularity, and difficulty.
    - Generating search keywords and example requirements dynamically.
- **Data Transformation:** Converts raw data received from Supabase (`DatabaseAcademicProgram`) into the frontend-friendly `AcademicProgram` interface using `transformDbAcademicProgramToAcademicProgram`.
- **Error Handling:** Incorporates `try-catch` blocks for all database operations, logging errors to the console and re-throwing them for higher-level components to manage.

## Dependencies
- `supabase`: The initialized Supabase client instance (from `../lib/supabase`).
- `DatabaseAcademicProgram`: An internal interface representing the structure of an academic program record directly from the Supabase database.
- `AcademicProgram`: The frontend-facing interface for program data.
- `transformDbAcademicProgramToAcademicProgram`: A utility function (from `../lib/supabase`) for mapping `DatabaseAcademicProgram` objects to `AcademicProgram` interface objects.
- `University`: Interface for university data (to map university IDs to names during aggregation).

## Usage
Frontend components that need to display, create, modify, or analyze academic program data should utilize the static methods of `AcademicProgramService`. The `getAggregatedPrograms` method is particularly important for the main programs listing page.

### Example Usage:
```typescript
import { AcademicProgramService } from '../services/academicProgramService';

async function loadPrograms() {
  try {
    const pupPrograms = await AcademicProgramService.getProgramsByUniversityId(1);
    console.log('PUP programs:', pupPrograms);

    const aggregated = await AcademicProgramService.getAggregatedPrograms();
    console.log('Aggregated programs for Programs page:', aggregated);

  } catch (error) {
    console.error('Error loading programs:', error);
  }
}

loadPrograms();
```

## Methods
The `AcademicProgramService` class exposes several static asynchronous methods for various data operations, alongside numerous private static helper methods that support the aggregation logic. For detailed descriptions of each method and the `AggregatedProgram` interface, refer to the other documentation files in this directory.
