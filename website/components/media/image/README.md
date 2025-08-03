# Image Component

An optimized Image component that prevents layout shift and displays blur placeholders while images are loading.

## Features

- **No Layout Shift**: Uses aspect ratio to reserve space before image loads
- **Blur Placeholders**: Shows a blurred placeholder image while the image loads
- **Performance Optimized**: No client-side state management, Framer Motion, or effects
- **Automatic Generation**: Placeholder metadata is generated at build time
- **Backward Compatible**: Still supports `blurDataURL` prop for manual placeholders

## Usage

```tsx
import { Image } from "@/components/media";

<Image
  src="/media/posts/example.jpg"
  alt="Example image"
  fill
  className={styles.media}
/>

// Or with manual blur data URL (overrides generated placeholder)
<Image
  src="/media/posts/example.jpg"
  blurDataURL="data:image/jpeg;base64,..."
  alt="Example image"
  fill
/>
```

## How it Works

1. **Build Time**: The `generate-image-placeholders.js` script scans all image files in the `public` directory
2. **Metadata Generation**: For each image, it creates an entry in `placeholders.json` with:
   - A base64 placeholder image (currently a 1x1 transparent pixel)
   - The aspect ratio (inferred from filename or defaulted to 3:2)
3. **Render Time**: The Image component reads this metadata to:
   - Set the correct aspect ratio to prevent layout shift
   - Show the placeholder image with blur effect
   - Stack the actual image on top once it loads

## Performance Improvements

Compared to the previous Image component, this version eliminates:

- ❌ Client-side state management (`useState`)
- ❌ Framer Motion animations and dependencies
- ❌ Complex transition logic
- ❌ `onLoad` event handlers

While providing:

- ✅ No layout shift
- ✅ Proper placeholder support
- ✅ Better performance
- ✅ Simpler implementation
- ✅ Backward compatibility

## Placeholder Generation

The build script automatically runs before building:

```bash
npm run generate:placeholders
```

### Aspect Ratio Detection

The script tries to infer aspect ratios from filenames:

- Files with "hero", "banner", "header" → 2:1
- Files with "vertical", "9x16", "mobile" → 9:16
- Files with "square", "1x1", "avatar", "profile" → 1:1
- Files with "photo", "dslr", "3x2" → 3:2
- Files with "4x3", "classic" → 4:3
- Files with "wide", "16x9" → 16:9
- Default → 3:2 (common for photos)

### Custom Placeholders

You can manually edit `placeholders.json` to:

- Add real placeholder images (base64 encoded)
- Adjust aspect ratios
- Add entries for new images

## Backward Compatibility

The component still accepts a `blurDataURL` prop which will override any generated placeholder, ensuring existing code continues to work.
