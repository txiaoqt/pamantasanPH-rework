# AcademicProgramService - Private Static Helper Functions

This document provides a detailed description of the various private static helper methods within the `AcademicProgramService` class. These functions are primarily used by `getAggregatedPrograms()` to enrich and standardize academic program data, generating synthetic attributes like categories, durations, salaries, and search keywords.

## Private Static Methods

### `private static categorizeProgram(programName: string): string`
- **Purpose:** Assigns a broad category to an academic program based on keywords in its name.
- **Parameters:** `programName`: `string` - The name of the academic program.
- **Return Type:** `string` - The determined category (e.g., 'Technology', 'Business', 'Healthcare', 'Education', 'Design', 'Law', 'Science', 'Social Sciences', or 'Other').
- **Functionality:** Uses a series of `if/else if` statements to check if the lowercase `programName` includes specific keywords related to different fields.

### `private static mapDegreeLevel(degreeLevel?: string): 'Bachelor' | 'Master' | 'Doctorate' | 'Certificate'`
- **Purpose:** Maps various string representations of degree levels to a standardized set of four categories.
- **Parameters:** `degreeLevel?`: `string` (Optional) - The raw degree level string from the database.
- **Return Type:** A literal type: `'Bachelor' | 'Master' | 'Doctorate' | 'Certificate'`. Defaults to `'Bachelor'` if no match or input is missing.
- **Functionality:** Converts the input `degreeLevel` to lowercase and checks for keywords like 'doctorate', 'master', 'certificate', 'diploma'.

### `private static estimateDuration(degreeLevel?: string): string`
- **Purpose:** Provides an estimated duration for a program based on its standardized degree level.
- **Parameters:** `degreeLevel?`: `string` (Optional) - The standardized degree level string.
- **Return Type:** `string` - An estimated duration (e.g., "4 years", "1-2 years"). Defaults to "4 years".
- **Functionality:** Checks for keywords in the lowercase `degreeLevel` to provide a duration range.

### `private static generateDescription(programName: string): string`
- **Purpose:** Generates a short, generic description for a program based on its name.
- **Parameters:** `programName`: `string` - The name of the academic program.
- **Return Type:** `string` - A generated description.
- **Functionality:** Uses a predefined `Record` of descriptions for common program name keywords. If a specific keyword match is found, it returns the associated description; otherwise, it provides a generic fallback.

### `private static generateCareerProspects(programName: string): string[]`
- **Purpose:** Generates a list of potential career prospects for a program based on its name.
- **Parameters:** `programName`: `string` - The name of the academic program.
- **Return Type:** `string[]` - An array of estimated career titles.
- **Functionality:** Similar to `generateDescription`, it uses a predefined `Record` of career prospects for common program name keywords, with a generic fallback. **(Note: This function is defined but currently not used in the `AggregatedProgram` interface or `getAggregatedPrograms` aggregation logic.)**

### `private static estimateSalary(programName: string): string`
- **Purpose:** Provides an estimated monthly salary range for graduates of a given program.
- **Parameters:** `programName`: `string` - The name of the academic program.
- **Return Type:** `string` - An estimated salary range (e.g., "₱35,000 - ₱80,000"). Defaults to a general range.
- **Functionality:** Uses a predefined `Record` of salary ranges for common program name keywords.

### `private static calculatePopularity(universityCount: number): number`
- **Purpose:** Calculates a "popularity" score for a program based on the number of universities that offer it.
- **Parameters:** `universityCount`: `number` - The number of universities offering the program.
- **Return Type:** `number` - A popularity score between 60 and 95 (inclusive).
- **Functionality:**
    - `basePopularity`: Calculated as `universityCount * 15`, capped at 95.
    - Ensures a minimum popularity of 60.

### `private static assessDifficulty(programName: string): 'Easy' | 'Moderate' | 'Challenging' | 'Very Challenging'`
- **Purpose:** Assesses the general difficulty level of a program based on keywords in its name.
- **Parameters:** `programName`: `string` - The name of the academic program.
- **Return Type:** A literal type: `'Easy' | 'Moderate' | 'Challenging' | 'Very Challenging'`. Defaults to `'Moderate'`.
- **Functionality:** Checks for program names that are typically considered "Challenging" or "Very Challenging" (e.g., 'medicine', 'law', 'engineering').

### `public static normalizeProgramName(programName: string): string`
- **Purpose:** Cleans and normalizes academic program names to group similar programs together, even if they have slightly different formal titles.
- **Parameters:** `programName`: `string` - The original program name.
- **Return Type:** `string` - The normalized program name.
- **Functionality:**
    - Converts to lowercase and trims whitespace.
    - Removes common prefixes (e.g., "bachelor of science in") and content within parentheses.
    - Applies a predefined set of specific normalizations (e.g., "science in information technology" -> "information technology").
    - If no specific normalizations apply, it returns the cleaned version.

### `public static generateAcronym(programName: string): string`
- **Purpose:** Generates a common or descriptive acronym for an academic program.
- **Parameters:** `programName`: `string` - The program name.
- **Return Type:** `string` - The generated acronym.
- **Functionality:**
    - Cleans the program name by removing parentheses.
    - Checks against a predefined `Record` of common acronyms for exact matches.
    - If no exact match, it generates an acronym by taking the first letter of significant words, skipping common conjunctions and prepositions.
    - Falls back to the first four uppercase letters of the cleaned name if no meaningful acronym can be generated.

### `public static generateSearchKeywords(programName: string, acronym: string): string[]`
- **Purpose:** Generates a list of relevant search keywords for an academic program to improve discoverability.
- **Parameters:**
    - `programName`: `string` - The full name of the program.
    - `acronym`: `string` - The generated acronym for the program.
- **Return Type:** `string[]` - An array of unique keywords.
- **Functionality:**
    - Adds the full `programName` and its `acronym` (both upper and lower case) to a `Set` to ensure uniqueness.
    - Includes common variations and abbreviations based on keywords in the program name (e.g., "information technology" adds "it", "bsit").
    - Adds individual words from the `programName` (if longer than 2 characters).

### `private static generateRequirements(programName: string): string[]`
- **Purpose:** Generates a list of general academic requirements or recommended subjects for a program.
- **Parameters:** `programName`: `string` - The name of the academic program.
- **Return Type:** `string[]` - An array of general requirements.
- **Functionality:** Uses a predefined `Record` of requirements for common program name keywords, with a generic fallback.
