# University Interface

This document describes the `University` interface, which defines the comprehensive structure for a university object used throughout the UniCentral application. This interface consolidates various details about a university, including its identification, location, academic offerings, statistics, and admission-related information.

## Interface Definition

```typescript
export interface University {
  id: number;
  name: string;
  acronym?: string;
  location: string;
  province: string;
  established: string;
  type: string;
  students: string;
  programs: number;
  description: string;
  longDescription?: string;
  subjects: string[];
  imageUrl: string;
  galleryImages?: string[];

  accreditation: string[];
  campusSize?: string;
  founded?: string;
  website?: string;
  phone?: string;
  email?: string;
  address?: string;
  facilities?: string[];
  amenities?: string[];
  achievements?: string[];
  quickfacts?: string[];
  admissionRequirements?: string[];
  applicationProcess?: string[];
  admissionStatus: 'open' | 'not-yet-open' | 'closed';
  admissionDeadline: string;

  academicCalendar?: {
    semesterStart: string;
    semesterEnd: string;
    applicationDeadline: string;
  };
  rankings?: {
    source: string;
    details: string;
  };
  mapLocation?: {
    lat: number;
    lng: number;
  };
}
```

## Properties

### Core Identification & Overview
- **`id`**: `number` - A unique numerical identifier for the university.
- **`name`**: `string` - The full official name of the university.
- **`acronym?`**: `string` (Optional) - The commonly used acronym for the university (e.g., "PUP", "TUP").
- **`location`**: `string` - The specific city or district where the main campus is located (e.g., "Sta. Mesa, Manila").
- **`province`**: `string` - The province where the university is located (e.g., "Metro Manila").
- **`established`**: `string` - The year the university was established.
- **`type`**: `string` - The classification of the university (e.g., "Public", "Private", "State").
- **`students`**: `string` - The approximate number of students, typically formatted as a string (e.g., "65,000+").
- **`programs`**: `number` - The total number of academic programs offered.
- **`description`**: `string` - A short, concise description of the university.
- **`longDescription?`**: `string` (Optional) - A more detailed description, possibly used on a dedicated university details page.
- **`subjects`**: `string[]` - An array of general subject areas or key disciplines offered.
- **`imageUrl`**: `string` - The URL to the university's main image.
- **`galleryImages?`**: `string[]` (Optional) - An array of URLs for additional images of the university.

### Accreditation & Contact
- **`accreditation`**: `string[]` - An array of accreditations or certifications the university holds.
- **`campusSize?`**: `string` (Optional) - Description of the campus size.
- **`founded?`**: `string` (Optional) - More detailed founding information (could be redundant with `established`).
- **`website?`**: `string` (Optional) - Official website URL.
- **`phone?`**: `string` (Optional) - Contact phone number.
- **`email?`**: `string` (Optional) - Contact email address.
- **`address?`**: `string` (Optional) - Full postal address.

### Facilities & Achievements
- **`facilities?`**: `string[]` (Optional) - A list of notable facilities.
- **`amenities?`**: `string[]` (Optional) - A list of campus amenities.
- **`achievements?`**: `string[]` (Optional) - Key achievements or accolades.
- **`quickfacts?`**: `string[]` (Optional) - Other interesting quick facts about the university.

### Admissions
- **`admissionRequirements?`**: `string[]` (Optional) - A list of general admission requirements.
- **`applicationProcess?`**: `string[]` (Optional) - A description of the application steps.
- **`admissionStatus`**: `'open' | 'not-yet-open' | 'closed'` - The current status of admission applications.
- **`admissionDeadline`**: `string` - The date or period for application deadlines.

### Academic & Geographic Details
- **`academicCalendar?`**: `object` (Optional) - Details about the academic calendar:
    - `semesterStart`: `string`
    - `semesterEnd`: `string`
    - `applicationDeadline`: `string` (could be redundant with main `admissionDeadline`)
- **`rankings?`**: `object` (Optional) - Information about university rankings:
    - `source`: `string` - The source of the ranking (e.g., "QS World University Rankings").
    - `details`: `string` - Specific ranking details or achievements.
- **`mapLocation?`**: `object` (Optional) - Geographic coordinates for map integration:
    - `lat`: `number` - Latitude.
    - `lng`: `number` - Longitude.

## Usage
This interface is used extensively throughout the UniCentral frontend to type university data fetched from backend services, ensuring consistency and type safety when displaying and processing university information. It serves as the blueprint for `University` objects that populate components like `UniversityCard`, `FeaturedUniversities`, and services that interact with university data.
