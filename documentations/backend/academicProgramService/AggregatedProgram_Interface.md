# AcademicProgramService - `AggregatedProgram` Interface

This document describes the `AggregatedProgram` interface, which is a specialized data structure used within the `AcademicProgramService` to represent academic programs in an enriched, aggregated format. This format is particularly suited for display on a general "Programs" listing page, where programs from various universities might be grouped or compared.

## Interface Definition

```typescript
export interface AggregatedProgram {
  id: number;
  name: string;
  acronym: string;
  category: string;
  level: 'Bachelor' | 'Master' | 'Doctorate' | 'Certificate';
  duration: string;
  universities: string[];
  description: string;
  averageSalary: string;
  popularity: number;
  difficulty: 'Easy' | 'Moderate' | 'Challenging' | 'Very Challenging';
  requirements: string[];
  programType?: string; // Optional, as it might be generalized
  specializations?: string[];
  searchKeywords: string[];
}
```

## Properties

### `id`
- **Type:** `number`
- **Description:** A unique identifier for the aggregated program. Often derived from the ID of one of the underlying `AcademicProgram` records.

### `name`
- **Type:** `string`
- **Description:** The normalized name of the academic program (e.g., "Computer Science", "Business Administration").

### `acronym`
- **Type:** `string`
- **Description:** A generated acronym for the program (e.g., "BSCS", "BSBA").

### `category`
- **Type:** `string`
- **Description:** A broader categorization of the program (e.g., "Technology", "Business", "Healthcare", "Education").

### `level`
- **Type:** `'Bachelor' | 'Master' | 'Doctorate' | 'Certificate'`
- **Description:** The highest degree level associated with this program.

### `duration`
- **Type:** `string`
- **Description:** An estimated duration for completing the program (e.g., "4 years", "1-2 years").

### `universities`
- **Type:** `string[]`
- **Description:** An array of names of universities that offer this specific program (or a program that normalizes to this `AggregatedProgram`).

### `description`
- **Type:** `string`
- **Description:** A generated brief description of the program's focus.

### `averageSalary`
- **Type:** `string`
- **Description:** An estimated average salary range for graduates of this program.

### `popularity`
- **Type:** `number`
- **Description:** A calculated popularity score for the program, potentially based on how many universities offer it or other factors.

### `difficulty`
- **Type:** `'Easy' | 'Moderate' | 'Challenging' | 'Very Challenging'`
- **Description:** An assessed difficulty level for the program.

### `requirements`
- **Type:** `string[]`
- **Description:** A list of generated general academic requirements or recommended subjects for admission to this program.

### `programType?`
- **Type:** `string` (Optional)
- **Description:** The specific type of program (e.g., "undergraduate", "graduate", "diploma"). Optional as it might be generalized in aggregation.

### `specializations?`
- **Type:** `string[]` (Optional)
- **Description:** A list of possible specializations within the program.

### `searchKeywords`
- **Type:** `string[]`
- **Description:** A generated list of keywords relevant to the program, used for search and filtering.

## Usage
The `AggregatedProgram` interface is primarily returned by the `AcademicProgramService.getAggregatedPrograms()` method. Frontend components, particularly the "Programs" page, consume this data to display a comprehensive and searchable list of academic offerings across all featured universities. This aggregated view allows users to explore programs independently of specific universities, then see which universities offer them.
