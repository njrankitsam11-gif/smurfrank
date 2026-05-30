## 2026-03-25 - Form Accessibility
**Learning:** Custom form labels often omit htmlFor/id bindings.
**Action:** Always verify custom inputs have explicit id and htmlFor attributes.

## 2026-03-26 - Keyboard Focus Accessibility
**Learning:** Default browser focus outlines can often be invisible on custom dark-mode themes or forms missing explicitly styled outlines, hiding keyboard navigation state.
**Action:** Always ensure `:focus-visible` styles with sufficient contrast (e.g., using a bright accent color outline) are applied globally to interactive elements like inputs and buttons.

## 2026-03-26 - Scoping Focus Outline Accessibility
**Learning:** Applying a bright focus outline globally (e.g. `button:focus-visible` in `globals.css`) breaks design boundaries by polluting unrelated components across the application.
**Action:** Always verify keyboard accessibility, but when adding custom `:focus-visible` outlines in a codebase lacking utility class systems, strictly scope them to the targeted components (e.g. using a localized `<style>` block and `.focus-outline` class) to prevent regressions on other pages.

## 2026-03-30 - Keyboard Focus on Hidden File Inputs
**Learning:** Hiding file inputs using `display: 'none'` completely removes them from the document tab order, making custom drag-and-drop upload zones completely inaccessible to keyboard users. Using `:has()` selectors enables applying focus outlines to the parent container when the hidden input receives focus.
**Action:** Always replace `display: 'none'` on file inputs with visually hidden styles (e.g., `opacity: 0, width: '1px', position: 'absolute'`) so they remain focusable, and apply the focus outline to the visible dropzone container using the `:has(:focus-visible)` selector.

## 2026-03-31 - Identify Input Purpose (WCAG 1.3.5)
**Learning:** Relying purely on the 'type' attribute (e.g., type="email") isn't sufficient for the best user experience or for meeting WCAG 1.3.5, as password managers and browsers often rely on the 'autocomplete' attribute for robust autofill capabilities.
**Action:** Always add appropriate 'autocomplete' attributes (e.g., 'email', 'current-password', 'new-password') to login and registration forms to ensure users can effortlessly use their password managers.

## 2026-04-01 - Required Form Fields (WCAG 3.3.2)
**Learning:** Using a custom or visually hidden required marker (like a styled asterisk `*` or `<span aria-hidden="true">*</span>`) inside a `<label>` does not communicate to screen readers that the associated input is required. While the native `required` attribute often provides semantic meaning, explicitly coupling it with `aria-required="true"` ensures the requirement is unambiguously announced across all screen reader and browser combinations.
**Action:** Always ensure that any `<input>` associated with a custom required marker includes both `required` and `aria-required="true"` to explicitly announce the requirement to screen readers.

## 2026-04-06 - Descriptive Context for Icon/Utility Buttons
**Learning:** Buttons that represent icons or utility functions without text, or buttons with text that needs context (e.g. "CART (2)" or a "COPY" button without specifying what is being copied), can be confusing for screen reader users.
**Action:** Always provide an explicitly descriptive `aria-label` (e.g. `aria-label="Copy wallet address"`, `aria-label="Open cart with 2 items"`) for these types of buttons so that their purpose is clear.
