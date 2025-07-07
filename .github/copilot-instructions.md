## Architecture Overview

### Monorepo Structure

* **packages/design**
  Base UI component library under `@rs/design` namespace
* **packages/i18n**
  Internationalization utilities (dates, times, units)
* **packages/styles**
  Global design tokens and CSS utilities
* **website/**
  Next.js 15 app using the App Router with parallel routes

### Content & Routing

* MDX posts in `app/(posts)/{category}/posts/*.mdx` with frontmatter
* Helper `createPostPage()` for generating dynamic post routes
* `getPosts(category)` from `lib/mdx` to fetch content
* Parallel route slots `@breadcrumb` and `@footer` in root layout

### API Routes & External Integrations

* Spotify endpoints under `/api/spotify/{playback-state,recently-played,get-artist}`
* Steam via `/api/steam/recently-played`
* Trakt under `/api/trakt/*`
* All keys kept in environment variables (see `turbo.json`)

### Styling & Animation

* CSS Modules with SCSS co-located alongside components
* Framer Motion for animations and layout transitions
* `next-view-transitions` for page-level transitions
* CSS custom properties for dynamic theming

---

## Essential Workflows

```bash
pnpm dev          # Start all packages in watch mode via Turborepo
pnpm build        # Build the entire monorepo
pnpm lint         # Run Biome formatter + Stylelint
```

---

## Component Development

* All components live in `packages/design/src/{component}/index.tsx`

* Follow `data-rs-{component}-{part}` for custom CSS attributes

* Always wrap Base UI components, e.g.:

  ```tsx
  import { Menu } from '@base-ui-components/react/menu'

  const MenuRoot: React.FC<MenuRootProps> = (props) => (
    <Menu.Root {...props} data-rs-menu-root />
  )
  ```

* Barrel-export from `packages/design/src/index.ts`

---

## Coding Standards

* **Imports:**
  Use named imports from `@base-ui-components/react/[component]`
* **Linting:**
  Biome in place of ESLint/Prettier
* **TypeScript:**
  Strict mode enabled
* **Runtime:**
  Node.js ≥ 18
* **Workspaces:**
  `workspace:*` for internal dependencies

---

## File Structure Patterns

* Co-locate CSS Modules with component files
* Frontmatter interface in `types/frontmatter/index.tsx`
* Post categories: `projects`, `experiments`, `insights`, `archive`

---

## Project-Specific Patterns

### Posts System

* Categories under `app/(posts)/…`
* Placeholder shapes for posts without media in `components/posts/placeholder/shapes`

### Component Composition

* `ConditionalWrap` for optional wrappers
* `@radix-ui/react-portal` for overlays
* Skeleton loading via `react-loading-skeleton`

### Footer Carousel

* Embla carousel (`embla-carousel-react`) for multi-page footer
* Pages include: links, Spotify now playing, Steam recent games
* Custom scale animations on scroll and drag

### Island Component

* Reading progress tracker with `useHeadingTracker`, `useScrollProgress`, `useReadingTime`
* Expandable sections animated with Framer Motion