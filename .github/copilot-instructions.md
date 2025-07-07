# Project Context

This is a pnpm monorepo featuring a Next.js 15 portfolio website with a comprehensive design system built on Base UI components. The architecture emphasizes accessibility, performance, and sophisticated interactive elements.

## Architecture Overview

**Monorepo Structure:**
- `packages/design` - Base UI component library with `@rs/design` namespace
- `packages/i18n` - Internationalization utilities with timezone/measurement formatting  
- `packages/styles` - Global design tokens and CSS utilities
- `website/` - Next.js 15 app with App Router and parallel routes

**Content & Routing:**
- MDX content in `app/(posts)/{category}/posts/*.mdx` with frontmatter
- Use `createPostPage()` helper from `lib/create-post-page` for dynamic routes
- Posts fetched via `getPosts(category)` from `lib/mdx`
- Next.js parallel routes: `@breadcrumb` and `@footer` render different content per route

**API Routes & External Services:**
- Spotify: `/api/spotify/{playback-state,recently-played,get-artist}`
- Steam: `/api/steam/recently-played`, Trakt: `/api/trakt/*`
- Environment variables required for API integrations (see `turbo.json`)

**Styling & Animation:**
- CSS Modules with SCSS for component styles
- Motion (Framer Motion) for animations, especially layout animations
- `next-view-transitions` for page transitions
- CSS custom properties for dynamic values

## Essential Workflows

**Development:**
```bash
pnpm dev          # Starts all packages in watch mode via Turbo
pnpm build        # Builds entire monorepo
pnpm lint         # Runs Biome linter/formatter + Stylelint
```

**Component Development:**
- All design system components in `packages/design/src/{component}/index.tsx`
- Follow `data-rs-{component}-{part}` naming for CSS selectors
- Use Base UI as foundation, extend with custom props/styling

## Coding Standards

**Base UI Integration:**
- Always import from `@base-ui-components/react/[component]` with named imports
- Wrap Base UI components to add custom `data-rs-*` attributes
- Example pattern from `packages/design/src/menu/index.tsx`:
  ```tsx
  const MenuRoot: React.FC<MenuRootProps> = ({ ...props }) => {
    return <Menu.Root {...props} data-rs-menu-root />;
  };
  ```

**Environment Setup:**
- Uses Biome for linting/formatting instead of ESLint/Prettier
- TypeScript strict mode enabled, Node.js >=18 required
- pnpm workspace with `workspace:*` internal dependencies
- Environment variables defined in `turbo.json` for API integrations

**File Structure Patterns:**
- Export components from package entry points with barrel exports
- CSS files co-located with component files using CSS Modules
- Frontmatter interface in `types/frontmatter/index.tsx` for MDX posts
- Post categories: `projects`, `experiments`, `insights`, `archive`

## Project-Specific Patterns

**Posts System:**
- Categories: `projects`, `experiments`, `insights`, `archive`
- Frontmatter interface in `types/frontmatter/index.tsx`
- Placeholder shapes for posts without media in `components/posts/placeholder/shapes`

**Component Composition:**
- `ConditionalWrap` utility for conditional component wrapping
- Portal usage with `@radix-ui/react-portal` for overlays
- Skeleton loading states with `react-loading-skeleton`

**Footer Carousel:**
- Multi-page footer with Embla carousel (`embla-carousel-react`)
- Pages: Base (links), Spotify (now playing), Steam (recent games)
- Custom scaling animations on scroll/drag

**Island Component:**
- Reading progress tracker with heading navigation
- Uses `useHeadingTracker`, `useScrollProgress`, `useReadingTime` hooks
- Expandable/collapsible states with layout animations

## Development Notes

- Uses Biome for linting/formatting instead of ESLint/Prettier
- TypeScript strict mode enabled
- pnpm workspace with `workspace:*` internal dependencies
- Turbo pipeline for coordinated builds across packages
- Node.js >=18 required (see root `package.json`)

## Component Development Guidelines

- Export components from package entry points with barrel exports
- Use TypeScript interfaces extending Base UI component props
- CSS files co-located with component files
- Add JSDoc comments for public APIs
- Follow accessibility patterns from Base UI documentation
- Test components with loading/error states using conditional rendering patterns

## Code Review and Best Practices

- Test all UI components with common accessibility tools
- Include at least one usage example in `/examples` for every new component
- Follow the repo's file structure and naming conventions
- Reuse and compose existing Base UI components; avoid duplicating logic
- Use descriptive names for variables and functions
- Write concise, self-explanatory commit messages

## Documentation

- When adding or updating a component, update its markdown docs in `/docs`
- Link to the relevant Base UI docs for any complex usage or custom implementation

## Architecture Overview

**Monorepo Structure:**
- `packages/design` - Base UI component library with `@rs/design` namespace
- `packages/i18n` - Internationalization utilities with timezone/measurement formatting  
- `packages/styles` - Global design tokens and CSS utilities
- `website/` - Next.js 15 app with App Router and parallel routes

**Key Patterns:**
- Next.js App Router with parallel routes: `@breadcrumb` and `@footer` slots in root layout
- MDX-based content system in `app/(posts)/{category}/posts/*.mdx` structure
- External API integration (Spotify, Steam, Trakt) for dynamic footer content
- Component composition with Base UI + custom styling via CSS Modules

## Essential Workflows

**Development:**
```bash
pnpm dev          # Starts all packages in watch mode via Turbo
pnpm build        # Builds entire monorepo
pnpm lint         # Runs Biome linter/formatter + Stylelint
```

**Component Development:**
- All design system components in `packages/design/src/{component}/index.tsx`
- Follow `data-shunpo-{component}-{part}` naming for CSS selectors
- Use Base UI as foundation, extend with custom props/styling

## Coding Standards

**Base UI Integration:**
- Always import from `@base-ui-components/react/[component]` with named imports
- Wrap Base UI components to add custom `data-shunpo-*` attributes
- Example pattern from `packages/design/src/menu/index.tsx`:
  ```tsx
  const MenuRoot: React.FC<MenuRootProps> = ({ ...props }) => {
    return <Menu.Root {...props} data-shunpo-menu-root />;
  };
  ```

**Environment Setup:**
- Uses Biome for linting/formatting instead of ESLint/Prettier
- TypeScript strict mode enabled, Node.js >=18 required
- pnpm workspace with `workspace:*` internal dependencies
- Environment variables defined in `turbo.json` for API integrations

**File Structure Patterns:**
- Export components from package entry points with barrel exports
- CSS files co-located with component files using CSS Modules
- Frontmatter interface in `types/frontmatter/index.tsx` for MDX posts
- Post categories: `projects`, `experiments`, `insights`, `archive`

## Code Review and Best Practices

* Test all UI components with common accessibility tools.
* Include at least one usage example in `/examples` for every new component.
* Follow the repo’s file structure and naming conventions.
* Reuse and compose existing Base UI components; avoid duplicating logic.
* Use descriptive names for variables and functions.
* Write concise, self-explanatory commit messages.

## Documentation

* When adding or updating a component, update its markdown docs in `/docs`.
* Link to the relevant Base UI docs for any complex usage or custom implementation.