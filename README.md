# EFC Media — website & CMS

Marketing website for **EFC Media — Your Growth Partner.**, with a full admin dashboard.
Everything visitors see (pages, sections, navigation, services, case studies, articles, team,
FAQs, forms, contact details, logo, SEO) is edited at `/admin` and goes live on publish —
no code changes and no redeploy.

| | |
| --- | --- |
| Live site | https://efc-media.vercel.app |
| Admin | https://efc-media.vercel.app/admin |
| Stack | Next.js 16 (App Router, TypeScript, Node.js) · Payload CMS 3 · PostgreSQL (Neon) · Vercel Blob · Tailwind CSS 4 |
| Hosting | Vercel (functions in `sin1`, Singapore — next to the database) |

---

## Contents

1. [Quick start](#quick-start)
2. [Environment variables](#environment-variables)
3. [Database](#database)
4. [Seeding content](#seeding-content)
5. [Deploying to Vercel](#deploying-to-vercel)
6. [Using the admin](#using-the-admin)
7. [Before launch](#before-launch)
8. [How it works](#how-it-works)
9. [Testing](#testing)
10. [Project structure](#project-structure)

---

## Quick start

Requirements: Node.js 22 or 24 (Vercel builds with 24), npm, and the Vercel CLI (`npm i -g vercel`).

```bash
npm install
vercel link                      # connect this folder to the Vercel project
vercel env pull .env.local       # download the project's environment variables
npm run dev                      # http://localhost:3000  ·  admin at /admin
```

`.env.local` points at the **production** database. To develop without touching production,
add a `.env.development.local` that overrides the database (see [Database](#database)) —
`npm run dev`, `npm run migrate` and `npm run seed` all pick it up automatically.

### Commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server (reads straight from the database, no caching) |
| `npm run build` / `npm start` | Production build / server |
| `npm run ci` | What Vercel runs: apply migrations, then build |
| `npm run migrate` | Apply pending migrations to the **development** database |
| `npm run migrate:prod` | Apply pending migrations to the **production** database |
| `npm run migrate:create -- name` | Create a migration after changing collections/fields |
| `npm run seed` / `npm run seed:prod` | Load the starter content (development / production) |
| `npm run seed -- reset` | Wipe content and load the starter content again |
| `npm run generate:types` | Regenerate `src/payload-types.ts` after schema changes |
| `npm run generate:importmap` | Regenerate the admin import map after adding admin components |
| `npm run lint` · `npm run typecheck` | ESLint · TypeScript |
| `npm test` | Unit tests (Vitest) |
| `npm run test:e2e` | Browser tests (Playwright) — see [Testing](#testing) |

> **Which database does a command use?** The Payload CLI and Next.js load env files the same
> way: in development they read `.env.development.local` first, then `.env.local`.
> The `:prod` scripts set `NODE_ENV=production`, which skips the development file.

---

## Environment variables

`.env.example` documents every variable. On Vercel they are set under
**Project → Settings → Environment Variables**.

| Variable | Required | Purpose |
| --- | --- | --- |
| `DATABASE_URL` | yes | Pooled Postgres connection (added by the Neon integration) |
| `DATABASE_URL_UNPOOLED` | recommended | Direct connection, used for migrations |
| `BLOB_READ_WRITE_TOKEN` | yes on Vercel | Vercel Blob store for uploads (added when a Blob store is connected) |
| `PAYLOAD_SECRET` | yes | Signs admin sessions and form tokens |
| `PREVIEW_SECRET` | yes | Protects draft preview |
| `CRON_SECRET` | yes | Authorises the scheduled-publishing cron |
| `NEXT_PUBLIC_SITE_URL` | after adding a domain | Canonical origin, e.g. `https://www.efcmedia.com` |
| `CONTACT_TO_EMAIL` | for email | Default recipient of enquiry notifications |
| `EMAIL_FROM_ADDRESS`, `EMAIL_FROM_NAME` | for email | Sender of notification emails |
| `RESEND_API_KEY` **or** `SMTP_HOST`/`SMTP_PORT`/`SMTP_USER`/`SMTP_PASS` | for email | Email provider |
| `PUBLISH_CRON_SCHEDULE` | optional | Cron expression for scheduled publishing (default: daily) |
| `BLOB_PREFIX` | optional | Folder inside the Blob store (e.g. `dev`) |
| `FORM_SECRET` | optional | Separate secret for form tokens |
| `SEED_ADMIN_EMAIL`, `SEED_ADMIN_PASSWORD` | seeding only | First admin account created by `npm run seed` |

Generate secrets with `openssl rand -hex 32`.

---

## Database

The site uses a hosted **PostgreSQL** database (Neon, provisioned through the Vercel
Marketplace). The schema is managed with **migrations** in `src/migrations` — the app never
changes the schema by itself, so a development server can never alter a shared database.

### Changing the schema

```bash
# 1. edit a collection, global or block in src/
npm run generate:types
npm run migrate:create -- describe_the_change
npm run migrate                 # apply to the development database and test
# 2. commit the new files in src/migrations — Vercel applies them on the next deploy
#    (or run `npm run migrate:prod` yourself)
```

### A separate development database

Use a second database (or a Neon branch) for development and put its URLs in
`.env.development.local`:

```bash
DATABASE_URL=postgresql://…/efc_dev?sslmode=require
DATABASE_URL_UNPOOLED=postgresql://…/efc_dev?sslmode=require
BLOB_PREFIX=dev                 # keep development uploads in their own folder
SEED_ADMIN_EMAIL=you@example.com
SEED_ADMIN_PASSWORD=choose-a-strong-password
```

Then `npm run migrate && npm run seed`. On the machine this project was built on, an
`efc_dev` database already exists in the same Neon project and this file is in place.

### Setting up a database from scratch

```bash
vercel integration add neon -m region=sin1 -m auth=false --plan free_v3   # adds DATABASE_URL…
vercel env pull .env.local
npm run migrate:prod
```

Any PostgreSQL 14+ database works: set `DATABASE_URL` (and optionally `DATABASE_URL_UNPOOLED`).

---

## Seeding content

```bash
npm run seed            # development database
npm run seed:prod       # production database
npm run seed -- reset   # wipe content first (users are kept)
```

The seed (`src/seed`) creates the pages (Home, About, Services, Work, Insights, Contact,
Privacy policy), six services, the navigation, footer, site settings, a contact form, FAQs
and three starter articles, and uploads the logo and cover artwork to media storage.

- Brand facts come from the brand book; the services reflect the brand book and the agency's
  Instagram profile.
- **Nothing is invented about clients or results.** Case studies, testimonials, team members
  and statistics are created as clearly labelled **placeholders**.
- If `SEED_ADMIN_EMAIL` and `SEED_ADMIN_PASSWORD` are set and no user exists yet, the first
  admin account is created. Otherwise open `/admin` to create it.
- It refuses to run when content already exists unless you pass `reset`.

---

## Deploying to Vercel

The Vercel project is connected to the GitHub repository
[Siddharthvs8/EFC_Media](https://github.com/Siddharthvs8/EFC_Media):

- **Push to `main`** → production deployment (https://efc-media.vercel.app).
- **Push any other branch / open a pull request** → preview deployment with its own URL.

```bash
git add -A
git commit -m "Describe the change"
git push origin main
```

On every deployment Vercel runs `npm run ci` (see `vercel.ts`): it applies pending
migrations and builds. Content changes made in the admin never need a deploy.

> Preview deployments share the production database, and the build applies migrations.
> Test schema changes against the development database first (see [Database](#database)).

`vercel deploy --prod` from the CLI still works for emergencies, but Git is the normal path.

### Setting up a new Vercel project from scratch

```bash
# 1. Project
npm i -g vercel && vercel login
vercel link                                   # create/select the project

# 2. Database — Neon Postgres in Singapore
vercel integration add neon -m region=sin1 -m auth=false --plan free_v3

# 3. Media storage — a public Vercel Blob store
vercel blob create-store efc-media-uploads --access public --region sin1 --yes

# 4. Secrets (repeat for production, preview and development)
openssl rand -hex 32 | vercel env add PAYLOAD_SECRET production
openssl rand -hex 32 | vercel env add PREVIEW_SECRET production
openssl rand -hex 32 | vercel env add CRON_SECRET production

# 5. Database schema and starter content
vercel env pull .env.local
npm install
npm run migrate:prod
SEED_ADMIN_EMAIL=you@example.com SEED_ADMIN_PASSWORD='a-strong-password' npm run seed:prod

# 6. Deploy
vercel deploy --prod
```

Then, in the Vercel dashboard:

- **Domains** → add the real domain, set `NEXT_PUBLIC_SITE_URL` to it and redeploy.
- **Git** → connect the repository (`vercel git connect <repo-url>`) so pushes deploy automatically.
- **Email** → add `RESEND_API_KEY` (or the `SMTP_*` variables), `EMAIL_FROM_ADDRESS` and
  `CONTACT_TO_EMAIL`, then redeploy. With Resend from the Marketplace:
  `vercel integration add resend -m domain=yourdomain.com -m region=ap-northeast-1`
  (the domain has to be verified with DNS records before email can be sent from it).

Notes

- Function region is `sin1` (in `vercel.ts`), matching the database region.
- **Scheduled publishing** uses a Vercel Cron that calls `/api/payload-jobs/run`. Hobby
  projects may run a cron once a day, so by default scheduled items publish at the next
  daily run (06:00 IST). On Pro, set `PUBLISH_CRON_SCHEDULE` to `*/5 * * * *` and redeploy.
- Vercel's Hobby plan is for non-commercial use; a business site belongs on Pro.

---

## Using the admin

Sign in at `/admin`.

| I want to… | Where |
| --- | --- |
| Edit a page's text, images or buttons | **Content → Pages** → open the page → edit a section |
| Add, remove, reorder or hide sections | In the page's **Sections** list: *Add section*, drag the handle, or tick **Section settings → Hide this section** |
| Preview before publishing | **Live Preview** (side-by-side, with phone/tablet/desktop sizes) or **Preview** (new tab) |
| Save without publishing | **Save draft** (edits also autosave as drafts) |
| Publish later | **Publish** menu → **Schedule publish** |
| Change the menu or header button | **Site → Header & navigation** |
| Change the footer | **Site → Footer** |
| Add or reorder services | **Content → Services** (drag rows to reorder) |
| Publish a case study | **Content → Case studies** |
| Write an article | **Content → Insights** |
| Edit testimonials, team, FAQs | **Library** |
| Upload or organise images and video | **Library → Media** (folders supported) |
| Read enquiries | **Enquiries → Enquiries** (mark them *In progress* / *Done*) |
| Change form fields or who gets notified | **Enquiries → Forms** (admins) |
| Logo, favicon, contact details, social links, SEO defaults | **Site → Site settings** |
| Wording on service / case study / article / 404 templates | **Site → Site settings → Labels** |
| Per-page search title, description, sharing image | The page's **SEO** tab |
| Add people and set what they can do | **Admin → Users** |

**Headings.** Wrap a word or phrase in `*asterisks*` to highlight it
(`We turn clicks into *customers.*`). Press Enter for a line break.

**Roles**

| Role | Can do |
| --- | --- |
| Admin | Everything, including users and forms |
| Editor | All content, media, navigation and site settings; publish; read enquiries |
| Author | Write Insights articles as drafts and upload media; cannot publish |

**Index pages.** The pages with the slugs `services`, `work` and `insights` are the index
pages for those sections; the page with the slug `home` is the home page.

---

## Before launch

The dashboard shows a **Launch checklist**. In short:

1. **Change the admin login.** The seeded admin uses a placeholder email address. Sign in,
   open **Admin → Users**, set a real email and a new password, and add accounts for the team.
2. **Replace placeholders.** Sample case studies, testimonials, team members and the
   statistics section are marked *Placeholder* on the site. Replace them with real, approved
   content — or switch on **Site settings → Launch → Hide placeholder content**.
3. **Contact details.** Add the email address (shown as a placeholder until then) and check
   the phone/WhatsApp number and address in **Site settings → Contact**.
4. **Privacy policy.** Replace the placeholder text on the Privacy policy page.
5. **Email notifications.** Configure an email provider and `CONTACT_TO_EMAIL` (above).
   Until then enquiries are still saved under **Enquiries**.
6. **Domain.** Add the domain in Vercel and set `NEXT_PUBLIC_SITE_URL`.
7. **Go public.** Switch on **Site settings → Launch → Let search engines index the site**.
   Until then every page is `noindex` and `robots.txt` blocks crawlers.

---

## How it works

**Publishing and caching.** Public pages are statically rendered and served from Vercel's
CDN. Every CMS query the site makes is cached under one tag (`src/lib/data.ts`). Payload
hooks (`src/hooks/revalidate.ts`) expire that tag when published content, navigation or
settings change, so the next visit to any page renders fresh content. Draft saves do not
touch the live site.

**Preview.** *Preview* and *Live Preview* open `/next/preview`, which checks the preview
secret and the signed-in user, turns on Next.js draft mode and shows the latest draft,
uncached.

**Page sections.** Sections are Payload blocks defined in `src/blocks/config.ts`, each with
a React component in `src/blocks/`. To add a new section type: add the block config, add the
component, add a `case` in `src/blocks/RenderBlocks.tsx`, then create a migration.

**Placeholders.** Case studies, testimonials and team members have a *Placeholder content*
checkbox, and the statistics section has its own. Placeholders are labelled on the site,
kept out of search engines and structured data, and can be hidden site-wide with one switch.

**Media.** Uploads go straight from the browser to Vercel Blob (no request-size limit, so
video works) and are served from the Blob CDN. Each upload gets a unique, permanent URL.
Images are optimised on demand by `next/image` (AVIF/WebP, responsive sizes, lazy loading,
focal point respected).

**Forms.** Forms are defined in the admin (form-builder plugin). Submissions are handled by
a server action (`src/app/(frontend)/actions/forms.ts`): honeypot → signed timing token →
validation against the form definition → per-visitor rate limit → saved to
**Enquiries** → notification emails. The public API cannot create submissions or read forms.

**Design system.** Tokens and components are in `src/app/(frontend)/globals.css`: off-white
paper, charcoal ink, and the brand's yellow → orange gradient as the single accent. The
brand book's blue/navy is not used as a theme colour.

- *Logo.* The supplied logo artwork is used unaltered (only its transparent margins are
  trimmed): `src/assets/brand/`. Because its wordmark is dark, on dark backgrounds it sits
  on a light plate. The header uses the symbol on its own; if there is an official
  horizontal lockup, upload it under **Site settings → Header logo (compact)**.
- *Type.* Poppins (the brand typeface) for text and UI; Bricolage Grotesque for display
  headlines. Rosca, the wordmark typeface, is commercial and appears only inside the logo —
  if it is licensed for web use, load it in `src/app/(frontend)/layout.tsx`.
- *Motion.* CSS entrances, scroll reveals and a few scroll-linked effects driven by one
  small script (`src/components/Motion.tsx`). Scrolling is always native. With
  `prefers-reduced-motion`, everything is shown in its final state.

**SEO.** Per-document SEO fields, canonical URLs, Open Graph/Twitter cards (uploaded image,
site default, or a generated card from `/og`), `sitemap.xml`, `robots.txt`, and JSON-LD
(Organization, WebSite, Service, BlogPosting, BreadcrumbList, FAQPage).

---

## Testing

```bash
npm test                                   # unit tests
npm run lint && npm run typecheck

# Browser tests against the deployed site (public pages + contact form):
BASE_URL=https://efc-media.vercel.app PW_CHANNEL=chrome npm run test:e2e

# Everything, including the admin flows, against a local server + development database:
PW_CHANNEL=chrome npm run test:e2e
```

- `PW_CHANNEL=chrome` uses the installed Chrome; without it run `npx playwright install chromium` once.
- `tests/e2e/public.spec.ts` — every page on desktop and mobile, navigation, keyboard and
  focus, scroll motion, reduced motion, accessibility (axe, WCAG 2.1 AA), SEO tags, headers
  and API access rules.
- `tests/e2e/contact.spec.ts` — labels, validation, spam protection and a real submission
  (set `E2E_SKIP_SUBMIT=true` to skip the submission).
- `tests/e2e/admin.spec.ts` — signs in and edits the hero, adds a service, publishes a case
  study, changes the navigation, uploads an image and checks preview. These tests change
  content, so they **only run against a local server** and use the admin account from
  `.env.development.local`.

---

## Project structure

```
src/
  app/
    (frontend)/        public site: layout, pages, sitemap, /og image, preview routes, form action
    (payload)/         Payload admin (/admin) and REST API (/api) — generated, do not edit
    robots.ts          /robots.txt
  access/              roles and access rules
  blocks/              page sections: config.ts (fields) + components + RenderBlocks.tsx
  collections/         Pages, Services, CaseStudies, Posts, Media, Users, Library (categories, testimonials, team, FAQs)
  components/          site components (header, footer, cards, forms, motion) and admin/ components
  fields/              reusable field groups (link, SEO, section settings, rich text editors)
  globals/             Header, Footer, Site settings
  hooks/               cache revalidation, publish date
  lib/                 data access, SEO, forms, links, labels, helpers
  migrations/          database migrations
  seed/                starter content
  payload.config.ts    CMS configuration (database, storage, email, plugins, jobs)
tests/                 unit and end-to-end tests
vercel.ts              Vercel build command, region and cron
```
