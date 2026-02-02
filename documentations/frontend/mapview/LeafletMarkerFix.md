# MapView Component - Leaflet Default Marker Icon Fix

This document describes a specific workaround implemented in the `MapView.tsx` component to address a common issue with default marker icons in Leaflet maps when used with `react-leaflet`, especially in modern JavaScript build environments.

## The Problem

When using `react-leaflet` (which relies on Leaflet.js) in applications bundled with tools like Webpack, the default marker icons provided by Leaflet might not appear correctly. This happens because Leaflet often expects to find marker images (like `marker-icon.png`, `marker-icon-2x.png`, `marker-shadow.png`) in a specific relative path, but modern bundlers often process and relocate assets, breaking these expected paths.

## The Solution Implemented in `MapView.tsx`

To resolve this, the `MapView.tsx` component includes the following code snippet:

```typescript
import L from 'leaflet';
// ... other imports

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});
```

### Explanation

1.  **`delete (L.Icon.Default.prototype as any)._getIconUrl;`**:
    - This line explicitly deletes Leaflet's internal method for determining the icon's URL. This method is usually the one that gets confused by asset bundling.
    - The `as any` cast is used to bypass TypeScript's strict type checking, as `_getIconUrl` is an internal, undocumented property.

2.  **`L.Icon.Default.mergeOptions({...});`**:
    - This line globally modifies the default options for Leaflet's `Icon` class.
    - `iconRetinaUrl`, `iconUrl`, and `shadowUrl` are set to direct URLs pointing to the official Leaflet CDN (cdnjs.cloudflare.com).
    - By providing absolute URLs, the icon images are loaded directly from a reliable external source, bypassing any potential issues with local asset paths or bundling.

## Purpose

This fix ensures that the standard Leaflet marker icons are always displayed correctly on the map, providing a consistent and functional user experience without requiring complex configuration of asset loaders or manual copying of Leaflet's image files into the project's build output. It's a common and widely accepted workaround for this specific `react-leaflet` issue.
