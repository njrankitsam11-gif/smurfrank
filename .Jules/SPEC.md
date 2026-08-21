# RankVault — Project Spec

Reference this file at the start of every session before making changes. Update it whenever a module/feature is completed (see "Update protocol" at the bottom).

## What this is

"RankVault" — a Next.js marketplace for buying gaming accounts / boosting services (CS2, Valorant, GTA V Online). Users browse listings by game, add to a client-side cart, and "check out" through a simulated multi-method payment form (no real payment gateway is wired up yet).

## Audit status (2026-08-21)

A full-codebase audit was run before further feature work: `npm run lint`, `npx jest`, `bun test bun.test`, `npm run build`, and a manual scan for schema/field mismatches, dead code, and missing env docs. Result: **lint clean (0 errors), Jest 4/4 suites & 21/21 tests pass, Bun 8/8 files & 27/27 tests pass, production build succeeds.** (`bun` isn't preinstalled in every environment — `npm install -g bun` gets it if `which bun` comes up empty.) Several real bugs/gaps were found and fixed across this pass (see "Known loose ends" below for detail): a corrupted `package-lock.json` masking module-resolution errors, `app/sitemap.js` querying a non-existent `status` field (silently dropping every listing URL from the sitemap), a missing `.env.example`/README env-setup section/`prisma.seed` config, a fragile `CartDrawer.bun.test.js` that broke on a `next/link` module self-reference, and a `MockRequest` in `errorHandling.bun.test.js` that was missing `.headers` entirely — every test in that file was silently exercising the wrong code path (and, once `.headers` was added back, colliding with other files over the shared in-memory rate-limit map) while still asserting the same expected 500, masking the fact that none of them tested what they claimed to. Remaining known gaps (unchanged, deliberate, not bugs): checkout is UI-only/no real payment processor, RTK Query's `getListings` endpoint is dead code, cart state isn't unified with Redux, rate limiting is in-memory/per-process, and the root-level `patch*.js` files are unverified stray artifacts.

## Stack

- **Framework:** Next.js 16.1.6 (App Router), React 19.2.3
- **DB/ORM:** PostgreSQL via Prisma 5.22 (`prisma/schema.prisma`)
- **Auth:** next-auth 4.24 (Credentials provider, JWT sessions)
- **State:** Redux Toolkit + RTK Query (`lib/store.ts`, `lib/features/api/apiSlice.ts`) — currently only a `getListings` query stub; cart state is NOT in Redux (see below)
- **Styling:** mostly inline `style={{...}}` objects + a few CSS Modules (`Navbar.module.css`, `Footer.module.css`, `sell/page.module.css`) + Tailwind v4 configured but lightly used
- **Testing:** Jest (`*.test.js`, jsdom) for React/unit, Bun test (`*.bun.test.js`) for API/logic-heavy tests. Run both via `npm test`.
- **Payments:** `stripe` / `@stripe/stripe-js` are dependencies but **not actually integrated** — checkout is a client-side mock (`setTimeout` → redirect to `/checkout/success`).

## Directory map

```
app/
  page.js + page.client.js        Home page (server shell + client interactivity)
  cs2/ gta-v/ valorant/           Per-game listing pages, each: page.js (server, fetches/passes data) + page.client.js (client UI)
  boosting/page.js                Boosting service page
  search/page.js                  Server component — reads searchParams, queries prisma.listing with pagination (Promise.all count+findMany, take/skip bounded — see .Jules/bolt.md)
  listings/[id]/page.js           Single listing detail (prisma.listing.findUnique)
  checkout/page.js                Mock multi-method payment form (card/paypal/crypto/stripe/razorpay UI, no real processor)
  checkout/success/page.js        Post-"payment" confirmation
  login/page.js, register/page.js Auth pages (next-auth signIn / POST /api/register)
  sell/page.js + page.client.js   Sell-your-account intake page
  api/auth/[...nextauth]/route.js next-auth handler (Credentials provider, bcrypt, in-memory rate limiting/lockout)
  api/register/route.js           Registration endpoint (bcrypt hash, in-memory IP rate limit, strict email/password validation)
  layout.js, client-layout.js     Root layout + client providers wrapper
  sitemap.js, robots.js           SEO — sitemap.js queries prisma.listing bounded by `take` (see .Jules/bolt.md)

components/
  Navbar.js / .module.css         Site nav
  Footer.js / .module.css         Site footer
  CartDrawer.js                   Slide-out cart UI, reads from CartContext
  HotDealsFeed.js                 Promo/deals feed component
  SortFilter.js                   Sort control, used with hooks/useProductSort
  ReduxProvider.tsx                Wraps app with Redux <Provider>

context/
  CartContext.js                  Client-side cart state (React Context, NOT Redux): addToCart, removeFromCart, increaseQuantity, decreaseQuantity, isOpen/setIsOpen, memoized `total`

hooks/
  useProductSort.js               Memoized sort (BEST_SELLER reverses; LOW_HIGH/HIGH_LOW parses price string numerically) — see __tests__/hooks/useProductSort.test.js

lib/
  prisma.js                       Prisma client singleton
  logger.js                       App logger (`logger.info/error` — used instead of console.* for auditability)
  store.ts                        Redux store (mounts rankvaultApi reducer/middleware only)
  features/api/apiSlice.ts        RTK Query API slice — `getListings` endpoint hits `/api/listings` (NOTE: no such route exists yet — likely unused/stub, verify before relying on it)

prisma/
  schema.prisma                   Models: Listing (id, title, game, rank, region, price, level, wins, hours, type, instant, description, includes[], active, timestamps), User (id, email unique, password hash, name?, role default "buyer", createdAt)
  seed.js                         Seeds Listing table with hardcoded CS2/Valorant/GTA V sample data

__tests__/                        Jest specs (api/auth.test.js + nextauth.test.js both target the nextauth authorize/callbacks — kept separate on purpose, one covers core logic, the other rate-limiting; hooks; listings/[id]).
*.bun.test.js (scattered)         Bun specs colocated with source (CartContext, CartDrawer, register route sub-behaviors — app/api/register/{route,emailValidation,passwordValidation,errorHandling,rateLimit}.bun.test.js is the canonical/most-thorough coverage for the register route; a redundant Jest duplicate of the basic cases was removed, see below)

.Jules/                           Persistent learnings logs (read + update these; see below)
```

## Known loose ends / things to verify before touching

- Root-level `patch*.js` / `patch.diff` files (patch.diff, patch2.js, patch_diff.js, patch_fix_client.js, patch_revert_client.js, patch_test.js, patch_test2.js) look like stray one-off patch artifacts, not part of the app. Confirm before deleting or relying on them.
- `lib/features/api/apiSlice.ts` defines `getListings` hitting `/api/listings`, but no `app/api/listings` route exists in the tree — Redux/RTK Query appears to be scaffolded but not actually wired into the listing pages (which use direct `prisma` calls in server components instead). Don't assume RTK Query is live without checking again.
- Checkout is fully mocked (no Stripe PaymentIntent, no webhook, no real charge) despite `stripe`/`@stripe/stripe-js` in package.json — treat "payment" as UI-only until this is built out.
- Cart state lives in React Context (`CartContext`), separate from the Redux store — the two state systems are not unified.
- Rate limiting (register route, next-auth authorize) is in-memory `Map`-based, per-process — will not work correctly across multiple serverless instances/regions. Fine for now, but not a real distributed rate limiter.
- `__tests__/api/register/route.test.js` (Jest) was deleted — its cases (missing email/password, existing email, 400/201 responses, generic 500s) were a strict subset of the Bun suite in `app/api/register/*.bun.test.js`, which also covers hash failures and Prisma unique-constraint errors that the Jest file lacked. If you add new register-route coverage, add it to the Bun suite, not a new Jest file, to avoid re-introducing the split.
- Fixed (was broken): `jest.config.mjs` sets a global `testEnvironment: 'node'`, so any Jest spec needing the DOM must opt in per-file with a `/* @jest-environment jsdom */` docblock at the top — `useProductSort.test.js` was missing it. Separately, `package-lock.json` had a corrupted entry for `jest-environment-jsdom` (wrong dependency list, missing `@jest/environment-jsdom-abstract`), which broke `Navbar.test.js` even though it had the docblock; fixed by re-resolving that one package (`npm install jest-environment-jsdom@30.3.0 --save-dev`), not by a plain reinstall. If a Jest spec needs jsdom, add the docblock; if `Cannot find module '@jest/environment-jsdom-abstract'` reappears, the lockfile entry has drifted again — re-resolve rather than editing it by hand.
- Fixed: `app/sitemap.js` queried `prisma.listing.findMany({ where: { status: 'ACTIVE' } })`, but `Listing` has no `status` field — only `active: Boolean` (see `prisma/schema.prisma`, and the correct usage in `app/search/page.js`). This threw a Prisma validation error on every run, silently swallowed by the surrounding `try/catch`, so **the sitemap has never included any listing URLs**, even against a real database — an SEO-impacting bug masked by error handling, not just missing `DATABASE_URL` locally. Fixed to `where: { active: true }`; also switched its `console.error` to `logger.error` to match the logging convention.
- Fixed: no `.env.example` existed and README had zero mention of required env vars (`DATABASE_URL`, `NEXTAUTH_SECRET`) or DB setup — a real onboarding gap. Added `.env.example` and a README "Environment Variables" section. Also added the missing `"prisma": { "seed": "node prisma/seed.js" }` block to `package.json` — without it, `npx prisma db seed` (the standard command, now referenced in the README) fails with "no seed command configured."
- `package-lock.json` has been found corrupted twice now (once for `jest-environment-jsdom`, once for `braces`/`fill-range` — both had wrong/missing `dependencies` entries that survived a plain `npm install` and even a `rm -rf node_modules && npm install`, since npm trusts the lockfile's declared dependency graph). Root cause unconfirmed (possibly a hand-edit or bad merge at some point in history) but not yet fully ruled out as recurring — if `Cannot find module '<something>'` errors show up from deep inside `node_modules` for tools that otherwise "should" work (eslint, jest, etc.), don't assume it's a real code bug: try `rm -rf node_modules package-lock.json && npm install` first (full lockfile regen, since single-package re-resolution isn't reliably enough — see the full audit below) before treating it as an application issue.
- Fixed: `components/CartDrawer.bun.test.js` called `CartDrawer()` directly (bypassing React's renderer) and `JSON.stringify`'d the raw element tree to search for content — but a `<Link>` element's `type` is a `forwardRef` object whose `.default` property self-references the object itself (a `next/link` module-shape quirk), which `JSON.stringify` can't walk. Real rendering never touches `type` this way, so this only ever broke the test, not the component. Fixed with a `safeStringify` replacer that skips `_owner`/`_store`/`ref` and reduces non-string `type` values to just their name instead of descending into them.
- Fixed: `app/api/register/route.js`'s in-memory `rateLimitMap` is a **module-level singleton** — every `*.bun.test.js` file under `app/api/register/` that imports `route.js` in the same `bun test` run shares the same map (Bun caches ES module instances process-wide, it doesn't reset them per test file). `errorHandling.bun.test.js`'s `MockRequest` was missing `.headers` entirely, so every one of its tests was actually crashing on `request.headers.get(...)` *before* reaching the code path each test claimed to exercise (findUnique failure, hash failure, parse failure, Prisma constraint failure) — coincidentally still returning the same 500 the tests asserted, so nothing looked broken. Adding `.headers` back exposed the real bug: those requests all defaulted to IP `'unknown'`, colliding with other files' requests against the shared rate limiter and getting `429`'d instead. Fixed by giving that file's `MockRequest` the same per-request unique-IP pattern (`'test-ip-' + (++reqCounter)`) already used in `emailValidation.bun.test.js`/`passwordValidation.bun.test.js`. If you add a new Bun test file that hits `route.js` (register or elsewhere with in-memory rate limiting), give every request a unique `x-forwarded-for` unless you're specifically testing the rate limiter itself — don't rely on the default IP.

## Repo hygiene / environment gotchas

- **Case-sensitivity trap (resolved once, can recur):** Prior sessions on a case-insensitive filesystem (macOS) accidentally committed both `.Jules/*` and `.jules/*` as *separate tracked git paths* pointing at what is really one file on disk. Because macOS treats `.Jules` and `.jules` as the same path, whichever casing was last written silently overwrote the other in the working tree, while git kept both blobs in its index with diverging content — this caused real content loss in `bolt.md`/`sentinel.md`/`palette.md` across sessions before it was caught and fixed (PR #210, commit `f852e5b`). All `.Jules/*.md` content should be trusted as canonical going forward; only ever write to the `.Jules/` (capital J) path.
- **Symptom if it recurs:** `git status` shows a phantom modified file (`.Jules/palette.md` or `.jules/palette.md`) with no session-initiated edit behind it, and `git pull`/`git stash pop` loops between two diff states instead of resolving — because checking out one case-variant path always dirties the other on disk. If you see this, don't trust `git checkout -- <file>` to fix it (it will just flip which variant is dirty); check `git ls-files | grep -i jules` for duplicate tracked paths first.
- **Fix if it recurs:** diff `git show HEAD:.Jules/<f>` vs `git show HEAD:.jules/<f>` to find any content that exists in only one, merge into a single canonical `.Jules/<f>` on disk, `git rm --cached` the lowercase duplicate, `git add` the canonical file, and commit. If a normal `git pull` is blocked by the resulting phantom diff and stashing doesn't clear it, `git fetch` + `git reset --hard origin/<branch>` (after confirming with the user, since it's destructive) jumps straight to the fixed remote state without walking through the broken intermediate one.

## Conventions established in this repo (from prior sessions — see .Jules/*.md for full detail)

- Bound all Prisma `findMany` with `take`/`skip`; use `Promise.all` for count+findMany pagination pairs.
- Pre-parse/memoize sort keys before `.sort()`, don't do regex/parsing inside the comparator.
- Use `logger.error`/`logger.info` (lib/logger.js), never bare `console.*`, and always log real errors server-side even when returning a generic message to the client.
- Validate API input: explicit `typeof === 'string'` checks + max length before processing; password policy requires upper+lower+digit+special+min 8 chars.
- Security headers are centralized in `next.config.mjs` `headers()` — add new global headers there, not per-route.
- Icon-only buttons and dynamic list item controls need descriptive `aria-label`s (e.g. `Remove ${item.title}`).
- Avoid `dangerouslySetInnerHTML` for styles — use `<style>{...}</style>` or CSS Modules.

## Update protocol

After completing a module or feature:
1. Update the relevant section above (directory map / conventions / loose ends) if structure changed.
2. If the change embeds a *reusable, non-obvious* lesson (perf, security, accessibility, or another recurring category), append a dated entry to the matching `.Jules/*.md` log (`bolt.md`=performance, `sentinel.md`=security, `palette.md`=accessibility/UI; create a new topic file if none fits) using the existing `## YYYY-MM-DD - Title` / `**Learning:**` / `**Action/Prevention:**` format.
3. Keep entries terse — one paragraph each. Don't duplicate an existing entry; extend it instead if the same issue recurs.
4. Before appending, scan the target `.Jules/*.md` log for exact/near-duplicate entries and check it's still in chronological (`## YYYY-MM-DD`) order — new entries have drifted out of order and been duplicated before (fixed in PRs #212, #213, #214). Insert new entries in date order rather than always appending at the end, and fix any drift/dupes you spot while you're in there.
