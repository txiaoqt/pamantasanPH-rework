# UniversityService - Overview

## Purpose
The `UniversityService` class is a core component of the UniCentral application's backend services layer. Its primary responsibility is to interact with the Supabase database to perform various data operations related to universities. This includes fetching single or multiple university records, filtering them based on different criteria, and searching by name or description. It acts as a dedicated data access layer for university-related information, abstracting the complexities of direct database queries from the frontend components.

## Key Responsibilities
- **Data Retrieval:** Provides methods to fetch all universities, individual universities by ID, name, or acronym.
- **Filtering Capabilities:** Offers functions to filter universities based on attributes like location, type, and subjects (with some client-side processing for complex criteria).
- **Search Functionality:** Enables searching for universities by keywords in their name or description.
- **Featured Listings:** Supports retrieving a limited number of universities for "featured" sections.
- **Status-Based Retrieval:** Allows fetching universities based on their admission status.
- **Data Transformation:** Converts raw data received from Supabase (of type `DatabaseUniversity`) into the frontend-friendly `University` interface, ensuring data consistency across the application.
- **Error Handling:** Implements `try-catch` blocks for all database operations, logging errors to the console and re-throwing them to allow calling components to handle them appropriately.

## Dependencies
- `supabase`: The initialized Supabase client instance (from `../lib/supabase`).
- `DatabaseUniversity`: An internal interface representing the structure of a university record directly from the Supabase database.
- `transformDbUniversityToUniversity`: A utility function (from `../lib/supabase`) responsible for mapping `DatabaseUniversity` objects to `University` interface objects.
- `University`: The frontend-facing interface for university data (from `../components/university/UniversityCard`).

## Usage
Frontend components and other services that require university data should interact with the `UniversityService` class by calling its static methods. This promotes a clean separation of concerns and simplifies data access.

### Example Usage:
```typescript
import { UniversityService } from '../services/universityService';

async function loadUniversities() {
  try {
    const allUniversities = await UniversityService.getAllUniversities();
    console.log('All universities:', allUniversities);

    const featured = await UniversityService.getFeaturedUniversities(3);
    console.log('Featured universities:', featured);

    const pup = await UniversityService.getUniversityByAcronym_CaseInsensitive('PUP');
    console.log('PUP details:', pup);

  } catch (error) {
    console.error('Error in loading universities:', error);
  }
}

loadUniversities();
```

## Methods
The `UniversityService` class exposes several static asynchronous methods for various data operations. For a detailed description of each method, refer to `UniversityService_Functions.md`.
