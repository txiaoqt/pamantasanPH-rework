# ToolCardProps Interface

This document describes the `ToolCardProps` interface, which defines the expected properties for the `ToolCard` sub-component used within the `ExploreTools` component. These props allow for flexible customization of each tool's appearance and behavior.

## Interface Definition

```typescript
interface ToolCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  onClick?: () => void;
}
```

## Properties

### `title`
- **Type:** `string`
- **Description:** The main heading or name of the tool. This is prominently displayed on the card.
- **Usage:** Provides a clear identifier for each tool.

### `description`
- **Type:** `string`
- **Description:** A brief, descriptive text explaining what the tool does or its purpose.
- **Usage:** Gives users a concise understanding of the tool's functionality.

### `icon`
- **Type:** `React.ReactNode`
- **Description:** A React element (typically an icon component from a library like `lucide-react`) that visually represents the tool. The `ToolCard` uses `React.cloneElement` to inject additional CSS classes for styling the icon.
- **Usage:** Provides a visual cue for the tool, enhancing recognition and appeal.

### `color`
- **Type:** `string`
- **Description:** A CSS class string (e.g., `'bg-maroon-700 dark:bg-maroon-800'`) that defines the background color of the icon container.
- **Usage:** Allows for custom branding or differentiation between tool types through color.

### `onClick?`
- **Type:** `() => void` (Optional)
- **Description:** An optional callback function that is executed when the `ToolCard` component is clicked.
- **Usage:** Typically used by the parent `ExploreTools` component to trigger navigation to a specific route associated with the tool.
