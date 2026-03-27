## 2026-03-25 - [Password Complexity Policy Missing]
**Vulnerability:** Weak password requirement (< 6 chars) in registration API.
**Learning:** The simple length check was likely implemented for speed over security, leaving accounts vulnerable to dictionary attacks.
**Prevention:** Always use a robust regex policy (e.g., uppercase, lowercase, digit, special char, length >= 8) for user registration.

## 2023-10-27 - [Missing Security Headers]
**Vulnerability:** Missing standard security headers (X-Frame-Options, HSTS, etc.) leaving the app exposed to clickjacking and MIME sniffing.
**Learning:** Security headers (e.g., Strict-Transport-Security, X-Frame-Options, Content-Security-Policy) are enforced globally by configuring an async `headers()` method in `next.config.mjs`.
**Prevention:** Always include a baseline set of security headers in Next.js configuration for all routes (`/(.*)`).

## 2026-03-25 - [Missing Rate Limiting on Registration]
**Vulnerability:** The registration endpoint lacks rate limiting, allowing attackers to spam registration requests, potentially leading to a denial of service (DoS) condition or user enumeration.
**Learning:** Basic in-memory rate limiting using a Map to track IPs and timestamps can mitigate simple abuse on unprotected endpoints.
**Prevention:** Always implement rate limiting on authentication and registration endpoints to prevent brute-force and spam attacks.
