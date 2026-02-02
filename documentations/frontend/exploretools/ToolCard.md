# ToolCard Component

## Functionality
The `ToolCard` component is a presentational sub-component used within the `ExploreTools` component. It renders a single, clickable card that visually represents a specific tool or feature of the application. It displays an icon, a title, a description, and can trigger an action when clicked.

## Key Features
- **Visual Representation:** Presents a tool with a distinct icon and title.
- **Descriptive Text:** Provides a brief explanation of the tool's purpose.
- **Clickable Area:** The entire card is clickable, providing a clear user interaction point.
- **Styling & Interaction:** Includes Tailwind CSS classes for styling (background, shadow, border) and hover effects (`hover:shadow-xl hover:-translate-y-1`) to enhance user experience.
- **Icon Customization:** The icon's color is set dynamically based on props.

## Dependencies
- React (for `React.cloneElement` and functional component structure)

## Props (`ToolCardProps`)
The `ToolCard` component accepts the `ToolCardProps` interface, which includes:
- `title`: `string` - The main heading of the tool.
- `description`: `string` - A brief description of the tool's functionality.
- `icon`: `React.ReactNode` - The icon element to be displayed.
- `color`: `string` - Tailwind CSS class for the icon's background color.
- `onClick?`: `() => void` - An optional function to execute when the card is clicked.

## Usage
The `ToolCard` is designed to be used as a building block within a parent component that needs to display multiple similar actionable items, such as the `ExploreTools` component. It abstracts the common presentation and interaction logic for such cards.

### Example (within `ExploreTools.tsx`):
```jsx
// ... inside ExploreTools component
function ToolCard({ title, description, icon, color, onClick }: ToolCardProps) {
  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer border border-gray-100 dark:border-gray-700"
      onClick={onClick}
    >
      <div className={`w-12 h-12 ${color} rounded-lg flex items-center justify-center mb-4 transition-colors`}>
        {React.cloneElement(icon as React.ReactElement, { className: `h-6 w-6 text-white` })}
      </div>
      <h3 className="text-lg font-bold text-gray-800 dark:text-gray-50 mb-2 group-hover:text-maroon-800 dark:group-hover:text-maroon-400 transition-colors">
        {title}
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
        {description}
      </p>
    </div>
  );
}
// ...
// In the JSX of ExploreTools:
// {tools.map((tool, index) => (
//   <ToolCard key={index} {...tool} />
// ))}
```