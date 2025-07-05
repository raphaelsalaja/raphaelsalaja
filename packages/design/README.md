# @rs/design - Complete Base UI Component Library

A comprehensive, opinionated React component library built on top of Base UI components, featuring modern styling, accessibility, and TypeScript support.

## 🚀 Features

- **Complete Base UI Coverage**: Implements all available Base UI components
- **TypeScript First**: Full TypeScript support with proper type definitions
- **Accessible**: Built on Base UI's accessibility-first foundation
- **Customizable**: CSS custom properties for easy theming
- **Motion Ready**: Designed for animations with Framer Motion
- **Modern Styling**: Uses CSS Modules with SCSS for component styles
- **Tree Shakeable**: Modular exports for optimal bundle size

## 📦 Components

### Form Controls
- **Button** - Flexible button component with variants and sizes
- **Input** - Text input with validation states
- **NumberField** - Numeric input with increment/decrement and scrub area
- **Checkbox** - Checkbox with indeterminate state support
- **CheckboxGroup** - Grouped checkbox controls
- **Radio** - Radio button component
- **Switch** - Toggle switch with size variants
- **Toggle** - Toggle button with variants
- **ToggleGroup** - Grouped toggle buttons
- **Select** - Dropdown select component
- **Slider** - Range slider with multiple values support
- **Field** - Form field wrapper with label and validation
- **Fieldset** - Fieldset grouping with legend
- **Form** - Form wrapper with validation state

### Navigation & Layout
- **Menu** - Context and dropdown menus
- **ContextMenu** - Right-click context menus
- **Menubar** - Application menu bar
- **NavigationMenu** - Main navigation with submenus
- **Breadcrumb** - Navigation breadcrumbs
- **Tabs** - Tab navigation component
- **Toolbar** - Button and control grouping
- **Accordion** - Collapsible content sections
- **Collapsible** - Simple collapsible content
- **Separator** - Visual content divider
- **ScrollArea** - Custom scrollable area

### Overlays & Feedback
- **Dialog** - Modal dialog component
- **AlertDialog** - Alert and confirmation dialogs
- **Popover** - Floating content container
- **PreviewCard** - Hover preview cards
- **Tooltip** - Hover and focus tooltips
- **Toast** - Notification system with queue management
- **Progress** - Progress indicators
- **Meter** - Value measurement display

### Data Display
- **Avatar** - User profile images and fallbacks

### Utilities
- **ConditionalWrap** - Conditional component wrapping utility

## 🛠 Installation

```bash
pnpm add @rs/design
```

## 📖 Usage

### Basic Import

```tsx
import { Button, Dialog, Toast } from "@rs/design";

function App() {
  return (
    <div>
      <Button.Root variant="primary">
        Click me
      </Button.Root>
    </div>
  );
}
```

### Component Structure

All components follow Base UI's compound component pattern:

```tsx
import { Dialog } from "@rs/design";

function MyDialog() {
  return (
    <Dialog.Root>
      <Dialog.Trigger>Open Dialog</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop />
        <Dialog.Popup>
          <Dialog.Title>Dialog Title</Dialog.Title>
          <Dialog.Description>Dialog content goes here.</Dialog.Description>
          <Dialog.Close>Close</Dialog.Close>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
```

### Toast Usage

```tsx
import { Toast } from "@rs/design";

function App() {
  return (
    <Toast.Provider>
      <YourApp />
      <Toast.Portal>
        <Toast.Viewport />
      </Toast.Portal>
    </Toast.Provider>
  );
}

function YourComponent() {
  const toastManager = Toast.useToastManager();
  
  const showToast = () => {
    toastManager.add({
      title: "Success!",
      description: "Your action was completed successfully.",
    });
  };
  
  return <button onClick={showToast}>Show Toast</button>;
}
```

## 🎨 Styling

### CSS Custom Properties

The design system uses CSS custom properties for theming:

```css
:root {
  --color-surface: #ffffff;
  --color-surface-hover: #f8f9fa;
  --color-surface-secondary: #e9ecef;
  
  --color-text-primary: #212529;
  --color-text-secondary: #6c757d;
  --color-text-tertiary: #adb5bd;
  
  --color-border: #dee2e6;
  --color-border-hover: #adb5bd;
  
  --color-accent: #0d6efd;
  --color-accent-hover: #0b5ed7;
  --color-accent-subtle: #cfe2ff;
  
  --color-success: #198754;
  --color-warning: #fd7e14;
  --color-error: #dc3545;
  
  --color-focus: #86b7fe;
}
```

### Component Variants

Most components support size and variant props:

```tsx
<Button.Root size="lg" variant="primary">Large Primary Button</Button.Root>
<Avatar.Root size="sm">Small Avatar</Avatar.Root>
<Progress.Root variant="success" size="md">Progress Bar</Progress.Root>
```

### Data Attributes

All components use `data-shunpo-*` attributes for styling:

```css
[data-shunpo-button] {
  /* Button styles */
}

[data-shunpo-button][data-variant="primary"] {
  /* Primary button styles */
}
```

## 🔧 Development

### Building

```bash
pnpm build
```

### Watching for Changes

```bash
pnpm dev
```

## 📚 Base UI Documentation

This library extends Base UI components. For detailed API documentation, visit:
- [Base UI Documentation](https://base-ui.com/react/overview/quick-start)

## 🏗 Architecture

- **packages/design**: Component library source code
- **src/**: Individual component implementations
- **styles.css**: Component-specific styles
- **index.tsx**: Component exports

Each component follows the pattern:
1. Import Base UI component
2. Wrap with `data-shunpo-*` attributes
3. Add custom props for variants/sizes
4. Export with consistent naming

## 🤝 Contributing

1. Follow the established component patterns
2. Add TypeScript interfaces for all props
3. Include CSS with appropriate data attributes
4. Test accessibility with screen readers
5. Update exports in main index file

## 📄 License

MIT License - see LICENSE file for details.
