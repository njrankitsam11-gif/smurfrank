## 2026-03-26 - Cart Accessibility
**Learning:** Dynamic list items with 'Remove' buttons lack context for screen readers when they don't reference the item name. The '✕' icon-only close button also lacked an ARIA label.
**Action:** Always add aria-labels with dynamic content context (e.g., `Remove ${item.title}`) in repeating list elements, and ensure icon-only buttons have descriptive labels.

## 2026-04-18 - Search Form Accessibility
**Learning:** Adding a generic `input` instead of `input type="search"` prevents mobile devices from showing the correct keyboard layout, and without `role="search"`, search landmarks might be missed in the accessibility tree.
**Action:** Always add `role="search"` to `<form>` tags that contain a search field, and use `type="search"` instead of a generic text input to ensure semantic behavior and proper mobile keyboard layout.
