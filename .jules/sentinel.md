## 2024-05-24 - Missing Global Security Headers in Next.js
**Vulnerability:** The Next.js application lacked global security headers like Content-Security-Policy, X-Frame-Options, and Strict-Transport-Security.
**Learning:** Next.js does not enforce these security headers by default. A developer must explicitly define an async `headers()` method in `next.config.mjs` to apply them globally across all routes.
**Prevention:** Always implement a secure baseline of HTTP headers in `next.config.mjs` for every new Next.js project to prevent XSS, clickjacking, and secure data transmission.