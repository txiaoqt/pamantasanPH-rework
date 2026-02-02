# MapViewProps Interface

This document describes the `MapViewProps` interface, which defines the expected properties for the `MapView` React component. This single prop is essential for providing the map with the data it needs to display university locations.

## Interface Definition

```typescript
interface MapViewProps {
  universities: University[];
}
```

## Properties

### `universities`
- **Type:** `University[]`
- **Description:** An array of `University` objects. Each object in this array represents a university and is expected to potentially contain a `mapLocation` property with `lat` (latitude) and `lng` (longitude) coordinates.
- **Usage:** The `MapView` component iterates over this array to:
    - Filter for universities that have valid geographical coordinates (`mapLocation.lat` and `mapLocation.lng`).
    - Create a `Marker` on the map for each such university.
    - Populate the content of the `Popup` associated with each marker, displaying information like the university's name, location, type, and number of programs.
- **Purpose:** To supply the geographical and descriptive data required to render an interactive map showing university locations and details.
