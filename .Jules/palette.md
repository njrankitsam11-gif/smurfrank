## 2026-03-25 - Form Accessibility
**Learning:** Custom form labels often omit htmlFor/id bindings.
**Action:** Always verify custom inputs have explicit id and htmlFor attributes.

## 2024-03-23 - Added Context-Aware ARIA Labels to Cart Drawer
**Learning:** Found that icon-only buttons (like "✕") and vaguely-named action buttons (like "REMOVE" next to a product name) lacked context for screen readers in the cart component, making it difficult for users to know *what* they were removing.
**Action:** When mapping over items to generate remove/action buttons, always include the item's name/title dynamically in the `aria-label` (e.g., `aria-label={\`Remove \${item.title} from cart\`}`) rather than a static "Remove item" label, so screen reader users hear exactly what action they are about to perform.
