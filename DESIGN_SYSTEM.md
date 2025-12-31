# Portfolio Design System Documentation

This portfolio uses a Ryoji Ikeda Dataverse-inspired aesthetic with a comprehensive utility class system for easy content creation.

## Quick Start

To add a new project:
1. Copy `/src/app/projects/template-example/page.tsx`
2. Rename the folder to your project name
3. Edit the content using the provided HTML structure
4. Add your project to `/src/app/projects/page.tsx`

## Design System Overview

### Color Palette

- **Background**: Pure black (#000000)
- **Foreground**: White (#ffffff)
- **Accent (Red)**: #ff0033
- **Secondary (Cyan)**: #00ffff
- **Highlight (Orange)**: #ff6600
- **Grid colors**: Dark grays for subtle backgrounds

### Typography

The site uses two font families:
- **Geist Sans**: Body text and readable content
- **Geist Mono**: Headings, labels, and technical content

## Utility Classes Reference

### Layout Containers

```html
<!-- Main section wrapper -->
<div class="section">
  <!-- Max-width container with padding -->
</div>

<!-- Tighter padding -->
<div class="section-tight">
  <!-- Less padding for compact layouts -->
</div>

<!-- Full-width section -->
<div class="section-wide">
  <!-- 100% width with side padding -->
</div>
```

### Grid Layouts

```html
<!-- 2-column responsive grid -->
<div class="grid-2">
  <div>Column 1</div>
  <div>Column 2</div>
</div>

<!-- 3-column responsive grid -->
<div class="grid-3">
  <div>Column 1</div>
  <div>Column 2</div>
  <div>Column 3</div>
</div>
```

### Content Blocks

```html
<!-- Standard content block -->
<div class="content-block">
  <!-- Dark background with subtle border -->
</div>

<!-- Highlighted content block -->
<div class="content-block-highlight">
  <!-- Has red accent border on left side -->
</div>

<!-- Data info box -->
<div class="data-box">
  <!-- Smaller container for metadata -->
</div>

<!-- Data box with accent -->
<div class="data-box-accent">
  <!-- Red border with glow effect -->
</div>
```

### Typography Classes

```html
<!-- Large display heading -->
<h1 class="text-display">Main Heading</h1>

<!-- Section heading -->
<h2 class="text-heading">Section Title</h2>

<!-- Data label (small, mono, uppercase) -->
<span class="text-data">Label</span>

<!-- Color utilities -->
<span class="text-accent">Red text</span>
<span class="text-secondary">Cyan text</span>
<span class="text-highlight">Orange text</span>
```

### Visual Elements

```html
<!-- Colorful data stripe -->
<div class="data-stripe"></div>

<!-- Red accent line -->
<div class="line-accent"></div>

<!-- Gray divider line -->
<div class="line-grid"></div>
```

### Interactive Components

```html
<!-- Project card (auto-styled with hover effects) -->
<div class="project-card">
  <h3>Project Title</h3>
  <p>Description</p>
</div>

<!-- Primary button -->
<button class="btn">Click Me</button>

<!-- Accent button -->
<button class="btn btn-accent">Action</button>

<!-- Link with underline animation -->
<a href="#" class="link">Link Text</a>
```

### Blog Content

Wrap any content in `blog-content` for automatic styling:

```html
<div class="blog-content">
  <h1>Auto-styled Heading</h1>
  <h2>Auto-styled Subheading</h2>
  <p>Auto-styled paragraphs</p>
  <ul>
    <li>Auto-styled lists</li>
  </ul>
  <pre><code>Auto-styled code blocks</code></pre>
  <blockquote>Auto-styled quotes</blockquote>
</div>
```

## Project Page Template

Here's a complete example structure for a project page:

```tsx
export default function YourProject() {
  return (
    <div className="section">
      {/* Header */}
      <div className="content-block-highlight mb-8">
        <div className="flex justify-between items-start mb-4">
          <h1 className="text-display text-4xl">Project Name</h1>
          <span className="text-data text-accent">2024</span>
        </div>
        <div className="data-stripe mb-6" />
        <p className="text-xl text-gray-300 leading-relaxed">
          Brief description
        </p>
      </div>

      {/* Metadata Grid */}
      <div className="grid-3 mb-12">
        <div className="data-box">
          <h3 className="text-data text-accent mb-2">Role</h3>
          <p>Your role</p>
        </div>
        <div className="data-box">
          <h3 className="text-data text-secondary mb-2">Timeline</h3>
          <p>Duration</p>
        </div>
        <div className="data-box">
          <h3 className="text-data text-highlight mb-2">Status</h3>
          <p>Status</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="content-block blog-content">
        <h2>Overview</h2>
        <p>Your content here...</p>
        
        <h3>Key Features</h3>
        <ul>
          <li>Feature 1</li>
          <li>Feature 2</li>
        </ul>

        <h2>Technical Details</h2>
        <pre><code>Your code examples</code></pre>
      </div>
    </div>
  );
}
```

## Color Variables

You can use CSS variables in your inline styles:

```jsx
<div style={{ borderColor: 'var(--ikeda-red)' }}>
  Custom styled element
</div>
```

Available variables:
- `--ikeda-red`
- `--ikeda-orange`
- `--ikeda-yellow`
- `--ikeda-green`
- `--ikeda-cyan`
- `--ikeda-blue`
- `--accent`
- `--secondary`
- `--highlight`

## Tips

1. **Keep it simple**: Use the predefined classes rather than custom CSS
2. **Consistency**: Stick to the established patterns for a cohesive look
3. **Hierarchy**: Use heading levels (h1, h2, h3) properly for good structure
4. **Whitespace**: The classes provide good spacing - don't over-customize
5. **Content first**: Focus on writing good content; the styles handle the aesthetics
