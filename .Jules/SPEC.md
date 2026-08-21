# RankVault — Project Spec

Reference this file at the start of every session before making changes. Update it whenever a module/feature is completed (see "Update protocol" at the bottom).

## What this is

"RankVault" — a Next.js marketplace for buying gaming accounts / boosting services (CS2, Valorant, GTA V Online). Users browse listings by game, add to a client-side cart, and "check out" through a simulated multi-method payment form (no real payment gateway is wired up yet).

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

__tests__/                        Jest specs (api/auth, api/register, hooks, listings/[id])
*.bun.test.js (scattered)         Bun specs colocated with source (CartContext, CartDrawer, register route sub-behaviors)

.Jules/                           Persistent learnings logs (read + update these; see below)
```

## Known loose ends / things to verify before touching

- Root-level `patch*.js` / `patch.diff` files (patch.diff, patch2.js, patch_diff.js, patch_fix_client.js, patch_revert_client.js, patch_test.js, patch_test2.js) look like stray one-off patch artifacts, not part of the app. Confirm before deleting or relying on them.
- `lib/features/api/apiSlice.ts` defines `getListings` hitting `/api/listings`, but no `app/api/listings` route exists in the tree — Redux/RTK Query appears to be scaffolded but not actually wired into the listing pages (which use direct `prisma` calls in server components instead). Don't assume RTK Query is live without checking again.
- Checkout is fully mocked (no Stripe PaymentIntent, no webhook, no real charge) despite `stripe`/`@stripe/stripe-js` in package.json — treat "payment" as UI-only until this is built out.
- Cart state lives in React Context (`CartContext`), separate from the Redux store — the two state systems are not unified.
- Rate limiting (register route, next-auth authorize) is in-memory `Map`-based, per-process — will not work correctly across multiple serverless instances/regions. Fine for now, but not a real distributed rate limiter.

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
