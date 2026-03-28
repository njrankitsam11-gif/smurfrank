## 2026-03-25 - [Password Complexity Policy Missing]
**Vulnerability:** Weak password requirement (< 6 chars) in registration API.
**Learning:** The simple length check was likely implemented for speed over security, leaving accounts vulnerable to dictionary attacks.
**Prevention:** Always use a robust regex policy (e.g., uppercase, lowercase, digit, special char, length >= 8) for user registration.

## 2023-10-27 - [Missing Security Headers]
**Vulnerability:** Missing standard security headers (X-Frame-Options, HSTS, etc.) leaving the app exposed to clickjacking and MIME sniffing.
**Learning:** Security headers (e.g., Strict-Transport-Security, X-Frame-Options, Content-Security-Policy) are enforced globally by configuring an async `headers()` method in `next.config.mjs`.
**Prevention:** Always include a baseline set of security headers in Next.js configuration for all routes (`/(.*)`).

## 2026-03-27 - [Missing Input Length Limits]
**Vulnerability:** Unbounded query parameters in the search page allowed arbitrarily long strings to be passed to the database query engine.
**Learning:** While Prisma protects against SQL injection, extremely long search strings can still cause excessive memory usage or ReDoS-style performance degradation during database index lookups.
**Prevention:** Always enforce reasonable maximum lengths (e.g., 100 characters) on unconstrained user input like search queries before passing them to the backend.
