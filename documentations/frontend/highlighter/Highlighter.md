# Highlighter Component

## Functionality
The `Highlighter` component is a utility component designed to display a given `text` string, with specific occurrences of a `highlight` substring visually emphasized. It's useful for search results, filtering interfaces, or any scenario where matching parts of text need to stand out.

## Key Features
- **Dynamic Highlighting:** Takes a `text` string and a `highlight` string (the search term) and applies a visual highlight to all non-overlapping occurrences of the `highlight` string within the `text`.
- **Case-Insensitive Matching:** Uses a regular expression with the `i` flag for case-insensitive matching, meaning "apple" will highlight "Apple", "aPPlE", etc.
- **Global Matching:** Uses a regular expression with the `g` flag to highlight all occurrences of the substring, not just the first one.
- **No Highlight for Empty Term:** If the `highlight` string is empty or contains only whitespace, the component simply returns the original `text` without any modification, avoiding unnecessary processing.
- **React Element Output:** Renders the text as a sequence of `<span>` elements, with matching parts wrapped in `<mark>` tags (which typically have a default yellow background style).

## Dependencies
- React (for functional component structure and `React.FC` type)

## Props (`HighlighterProps`)

### `text`
- **Type:** `string`
- **Description:** The full string content that needs to be displayed and potentially highlighted.

### `highlight`
- **Type:** `string`
- **Description:** The substring whose occurrences within the `text` should be highlighted. Matching is case-insensitive.

## Usage
The `Highlighter` component can be used wherever dynamic text highlighting is needed, such as displaying search results, filtering lists, or emphasizing keywords in content.

### Example:
```jsx
import React from 'react';
import Highlighter from './components/common/Highlighter'; // Adjust path as needed

function SearchResult({ title, snippet, searchTerm }) {
  return (
    <div className="search-result">
      <h3>
        <Highlighter text={title} highlight={searchTerm} />
      </h3>
      <p>
        <Highlighter text={snippet} highlight={searchTerm} />
      </p>
    </div>
  );
}

// Example usage in a parent component
function App() {
  const exampleText = "The quick brown fox jumps over the lazy dog.";
  const searchTerm1 = "fox";
  const searchTerm2 = "lazy";
  const searchTerm3 = "the"; // Multiple occurrences

  return (
    <div>
      <h1>Text Highlighting Examples</h1>
      <p>Highlight "{searchTerm1}": <Highlighter text={exampleText} highlight={searchTerm1} /></p>
      <p>Highlight "{searchTerm2}": <Highlighter text={exampleText} highlight={searchTerm2} /></p>
      <p>Highlight "{searchTerm3}" (multiple): <Highlighter text={exampleText} highlight={searchTerm3} /></p>
      <p>No highlight (empty search): <Highlighter text={exampleText} highlight="" /></p>
    </div>
  );
}

export default App;
```
### Styling
The default highlighting is applied via the `<mark>` HTML element, which typically has a `background-color` of `yellow`. To customize the highlight style, you can add CSS rules targeting the `mark` element or specifically `mark.bg-yellow-200` if using Tailwind CSS, as shown in the component. For example:
```css
/* In your CSS file */
mark {
  background-color: #ffcc00; /* Custom yellow */
  padding: 0 2px;
  border-radius: 2px;
}
```