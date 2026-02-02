# ExploreTools Component

## Functionality
The `ExploreTools` component is a section designed to showcase various interactive tools available on the UniCentral platform that help users in their university search and decision-making process. It presents these tools as clickable cards, each with an icon, title, and description.

## Key Features
- **Tool Showcase:** Visually presents a curated list of tools such as "Advanced Search", "Compare Universities", "Interactive Map", and "Student Reviews".
- **Dynamic Navigation:** Each tool card is clickable and navigates the user to the respective feature page within the application using `react-router-dom`'s `useNavigate` hook.
- **Reusable `ToolCard` Sub-component:** Utilizes a dedicated `ToolCard` component for rendering individual tool entries, promoting consistency and reusability.
- **Informative Descriptions:** Each tool card includes a brief description to inform users about its functionality.
- **Thematic Iconography:** Employs icons from `lucide-react` to represent each tool visually, enhanced with themed colors.
- **Responsive Grid Layout:** Arranges the tool cards in a responsive grid that adapts to different screen sizes.

## Dependencies
- React (for functional component structure)
- Routing: `useNavigate` from `react-router-dom`
- Icons: `Search`, `BarChart3`, `Map`, `Star` from `lucide-react`

## Props
The `ExploreTools` component itself does not accept any external props. It internally defines the list of `tools` to display.

## Sub-components
- `ToolCard`: A presentational component used by `ExploreTools` to render each individual tool as a card.

## Usage
This component is typically placed on a homepage or dashboard to give users a quick overview and access to the core functionalities of the platform.

### Example (within a parent component or page):
```jsx
import React from 'react';
import ExploreTools from './components/home/ExploreTools';

function HomePage() {
  return (
    <div>
      {/* Other sections of the homepage */}
      <ExploreTools />
      {/* More homepage content */}
    </div>
  );
}

export default HomePage;
```