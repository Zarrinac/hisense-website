# Hisense Iran Web App — Documentation

Marketing and support website for Hisense Iran (hisense-ir.com). Bi-lingual (Persian/English), SEO-first, with a full admin portal and automated ops pipeline.

**Last updated: 2026-06-09**

---

## Table of Contents

1. [Quick Start](#quick-start)
2. [Tech Stack](#tech-stack)
3. [Environment Variables](#environment-variables)
4. [Directory Map](#directory-map)
5. [Database Schema](#database-schema)
6. [Data & API Flow](#data--api-flow)
7. [Routing & Pages](#routing--pages)
8. [Admin Portal](#admin-portal)
9. [Product Catalog](#product-catalog)
10. [Service Centers](#service-centers)
11. [Complaint & Survey Forms](#complaint--survey-forms)
12. [Downloads](#downloads)
13. [Internationalization](#internationalization)
14. [Styling & Theming](#styling--theming)
15. [SEO Infrastructure](#seo-infrastructure)
16. [Ops & Deployment](#ops--deployment)
17. [Security Notes](#security-notes)
18. [Content Management Tips](#content-management-tips)
19. [Known Gotchas](#known-gotchas)

---

## Quick Start

Requirements: Node 20+, npm, PostgreSQL (optional — app runs on static fallback without it).

```bash
cp .env.example .env.local   # fill DATABASE_URL, NEXT_PUBLIC_SITE_URL, admin secrets
npm install
npm run dev                  # http://localhost:3000
```

| Command                           | Purpose                                                 |
| --------------------------------- | ------------------------------------------------------- |
| `npm run dev`                     | Dev server at http://localhost:3000                     |
| `npm run build`                   | Production build (auto-runs sitemap postbuild)          |
| `npm run start`                   | Serve production build                                  |
| `npm run lint`                    | ESLint check                                            |
| `npm run format`                  | Prettier format                                         |
| `npm run db:migrate`              | Apply Prisma migrations (dev, creates migration file)   |
| `npm run db:deploy`               | Apply existing migrations (production)                  |
| `npm run db:seed`                 | Seed all data (products + locations + downloads + reps) |
| `npm run db:seed:products`        | Seed products only                                      |
| `npm run db:seed:locations`       | Seed Iran provinces and cities                          |
| `npm run db:seed:downloads`       | Seed download assets                                    |
| `npm run logos:scan`              | Regenerate the feature-card black-icon invert manifest  |
| `npm run db:seed:representatives` | Seed service representatives                            |

---

## Tech Stack

| Layer     | Technology                                                          |
| --------- | ------------------------------------------------------------------- |
| Framework | Next.js 16 App Router, React 19, TypeScript (strict)                |
| i18n      | next-intl (locales: `fa` default, `en`)                             |
| Database  | PostgreSQL via Prisma 7 (optional — static fallback when absent)    |
| Styling   | Tailwind CSS v4 + CSS custom properties for theming                 |
| UI        | MUI 9 (Autocomplete, TextField, Select for forms)                   |
| Forms     | react-hook-form + Zod via @hookform/resolvers/zod                   |
| SEO       | Hand-written JSON-LD, generateMetadata, native app/sitemap.ts route |
| Analytics | Google Analytics 4 (via `NEXT_PUBLIC_GA_ID`), GTM noscript          |
| Testing   | None — no unit or E2E suite exists (see "Testing" below)            |
| Linting   | ESLint + Prettier, enforced by Husky pre-commit (lint-staged)       |

---

## Environment Variables

| Variable                               | Required | Purpose                                                                                              |
| -------------------------------------- | -------- | ---------------------------------------------------------------------------------------------------- |
| `DATABASE_URL`                         | Optional | PostgreSQL connection string; app runs on static fallback if absent                                  |
| `NEXT_PUBLIC_SITE_URL`                 | Yes      | Canonical/OG base URL (e.g., `https://hisense-ir.com`)                                               |
| `NEXT_PUBLIC_SITE_ID`                  | Optional | `"hisense"` (default) or `"zarrinac"` — brand tag for the shared DB (see `ops/shared-db-runbook.md`) |
| `ADMIN_USERNAME`                       | Fallback | Bootstrap/outage admin username (DB `AdminUser` is primary — see Admin → Authentication)             |
| `ADMIN_PASSWORD`                       | Fallback | Bootstrap/outage admin password (only used when no `AdminUser` rows exist or DB is down)             |
| `ADMIN_SESSION_SECRET`                 | Yes      | HMAC-SHA256 key for signing session tokens (required for any admin login)                            |
| `INTERNAL_API_BASE_URL`                | Dev      | Internal fetch base (`http://localhost:3000` in dev)                                                 |
| `NEXT_PUBLIC_MEDIA_BASE_URL`           | Optional | CDN base for product images (defaults to `/` for local serving)                                      |
| `NEXT_PUBLIC_CONTENT_SOURCE`           | Optional | `"local"` or `"remote"` content mode                                                                 |
| `NEXT_PUBLIC_GA_ID`                    | Optional | Google Analytics 4 measurement ID                                                                    |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Optional | Google Search Console verification token                                                             |
| `NEXT_PUBLIC_BING_SITE_VERIFICATION`   | Optional | Bing Webmaster Tools verification token                                                              |

---

## Directory Map

```
app/                    Pages, layouts, API routes, sitemap/robots generators
  [locale]/             All public-facing pages (locale = fa | en)
  admin/                Admin portal (JWT-protected)
  api/                  Route handlers (products, admin auth, complaints, surveys)
  sitemap.ts            Native Next.js sitemap generator (replaces next-sitemap)
  robots.ts             Robots.txt generator
components/             UI components grouped by feature
  admin/                AdminShell, AdminPageHeader, AdminStatusCard, AdminSubmissionTables
  complaint/            ComplaintForm (multi-step)
  header/               DesktopNavigation, MobileNavPanel, SearchOverlay
  hero/                 HeroBanner (homepage carousel)
  home/                 CategorySpotlights
  refrigerator/         RefrigeratorHero
  routes/               createRoutePage scaffold, RouteHero
  seo/                  JsonLd, StructuredData, Analytics, GtmNoScript,
                        PageBreadcrumbs, CategorySeoSection, ProductFaqSection,
                        OfficialLinksSection
  service-centers/      ServiceCenterFinder (province/city autocomplete + results table)
  survey/               SurveyForm (satisfaction survey)
  theme/                ThemeProvider, ThemeToggle (dark/light)
  tv/                   TvHeroCarousel, TvProductShowcase, ContentSections,
                        OverlayContentSections, StackedContentSections,
                        BeforeAfterSlider, FeatureCardImage
  tv/product-detail/    Breadcrumbs, BannerSection, FeatureCardsGrid, FeatureIntro,
                        HeroMedia, MobileHeader, SectionGroupsRenderer,
                        ComparisonSections, SpecsSection
  Footer.tsx, Header.tsx, LanguageSwitcher.tsx, UnderConstruction.tsx,
  ScrollToTopButton.tsx (global back-to-top w/ scroll-progress ring)
content/                Static fallback data
  tvProducts.ts         (legacy) TV catalog fallback
  RefProducts/          Refrigerator catalog fallback
  about/                About-page copy
i18n/                   next-intl routing config and request helpers
lib/                    Cross-cutting utilities
  admin/                auth.ts, dashboard.ts, rateLimit.ts, submissions.ts,
                        i18n.ts, i18n.server.ts, url.ts
  api/products/         normalizers.ts, types.ts, categories.ts, mediaPaths.ts
  complaints/           schema.ts (Zod)
  surveys/              schema.ts (Zod)
  seo/                  site.ts, productSchema.ts, productMeta.ts, productFaq.ts,
                        categorySeoContent.ts, localBusiness.ts, keywords.ts
  contentSource.ts      Toggles local/remote content mode
  db.ts                 Prisma singleton
  iranLocations.ts      Province/city JSON fallback helper
  iranLocationSource.ts DB-first location source with JSON fallback
  serviceCenterSource.ts DB-first service-center source with JSON fallback
  mediaUrl.ts           CDN/local media URL helper
messages/               Translation dictionaries — fa.json and en.json
ops/                    Server operational scripts (version-controlled source of truth)
  deploy.sh             Pull → install → migrate → build → PM2 reload
  sync-media.sh         Rsync media to live dir + fix owner/perms
  upload-media.ps1      Windows-side: scp media + trigger sync over SSH
  optimize-media.mjs    Pre-upload image optimization
  indexnow-ping.mjs     Submit sitemap URLs to IndexNow (Bing/Yandex) post-deploy
  cron/                 hisense-monitor.sh, weekly-backup.sh
prisma/                 Prisma schema + migration history
scripts/                DB seed scripts
seo/                    keywords.txt + keywords helper
types/                  tv.ts (TV product model), wm.ts (washing machine), svg.d.ts
assets/styles/          globals.css (Tailwind v4 + CSS vars), Swiper/Select2 styles
public/                 Images, fonts, PWA manifest
```

---

## Database Schema

All models live in `prisma/schema.prisma`. Postgres is required for the full experience; the app degrades gracefully to static fallback data when `DATABASE_URL` is absent.

### Product catalog

**`Product`** — master product record shared across locales.

- `id` (string PK), `slug` (unique), `category` (enum), `sku`, `series`, `size`, `sizes[]`
- Rich content stored as `Json` fields: `gallery`, `banners`, `featureCards`, `sectionGroups`, `contentSections`, `stackedSections`, `bottomStackedSections`, `comparisonSections`, `experienceSection`, `badges`, `specs`
- Relations: `copies` (ProductCopy[]), `tvSpec` (TvSpec?)

**`ProductCopy`** — locale-specific text for a product.

- `(productId, locale)` unique pair — one row per product per language
- Fields: `name`, `tagline`, `description`, `highlights[]`, `blocks` (Json)

**`TvSpec`** — TV-specific spec sheet (1:1 with Product).

- `panel`, `resolution`, `refreshRate`, `os`, `sound`, `connectivity[]`, `tuner`

```
ProductCategory enum: TVS | WMS | RAC | CAC | REFRIGERATOR | TV_DCODE
```

### Locations

**`IranProvince`** — 31 provinces with bilingual names and sort order.

**`IranCity`** — Cities linked to a province. Index on `(provinceId, sortOrder)`.

### Forms

**`ComplaintSubmission`** — Stores after-sales complaint submissions.

- Unique `referenceCode` generated at submission time.
- Key fields: `fullName`, `phone`, `email?`, `productCategory`, `productModel`, `complaintTopic`, `preferredContactMethod`, `city`, `description`, `status` (default `NEW`).
- `site` (default `hisense`) — brand tag so a shared DB can back both hisense-ir and zarrinac; set from `NEXT_PUBLIC_SITE_ID` on insert, and admin lists/counts filter by it.

**`SurveySubmission`** — After-service satisfaction survey responses.

- Unique `referenceCode`. Rating fields: `communicationClarity`, `staffBehavior`, `timeliness`, `overallSatisfaction`, `followUpConsent`, `overallFeedback`. Also carries the same `site` tag as `ComplaintSubmission`.

> **D'code catalog (`DcodeProduct` / `DcodeVariant` / `DcodeProductCopy`)** exists in the schema for parity with the zarrinac sibling repo (shared DB). hisense-ir has the tables but exposes no `/dcode` routes and never seeds them — they sit unused here. See `ops/shared-db-runbook.md`.

### Downloads

**`DownloadAsset`** — Downloadable files (PDFs, manuals) linked to a page key and locale.

- `(pageKey, locale, fileLocale)` unique. `isActive` flag for toggling visibility.

### Service centers

**`ServiceRepresentative`** — Authorized service centers with bilingual names and addresses.

- Linked to `IranProvince`/`IranCity` by ID (denormalized bilingual names stored too).
- Index on `(provinceId, cityId, serviceKind, sortOrder)`.

---

## Data & API Flow

### Product data sources

| Category           | DB primary                | Static fallback                                          |
| ------------------ | ------------------------- | -------------------------------------------------------- |
| TVs, WMs, RAC, CAC | `Product` + `ProductCopy` | `FALLBACK_PRODUCTS` in `lib/api/products/normalizers.ts` |
| Refrigerators      | `Product` + `ProductCopy` | `content/RefProducts/` directory                         |

The toggle is `NEXT_PUBLIC_CONTENT_SOURCE` (`"local"` / `"remote"`).

### API routes

- `GET /api/products` — returns a normalized `ApiProduct[]`. DB first; falls back to `FALLBACK_PRODUCTS`. Filtered by `?category=` and `?locale=`. Sets `Cache-Control: s-maxage=60, stale-while-revalidate=300` and `X-Data-Source` headers.
- `GET /api/products/[id]` — fetches by `id` or `slug`, same DB→fallback chain.
- `POST /api/complaints` — validates with Zod schema, generates `referenceCode`, saves to DB.
- `POST /api/surveys` — validates with Zod schema, generates `referenceCode`, saves to DB.
- `POST /api/admin/auth/login` — rate-limited login endpoint, returns signed JWT in httpOnly cookie.
- `POST /api/admin/auth/logout` — clears session cookie.
- `PUT /api/admin/locale` — admin sets locale preference.

### Normalization

`lib/api/products/normalizers.ts` converts Prisma rows or static arrays into the `ApiProduct` shape (`lib/api/products/types.ts`). It:

- Merges `ProductCopy` locale rows into the product object (`fa` falls back to `en` copy when missing).
- Sanitizes all `Json` fields with type assertions.
- Builds sensible defaults for missing optional fields (empty banners, section groups, etc.).

### Location & service-center sources

`lib/iranLocationSource.ts` and `lib/serviceCenterSource.ts` follow the same DB-first pattern:

1. Try Postgres query.
2. On error/absence, return the bundled JSON at `lib/iranLocations.json`.

---

## Routing & Pages

The root `app/page.tsx` redirects to `/fa`. All public pages live under `app/[locale]/` (locales: `fa`, `en`).

### Public pages

| Route                                      | Page file                                              | Notes                                              |
| ------------------------------------------ | ------------------------------------------------------ | -------------------------------------------------- |
| `/[locale]`                                | `app/[locale]/page.tsx`                                | Home: hero carousel + category spotlights          |
| `/[locale]/tv-hisense`                     | `app/[locale]/tv-hisense/page.tsx`                     | TV catalog listing (ISR, revalidate=3600)          |
| `/[locale]/tv-hisense/[productId]`         | `app/[locale]/tv-hisense/[productId]/page.tsx`         | TV product detail, full JSON-LD + FAQ              |
| `/[locale]/washing-machine`                | `app/[locale]/washing-machine/page.tsx`                | WM catalog listing                                 |
| `/[locale]/washing-machine/[productId]`    | `app/[locale]/washing-machine/[productId]/page.tsx`    | WM product detail                                  |
| `/[locale]/refrigerator`                   | `app/[locale]/refrigerator/page.tsx`                   | Refrigerator catalog listing                       |
| `/[locale]/refrigerator/[productId]`       | `app/[locale]/refrigerator/[productId]/page.tsx`       | Refrigerator product detail                        |
| `/[locale]/rac`                            | `app/[locale]/rac/page.tsx`                            | Residential AC (under construction)                |
| `/[locale]/cac`                            | `app/[locale]/cac/page.tsx`                            | Commercial AC (under construction)                 |
| `/[locale]/faq`                            | `app/[locale]/faq/page.tsx`                            | FAQPage schema, accordion                          |
| `/[locale]/contact-us`                     | `app/[locale]/contact-us/page.tsx`                     | Contact + LocalBusiness JSON-LD                    |
| `/[locale]/about`                          | `app/[locale]/about/page.tsx`                          | Company overview                                   |
| `/[locale]/warranty-and-guarantee`         | `app/[locale]/warranty-and-guarantee/page.tsx`         | Warranty terms                                     |
| `/[locale]/hisense-repair`                 | `app/[locale]/hisense-repair/page.tsx`                 | Repair services                                    |
| `/[locale]/complaint`                      | `app/[locale]/complaint/page.tsx`                      | After-sales complaint form (multi-step Zod form)   |
| `/[locale]/survey`                         | `app/[locale]/survey/page.tsx`                         | Satisfaction survey form                           |
| `/[locale]/find-service-center`            | `app/[locale]/find-service-center/page.tsx`            | Province/city autocomplete → service center finder |
| `/[locale]/support/find-service-center`    | `app/[locale]/support/find-service-center/page.tsx`    | Legacy path — 308s to `/find-service-center`       |
| `/[locale]/support/portal`                 | `app/[locale]/support/portal/page.tsx`                 | Support portal (noindex)                           |
| `/[locale]/portal`                         | `app/[locale]/portal/page.tsx`                         | Legacy portal path (noindex)                       |
| `/[locale]/support/request-representation` | `app/[locale]/support/request-representation/page.tsx` | Rep application form                               |
| `/[locale]/request-representation`         | `app/[locale]/request-representation/page.tsx`         | Legacy path                                        |
| `/[locale]/not-found`                      | `app/[locale]/not-found.tsx`                           | Locale-aware 404                                   |

### Admin portal pages

All admin pages live under `app/admin/` and are protected by the JWT middleware in `app/admin/layout.tsx`.

| Route                    | Purpose                           |
| ------------------------ | --------------------------------- |
| `/admin/login`           | Login form (rate-limited)         |
| `/admin`                 | Dashboard (stats overview)        |
| `/admin/complaints`      | View/manage complaint submissions |
| `/admin/surveys`         | View/manage survey submissions    |
| `/admin/submissions`     | Combined submissions view         |
| `/admin/products`        | Product listing management        |
| `/admin/service-centers` | Service center management         |
| `/admin/settings`        | Site settings                     |

---

## Admin Portal

The admin portal at `/admin` provides an interface for managing submissions and content.

### Authentication

- **No NextAuth** — custom JWT-based session.
- Session cookie: `hisense_admin_session` (httpOnly, Secure, 8-hour expiry).
- Token signed with `ADMIN_SESSION_SECRET` via HMAC-SHA256. The session payload carries `sub` (username), `uid` (AdminUser id, or `env` for the fallback), and `role`.
- `lib/admin/auth.ts` exports `verifyAdminSession()` — used in `app/admin/layout.tsx`, `proxy.ts`, and all admin server actions. It is **edge-safe** (Web Crypto only, no DB) so it can run in middleware.

#### DB-backed credentials (DB-first, env fallback)

- Credentials live in the **`AdminUser`** table (`username`, `passwordHash`, `role`, `isActive`). Passwords are hashed with Node `scrypt` via `lib/admin/password.ts` (`hashPassword` / `verifyPassword`) — no external dependency.
- `lib/admin/credentials.ts` → `authenticateAdmin()` resolves a login: **DB is the source of truth.** If the username exists, the DB row decides (wrong password / inactive → fail, no fallback). The env `ADMIN_USERNAME` / `ADMIN_PASSWORD` pair is honoured **only** as a bootstrap (zero `AdminUser` rows) or DB-outage fallback.
- `authenticateAdmin` (Prisma + scrypt) is **Node-only** — never import it from `proxy.ts`/edge. The login route (`app/api/admin/auth/login`) runs in the Node runtime, so it's safe there.
- Manage users from the CLI:
  - `npm run db:seed:admins` — idempotently bootstraps the env admin into the DB as `SUPER_ADMIN` (also part of `npm run db:seed`).
  - `npm run admin:create <username> <password> [role]` — create/update a user (`role` defaults to `ADMIN`).
- Migration: `prisma/migrations/20260621000000_add_admin_users`. **Shared-DB note:** mirror the `AdminUser` model + migration into the zarrinac repo (the `prisma/` dirs must stay byte-identical) before deploying.

#### Access control (role matrix)

Roles (`lib/admin/access.ts`) gate admin **sections**. Keep this table in sync with `ROLE_SECTIONS`:

| Section         | SUPER_ADMIN | ADMIN | SERVICE_MANAGER | CIC_MANAGER | EDITOR |
| --------------- | :---------: | :---: | :-------------: | :---------: | :----: |
| Dashboard       |      ✓      |   ✓   |        ✓        |      ✓      |   ✓    |
| Products        |      ✓      |   ✓   |        —        |      —      |   —    |
| Complaints      |      ✓      |   ✓   |        ✓        |      ✓      |   ✓    |
| Surveys         |      ✓      |   ✓   |        ✓        |      ✓      |   ✓    |
| Service centers |      ✓      |   ✓   |        ✓        |      ✓      |   —    |
| Settings        |      ✓      |   ✓   |        —        |      —      |   —    |
| Users           |      ✓      |   —   |        —        |      —      |   —    |

`SERVICE_MANAGER` (مدیر خدمات) and `CIC_MANAGER` (مدیر CIC) share identical access — only the title differs. Both get a **trimmed dashboard** (`app/admin/page.tsx` → `hasTrimmedDashboard`): the intro description and the internal "admin foundation" diagnostics card are hidden.

Enforced in **three layers**:

1. **Middleware** (`proxy.ts`) — `sectionForPath(pathname)` + `canAccessSection(role, section)`; unauthorised page routes bounce to `/admin`, API routes get 403.
2. **Navigation** (`AdminShell`) — nav items are filtered by `canAccessSection`, so users only see what they can open.
3. **Server actions** (`app/admin/users/actions.ts`) — every action re-checks `canManageUsers(session.role)` (defence in depth).

Unknown/legacy roles fall back to the least-privileged role (`EDITOR`) via `normalizeRole`.

#### User-management UI (`/admin/users`, SUPER_ADMIN only)

- `app/admin/users/page.tsx` (server, role-guarded) + `components/admin/AdminUsersManager.tsx` (client, MUI).
- Actions (`app/admin/users/actions.ts`, `'use server'`): create user, change role, activate/deactivate, reset password, delete. Validation via Zod; helpers in `lib/admin/users.ts` (Node-only Prisma CRUD).
- Safety guards: cannot delete your own account; cannot demote/deactivate/delete the **last active SUPER_ADMIN** (`countActiveSuperAdmins`).
- `lib/admin/session.ts` → `getAdminSession()` reads + verifies the session in server components/actions.

### Rate limiting

`lib/admin/rateLimit.ts` provides in-memory, IP-based rate limiting on the login endpoint. Locks out after repeated failures.

### Admin smoke test after a deploy

Ported from the old `ADMIN_DEPLOYMENT.md` (removed 2026-08-31 as stale — it still claimed the admin
adds no Prisma models, which stopped being true when `AdminUser` landed, and gave Nginx proxy
headers for a server that runs Apache).

1. Open `https://www.hisense-ir.com/admin` — it must redirect to `/admin/login`.
2. Sign in with an **`AdminUser`** row (not `ADMIN_USERNAME`/`ADMIN_PASSWORD` — that pair is only a
   bootstrap/outage fallback, see above).
3. Check `/admin/complaints` and `/admin/surveys` load with data.
4. Confirm a public page (`/fa`) still renders.

**If login returns 403:** check that `NEXT_PUBLIC_SITE_URL` exactly matches the browser origin
(`https://www.hisense-ir.com`, with the `www`). **If login fails against a DB user but the env
fallback works**, Prisma is down — confirm with
`curl -sI localhost:3000/api/products | grep -i x-data-source` (`fallback` means DB auth is being
bypassed entirely) and see "Server env vars" below.

Other still-true notes from that file: `ADMIN_SESSION_SECRET` must differ from `ADMIN_PASSWORD`;
rotating it logs out every current admin session; `INTERNAL_API_BASE_URL` lets server-rendered pages
call the app's own APIs without looping back out through public HTTPS/Apache.

### Admin utilities

- `lib/admin/dashboard.ts` — aggregates stats for the dashboard view.
- `lib/admin/submissions.ts` — queries complaint and survey rows.
- `lib/admin/i18n.ts` / `i18n.server.ts` — admin-specific translation helpers.

---

## Product Catalog

### Categories

| Enum value     | Route segment     | Description         |
| -------------- | ----------------- | ------------------- |
| `TVS`          | `tv-hisense`      | Televisions         |
| `WMS`          | `washing-machine` | Washing machines    |
| `RAC`          | `rac`             | Residential AC      |
| `CAC`          | `cac`             | Commercial AC       |
| `REFRIGERATOR` | `refrigerator`    | Refrigerators       |
| `TV_DCODE`     | —                 | D-Code TV sub-range |

### Product detail page anatomy

A product detail page (`app/[locale]/tv-hisense/[productId]/page.tsx` etc.) renders:

1. **HeroMedia** — full-width hero image or video.
2. **MobileHeader** — sticky product name + breadcrumbs on mobile.
3. **BannerSection** — promotional banners.
4. **FeatureCardsGrid** — feature highlight cards with icons. Every card uses one consistent dark "glass" tile (deep slate + teal corner sheen) in **both** light and dark themes, so logos of any colour read uniformly and at a uniform size. `FeatureCardImage` always renders the light/white variant (`imageBlack` when a logo ships a light+dark pair) and inverts pure-black line icons to white. The set of icons to invert is generated by `npm run logos:scan` (`scripts/detect-mono-logos.ts` → `content/monoFeatureLogos.generated.ts`) — re-run it after adding/changing logo assets under `public/products/**/logos`. CAC products skip the grid (their cards reuse section photos). Clicking a card smooth-scrolls to the content section it best describes: `lib/products/featureCardSectionLinks.ts` maps each card to a section via idf-weighted token overlap of the card title against each section's title+text (falling back to a positional 1:1 map only when card and section counts are equal), and `SectionGroupsRenderer` tags each section with a stable `feature-section-{n}` id. The eased scroll itself is the shared `smoothScrollToId` helper in `lib/scrollToElement.ts` (also used by `SpecsJumpButton`); it respects `prefers-reduced-motion`.
5. **FeatureIntro** — large text + image feature intro.
6. **SectionGroupsRenderer** — renders `sectionGroups` JSON (ContentSections / OverlayContentSections / StackedContentSections / BeforeAfterSlider).
7. **ComparisonSections** — spec comparison tables.
8. **SpecsSection** — tech specs accordion (TV-specific pulls from `TvSpec`).
9. **ProductFaqSection** — FAQ accordion per product, emits `FAQPage` JSON-LD.
10. **Breadcrumbs** — `BreadcrumbList` JSON-LD.

### Printed catalog pages

The scanned spreads from the printed Hisense Iran catalog plus the full PDF live in the media folder under `catalog/` (`/public/catalog/` is gitignored like every other media dir, so the files ship via `ops/upload-media.ps1`, not the repo).

- **Mapping:** `lib/catalog/catalogAssets.ts` → `getProductCatalogUrl({ categorySlug, series, productId })`. Lookup is per category, keyed by `series` first and product `id` second, with separators stripped (so `RFC500` and `RFC-300` both resolve from one map).
- **One spread can serve many products** — this is expected, not a bug: every `HRH-*TQ` split points at `catalog-hrh.jpg`, both washing machines at `catalog-wm.jpg` (it prints them side by side), and the refrigerator spreads pair models up (`catalog-270-370.jpg` = RS-370 + FS-270, `catalog-210-310.jpg` = FC-310 + FC-210).
- **Rendering:** `components/catalog/ProductCatalogSection.tsx` sits between `SpecsSection` and `ProductFaqSection` on both detail-page implementations (`app/[locale]/products/[category]/[productId]` and `app/[locale]/refrigerator/[productId]`). It lazy-loads the spread (it is below the fold, so it never competes with the LCP hero), links it full size, and offers a per-product download plus the full PDF.
- **Products without a spread render no section.** The resolver returns `null` and the caller skips it — currently the U7K TV (absent from this print run). `catalog-hid-t3.jpg` (HID-T3 ducted) and `catalog-whtc.jpg` (WHTC-18P window type) are on the server but have no product page yet; add the entry to `CATALOG_PAGES` when those ranges are added to the site.
- **Resolution:** the print exports are 3425×2480; `ops/optimize-media.mjs` caps them at 2048×1483 (≈45% smaller, still legible down to the smallest Persian spec labels — checked at native size). `CATALOG_PAGE_WIDTH`/`CATALOG_PAGE_HEIGHT` must match whatever ships, so re-export → re-run the optimizer → update both constants. The full PDF is not an image and is never touched by the optimizer, so spreads can always be re-exported from it.
- **Full-catalog download:** `FULL_CATALOG_URL` / `FULL_CATALOG_DOWNLOAD_NAME` (both from `catalogAssets.ts`) back the homepage CTA (`components/catalog/CatalogDownloadSection.tsx`, copy in `HOME_SEO_CONTENT.catalog`) and the footer "download product catalog" link (`Footer.links.catalog`). The footer entry is flagged `download: true` so it renders as a plain anchor and skips the locale prefix.

### Media URLs

Always use `mediaUrl(path)` from `lib/mediaUrl.ts`. It switches between `/` (local) and `NEXT_PUBLIC_MEDIA_BASE_URL` (CDN). Never hardcode `/media/` paths in components.

**The rule is media-store vs `public/`, not "always call `mediaUrl`".** Assets that live in the media store (`banner/`, `products/`, `tv-banner/`, `representatives/`, `catalog/`, `downloads/` — all gitignored out of `public/` and promoted with `ops/upload-media.ps1`) **must** go through `mediaUrl()`. Assets that are genuinely committed under `public/` — notably `public/icons/*` — **must not**: production sets `NEXT_PUBLIC_MEDIA_BASE_URL=/media`, so routing an `icons/` path through `mediaUrl()` would push it to a directory that does not exist. This is why `buildLocalBusinessJsonLd`'s `logo` stays a bare `${SITE_URL}/icons/hisense-logo-full.svg` while its `image` is wrapped.

**This applies to metadata and JSON-LD too, where a 404 is invisible.** A hand-built `` `${SITE_URL}/banner/…` `` in `generateMetadata` or a schema builder renders nothing on screen, so a broken share image or `LocalBusiness.image` can survive indefinitely. Fixed 2026-09-10 (found first in the zarrinac replica, ported back here): the homepage `og:image` asked for a `.jpg` that never existed, and `app/[locale]/layout.tsx` + `lib/seo/localBusiness.ts` hand-built URLs that dropped the `/media` prefix. Verify metadata image URLs by requesting them, not by loading the page:

```bash
curl -sS https://www.hisense-ir.com/fa | grep -oE '<meta property="og:image" content="[^"]*"'
curl -sS https://www.hisense-ir.com/fa/contact-us | grep -oE '"image":"[^"]*banner[^"]*"'
# then curl -I whatever those emit — all must be 200
```

### Homepage hero banners

`components/hero/HeroBanner.tsx` holds the carousel's `BANNERS` array; array order is slide order, and every slide is `priority`/`loading="eager"`, so **slide 1 is the LCP** — put the campaign that should load first at the top of the array. Container aspect ratios are `aspect-9/16` under 768px, `aspect-video` to 1024px, then `aspect-21/9`, all with `object-cover`.

**That mobile `9/16` box is the constraint on new artwork.** Every banner needs a portrait mobile variant in the 0.56–0.75 aspect range (existing ones are 750×1200, 828×1242, 941×1672). A square social/Instagram export (1:1) is _not_ usable: `object-cover` scales it 1.78× and crops ~44% off each side, cutting the composition in half. Padding a square out to 9:16 was tried and rejected — a blurred or edge-stretched backdrop leaves a visible seam or a large dead band. Ask for a real 9:16 export instead. Desktop variants should be ≥1920 wide to match the rest of the set.

Prep new banners as `.webp` (max width 2048, quality 80) into **both** `media/banner/` and `public/banner/`, then promote with `ops/upload-media.ps1`. `ops/optimize-media.mjs` preserves format, so it will not convert a `.jpg` source for you — convert first, then let the optimizer confirm the result is within policy (it only scans files over 150KB).

**A 1:1 source can still be salvaged by cropping, if it was composed for it.** The 2026-09-10 re-export of banner 09 came back as a 1254x1254 square but recomposed with the headline and product centred, so a straight centre-crop to 9:16 (`705x1253`, no padding, no upscale) kept the headline, the hero product and all six feature icons. Pre-crop to the displayed aspect rather than shipping the square — `object-cover` would crop identically, so the extra 44% of pixels is pure waste. Check the crop by eye before shipping it; a square composed for Instagram (subject filling the frame edge to edge) will not survive this.

### Self-hosted video

`components/video/MediaVideoSection.tsx` renders both video placements. Two modes:

- `ambient` — `autoPlay loop muted playsInline`, no controls, `preload="metadata"`. Decorative motion, so it must stay silent and must not carry information the page does not also state in text. Used on `/[locale]/products/rac`, which otherwise has only the text `RouteHero`.
- `feature` — `controls`, audio, `preload="none"` so the bytes are only fetched when a visitor chooses to play. Used for the brand film on `/[locale]/about`.

Both emit `VideoObject` JSON-LD via `buildVideoObjectJsonLd`, which is only a valid first-party claim because the files are self-hosted under the media store. The component takes media-store paths and calls `mediaUrl()` itself — never pass it an already-resolved URL. `<video>` has no `alt`, so every use must pass `label` (rendered as `aria-label`).

**Encoding targets** (`ffmpeg`, H.264 + `-movflags +faststart`, `yuv420p`):

| Use          | Settings                               | Result                                                           |
| ------------ | -------------------------------------- | ---------------------------------------------------------------- |
| Ambient loop | 1080p, `-crf 21 -preset slow -an`      | `rac-airflow-hero.mp4`, 11.6s → 3.5MB                            |
| Feature film | 720p, `-crf 25 -preset slow`, AAC 112k | `hisense-brand-film.mp4`, 100s → 37.7MB (from a 173MB 4K master) |

Strip audio (`-an`) only for ambient loops. A narrative film keeps its audio, and 720p is the right target for one — 1080p of fast-cut sports footage came out at 54MB even at `-crf 27`, which is too heavy for the Iranian mobile audience.

**Where video files may live:** only under a path that `.gitignore` already excludes from `public/` (`products/`, `images/`, `banner/`, …), because local dev serves them from `public/` and the media store is promoted separately. The brand film sits at `media/images/hisense-brand-film.mp4` for exactly this reason — a `media/about/` folder would have mirrored to an untracked `public/about/` and committed a 37MB binary into git.

**Trim footage that names a product Hisense Iran does not sell.** The AC source clip ends on a "Fresh Master X700" card; that model is not in the catalogue, so the clip is cut at 11.6s to the model-agnostic product footage.

---

## Service Centers

The service-center finder at `/[locale]/find-service-center` lets users find Hisense service representatives by province and city.

- **Component:** `components/service-centers/ServiceCenterFinder.tsx` — MUI Autocomplete for province, then city, then fetches and displays matching reps.
- **Data source:** `lib/serviceCenterSource.ts` queries `ServiceRepresentative` from Postgres. Falls back to `content/service-centers/serviceCenters.json` if the DB is unavailable or the table is empty.
- **Location data:** `lib/iranLocationSource.ts` queries `IranProvince` and `IranCity`. Falls back to `lib/iranLocations.json`.
- **Performance:** Reduced to a single DB query (was 3 separate queries previously).
- **Temporary working-hours notice (added 2026-08-31):** a highlighted teal banner between the hero and the finder announces `ساعت کاری نمایندگان خدمات` / `Service representative working hours` above `از ساعت ۹ الی ۱۹` / `From 9:00 to 19:00` — title + hours only, no explanatory note. Copy lives in `PAGE_CONTENT[locale].workingHours` in `app/[locale]/find-service-center/page.tsx`, rendered as an `h2` (the page keeps its single `h1`). It is explicitly provisional — when the hours become permanent or change, edit both locales; to retire it, delete the two `workingHours` blocks plus the commented section in the JSX. Not mirrored into `buildLocalBusinessJsonLd`'s `openingHours` on purpose, so a temporary claim never leaks into structured data.

### Refreshing the representative list

The authoritative list arrives as a dated spreadsheet from the service department. Drop it in `public/representatives/` (gitignored — the originals live in the media folder, not the repo) and regenerate the JSON from it. Never hand-edit `serviceCenters.json`; the committed JSON is the build artifact that ships, and it is what the server seeds from, so the spreadsheet itself is not needed on the server.

```bash
npm run representatives:convert -- public/representatives/<new-file>.xlsx   # xlsx → serviceCenters.json
npm run db:seed:representatives                                            # JSON → ServiceRepresentative table
```

`scripts/convert-representatives-xlsx.mjs` reads the workbook with a dependency-free zip/SpreadsheetML parser, so refreshing never adds a build dependency. It expects the standard 8 columns (استان، شهر، نوع فعالیت نماینده، نام و نام خانوادگی، کد نمایندگی، شماره اصلی، شماره همراه، آدرس) and throws if the header drifts. It also:

- restores the leading `0` Excel strips from phone numbers, and blanks fragments shorter than 7 digits;
- slugifies `provinceId`/`cityId` (spaces → `-`) while keeping the spaced label in `provinceName`/`cityName`;
- **normalizes the province label** to always carry the `استان ` prefix. Rows that omit it would otherwise sort as a second, separate block for the same province, because `sortServiceCenters` orders by `provinceName`, not `provinceId`;
- **strips a trailing parenthetical county qualifier** from the city name (`فیض آباد(مه ولات)` → `فیض آباد`), so one city stays one entry in the city dropdown instead of splitting into two;
- **carries forward** address and phone values from the current JSON when the new sheet leaves that cell blank, so a gap in the spreadsheet can't wipe live data.

Pass `--check` to verify the JSON matches a spreadsheet without writing. The seed wipes and recreates the whole table in one transaction, and `sortOrder` follows the spreadsheet row order.

**Watch for superseded rows.** The service department sometimes delivers a code change as an _appended_ row while leaving the old row in place — the 2026-08-2 sheet appended `HA4410115` for پیمان رشیدی کیا (ارومیه) but kept the old `HA4410109`, which would have published that rep twice under لوازم خانگی. Always diff a new sheet against the current JSON before converting; when a code changed, edit it **in place** in the spreadsheet and delete the appended duplicate. Editing in place also keeps every downstream `rep-NNNN` id stable — the ids are positional, so deleting a row instead renumbers the rest of the file and churns the whole diff.

**Delta sheets.** Sometimes the department sends only the changed rows instead of a full list (`new-rep-changes-20260905.xlsx`, two rows; `new-rep-changes-20260912.xlsx`, five additions plus two terminations). A delta sheet is never converted directly — the converter always rebuilds the whole JSON from one workbook. Apply the rows to the latest dated workbook in Excel, save it under a new dated name (`list-of-representatives-2026-09-2.xlsx`), and convert that. A termination arrives as `فسخ` in the activity column (2026-09-05: `فسخ TV` for `LCD0306`, ارومیه; 2026-09-12: `HA6110142` + `H6110142`, اندیکا) — delete that row; the converter throws on it, since `serviceKind` only accepts a parenthesised `(TV|HA|RAC|CAC|VRF)` code. New reps are appended at the end of the workbook, matching how earlier additions were handled.

**Check the province spelling on every delta row.** The delta sheet is retyped each time, so a province can arrive spelled differently from the workbook — the 2026-09-12 sheet wrote `کهگیلویه و بویر احمد` (with گ) where all 11 existing rows use `کهکیلویه و بویر احمد` (with ک). `provinceId` is only a slug of that label, so the mismatch would have split one province into two blocks in the finder's dropdown. Normalize a new row to whatever spelling the workbook already carries before converting. The finder is self-contained — it never joins `IranProvince` — so the workbook's spelling is the only one that matters, even where it differs from the canonical name in `lib/iranLocations.json`.

Because hisense and zarrinac **share one Postgres**, seeding on the server updates both sites at once.

---

## Complaint & Survey Forms

### Complaint form

Route: `/[locale]/complaint`
Component: `components/complaint/ComplaintForm.tsx`
Schema: `lib/complaints/schema.ts`

Multi-step form collecting:

- Personal info (name, phone, email)
- Product info (category, model, invoice number, purchase date)
- Complaint details (topic, preferred contact method, city, address, description)

On submit: `POST /api/complaints` validates with Zod, generates a `referenceCode`, stores in `ComplaintSubmission`, returns the code to the user.

### Survey form

Route: `/[locale]/survey`
Component: `components/survey/SurveyForm.tsx`
Schema: `lib/surveys/schema.ts`

Post-service satisfaction survey collecting ratings on communication clarity, staff behavior, timeliness, and overall satisfaction, plus open-ended feedback.

On submit: `POST /api/surveys` → `SurveySubmission` record + `referenceCode`.

### Shared form conventions

- Persian digit normalization (`۱` → `1`) is done in Zod transforms — not duplicated in component code.
- Phone numbers must match `09XXXXXXXXX` (10-digit Iranian mobile format), enforced by schema.
- Zod schemas are the single source of validation truth for both frontend and API.

---

## Downloads

`DownloadAsset` records link downloadable files (product manuals, warranty PDFs) to a `pageKey` (e.g., `"warranty"`) and a locale pair (`locale` for page language, `fileLocale` for the file's language).

- Seeded via `npm run db:seed:downloads`.
- `isActive` flag controls visibility without deletion.
- Sort order managed per page key.

---

## Internationalization

- Locales: `fa` (Persian, RTL, default) and `en` (English, LTR). Defined in `i18n/routing.ts`.
- **No middleware.ts** — i18n routing is handled by the next-intl plugin in `next.config.ts`. Creating a `middleware.ts` would conflict.
- `withNextIntl()` in `next.config.ts` must stay — removing it silently breaks all locale routing.
- Server components: `getTranslations('Namespace')` → `t('key')`
- Client components: `useTranslations('Namespace')`
- Translation files: `messages/fa.json` and `messages/en.json` — must stay in sync.
- Locale validation: `app/[locale]/layout.tsx` throws a 404 for unknown locales. Adding a locale requires updating `i18n/routing.ts` first.
- RTL: Persian is RTL (`dir="rtl"`). Flex direction, carousel scroll, padding/margin semantics, and text alignment all reverse. Always test both locales after touching layout or carousel components.

---

## Styling & Theming

- **Tailwind v4** — loaded via `@import 'tailwindcss';` in `globals.css`. Do NOT use `@tailwind base/components/utilities` directives (build will break).
- Custom theme tokens go inside `@theme {}` blocks in `assets/styles/globals.css` — not in `tailwind.config.ts`'s `extend` key.
- **CSS variables** define semantic design tokens: `--surface-color`, `--text-primary`, `--brand-color`, etc. Use these rather than hardcoded Tailwind palette colors.
- **Dark mode**: toggled via `data-theme="dark"` attribute on `<html>`. Managed by `ThemeProvider` (persists preference in `localStorage`). Toggle UI in `ThemeToggle`.
- Breakpoint tokens are defined in `@theme {}` in `globals.css`.
- MUI components (`Autocomplete`, `TextField`, `Select`) for interactive form elements.

---

## SEO Infrastructure

SEO efficiency is the top priority. Every page change should be evaluated for SEO impact.

### Metadata

Each public page implements `generateMetadata` with:

- `title` and `description` — purchase-intent keywords (خرید/قیمت/نصب for Persian).
- `alternates.canonical` — absolute URL for the current locale.
- `alternates.languages` — hreflang map for all locales + `x-default`.
- OpenGraph and Twitter card tags.

Hreflang is emitted as HTML `<link rel="alternate">` tags only. The next-intl HTTP Link-header hreflang was removed (it produced malformed headers that Google ignored).

**Meta-description length.** Search engines flag descriptions under ~150 chars as "too short" (Bing Webmaster recommends 150–160). Builders in `lib/seo/productMeta.ts` set the `<meta description>` (and OG/Twitter) without touching the shorter route translation that some pages also render as a visible subtitle:

- `buildProductMetaDescription(locale, name)` — product + refrigerator detail pages; wraps the SKU name with purchase-intent + warranty copy. Real SKU names are long (e.g. `کولر گازی اینورتر هایسنس HIH-24TG`), so this already lands ~155–161 for the air-conditioner/refrigerator detail pages that Bing flagged.
- `buildCategoryMetaDescription(locale, category)` — category + refrigerator listings. Returns a **bespoke** per-category string (`tvs|wms|rac|cac|refrigerator`), each hand-tuned to 150–162 in both locales. A generic "append a suffix to the route description" approach was rejected: the route descriptions span 77–127 chars and no single suffix maps them all into the 150–165 window.
- `buildSupportMetaDescription(locale, page)` — `contact` + `findServiceCenter`, same bespoke per-page approach.

Keep every `fa`/`en` pair in sync (hreflang depends on it) and within ~150–162 chars.

### JSON-LD structured data

All JSON-LD is rendered server-side via `components/seo/JsonLd.tsx`.

| Schema type                   | Where emitted                                                                                       |
| ----------------------------- | --------------------------------------------------------------------------------------------------- |
| `Organization`                | Root layout (`app/[locale]/layout.tsx`)                                                             |
| `WebSite`                     | Root layout                                                                                         |
| `LocalBusiness`               | Contact page, service-center pages (`lib/seo/localBusiness.ts`)                                     |
| `Product`                     | Product detail pages (`lib/seo/productSchema.ts`)                                                   |
| `CollectionPage` + `ItemList` | Category listing pages                                                                              |
| `BreadcrumbList`              | All product detail pages (`components/seo/PageBreadcrumbs.tsx`)                                     |
| `FAQPage`                     | FAQ page + product detail pages (`components/seo/ProductFaqSection.tsx`)                            |
| `VideoObject`                 | Product detail pages with a `heroVideoUrl` (`buildVideoObjectJsonLd` in `lib/seo/productSchema.ts`) |

**Product `offers` rule:** No prices are published (rial volatility). `buildProductJsonLd` in `lib/seo/productSchema.ts` emits no `offers` by default. It auto-emits a valid `Offer` only when a positive `price` is passed. Never emit a price-less `Offer` — it's invalid for Google rich results.

**Hero videos are self-hosted.** Product `heroVideoUrl`s point at first-party files under the product media folders (e.g. `products/tvs/U7K-Files/u7k-hero.mp4`), resolved via `mediaUrl()` — not third-party hotlinks. Self-hosting is what makes the `VideoObject`'s `contentUrl` a valid first-party claim for video rich results. Compress masters to web-optimized 1080p H.264 (`-crf 21 -movflags +faststart -an`, downscale 4K → 1080p) before placing them under `public/products/` (local) and the `media/` staging folder (promoted to the server via `ops/upload-media.ps1`). Keep the originals as backups outside the synced `media/` folder.

### Site verification: DNS TXT, not a token in the HTML

**Neither search engine's verification token is present in the live HTML** (verified 2026-08-31). `app/[locale]/layout.tsx` emits `verification.google` / `msvalidate.01` only when `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` / `NEXT_PUBLIC_BING_SITE_VERIFICATION` are set, and **neither is set in the server's `.env`** — so `curl https://www.hisense-ir.com/fa | grep verification` returns nothing.

The repo also once carried the HTML-file method: `public/google792b60685361c0d2.html`, containing exactly

```
google-site-verification: google792b60685361c0d2.html
```

That file existed **only** on the orphaned `dev` branch, never on `main`, so it has never been deployed — `https://www.hisense-ir.com/google792b60685361c0d2.html` returns **404**. The token is preserved here because `dev` was deleted on 2026-08-31; nothing else records it.

**The active ownership method is a DNS TXT record** (confirmed by the site owner, 2026-08-31; DNS is at IONOS — see "DNS & domain"). That is why the property stays verified with no token in the HTML and no verification file on disk, and it is the most durable of the methods: it survives redeploys, env changes and this repo entirely.

**Consequences to respect:**

- **Do not "fix" the missing meta tag.** Setting `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` is unnecessary and would add a second, redundant method. The env hooks in `layout.tsx` stay in place as an option, deliberately unused.
- **The DNS TXT record is load-bearing for Search Console access.** Do not prune "unused" TXT records at IONOS — removing it unverifies the property and GSC data stops, which matters given SEO is this project's top priority. Treat it like the A records documented under "DNS & domain".
- The `public/google792b60685361c0d2.html` token above is kept only as a historical record; it is not needed and should not be restored.

### SEO copy for category pages

`lib/seo/categorySeoContent.ts` contains long-form SEO copy and FAQ entries for each category page. Targets purchase-intent long-tail keywords: خرید/قیمت/نصب/قطعات یدکی. Rendered by `components/seo/CategorySeoSection.tsx`.

### Sitemap & robots

- `app/sitemap.ts` — native Next.js sitemap generator. Covers all locale × product URLs + static routes. Uses `SITE_CONTENT_LAST_MODIFIED` from `lib/seo/site.ts` as a stable `lastmod` baseline (bump it only when content meaningfully changes).
- `app/robots.ts` — robots.txt generator.
- **No `next-sitemap`** — the old `next-sitemap.config.js` approach was replaced by the native route.

### ISR

Product listing pages export `revalidate = 3600`. Do not add `cache: 'no-store'` to fetch calls inside these pages — it defeats ISR and can cause build failures.

### Security headers

Security headers (CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy) are set in `next.config.ts` via `headers()`. Added in the security batch (PR #81).

### IndexNow

`ops/indexnow-ping.mjs` reads the live sitemap and bulk-submits every URL to **IndexNow** (`api.indexnow.org`) so **Bing / Yandex / Seznam** re-crawl changed pages within minutes. `deploy.sh` fires it in the background after the PM2 reload (non-blocking, non-fatal — a failed ping never affects the deploy).

- **Google does not use IndexNow** and ignores it entirely — this has zero effect on Google Search Console.
- Ownership is proved by the key file `public/73badcff89d65693b8c2ff1bdf9c919a.txt` (served at `https://www.hisense-ir.com/73badcff89d65693b8c2ff1bdf9c919a.txt`), whose body is the key. The `KEY` constant in `ops/indexnow-ping.mjs` **must** match that file's name and contents. The key is public by design (not a secret) — committing it is required.

---

## Ops & Deployment

### Server

Ubuntu host `nexzarrin`, app at `/var/www/hisense-ir/app`, served by **PM2** (process `hisense-ir`, config `ecosystem.config.cjs`) behind **Apache**. DB: local Postgres `zarrin` (owner `reza_sf`).

> **Shared DB with zarrinac.com:** the `zarrin` instance on nexzarrin is the single primary for **both** sites; zarrinac.com (host `zarrin-ng-site`, `172.17.0.19`) connects to it over the private subnet, with a manual-promote streaming-replication standby on that box. Both repos must keep `prisma/schema.prisma` + `prisma/migrations/` byte-identical. Full procedure: **`ops/shared-db-runbook.md`**.

### DNS & domain (apex → www)

DNS is hosted at **IONOS / 1&1** (nameservers `ns*.ui-dns.{biz,org,com,de}`). The canonical host is **`https://www.hisense-ir.com`** (see `lib/seo/site.ts`), so the bare apex must resolve **and** 301-redirect to `www`.

**DNS records (IONOS panel):** both the apex and `www` need an **A record → `94.182.225.54`** (the nexzarrin public IP). Use an A record at the apex, **not** a CNAME — a CNAME at the zone apex is invalid (the apex already carries SOA/NS/MX). Symptom when the apex A record is missing: browsers show "Server Not Found" for `hisense-ir.com` while `www.hisense-ir.com` works (the request never reaches the server).

**Apache apex redirect:** the apex has its own vhost so it does **not** serve a duplicate copy of the site (which would split SEO signals).

- `sites-available/hisense-ir.conf` (`*:80`) and `hisense-ir-ssl.conf` (`*:443`) serve the app for `ServerName www.hisense-ir.com` only — the `ServerAlias hisense-ir.com` was **removed** so the apex no longer matches them.
- `sites-available/hisense-ir-apex.conf` is a dedicated vhost (`*:80` + `*:443`, `ServerName hisense-ir.com`) that 301-redirects everything to `https://www.hisense-ir.com%{REQUEST_URI}`, reusing the existing cert (`/etc/apache2/ssl/hisense-ir.fullchain.crt` + `.key`, which already covers both hosts).

Apply changes with `sudo apache2ctl configtest && sudo systemctl reload apache2`. Verify from anywhere:

```bash
curl -sIL http://hisense-ir.com/        # expect: 301 -> https://www.hisense-ir.com/ -> 307 /fa -> 200
curl -sI  https://www.hisense-ir.com/   # expect: 307 -> /fa (still serves the app)
```

### Server env vars: `.env` is the only source of truth

`ecosystem.config.cjs` (server-only, gitignored) **must not** carry an `env:` block beyond `NODE_ENV`. PM2-injected vars take precedence over `.env`, so any value duplicated there silently overrides the real one.

> **Incident 2026-07-21.** `ecosystem.config.cjs` held its own hardcoded copies of `DATABASE_URL`, `ADMIN_PASSWORD`, and `ADMIN_SESSION_SECRET`. When the Postgres role password and the admin password were rotated in `.env`, that block kept injecting the **old** 13-char password. Effects: Postgres auth failed (`FATAL: password authentication failed for user "reza_sf"`), so the app served **static fallback data** for ~13h (`x-data-source: fallback`), and because `authenticateAdmin()` swallows DB errors and falls through to the env fallback, **all `AdminUser` accounts became unusable** — the symptom was "correct admin passwords rejected in production but fine locally". Fixed by stripping the `env:` block down to `NODE_ENV` and restarting.

Diagnostics worth reaching for when admin login misbehaves on the server:

```bash
# Is the app actually on the DB? "fallback" means Prisma can't connect.
curl -sI http://localhost:3000/api/products | grep -i x-data-source   # expect: database

# What env does the RUNNING process see (vs. what .env says)?
pm2 jlist | node -e '…'   # compare hashes, never print secrets

# Does the credential itself verify, independent of HTTP?
npx tsx -e 'import("./lib/admin/credentials").then(m => m.authenticateAdmin("admin", process.env.ADMIN_PASSWORD))'
```

Because PM2 caches injected env, changes to the config need a full recycle — `pm2 reload` will **not** drop stale vars:

```bash
pm2 delete hisense-ir && pm2 start ecosystem.config.cjs && pm2 save
```

### Deploy workflow

**Local → Git → Server — never edit directly on the server.**

```
develop locally (Windows)
  → push branch
  → open PR
  → merge to main
  → on server: run deploy.sh
```

`ops/deploy.sh` (copied to `/var/www/hisense-ir/deploy.sh` on the server):

1. `git restore public/sitemap-0.xml` (removes legacy generated file that caused conflicts)
2. `git pull origin main`
3. `npm ci --omit=dev`
4. `npm run db:deploy` (applies Prisma migrations)
5. `npm run build`
6. `pm2 reload ecosystem.config.cjs --update-env`
7. Pings IndexNow (`ops/indexnow-ping.mjs`, background) to re-crawl on Bing/Yandex

### Husky git hooks

- **pre-commit** (`.husky/pre-commit`): runs `lint-staged` → ESLint + Prettier on staged files.
- **pre-commit is the only hook.** A `pre-push` hook that piped `git diff origin/main...HEAD` to `claude -p` for an automated review was documented here for months but **does not exist in `.husky/`** — removed at some point without the docs following. It would not work on the server anyway: `api.anthropic.com` returns 403 from this host's IP (see "Daily monitor" below). Do not re-add it without a working transport.

### Testing

There is **no test suite** — neither unit nor E2E, and no test dependency. A `playwright` devDependency sat here unused for months (no `@playwright/test`, which is the package that actually provides the `test` runner; no `playwright.config.*`; no spec files; imported by nothing), making the long-documented `npx playwright test` command impossible to run. **It was removed on 2026-08-31.** The two `@playwright/test` strings still in `package-lock.json` are Next.js's own _optional peer dependency_ declaration — not ours; leave them.

The gates that actually exist and are run before every ship: `npm run lint`, `npx tsc --noEmit`, `npm run format` / `prettier --check`, and `npm run build` (the authoritative one, executed on the server by `deploy.sh`). Correctness otherwise relies on TypeScript strict mode and manual verification in both locales.

### Media workflow

Media lives outside git (`HIsense-Website/media` locally, `/var/www/hisense-ir/media` on the server).

**Local → server:**

1. Run `node ops/optimize-media.mjs --apply` to compress images first.
2. Run `pwsh ops/upload-media.ps1` — uses OpenSSH key auth (`~/.ssh/nexzarrin_ed25519`) to `scp` upload then trigger `sudo sync-media.sh` on the server.
3. `ops/sync-media.sh` rsync-mirrors staging → live dir and applies `chmod -R a+rX` (mandatory — the Next app runs as `reza`, so `www-data`-only permissions cause `EACCES` and a 503 crash loop).

Key auth setup: the public half of `nexzarrin_ed25519` must be in `~/.ssh/authorized_keys` on the server for `reza`.

### Backup

`ops/cron/weekly-backup.sh` runs every Sunday at 03:00. Backs up:

- `pg_dumpall` (full Postgres dump)
- `/etc` (server config)
- App secrets: `.env`, `ecosystem.config.cjs`

Stores to `/backup`, keeps the last 4 weeks, deletes older runs.

### Monitor

`ops/cron/hisense-monitor.sh` runs daily (cron `0 7 * * *`, as user `reza`). Checks `df`/`free`/`pm2 jlist` directly against fixed thresholds (disk >80%, memory >90%, any PM2 process not `online`) and logs a summary (or ALERTS block) to `/var/log/hisense-monitor.log`. No external API calls — plain bash + `awk`/`python3`.

**History:** originally piped stats to `claude -p` for LLM-based anomaly flagging, gated by a `CLAUDE_CODE_OAUTH_TOKEN` in `/home/reza/.hisense-monitor.env`. Removed 2026-08-10: the server's public IP (`94.182.225.50`, Tehran, Iran — ISP Aria Shatel) started getting a flat `403` from `api.anthropic.com` on every request (confirmed via plain `curl`, `claude -p`, and even a fresh `claude /login` OAuth attempt) — Anthropic blocks API access from Iran per usage policy, not a token/account bug. Since the anomaly logic was simple fixed thresholds anyway, replaced with deterministic bash — no LLM dependency needed. `claude` CLI, `~/.claude/`, and `.hisense-monitor.env` were removed from the server entirely.

### Ops scripts location

Scripts under `ops/` are the source of truth. After a deploy pulls changes, manually copy affected scripts to their live locations (see `ops/README.md` for the exact copy commands). `deploy.sh` is intentionally not a symlink — bash reads a script as it runs, so `git pull` overwriting the executing file is unsafe.

### DB promotion (local → server)

```bash
# Local:
pg_dump -Fc zarrin > zarrin.dump
scp -i ~/.ssh/nexzarrin_ed25519 zarrin.dump reza@172.17.0.10:/home/reza/

# Server:
pm2 stop hisense-ir
# NOTE: the OS user is `reza` but the Postgres ROLE is `reza_sf`. Bare `dropdb`/`createdb`
# default to a `reza` role that does not exist -> "FATAL: role reza does not exist".
# Always pass `-h localhost -U reza_sf` (TCP + password auth, same as the app).
dropdb -h localhost -U reza_sf --force zarrin        # --force terminates open conns (PG16; DB is shared)
createdb -h localhost -U reza_sf -O reza_sf zarrin   # reza_sf now has CREATEDB (granted 2026-06-16)
# Restore AS reza_sf so it OWNS the tables (app then has full access). Do NOT restore as postgres.
pg_restore -h localhost -U reza_sf --no-owner --no-privileges -d zarrin /home/reza/zarrin.dump
pm2 start hisense-ir
```

**Role/privilege gotchas (hit during the 2026-06-16 promotion):**

- OS user `reza` ≠ DB role `reza_sf`. Bare `dropdb`/`createdb` fail with `role "reza" does not exist` — always specify `-h localhost -U reza_sf`.
- `createdb` needs the `CREATEDB` privilege. `reza_sf` originally lacked it (`permission denied to create database`). It was granted permanently with `sudo -u postgres psql -c 'ALTER ROLE reza_sf CREATEDB;'` — if a fresh cluster ever lacks it again, recreate the DB as superuser instead: `sudo -u postgres createdb -O reza_sf zarrin`.
- A password prompt that returns `permission denied …` or `database … does not exist` means **auth succeeded** (those are post-login errors) — the password is fine; the issue is privilege/state, not the password.
- ⚠️ **Shared DB:** this Postgres backs both hisense and zarrinac. A drop/restore replaces **both** sites' submissions with the local snapshot. Only promote when the local DB is the intended source of truth for everything.

---

## Security Notes

- **Admin auth:** custom HMAC-SHA256 JWT, httpOnly cookie, 8-hour expiry. No NextAuth dependency.
- **Rate limiting:** in-memory, IP-based, on the login endpoint only (`lib/admin/rateLimit.ts`).
- **Security headers:** CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy set in `next.config.ts`.
- **No `new PrismaClient()`** in pages/routes — always import the singleton from `lib/db.ts`.
- **Input validation** at API boundaries: Zod schemas for complaints and surveys; never trust raw body data.
- **PostCSS malware (2026-06-06, remediated; origin branches cleaned 2026-08-31):** `postcss.config.mjs` was found to contain blockchain/C2 malware and was removed on `main` (commit `54cbd87`). A `prebuild` guard (`scripts/scan-build-config.mjs`, wired as npm `prebuild`) now aborts the build if the signature reappears — `deploy.sh` scans as well.

  A branch audit on 2026-08-31 found the payload **still hosted on `origin`** in 8 branches that `main`'s cleanup never touched: `chore/gitignore-graphify-out`, `deps-update`, `docs/db-promotion-gotchas`, `media-sync-script`, `ops-scripts`, `optimisation`, `product-faqs`, `refrigerator-banner-webp`. All 8 carried the identical 8438-byte blob `03dc4bcf` (clean is **116 B**, blob `6a83185b`), payload concealed past whitespace padding. All 8 were **orphan root commits** — no parent, whole-tree snapshots, unsigned, authored `+0330` but committed from a `+0100` host — i.e. forged twins of work already merged properly, the same mechanism as the dcode intrusion. **All 8 were deleted from origin on 2026-08-31**; blob `03dc4bcf` is now unreachable from every ref.

  **Still true and worth knowing:** the _pre-remediation_ infected blob (`73adcc5d`, 5836 B) remains in `main`'s own history, because every commit before `54cbd87` legitimately contains it. That cannot be removed without rewriting `main`'s history, which nobody should do casually — the `prebuild` guard is the mitigation. A checkout of any pre-June-2026 commit will therefore put an infected `postcss.config.mjs` on disk; don't build from one.

  If you inherit this repo: rotate all secrets, keep the `prebuild` guard, and keep force-push and deletion blocked on `main`.

---

## Content Management Tips

### Adding a product (no DB)

Extend `content/tvProducts.ts` (TVs) or `content/RefProducts/` (refrigerators) using the shapes in `types/tv.ts`. Provide both `fa` and `en` copy blocks.

### Adding a product (with DB)

Use the admin portal or a seed script. Insert a `Product` row + `ProductCopy` rows for each locale.

### Adding translations

Update both `messages/fa.json` and `messages/en.json`. They must stay in sync — hreflang depends on both locales having matching routes.

### Updating navigation

Edit `components/header/navigationData.ts` for menu structure and locale-specific labels.

### Adding SEO copy for a category

Add an entry to `lib/seo/categorySeoContent.ts` with `title`, `body`, and `faqs` arrays. The `CategorySeoSection` component will render it automatically.

### Connecting a DB for the first time

```bash
# Set DATABASE_URL in .env.local, then:
npm run db:migrate       # creates the schema
npm run db:seed          # seeds all data
npm run dev              # app now uses DB data
```

---

## Known Gotchas

1. **`withNextIntl()` must stay** — `next.config.ts` wraps config with the next-intl plugin. Removing it silently breaks all locale routing.

2. **No `middleware.ts`** — i18n routing is handled by the plugin. A `middleware.ts` file will conflict with it.

3. **Tailwind v4 syntax** — Tokens go in `@theme {}` blocks in `globals.css`, not in `tailwind.config.ts`. Using `@tailwind` directives instead of `@import 'tailwindcss'` breaks the build.

4. **ISR and `cache: 'no-store'` don't mix** — Product listing pages use `revalidate = 3600`. `cache: 'no-store'` on fetch calls inside them defeats ISR and can cause build failures.

5. **Locale validation throws** — The layout validates the locale param. Adding a locale requires updating `i18n/routing.ts` first.

6. **Fallback product coverage** — `FALLBACK_PRODUCTS` covers TVs, WMs, RAC, CAC. Refrigerators come from `content/RefProducts/`. Both feed the sitemap, so all product URLs resolve without a DB.

7. **RTL flips layout** — Persian (fa) is RTL. Flex direction, carousel scroll, padding/margin semantics all reverse. Test both locales whenever touching layout or carousel components.

8. **DB is primary, JSON is fallback** — `lib/serviceCenterSource.ts` and `lib/iranLocationSource.ts` query Postgres first. The JSON files are emergency fallbacks, not authoritative.

9. **Media permissions** — The Next app runs as `reza` on the server. Media directory permissions must be `a+rX` (not `www-data`-only/`700`). A wrong permission causes `EACCES` and a 503 crash loop. `sync-media.sh` always applies this fix.

10. **`prisma.$disconnect()` usage** — Never call it inside route handlers or server components. Only use it at the end of seed scripts.

11. **Hreflang is HTML-only** — The next-intl HTTP Link-header hreflang was removed (produced malformed headers). Hreflang is emitted only as HTML `<link rel="alternate">` in page `<head>`.

12. **`SITE_CONTENT_LAST_MODIFIED` in `lib/seo/site.ts`** — A fixed date used as sitemap `lastmod` baseline. Only bump it when site content meaningfully changes — not on every deploy — to keep the signal trustworthy for crawlers.
