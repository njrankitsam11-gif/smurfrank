## 2025-03-05 - Deduplicate Prisma Queries with React cache()
**Learning:** Next.js pages often duplicate database queries if the same data is needed in both `generateMetadata` and the page component (e.g., fetching a listing by ID).
**Action:** Use `React.cache()` to wrap the Prisma query function. This memoizes the request for the lifetime of the server request, deduplicating identical queries and improving performance without changing the data flow or requiring manual state management.

## 2023-11-20 - [Query Deduplication]
**Learning:** Next.js Server Components and generateMetadata do not deduplicate direct Prisma database queries by default.
**Action:** Always wrap Prisma calls in React.cache() when using them across multiple server-side functions for the same request to prevent redundant queries.
