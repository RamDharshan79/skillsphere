## Overview
Build a minimal, clean full-stack app that lists free courses and redirects to official URLs. Frontend uses Next.js with utility-first styling; backend uses Node.js + Express with Firestore via Firebase Admin SDK; admin-only sync from Google Sheets.

## Tech Choices
- Frontend: Next.js (Pages router), React, Tailwind CSS
- Backend: Node.js, Express, Firebase Admin SDK, googleapis (Sheets), cors, dotenv
- Database: Firestore (collection `courses`)

## Project Layout
```
skillsphere/
  frontend/
    pages/
      index.jsx
    components/
      Header.jsx
      SearchFilters.jsx
      DomainGrid.jsx
      FeaturedCourseRow.jsx
      CourseList.jsx
      CourseCard.jsx
      CourseDetailModal.jsx
    lib/
      api.js
      types.js
    styles/
      globals.css
    tailwind.config.js
    postcss.config.js
    .env.local
    package.json
  backend/
    src/
      server.js
      firebaseAdmin.js
      sheetsSync.js
      repositories/
        coursesRepo.js
      routes/
        coursesRoutes.js
        adminRoutes.js
      utils/
        parseQuery.js
        computeDocId.js
    .env
    package.json
```

## Environment Variables
- Frontend (`frontend/.env.local`):
  - `NEXT_PUBLIC_API_BASE_URL` (e.g. http://localhost:4000)
- Backend (`backend/.env`):
  - Firebase: `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY` (escape newlines)
  - Sheets: `GOOGLE_SERVICE_ACCOUNT_EMAIL`, `GOOGLE_PRIVATE_KEY`, `SHEET_ID`, `SHEET_RANGE` (e.g. `Courses!A2:I`)
  - Server: `PORT` (e.g. 4000), `FRONTEND_ORIGIN` for CORS, `ADMIN_SYNC_SECRET`

## Firestore Data Model
Collection: `courses`
- `title` (string)
- `domain` (string)
- `subdomain` (string)
- `level` (string: Beginner | Intermediate | Advanced)
- `duration` (string)
- `certificateAvailable` (boolean)
- `platformName` (string)
- `courseURL` (string)
- `isFeatured` (boolean)

Doc ID strategy: derive from `courseURL` using a stable hash (`computeDocId`), enabling upserts.

## Backend Implementation
- `server.js`: Express app with JSON parsing, CORS (`FRONTEND_ORIGIN`), routes mounted under `/api`.
- `firebaseAdmin.js`: Initialize Admin SDK using env credentials, export `db`.
- `repositories/coursesRepo.js`: Encapsulate Firestore reads/writes and filtering (combine indexed filters in Firestore, apply full-text search in memory for simplicity).
- `routes/coursesRoutes.js`:
  - `GET /api/courses`: accepts `search`, `domain`, `level`, `certificateAvailable`; returns filtered list.
  - `GET /api/courses/featured`: returns `isFeatured == true`.
  - `GET /api/domains`: returns distinct list of domains and subdomains (compute uniques in memory).
- `routes/adminRoutes.js`:
  - `POST /api/admin/sync-courses-from-sheet`: protected by `x-admin-secret`; reads Google Sheet, maps columns to fields, upserts by doc ID.
- `sheetsSync.js`: JWT auth with `googleapis`, read range from `SHEET_ID`/`SHEET_RANGE`, convert rows to course objects.
- `utils/parseQuery.js`: normalize booleans/strings for filters.
- `utils/computeDocId.js`: hash courseURL (e.g., SHA-1 or base64 of URL).

Notes:
- Firestore limitations: multi-field query + text search handled by fetching by filterable fields first, then substring match on `title`/`domain`/`subdomain` in memory.
- Security: never log secrets; restrict CORS to `FRONTEND_ORIGIN`; require `x-admin-secret` for sync.

## Google Sheets Sync
- Expected columns to match Firestore fields: `title, domain, subdomain, level, duration, certificateAvailable, platformName, courseURL, isFeatured`.
- Read-only JWT with scope `https://www.googleapis.com/auth/spreadsheets.readonly`.
- Upsert: `db.collection('courses').doc(computeDocId(courseURL)).set(course, { merge: true })`.

## Frontend Implementation
- `pages/index.jsx`: Home page composing all sections. Client-side fetch to API using `lib/api.js`.
- `lib/api.js`: `getCourses(params)`, `getFeaturedCourses()`, `getDomains()`; base URL from `NEXT_PUBLIC_API_BASE_URL`.
- `lib/types.js`: JSDoc typedef for `Course` (keeps beginner-friendly JS).
- Components:
  - `Header`: logo text “MaAaNn Skillsphere”, tagline, simple light/dark toggle (adds/removes `dark` class on `html`).
  - `SearchFilters`: search input, domain & level dropdowns, certificate checkbox; emits state up.
  - `DomainGrid`: grid of domain tiles; clicking sets `domain` filter.
  - `FeaturedCourseRow`: horizontal list of featured courses.
  - `CourseList`: renders filtered courses with loading/error states.
  - `CourseCard`: displays fields and primary button “Go to Course” (`target="_blank" rel="noopener noreferrer"`). Optional "Details" opens modal.
  - `CourseDetailModal`: simple overlay showing all info + “Start Learning (Redirect)”.
- Styling: Tailwind configured; minimal classes; add `// BEGIN CUSTOMIZABLE SECTION (styles)` and `// TODO: customize styles here` comments in components.

## Styling & Theming
- Tailwind base setup; centralize color tokens near top of components.
- Dark mode: toggle a `dark` class on `html` and use Tailwind dark variants.

## Data Flow
- Frontend requests:
  - `GET /api/courses` to populate results based on filters/search.
  - `GET /api/courses/featured` for “Top Free Courses of the Week”.
  - `GET /api/domains` to populate domain dropdown and tiles.
- Redirection model: buttons open external `courseURL` in new tab.

## Dev & Run Scripts
- Frontend: `npm run dev` (Next.js), `npm run build`/`start`.
- Backend: `npm run dev` (nodemon), `npm run start` (node).

## Verification Plan
- Local run: backend on `http://localhost:4000`, frontend on `http://localhost:3000` with CORS configured.
- Seed data via Google Sheet and invoke `POST /api/admin/sync-courses-from-sheet` with `x-admin-secret`.
- Manual checks: filters/search behavior, featured row, modal, redirection.

## Next Steps (on approval)
1. Scaffold both projects, install dependencies, and configure Tailwind.
2. Implement backend modules and routes; wire Firestore.
3. Implement frontend components and API integration with loading/error states.
4. Add the admin sync endpoint and test against a sample Google Sheet.
5. Show folder structure and key files; run locally and share preview URLs.