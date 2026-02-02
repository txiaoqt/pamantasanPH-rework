# HighlighterProps Interface

This document describes the `HighlighterProps` interface, which defines the expected properties for the `Highlighter` React component. These props are fundamental for specifying the text content to be displayed and the substring that should be highlighted within it.

## Interface Definition

```typescript
interface HighlighterProps {
  text: string;
  highlight: string;
}
```

## Properties

### `text`
- **Type:** `string`
- **Description:** The complete string content that the `Highlighter` component will render. This is the source text in which specific parts are to be highlighted.
- **Usage:** Provides the base string for display and for searching the `highlight` substring.

### `highlight`
- **Type:** `string`
- **Description:** The substring that the `Highlighter` component will look for within the `text` prop. All occurrences of this `highlight` string (case-insensitively) will be wrapped in `<mark>` tags, which typically apply a visual emphasis (e.g., a yellow background). If this string is empty or contains only whitespace, no highlighting will be applied, and the original `text` will be returned as is.
- **Usage:** Dictates which parts of the `text` should be visually emphasized.
