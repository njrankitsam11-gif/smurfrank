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

## 2026-03-29 - [Missing Input Length Limits]
**Vulnerability:** Unbounded query parameters in the search page allowed arbitrarily long strings to be passed to the database query engine.
**Learning:** While Prisma protects against SQL injection, extremely long search strings can still cause excessive memory usage or ReDoS-style performance degradation during database index lookups.
**Prevention:** Always enforce reasonable maximum lengths (e.g., 100 characters) on unconstrained user input like search queries before passing them to the backend.

## 2026-03-31 - [Missing Type and Length Limits on Auth APIs]
**Vulnerability:** Unbounded JSON payload fields in authentication and registration APIs could allow type-based injection or DoS via memory exhaustion/ReDoS.
**Learning:** Parsing JSON bodies directly without type checking or length limits leaves endpoints vulnerable to large payloads or unexpected object types (like arrays).
**Prevention:** Always explicitly validate that user inputs are strings and enforce reasonable maximum lengths before processing.

## 2026-03-31 - [Unsafe dangerouslySetInnerHTML for Styles]
**Vulnerability:** Use of dangerouslySetInnerHTML for hardcoded CSS.
**Learning:** Even if the input is hardcoded, using dangerouslySetInnerHTML for styles is a bad practice and can be a vector if the string becomes dynamic.
**Prevention:** Use CSS Modules or standard CSS-in-JS solutions instead of injecting raw HTML style tags.

## 2026-03-31 - [Unsafe dangerouslySetInnerHTML for Styles (Fixed)]
**Vulnerability:** Use of `dangerouslySetInnerHTML` for injecting hardcoded CSS in `app/register/page.js` and `app/login/page.js`.
**Learning:** Even if the input is currently hardcoded and not exploitable, using `dangerouslySetInnerHTML` is an anti-pattern and a potential vector for XSS if the string becomes dynamic or user-controlled in the future.
**Prevention:** Always use standard React style definitions (like inline `<style>{'...'}</style>`) or CSS Modules instead of bypassing React's built-in protections with `dangerouslySetInnerHTML`.

## 2026-03-31 - [Unlogged Authentication/Registration Errors]
**Vulnerability:** Unlogged 500 errors in `app/api/register/route.js`. When a registration fails, the error details (like database disconnections or constraint failures) were silently dropped and only a generic 500 message was returned to the user, making security auditing and debugging impossible.
**Learning:** Returning a generic error to the user is a good security practice (prevents info leakage), but failing to log the actual error internally creates a blind spot for security incident response and troubleshooting.
**Prevention:** Always log exceptions securely using the application's internal logger (`logger.error`) before returning a generic HTTP 500 error to the client.

## 2026-04-29 - Fix Email Case Sensitivity Vulnerability
**Vulnerability:** Email was treated case-sensitively during authentication and registration, allowing an attacker to register multiple accounts with the same email (e.g., `User@example.com` and `user@example.com`) or preventing legitimate users from logging in if they typed their email with different casing than when they registered.
**Learning:** Prisma's `findUnique` does not support case-insensitive queries (`mode: 'insensitive'`), leading to potential security vulnerabilities related to account duplication and credential matching.
**Prevention:** Always normalize email inputs (`trim().toLowerCase()`) and use Prisma's `findFirst` with `{ where: { email: { equals: normalizedEmail, mode: 'insensitive' } } }` for authentication and registration to prevent case-sensitivity vulnerabilities.
