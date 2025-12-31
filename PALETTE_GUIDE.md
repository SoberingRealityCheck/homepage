# Palette System and Image Processing Guide

This portfolio includes a powerful palette system and image processing utilities inspired by Ryoji Ikeda's Dataverse aesthetic.

## Quick Start

### 1. Using Custom Palettes

Wrap any page in a `PaletteProvider` to apply custom colors:

```tsx
'use client';

import { PaletteProvider, IKEDA_PALETTES } from '@/utils/palette';

export default function YourPage() {
  return (
    <PaletteProvider palette={IKEDA_PALETTES.infrared}>
      <div className="section">
        {/* All color classes automatically use the palette */}
        <h1 className="text-accent">This uses infrared colors!</h1>
      </div>
    </PaletteProvider>
  );
}
```

### 2. Processing Images

Use the `IkedaImage` component to automatically dither and recolor images:

```tsx
'use client';

import { IkedaImage } from '@/utils/ikedaImage';
import { IKEDA_PALETTES } from '@/utils/palette';

export default function ImagePage() {
  return (
    <IkedaImage 
      src="/your-photo.jpg"
      palette={IKEDA_PALETTES.electric}
      alt="Processed image"
      ditherMethod="atkinson"
      className="w-full"
    />
  );
}
```

## Available Palettes

All palettes are accessible via `IKEDA_PALETTES`:

