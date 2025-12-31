# Ryoji Ikeda Dataverse-Inspired Portfolio

A Next.js portfolio website with an aesthetic inspired by Ryoji Ikeda's Dataverse exhibition, featuring dynamic color palettes, image processing, and a comprehensive design system.

## ✨ Features

### Design System
- **Ikeda Aesthetic**: Dark backgrounds, grid patterns, scanline effects, monospace typography
- **8 Predefined Palettes**: Classic, Infrared, Data Blue, Electric, Neon, Monochrome, Sunset, Arctic
- **Custom Palette Support**: Create your own 3-color schemes
- **Utility Classes**: 40+ classes for rapid development

### Image Processing
- **Automatic Dithering**: 3 algorithms (Floyd-Steinberg, Atkinson, Ordered)
- **Palette Mapping**: Converts images to high-contrast 4-color output
- **React Component**: Simple `<IkedaImage>` component

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`

## 🎨 Using Palettes

```tsx
'use client';
import { PaletteProvider, IKEDA_PALETTES } from '@/utils/palette';

export default function MyPage() {
  return (
    <PaletteProvider palette={IKEDA_PALETTES.infrared}>
      <div className="section">
        <h1 className="text-accent">Infrared colors!</h1>
      </div>
    </PaletteProvider>
  );
}
```

## 🖼️ Processing Images

```tsx
import { IkedaImage } from '@/utils/ikedaImage';

<IkedaImage 
  src="/photo.jpg"
  palette={IKEDA_PALETTES.electric}
  alt="Processed"
  ditherMethod="atkinson"
/>
```

## 📚 Documentation

- **[DESIGN_SYSTEM.md](DESIGN_SYSTEM.md)** - Complete design system reference
- **[PALETTE_GUIDE.md](PALETTE_GUIDE.md)** - Palette & image processing guide

## 🛠️ Adding Projects

1. Copy `src/app/projects/template-example`
2. Edit content using `blog-content` class
3. Add to `src/app/projects/page.tsx`

See demos at:
- `/projects/palette-demo`
- `/projects/image-demo`

---

Inspired by [Ryoji Ikeda](http://www.ryojiikeda.com/)'s Dataverse
