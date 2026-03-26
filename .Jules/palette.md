## 2026-03-25 - Form Accessibility
**Learning:** Custom form labels often omit htmlFor/id bindings.
**Action:** Always verify custom inputs have explicit id and htmlFor attributes.

## 2024-03-24 - Custom Component Accessibility and ARIA Labels
**Learning:** Custom icon-only buttons (like those in CartDrawer) often lack `aria-label` attributes, making them inaccessible to screen readers.
**Action:** Always add descriptive `aria-label` attributes to any button that relies solely on an icon or symbol for its visual meaning.