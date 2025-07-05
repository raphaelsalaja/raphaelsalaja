# Project Context

This is a pnpm monorepo w**Content & Routing:**
- MDX content in `app/(posts)/{category}/posts/*.mdx` with frontmatter
- Use `createPostPage()` helper from `lib/create-post-page` for dynamic routes
- Posts fetched via `getPosts(category)` from `lib/mdx`
- Next.js parallel routes: `@breadcrumb` and `@footer` render different content per route

**API Routes & External Services:**
- Spotify: `/api/spotify/{playback-state,recently-played,get-artist}`
- Steam: `/api/steam/recently-played` 
- Environment variables required for API integrations (see `turbo.json`)

**Styling & Animation:**
- CSS Modules with SCSS for component styles
- Motion (Framer Motion) for animations, especially layout animations
- `next-view-transitions` for page transitions
- CSS custom properties for dynamic values

## Project-Specific Patterns

**Posts System:**
- Categories: `projects`, `experiments`, `insights`, `archive`
- Frontmatter interface in `types/frontmatter/index.ts`
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
- Test components with loading/error states using conditional rendering patterns a Next.js portfolio website featuring a modular design system. The architecture emphasizes accessibility, performance, and sophisticated interactive elements using Base UI components, Motion animations, and external API integrations.

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

## Base UI Documentation Navigation

**Quick start**
[https://base-ui.com/react/overview/quick-start](https://base-ui.com/react/overview/quick-start)
**Accessibility**
[https://base-ui.com/react/overview/accessibility](https://base-ui.com/react/overview/accessibility)
**Releases**
[https://base-ui.com/react/overview/releases](https://base-ui.com/react/overview/releases)

**Handbook**

* Styling: [https://base-ui.com/react/handbook/styling](https://base-ui.com/react/handbook/styling)
* Animation: [https://base-ui.com/react/handbook/animation](https://base-ui.com/react/handbook/animation)
* Composition: [https://base-ui.com/react/handbook/composition](https://base-ui.com/react/handbook/composition)

**Components**
Accordion: [https://base-ui.com/react/components/accordion](https://base-ui.com/react/components/accordion)
Alert Dialog: [https://base-ui.com/react/components/alert-dialog](https://base-ui.com/react/components/alert-dialog)
Avatar: [https://base-ui.com/react/components/avatar](https://base-ui.com/react/components/avatar)
Checkbox: [https://base-ui.com/react/components/checkbox](https://base-ui.com/react/components/checkbox)
Checkbox Group: [https://base-ui.com/react/components/checkbox-group](https://base-ui.com/react/components/checkbox-group)
Collapsible: [https://base-ui.com/react/components/collapsible](https://base-ui.com/react/components/collapsible)
Context Menu: [https://base-ui.com/react/components/context-menu](https://base-ui.com/react/components/context-menu)
Dialog: [https://base-ui.com/react/components/dialog](https://base-ui.com/react/components/dialog)
Field: [https://base-ui.com/react/components/field](https://base-ui.com/react/components/field)
Fieldset: [https://base-ui.com/react/components/fieldset](https://base-ui.com/react/components/fieldset)
Form: [https://base-ui.com/react/components/form](https://base-ui.com/react/components/form)
Input: [https://base-ui.com/react/components/input](https://base-ui.com/react/components/input)
Menu: [https://base-ui.com/react/components/menu](https://base-ui.com/react/components/menu)
Menubar: [https://base-ui.com/react/components/menubar](https://base-ui.com/react/components/menubar)
Meter: [https://base-ui.com/react/components/meter](https://base-ui.com/react/components/meter)
Navigation Menu: [https://base-ui.com/react/components/navigation-menu](https://base-ui.com/react/components/navigation-menu)
Number Field: [https://base-ui.com/react/components/number-field](https://base-ui.com/react/components/number-field)
Popover: [https://base-ui.com/react/components/popover](https://base-ui.com/react/components/popover)
Preview Card: [https://base-ui.com/react/components/preview-card](https://base-ui.com/react/components/preview-card)
Progress: [https://base-ui.com/react/components/progress](https://base-ui.com/react/components/progress)
Radio: [https://base-ui.com/react/components/radio](https://base-ui.com/react/components/radio)
Scroll Area: [https://base-ui.com/react/components/scroll-area](https://base-ui.com/react/components/scroll-area)
Select: [https://base-ui.com/react/components/select](https://base-ui.com/react/components/select)
Separator: [https://base-ui.com/react/components/separator](https://base-ui.com/react/components/separator)
Slider: [https://base-ui.com/react/components/slider](https://base-ui.com/react/components/slider)
Switch: [https://base-ui.com/react/components/switch](https://base-ui.com/react/components/switch)
Tabs: [https://base-ui.com/react/components/tabs](https://base-ui.com/react/components/tabs)
Toast: [https://base-ui.com/react/components/toast](https://base-ui.com/react/components/toast)
Toggle: [https://base-ui.com/react/components/toggle](https://base-ui.com/react/components/toggle)
Toggle Group: [https://base-ui.com/react/components/toggle-group](https://base-ui.com/react/components/toggle-group)
Toolbar: [https://base-ui.com/react/components/toolbar](https://base-ui.com/react/components/toolbar)
Tooltip: [https://base-ui.com/react/components/tooltip](https://base-ui.com/react/components/tooltip)

**Utilities**

* Direction Provider: [https://base-ui.com/react/utilities/direction-provider](https://base-ui.com/react/utilities/direction-provider)
* useRender: [https://base-ui.com/react/utilities/use-render](https://base-ui.com/react/utilities/use-render)