# ExploreTools - Functions (`handleToolClick`)

This document details the `handleToolClick` function utilized within the `ExploreTools` component. This function is responsible for managing navigation when a user interacts with one of the tool cards.

## Functions

### `handleToolClick`
```typescript
const handleToolClick = (toolTitle: string) => {
  switch (toolTitle) {
    case 'Advanced Search':
      navigate('/universities');
      break;
    case 'Compare Universities':
      navigate('/compare');
      break;
    case 'Interactive Map':
      navigate('/map');
      break;
    case 'Student Reviews':
      // This can be linked to a future reviews page or modal
      break;
    default:
      break;
  }
};
```
- **Parameters:** `toolTitle`: `string` - The title of the `ToolCard` that was clicked. This title is used to determine the appropriate navigation path.
- **Functionality:**
    - Uses a `switch` statement to evaluate the `toolTitle` parameter.
    - Based on the `toolTitle`, it calls the `navigate` function (obtained from `useNavigate`) to programmatically redirect the user to a specific route within the application.
    - For `'Advanced Search'`, it navigates to `/universities`.
    - For `'Compare Universities'`, it navigates to `/compare`.
    - For `'Interactive Map'`, it navigates to `/map`.
    - The case for `'Student Reviews'` currently has a placeholder comment, indicating that this feature might be implemented in the future, possibly involving navigation to a reviews page or opening a modal.
    - A `default` case handles any unexpected `toolTitle` without taking action.
- **Purpose:** To provide interactive navigation for the tool cards, directing users to the relevant sections of the application that correspond to the clicked tool.
- **Triggered by:** The `onClick` event of each `ToolCard` within the `ExploreTools` component, where the `toolTitle` is passed as an argument.
