# MapView Component

## Functionality
The `MapView` component integrates an interactive geographical map into the application, utilizing the `react-leaflet` library. Its primary purpose is to visually display the locations of various universities as markers on a map, providing an intuitive way for users to explore university campuses within their geographical context. When a university marker is clicked, a popup displays key details about that university and provides a link to its detailed profile page.

## Key Features
- **Interactive Map Display:** Renders a Leaflet map, allowing users to zoom, pan, and interact with university locations.
- **University Markers:** Places a distinct marker on the map for each university that has valid geographical coordinates.
- **Pop-up Information:** When a marker is clicked, a customizable popup appears, showing essential university information:
    - University image
    - Name
    - Location (city, province)
    - Type (e.g., Public, State, Private)
    - Number of programs
    - A "View Details" button to navigate to the university's full profile page.
- **Dynamic Filtering:** Only universities with valid `mapLocation` coordinates are displayed on the map, ensuring data integrity.
- **Initial View:** The map is initially centered on a default location (Metro Manila) with a predefined zoom level.
- **Leaflet Marker Fix:** Includes a necessary fix for `react-leaflet` to ensure default marker icons are displayed correctly by pointing to external CDN URLs.

## Dependencies
- React (for functional component structure)
- Routing: `useNavigate` from `react-router-dom`
- Leaflet: `MapContainer`, `TileLayer`, `Marker`, `Popup` from `react-leaflet`, and `L` from `leaflet`.
- CSS: `leaflet/dist/leaflet.css`
- Icons: `MapPin` from `lucide-react`
- Data Models: `University` interface from `./UniversityCard`

## Props (`MapViewProps`)
- `universities`: `University[]` - An array of `University` objects, each potentially containing `mapLocation` data.

## Usage
This component is ideal for pages dedicated to exploring university locations, providing a visual complement to list-based university directories.

### Example (within a parent component or page):
```jsx
import React, { useState, useEffect } from 'react';
import MapView from './MapView';
import { UniversityService } from '../../services/universityService';
import { University } from './UniversityCard'; // Assuming University interface is exported

function LocationsPage() {
  const [universities, setUniversities] = useState<University[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        setLoading(true);
        const data = await UniversityService.getAllUniversities();
        setUniversities(data);
      } catch (err) {
        console.error("Failed to fetch universities for map:", err);
        setError("Could not load university map data.");
      } finally {
        setLoading(false);
      }
    };
    fetchUniversities();
  }, []);

  if (loading) return <div>Loading map data...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="container mx-auto py-8">
      <h1>University Locations</h1>
      <MapView universities={universities} />
    </div>
  );
}

export default LocationsPage;
```
### Important Note on Marker Icons:
The component includes a client-side fix (`delete (L.Icon.Default.prototype as any)._getIconUrl; L.Icon.Default.mergeOptions(...)`) to address a common issue where default Leaflet marker icons might not display correctly in `react-leaflet` applications, especially with bundlers like Webpack. This fix ensures that the icons are loaded from a reliable CDN.
