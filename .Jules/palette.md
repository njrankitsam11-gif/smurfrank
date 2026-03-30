## 2026-03-25 - Form Accessibility
**Learning:** Custom form labels often omit htmlFor/id bindings.
**Action:** Always verify custom inputs have explicit id and htmlFor attributes.

## 2026-03-25 - Form & Input Accessibility
**Learning:** Custom visual components like drag-and-drop file areas often lack proper `<label>` bindings, and generic search inputs omit accessible names when placeholders are used.
**Action:** Always wrap visual drop zones in `<label htmlFor>` and ensure standalone inputs have an explicit `aria-label`.
