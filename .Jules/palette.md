## 2024-03-24 - Form Label Associations and ARIA Labels
**Learning:** In custom Next.js forms, `htmlFor` label associations and `id` tags are often missing, reducing screen reader compatibility. Additionally, custom icon-only buttons often lack `aria-label` attributes.
**Action:** Always ensure `htmlFor` and `id` attributes are used to associate labels with inputs, and add descriptive `aria-label` attributes to any button that relies solely on an icon or symbol for its visual meaning.
