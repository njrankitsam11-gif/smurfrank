1. **Add `cache()` to deduplicate Prisma calls in `app/listings/[id]/page.js`**
   - The file `app/listings/[id]/page.js` makes the identical database call `prisma.listing.findUnique({ where: { id } })` twice: once in `generateMetadata` and once in the component `ListingDetailPage`.
   - Wrapping the query in React's `cache()` will prevent the redundant database query and make the page load faster.

2. **Verify changes**
   - Run linter and tests.

3. **Complete pre-commit steps**
   - Complete pre-commit steps to ensure proper testing, verification, review, and reflection are done.

4. **Submit PR**
   - Submit the PR with the performance improvements.
