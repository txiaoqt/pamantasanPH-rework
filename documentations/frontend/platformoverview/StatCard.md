# PlatformOverview - `StatCard` Sub-component Overview

This document provides an overview of the `StatCard` sub-component that is defined within the `PlatformOverview.tsx` file. This component is designed to present individual statistics in an attractive and consistent card format.

## Functionality
The `StatCard` component is a presentational unit for displaying a single key statistic. It features an icon, a descriptive title, a prominent value, a subtitle for additional context, and a small highlight badge. It's styled with a subtle hover effect to provide visual feedback.

## Key Features
- **Visual Presentation of Statistics:** Clearly displays a single data point with supporting text and an icon.
- **Customizable Content:** All text (title, value, subtitle, highlight) and the icon are passed via props, allowing for flexible usage.
- **Thematic Styling:** Uses Tailwind CSS for a modern design, including shadows, rounded corners, and color themes.
- **Hover Effects:** Includes a `hover:shadow-xl` and `group-hover:text-red-900` to make the card interactive and visually engaging.
- **Icon Styling:** The icon is rendered within a themed circular background.

## Dependencies
- React (for functional component structure)

## Props (`StatCardProps`)
The `StatCard` component accepts the `StatCardProps` interface, which includes:
- `title`: `string` - The main title for the statistic.
- `value`: `string` - The prominent value of the statistic.
- `subtitle`: `string` - A secondary, descriptive text.
- `highlight`: `string` - A small, highlighted label.
- `icon`: `React.ReactNode` - The icon element to be displayed.

## Usage
The `StatCard` is designed to be used as a building block within a parent component that needs to display multiple similar statistical insights, such as the `PlatformOverview` component. It abstracts the common presentation logic for such cards.

### Example (within `PlatformOverview.tsx`):
```jsx
// ... inside PlatformOverview component
function StatCard({ title, value, subtitle, highlight, icon }: StatCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 group">
      <div className="flex items-center justify-between mb-3">
        <div className="p-2 bg-red-50 dark:bg-red-950 rounded-lg group-hover:bg-red-100 dark:group-hover:bg-red-900 transition-colors">
          {icon}
        </div>
        <div className="px-2 py-0.5 bg-gradient-to-r from-yellow-400 to-amber-400 rounded-full text-xs font-semibold text-red-900">
          {highlight}
        </div>
      </div>

      <div className="space-y-1">
        <h3 className="text-gray-600 dark:text-gray-400 text-sm font-medium">{title}</h3>
        <div className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-50 group-hover:text-red-900 dark:group-hover:text-[#FF4D4D] transition-colors">
          {value}
        </div>
        <p className="text-gray-500 dark:text-gray-400 text-sm">{subtitle}</p>
      </div>
    </div>
  );
}
// ...
// In the JSX of PlatformOverview:
// {stats.map((stat, index) => (
//   <StatCard key={index} {...stat} />
// ))}
```