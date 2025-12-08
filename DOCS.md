# Hisense Iran Web App Documentation

This document captures how the app is wired today so we can keep it maintainable as it grows.

## Quick Start

- Requirements: Node 20+, npm (uses `npm run` scripts), PostgreSQL if you want the product database.
- Setup: `cp .env.example .env` then fill `DATABASE_URL` and `NEXT_PUBLIC_SITE_URL`.
- Install: `npm install`
- Run dev server: `npm run dev` (http://localhost:3000)
- Lint: `npm run lint`
- Build & start: `npm run build && npm run start`
- Sitemap: `npm run sitemap` (runs automatically after `npm run build`)

## Environment Variables

- `DATABASE_URL`: Postgres connection string for Prisma; when omitted the app serves the bundled TV content instead of DB data.
- `NEXT_PUBLIC_SITE_URL`: Base URL used for canonical/OG links and sitemaps.

## Tech Stack

- Next.js 16 App Router with TypeScript and React 19.
- `next-intl` for routing and translations (locales: `fa`, `en`).
- Prisma as the optional product data source with Postgres.
- Tailwind CSS v4 + custom CSS variables in `assets/sytles/globals.css` for theming.
- SEO helpers: `next-seo`, `next-sitemap`.

## Directory Map

- `app/`: App Router pages and layouts. Locale-aware routes live in `app/[locale]/`. Two API routes in `app/api/products`.
- `components/`: UI building blocks (header, footer, hero, TV product detail sections, themed utilities, route scaffolding, SEO).
- `content/`: Static content bundles (`tvProducts.ts` fallback catalog, `about/` copy).
- `i18n/`: Locale routing and request config for `next-intl`.
- `lib/`: Cross-cutting utilities (`db.ts`, product normalizers).
- `messages/`: Translation dictionaries per locale.
- `prisma/`: Prisma schema/models.
- `public/`: Images, fonts, and manifest assets.
- `assets/sytles/`: Global CSS, third-party styles (Swiper, Select2).
- `seo/`: Keyword list helper.
- `types/`: Shared type definitions (TV product model, SVG module typing).

## Data & API Flow

- Product catalog lives in Postgres when `DATABASE_URL` is set. Prisma models: `Product` plus localized `ProductCopy` rows.
- API routes:
  - `GET /api/products`: returns normalized product list. Tries DB first; falls back to bundled `FALLBACK_PRODUCTS`.
  - `GET /api/products/[id]`: fetches by `id` or `slug`, same DB→fallback logic.
  - Both endpoints include `Cache-Control: s-maxage=60, stale-while-revalidate=300` and `X-Data-Source` headers.
- Normalization (`lib/api/products/normalizers.ts`):
  - Converts Prisma records or static `TV_PRODUCTS` into the API-friendly `ApiProduct` shape defined in `lib/api/products/types.ts`.
  - Sanitizes JSON fields, ensures locales default correctly (`fa` falls back to `en` copy when missing).
  - Builds sensible defaults (e.g., banners, section groups) when optional fields are absent.
- Fallback content (`content/tvProducts.ts`) is also used directly by the TV listing/detail pages when no DB is connected.

## Routing & Pages

- Root (`app/page.tsx`) redirects to the default locale (`fa`).
- `app/[locale]/layout.tsx` guards locale validity, wires `next-intl`, renders `<Header/>` + `<Footer/>`, sets page metadata and structured data.
- Home (`app/[locale]/page.tsx`): hero carousel plus localized category spotlights that deep-link into product families.
- TV catalog (`app/[locale]/tv-hisense/page.tsx`): builds slides and product cards from `TV_PRODUCTS`.
- TV detail (`app/[locale]/tv-hisense/[productId]/page.tsx`): resolves a product by ID, hydrates copy blocks into sections (hero, feature cards, comparisons, specs) and breadcrumbs, supports RTL/LTR layouts.
- Other routes (`/rac`, `/cac`, `/refrigerator`, `/washing-machine`, `/led-dcode`, `/faq`, `/warranty-and-guarantee`, `/contact-us`, `/portal`, `/complaint`, `/survey`) are scaffolded via `createRoutePage` and currently render an under-construction experience.
- Not-found: locale-aware 404 with brand logos at `app/[locale]/not-found.tsx` (re-exported as `app/not-found.tsx`).

## Internationalization

- Locales defined in `i18n/routing.ts` with detection disabled; middleware (`proxy.ts`) keeps unknown paths on locale-aware routes.
- Server-side message loading in `i18n/request.ts`; navigation helpers from `i18n/navigation.ts`.
- Translations stored in `messages/en.json` and `messages/fa.json`. Components fetch copy via `useTranslations`/`getTranslations`.
- Locale-specific metadata is built with `next-intl` server helpers for the locale layout and TV pages.

## Styling & Theming

- Global CSS variables define light/dark palettes; `ThemeProvider` toggles `data-theme` + `dark` class and persists preference in `localStorage`.
- Tailwind v4 layer is imported via `@import 'tailwindcss';`; breakpoint tokens live in `@theme` in `globals.css`.
- Component-level styles rely on semantic design tokens (e.g., `--surface-color`, `--brand-color`).

## SEO & Structured Data

- `components/seo/StructuredData.tsx` renders `OrganizationJsonLd` and `ProductJsonLd` per locale.
- Sitemaps via `next-sitemap.config.js`; generates locale variants and canonicalizes `/` to `/fa`.
- `app/[locale]/layout.tsx` and TV detail pages set OG/Twitter metadata and alternates.

## Content Management Tips

- Adding a TV product without DB: extend `content/tvProducts.ts` using the shapes in `types/tv.ts`. Provide both `en` and `fa` copy blocks for best results.
- Adding translations: update `messages/*.json` and any content JSON under `content/`.
- Connecting the DB: run Prisma migrations (see `prisma/schema.prisma`), set `DATABASE_URL`, and the API routes plus product pages will pull from Postgres.
- Updating navigation: edit `components/header/navigationData.ts` for menu structure and locale-specific labels.

## Quality & Ops

- Lint: `npm run lint`
- Build check: `npm run build`
- Sitemap/regeneration: `npm run sitemap` (runs postbuild)
- Husky hooks are configured via `.husky/` and `package.json` `prepare` script.

## Keeping Documentation Updated

- Update this file when you add routes, API fields, or content sources. Capture:
  - New environment variables or scripts.
  - Data shape changes (e.g., product sections, copy blocks).
  - New pages/components and their responsibilities.
- For significant UX/content changes, add a short “What changed / Why” note under a new heading and date-stamp it.
