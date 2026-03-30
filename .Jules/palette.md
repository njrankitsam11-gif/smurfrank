## 2026-03-25 - Form Accessibility
**Learning:** Custom form labels often omit htmlFor/id bindings.
**Action:** Always verify custom inputs have explicit id and htmlFor attributes.

## 2026-03-26 - Keyboard Focus Accessibility
**Learning:** Default browser focus outlines can often be invisible on custom dark-mode themes or forms missing explicitly styled outlines, hiding keyboard navigation state.
**Action:** Always ensure `:focus-visible` styles with sufficient contrast (e.g., using a bright accent color outline) are applied globally to interactive elements like inputs and buttons.

## 2026-03-26 - Scoping Focus Outline Accessibility
**Learning:** Applying a bright focus outline globally (e.g. `button:focus-visible` in `globals.css`) breaks design boundaries by polluting unrelated components across the application.
**Action:** Always verify keyboard accessibility, but when adding custom `:focus-visible` outlines in a codebase lacking utility class systems, strictly scope them to the targeted components (e.g. using a localized `<style>` block and `.focus-outline` class) to prevent regressions on other pages.
