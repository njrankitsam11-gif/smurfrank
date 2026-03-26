## 2025-03-05 - Deduplicate Prisma Queries with React cache()
**Learning:** Next.js pages often duplicate database queries if the same data is needed in both `generateMetadata` and the page component (e.g., fetching a listing by ID).
**Action:** Use `React.cache()` to wrap the Prisma query function. This memoizes the request for the lifetime of the server request, deduplicating identical queries and improving performance without changing the data flow or requiring manual state management.

## 2023-11-20 - [Query Deduplication]
**Learning:** Next.js Server Components and generateMetadata do not deduplicate direct Prisma database queries by default.
**Action:** Always wrap Prisma calls in React.cache() when using them across multiple server-side functions for the same request to prevent redundant queries.

## 2025-03-05 - Fix Next.js Build Vercel Issue with Prisma Queries
**Learning:** In Next.js App Router, using Prisma to query the database inside `sitemap.js` will cause `npm run build` to fail on platforms like Vercel if the `DATABASE_URL` environment variable is not available during the static prerendering phase. Next.js attempts to execute `sitemap.js` at build time to statically generate `/sitemap.xml`.
**Action:** When a server component or route like `sitemap.js` relies on a database connection that is only available at runtime, explicitly opt it out of static generation by adding `export const dynamic = 'force-dynamic';`. This forces the route to evaluate on-demand during the request, skipping the failing query during the build step.
