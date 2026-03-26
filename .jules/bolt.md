## 2023-11-20 - [Query Deduplication]
**Learning:** Next.js Server Components and generateMetadata do not deduplicate direct Prisma database queries by default.
**Action:** Always wrap Prisma calls in React.cache() when using them across multiple server-side functions for the same request to prevent redundant queries.
