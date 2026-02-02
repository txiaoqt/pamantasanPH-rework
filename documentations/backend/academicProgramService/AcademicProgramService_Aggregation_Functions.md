# AcademicProgramService - Aggregation Functions

This document provides a detailed description of the static asynchronous method within the `AcademicProgramService` class that handles complex data aggregation and enrichment, specifically for generating a unified list of programs for the application's "Programs" page.

## Static Methods

### `static async getAggregatedPrograms(): Promise<AggregatedProgram[]>`
- **Purpose:** Fetches all academic programs across all universities, then aggregates and enriches this data into a standardized `AggregatedProgram` format. This function normalizes program names, categorizes them, and generates various dynamic attributes for display and search functionality on the Programs page.
- **Parameters:** None.
- **Return Type:** `Promise<AggregatedProgram[]>` - A promise that resolves to an array of `AggregatedProgram` objects, representing a unified and enriched list of programs.
- **Functionality:**
    1.  **Concurrent Data Fetching:** Uses `Promise.all` to concurrently fetch:
        - All `AcademicProgram` records using `this.getAllPrograms()`.
        - University IDs and names from the `'universities'` table in Supabase.
    2.  **University Name Mapping:** Creates a `Map` to quickly look up university names by their IDs.
    3.  **Program Grouping:** Iterates through all fetched programs and groups them based on a normalized version of their `programName` (using `this.normalizeProgramName`). This ensures that similar programs offered by different universities are treated as one aggregated program.
    4.  **Aggregation & Enrichment:** For each group of programs (i.e., each normalized program name):
        - Takes the `firstProgram` in the group as a reference.
        - Collects unique university names that offer this program.
        - Generates or estimates various attributes using private helper methods:
            - `acronym`: using `this.generateAcronym`.
            - `category`: using `this.categorizeProgram`.
            - `level`: using `this.mapDegreeLevel`.
            - `duration`: using `this.estimateDuration`.
            - `description`: using `this.generateDescription`.
            - `averageSalary`: using `this.estimateSalary`.
            - `popularity`: using `this.calculatePopularity` (based on the number of universities offering it).
            - `difficulty`: using `this.assessDifficulty`.
            - `requirements`: using `this.generateRequirements`.
            - `searchKeywords`: using `this.generateSearchKeywords`.
        - Constructs an `AggregatedProgram` object with these synthesized and aggregated details.
    5.  **Error Handling:** Includes error logging and re-throws errors encountered during data fetching or processing.
- **Usage Example:**
    ```typescript
    const aggregatedPrograms = await AcademicProgramService.getAggregatedPrograms();
    // aggregatedPrograms will contain a list of unique program types
    // with details like which universities offer them, estimated salary, etc.
    console.log(aggregatedPrograms[0].name, aggregatedPrograms[0].universities);
    ```
- **Importance:** This function is critical for powering the main "Programs" listing page, providing a consolidated view of academic offerings across the UniCentral's featured universities, enhancing searchability and comparability for users.
