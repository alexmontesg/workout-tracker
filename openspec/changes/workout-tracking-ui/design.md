## Context

The NestJS backend already has a full `Workout` CRUD module (`src/workouts/`) including `POST /workouts/:id/finish`. The frontend has a Next.js app with React Query, shadcn/ui, and Tailwind v4 — but no workout pages exist. Sets are created orphaned at `/sets` without a parent workout. The workout entity exists only in the backend response from the API.

## Goals / Non-Goals

**Goals:**
- Landing page (`/`) with Start Workout CTA and recent finished workouts
- Active workout page showing sets as cards, editable name/notes, add-set flow
- Nested set routes under workouts (`/workouts/[id]/sets/...`)
- Finish workout → immutable, redirect to home
- Mobile-first responsive design with touch-friendly targets
- Reuse existing components (SeriesTable, SerieRow, form patterns)

**Non-Goals:**
- Progress tracking, charts, or volume analytics
- Rest timer, workout templates, or supersets
- Exercise/muscle management in the workout flow
- Authentication or multi-user support
- Offline support or PWA

## Decisions

### 1. Route Architecture: Remove standalone `/sets`, nest under `/workouts`
**Why**: The data model is Workout → Sets → Series. Standalone sets are a dead end. Nesting keeps URLs coherent and makes the workout context explicit. The existing `app/sets/` directory will be removed entirely; the set create/detail pages will live under `app/workouts/[id]/sets/`.
**Alternative considered**: Keep `/sets` but link from workout. Rejected because it fragments the user flow — adding a set to a workout should stay within the workout context.

### 2. Workout Page Composition: Server render + client hydrate
**Why**: Follows the existing pattern in `exercises/page.tsx` and `muscles/page.tsx`. The workout page fetches initial data server-side via the shared API client, passes it as `initialData` to a client component that uses React Query. This gives SSR for initial load + live updates via query invalidation.
**Alternative considered**: Full client-side fetch. Rejected because it degrades perceived performance on mobile connections.

### 3. Set Cards vs. Full Table on Workout Detail
**Why**: A workout has multiple sets (different exercises). A full table would be cramped and lose visual distinction between exercises. Cards with exercise name, series summary, rest time, and a tap-to-expand affordance are more mobile-friendly. Each card links to the set detail page.
**Alternative considered**: Accordion list — expand set inline. Rejected because series-level editing (SeriesTable) is complex enough to warrant its own page.

### 4. Finish Workout: Hard close, no undo
**Why**: Explicit user requirement. Once finished, the workout's `endDate` is set (existing API) and the UI shows the workout as read-only in the home page list. No edit buttons, no add-set CTA. The backend already enforces this at the data level — the `Workout` entity just gets an `endDate`.

### 5. Navigation Shell: Minimal top bar
**Why**: During an active workout, the user is focused on one thing. A simple top bar with a back arrow (to home) and the workout name/date is sufficient. No bottom navigation or sidebar — those would add visual noise on mobile. The exercises/muscles pages remain accessible by direct URL only.
**Alternative considered**: Bottom tab bar with Home / History / Admin. Rejected for scope and because admin pages shouldn't be promoted during workout flow.

## Risks / Trade-offs

- **Mobile-first means desktop will look sparse**: The workout detail page will have a max-width container and lots of vertical space on desktop. Acceptable — this is primarily a mobile app.
- **Removing `/sets` breaks existing bookmarks**: The standalone set page (`/sets/[id]`) no longer exists. Mitigation: add a simple redirect from `/sets/:id` to `/workouts/?set=:id` or just let it 404 gracefully (no users yet).
- **No loading states defined**: React Query handles loading/error states through its standard `isPending` / `isError` patterns. Each page needs at minimum a loading skeleton.
- **Exercise picker for Add Set**: The existing `CreateSetForm` has an exercise selector. For the nested flow, we need to either inline it or create a dedicated `/workouts/[id]/sets/new` page. The page approach is simpler and reuses the existing form component with a `workoutId` prop.
