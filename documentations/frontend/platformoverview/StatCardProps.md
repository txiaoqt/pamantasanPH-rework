# StatCardProps Interface

This document describes the `StatCardProps` interface, which defines the expected properties for the `StatCard` sub-component used within the `PlatformOverview` component. These props allow for flexible customization of each statistic card's content and appearance.

## Interface Definition

```typescript
interface StatCardProps {
  title: string;
  value: string;
  subtitle: string;
  highlight: string;
  icon: React.ReactNode;
}
```

## Properties

### `title`
- **Type:** `string`
- **Description:** The main title or label for the statistic (e.g., "Total Universities", "Locations Covered").
- **Usage:** Provides a clear identifier for what the statistic represents.

### `value`
- **Type:** `string`
- **Description:** The primary numerical or textual value of the statistic (e.g., "200+", "17", "1,500+"). It is a string to allow for formatted numbers or text.
- **Usage:** Displays the core data point of the statistic.

### `subtitle`
- **Type:** `string`
- **Description:** A secondary, descriptive text that provides additional context or clarification for the statistic (e.g., "Registered Institutions", "In Metro Manila").
- **Usage:** Enhances understanding of the `value`.

### `highlight`
- **Type:** `string`
- **Description:** A short, emphasized text string displayed as a small badge on the card (e.g., "State Universities", "Local Focus").
- **Usage:** Adds a quick, eye-catching descriptor or category for the statistic.

### `icon`
- **Type:** `React.ReactNode`
- **Description:** A React element (typically an icon component from a library like `lucide-react`) that visually represents the statistic.
- **Usage:** Provides a visual cue for the statistic, enhancing recognition and appeal.
