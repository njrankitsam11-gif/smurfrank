## 2024-03-28 - Bounding Unbounded Database Queries with Pagination

**Learning:** Unbounded database queries (e.g., `findMany` without `take`/`limit`) cause significant performance degradation as the dataset grows. They force the database to scan, serialize, and transmit potentially millions of rows, and force the Node.js application to allocate massive amounts of memory for the resulting objects, leading to increased garbage collection pauses and potential OOM crashes. Bounding the query using `take` and `skip` ensures O(1) memory usage in the application and drastically reduces network I/O, independent of the total dataset size.

**Action:** Always apply pagination controls (`take` and `skip` in Prisma, or equivalent `LIMIT`/`OFFSET` in raw SQL) to list endpoints or pages where the result set is variable and potentially large. When the total number of pages is needed for UI pagination, use a concurrent `.count()` query alongside the bounded `.findMany()` using `Promise.all` to minimize total response time.

## 2024-10-27 - Concurrent Database Queries

**Learning:** When multiple independent database queries are needed (such as `count` for pagination alongside `findMany` for the result set), awaiting them sequentially artificially doubles the database response time, leading to slower page loads.

**Action:** Use `Promise.all` to execute independent database queries concurrently to minimize total execution time, especially on list or search pages where pagination data is required.

## 2024-11-20 - Bounding Sitemap Generation
**Learning:** Next.js `sitemap.js` generation routes execute server-side and, if using unbounded ORM queries (like `prisma.listing.findMany({ where: { active: true } })`), can quickly exceed Vercel/Node.js serverless function memory limits as the marketplace scales to tens of thousands of listings.
**Action:** Even for administrative or SEO routes like sitemaps, always append a `take: [LIMIT]` (e.g., `take: 10000`) to unbounded database queries to ensure O(1) memory complexity and avoid silent OOM deployment crashes.

## 2025-05-14 - Pre-parsing sorting keys to optimize sort performance
**Learning:** Performing expensive operations like regex matching and string parsing inside a sort comparator function results in O(N log N) overhead, which can be significant for larger datasets. Pre-calculating these values once (O(N)) before sorting reduces the comparator to simple numeric subtraction.
**Action:** Always pre-calculate or memoize complex sort keys before invoking .sort() to ensure the comparator remains O(1) and the overall sort operation stays efficient.
## 2025-05-14 - Pre-parsing sorting keys to optimize sort performance
**Learning:** Performing expensive operations like regex matching and string parsing inside a sort comparator function results in O(N log N) overhead, which can be significant for larger datasets. Pre-calculating these values once (O(N)) before sorting reduces the comparator to simple numeric subtraction.
**Action:** Always pre-calculate or memoize complex sort keys before invoking .sort() to ensure the comparator remains O(1) and the overall sort operation stays efficient.
## 2024-04-02 - Memoizing Sort Transforms
**Learning:** Parsing strings inside a sort comparator creates an O(N log N) overhead, which can be mitigated by mapping the keys once before sorting (Schwartzian Transform) and wrapping it in `useMemo`.
**Action:** When sorting lists based on derived values (e.g. parsing currency strings), always pre-calculate the values and memoize the sorted array based on the active sort state.