| Palette | Description | Colors |
|---------|-------------|--------|
| `classic` | Original red/cyan/orange | ![#ff0033](https://via.placeholder.com/15/ff0033/ff0033.png) ![#00ffff](https://via.placeholder.com/15/00ffff/00ffff.png) ![#ff6600](https://via.placeholder.com/15/ff6600/ff6600.png) |
| `infrared` | Pink/red variations | ![#ff0066](https://via.placeholder.com/15/ff0066/ff0066.png) ![#ff3366](https://via.placeholder.com/15/ff3366/ff3366.png) ![#ff6699](https://via.placeholder.com/15/ff6699/ff6699.png) |
| `dataBlue` | Blue spectrum | ![#0066ff](https://via.placeholder.com/15/0066ff/0066ff.png) ![#00ccff](https://via.placeholder.com/15/00ccff/00ccff.png) ![#6699ff](https://via.placeholder.com/15/6699ff/6699ff.png) |
| `electric` | Green/cyan/yellow | ![#00ff00](https://via.placeholder.com/15/00ff00/00ff00.png) ![#00ffff](https://via.placeholder.com/15/00ffff/00ffff.png) ![#ffff00](https://via.placeholder.com/15/ffff00/ffff00.png) |
| `neon` | Magenta/cyan/yellow | ![#ff00ff](https://via.placeholder.com/15/ff00ff/ff00ff.png) ![#00ffff](https://via.placeholder.com/15/00ffff/00ffff.png) ![#ffff00](https://via.placeholder.com/15/ffff00/ffff00.png) |
| `monochrome` | Grayscale | ![#ffffff](https://via.placeholder.com/15/ffffff/ffffff.png) ![#cccccc](https://via.placeholder.com/15/cccccc/cccccc.png) ![#999999](https://via.placeholder.com/15/999999/999999.png) |
| `sunset` | Orange gradient | ![#ff3300](https://via.placeholder.com/15/ff3300/ff3300.png) ![#ff6600](https://via.placeholder.com/15/ff6600/ff6600.png) ![#ff9900](https://via.placeholder.com/15/ff9900/ff9900.png) |
| `arctic` | Cyan/blue | ![#00ccff](https://via.placeholder.com/15/00ccff/00ccff.png) ![#66ffff](https://via.placeholder.com/15/66ffff/66ffff.png) ![#99ccff](https://via.placeholder.com/15/99ccff/99ccff.png) |

## Creating Custom Palettes

Define your own palette:

```tsx
import { ColorPalette, PaletteProvider } from '@/utils/palette';

const myCustomPalette: ColorPalette = {
  name: 'My Custom Palette',
  color1: '#ff1493',  // Deep pink
  color2: '#00fa9a',  // Medium spring green
  color3: '#1e90ff',  // Dodger blue
};

export default function CustomPage() {
  return (
    <PaletteProvider palette={myCustomPalette}>
      {/* Your content */}
    </PaletteProvider>
  );
}
```

## Image Processing Deep Dive

### Dithering Methods

**Floyd-Steinberg Dithering**
- Classic error diffusion algorithm
- Smooth gradients with detailed patterns
- Good for photographic images
- Best for: Photos, portraits, detailed imagery

**Atkinson Dithering** ⭐ Recommended
- High-contrast, graphic results
- Characteristic of Ikeda's aesthetic
- Creates bold geometric patterns
- Best for: Data visualization aesthetic, technical imagery

**Ordered Dithering**
- Uses Bayer matrix (4x4)
- Regular, predictable patterns
- Creates halftone newsprint effect
- Best for: Geometric designs, technical diagrams

### Processing Options

```tsx
import { processIkedaImage } from '@/utils/ikedaImage';
import { IKEDA_PALETTES } from '@/utils/palette';

const processedImageUrl = await processIkedaImage(
  '/source-image.jpg',
  IKEDA_PALETTES.electric,
  {
    ditherMethod: 'atkinson',      // Algorithm choice
    threshold: 128,                // Black/white cutoff (0-255)
    contrastBoost: 1.5            // Contrast multiplier
  }
);

// Use the returned data URL
```

### Component Usage

```tsx
<IkedaImage 
  src="/path/to/image.jpg"
  palette={IKEDA_PALETTES.infrared}
  alt="Processed artwork"
  ditherMethod="atkinson"
  className="w-full border border-accent"
/>
```

**Props:**
- `src` (required): Image path or URL
- `palette` (required): ColorPalette object
- `alt` (required): Alt text
- `className` (optional): CSS classes
- `ditherMethod` (optional): 'floyd-steinberg' | 'atkinson' | 'ordered' (default: 'atkinson')

### How the Algorithm Works

1. **Contrast Boost**: Increases contrast by 1.5x (configurable)
2. **Grayscale Conversion**: Converts to monochrome using luminance formula
3. **Dithering**: Applies selected algorithm to create halftone patterns
4. **4-Color Mapping**: 
   - Level 0 (0-63): Black
   - Level 1 (64-127): Palette Color 1
   - Level 2 (128-191): Palette Color 2
   - Level 3 (192-255): Palette Color 3

## CSS Variables

Palettes automatically set these CSS custom properties:

```css
--palette-color-1
--palette-color-2
--palette-color-3

/* Also updates semantic colors: */
--accent
--secondary
--highlight
--ikeda-red
--ikeda-cyan
--ikeda-orange
```

Use them directly in your styles:

```tsx
<div style={{ borderColor: 'var(--palette-color-1)' }}>
  Custom styled element
</div>
```

## Classes Affected by Palettes

When you apply a palette, these classes automatically update:

- `text-accent` → Uses color1
- `text-secondary` → Uses color2
- `text-highlight` → Uses color3
- `data-stripe` → Gradient using all 3 colors
- `project-card` hover states
- `btn-accent` button
- `data-box-accent` borders

## Complete Example

```tsx
'use client';

import { PaletteProvider, IKEDA_PALETTES } from '@/utils/palette';
import { IkedaImage } from '@/utils/ikedaImage';

export default function CompleteExample() {
  return (
    <PaletteProvider palette={IKEDA_PALETTES.neon}>
      <div className="section">
        <div className="content-block-highlight">
          <h1 className="text-display text-4xl">
            <span className="text-accent">Neon</span> Project
          </h1>
          <div className="data-stripe my-6" />
          
          <IkedaImage 
            src="/project-image.jpg"
            palette={IKEDA_PALETTES.neon}
            alt="Project visualization"
            ditherMethod="atkinson"
            className="w-full my-8"
          />
          
          <div className="blog-content">
            <h2>Automatically Styled Content</h2>
            <p>All text and elements use the neon palette!</p>
            
            <div className="grid-3">
              <div className="data-box-accent">
                <span className="text-accent">Magenta</span>
              </div>
              <div className="data-box-accent">
                <span className="text-secondary">Cyan</span>
              </div>
              <div className="data-box-accent">
                <span className="text-highlight">Yellow</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PaletteProvider>
  );
}
```

## Performance Notes

- Image processing happens client-side using Canvas API
- Processing is async and happens on component mount
- Shows "PROCESSING..." while working
- Consider image size - larger images take longer to process
- Processed images are data URLs (base64)

## Browser Compatibility

- Requires Canvas API support (all modern browsers)
- Uses `willReadFrequently` context option for better performance
- CORS-compliant for external images (requires `crossOrigin` attribute)

## Tips

1. **Atkinson dithering** produces the most Ikeda-like results
2. Use **monochrome palette** for pure black/white/gray aesthetic
3. **Boost contrast** higher (2.0+) for more dramatic results
4. Combine **multiple palettes** on different sections for visual variety
5. Use **data-stripe** between sections to show off palette gradients

## Demo Pages

Visit these demo pages to see the system in action:

- `/projects/palette-demo` - Palette system demonstration
- `/projects/image-demo` - Image processing examples
