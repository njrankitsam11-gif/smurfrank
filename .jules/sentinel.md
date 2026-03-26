## 2026-03-25 - [Password Complexity Policy Missing]
**Vulnerability:** Weak password requirement (< 6 chars) in registration API.
**Learning:** The simple length check was likely implemented for speed over security, leaving accounts vulnerable to dictionary attacks.
**Prevention:** Always use a robust regex policy (e.g., uppercase, lowercase, digit, special char, length >= 8) for user registration.
