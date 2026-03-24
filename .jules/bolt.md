## 2025-03-05 - Deduplicate Prisma Queries with React cache()
**Learning:** Next.js pages often duplicate database queries if the same data is needed in both `generateMetadata` and the page component (e.g., fetching a listing by ID).
**Action:** Use `React.cache()` to wrap the Prisma query function. This memoizes the request for the lifetime of the server request, deduplicating identical queries and improving performance without changing the data flow or requiring manual state management.
