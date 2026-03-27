## 2026-03-26 - Cart Accessibility
**Learning:** Dynamic list items with 'Remove' buttons lack context for screen readers when they don't reference the item name. The '✕' icon-only close button also lacked an ARIA label.
**Action:** Always add aria-labels with dynamic content context (e.g., `Remove ${item.title}`) in repeating list elements, and ensure icon-only buttons have descriptive labels.
