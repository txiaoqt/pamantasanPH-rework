# AdmissionRequirementService - Overview

## Purpose
The `AdmissionRequirementService` class is a specialized backend service designed to manage user-specific admission requirement checklists. Its primary function is to facilitate the tracking of individual admission requirements for different universities, allowing users to monitor their progress and prepare effectively for applications.

## Key Responsibilities
- **User-Specific Tracking:** Enables users to track the completion status of various admission requirements for each university they are interested in.
- **Progress Management:** Provides functionalities to fetch current checklist progress, toggle the completion status of individual requirements, and initialize tracking for a new set of requirements.
- **Bulk Operations:** Supports tracking an entire set of requirements for a university and untracking (deleting) all requirements for a specific user-university pair.
- **Status Inquiry:** Allows checking if a user is currently tracking any requirements for a particular university.
- **Aggregated Retrieval:** Can fetch all tracked requirements for a user, potentially including associated university details.
- **Supabase Interaction:** Directly interacts with the `user_requirement_checklist` table in Supabase, leveraging `upsert` and `delete` operations for efficient data management.
- **Error Handling:** Includes `try-catch` blocks for all database operations, logging errors to the console and re-throwing them for higher-level components to manage.

## Dependencies
- `supabase`: The initialized Supabase client instance (from `../lib/supabase`).
- `UserRequirementChecklistItem`: An interface defining the structure of an item in the user's checklist.

## Usage
Frontend components that need to display, manage, or interact with a user's admission requirement checklist should utilize the static methods of `AdmissionRequirementService`. This service centralizes all logic for managing this user-specific data.

### Example Usage:
```typescript
import { AdmissionRequirementService } from '../services/admissionRequirementService';

async function manageChecklist(currentUserId: string, targetUniversityId: number) {
  try {
    // Get current progress
    const progress = await AdmissionRequirementService.getUserChecklistProgress(currentUserId, targetUniversityId);
    console.log('Current progress:', progress);

    // Toggle a requirement
    await AdmissionRequirementService.toggleRequirementCompletion(currentUserId, targetUniversityId, 'Submit Application Form', true);
    console.log('Requirement toggled.');

    // Track new requirements
    const newRequirements = ['High School Diploma', 'Transcript of Records'];
    await AdmissionRequirementService.trackAllRequirements(currentUserId, targetUniversityId, newRequirements);
    console.log('New requirements tracked.');

    // Check if university is tracked
    const isTracked = await AdmissionRequirementService.isUniversityBeingTracked(currentUserId, targetUniversityId);
    console.log(`University is tracked: ${isTracked}`);

  } catch (error) {
    console.error('Error managing checklist:', error);
  }
}

// Assuming currentUserId and targetUniversityId are available
// manageChecklist('some-user-uuid', 123);
```

## Methods
The `AdmissionRequirementService` class exposes several static asynchronous methods for various checklist management operations. For a detailed description of each method and the `UserRequirementChecklistItem` interface, refer to the other documentation files in this directory.
