# Project Theme Style Guide

This document provides guidelines for using the project's theme system to ensure consistent styling across the application.

## Table of Contents
1. [Typography](#typography)
2. [Colors](#colors)
3. [Spacing](#spacing)
4. [Layout](#layout)
5. [Components](#components)
6. [Utilities](#utilities)
7. [RTL Support](#rtl-support)

## Typography

### Font Families
- **Primary Font (Body)**: Heebo - Used for general text, paragraphs, and UI elements
- **Secondary Font (Headings)**: Rubik - Used for headings and titles

### Font Sizes
```scss
$fs-small: 0.875rem;    // 14px
$fs-body: 1rem;         // 16px
$fs-large: 1.125rem;    // 18px
$fs-h5: 1.25rem;        // 20px
$fs-h4: 1.5rem;         // 24px
$fs-h3: 1.75rem;        // 28px
$fs-h2: 2rem;           // 32px
$fs-h1: 2.5rem;         // 40px
```

### Font Weights
```scss
$fw-light: 300;
$fw-normal: 400;
$fw-medium: 500;
$fw-semibold: 600;
$fw-bold: 700;
```

### Usage Examples
```html
<h1>Main Heading</h1>
<h2>Section Heading</h2>
<p>Regular paragraph text</p>
<p class="text-small">Smaller text for captions or notes</p>
```

## Colors

### Brand Colors
- **Primary**: `$clr-primary` (#2a7f62) - Teal - Used for primary buttons, links, and accents
- **Secondary**: `$clr-secondary` (#d9a441) - Amber - Used for secondary buttons and highlights

### Neutral Colors
- **Background**: `$clr-bg` (#f5f3f0) - Soft warm gray
- **Text**: `$clr-txt` (#333333) - Charcoal gray

### Semantic Colors
- **Success**: `$clr-success` (#28a745) - Green
- **Warning**: `$clr-warning` (#ffc107) - Yellow
- **Error**: `$clr-error` (#dc3545) - Red
- **Info**: `$clr-info` (#17a2b8) - Blue

### Usage Examples
```html
<button class="btn btn-primary">Primary Button</button>
<button class="btn btn-secondary">Secondary Button</button>
<div class="alert alert-success">Success message</div>
```

## Spacing

The spacing system uses a consistent scale based on rem units:

```scss
$spacing-xxs: 0.25rem;  // 4px
$spacing-xs: 0.5rem;    // 8px
$spacing-sm: 0.75rem;   // 12px
$spacing-md: 1rem;      // 16px
$spacing-lg: 1.5rem;    // 24px
$spacing-xl: 2rem;      // 32px
$spacing-xxl: 3rem;     // 48px
$spacing-xxxl: 4rem;    // 64px
```

### Usage Examples
Use the margin and padding helper classes:
```html
<div class="mb-md">Margin bottom medium (1rem)</div>
<div class="p-lg">Padding large (1.5rem)</div>
<div class="mx-auto">Horizontally centered with auto margins</div>
```

## Layout

### Containers
```html
<!-- Standard container with responsive max-width -->
<div class="container">
  <!-- Content here -->
</div>

<!-- Full-width container with padding -->
<div class="container-fluid">
  <!-- Content here -->
</div>
```

### Grid System
```html
<div class="row">
  <div class="col-4">Column taking 4/12 of the width</div>
  <div class="col-8">Column taking 8/12 of the width</div>
</div>

<div class="row">
  <div class="col-12 col-md-6 col-lg-4">Responsive column</div>
  <div class="col-12 col-md-6 col-lg-8">Responsive column</div>
</div>
```

### Main Layout
```html
<div class="main-layout">
  <header class="full-width">Header</header>
  <main>Main content</main>
  <footer class="full-width">Footer</footer>
</div>
```

## Components

### Buttons
```html
<!-- Button variants -->
<button class="btn btn-primary">Primary</button>
<button class="btn btn-secondary">Secondary</button>
<button class="btn btn-outline-primary">Outline</button>
<button class="btn btn-text">Text Button</button>

<!-- Button sizes -->
<button class="btn btn-primary btn-sm">Small</button>
<button class="btn btn-primary">Default</button>
<button class="btn btn-primary btn-lg">Large</button>
```

### Forms
```html
<div class="form-group">
  <label for="example-input">Label</label>
  <input type="text" class="form-control" id="example-input" placeholder="Placeholder">
  <span class="form-text">Helper text</span>
</div>

<div class="form-check">
  <input class="form-check-input" type="checkbox" id="example-checkbox">
  <label class="form-check-label" for="example-checkbox">Checkbox label</label>
</div>
```

### Alerts
```html
<div class="alert alert-primary">Primary alert</div>
<div class="alert alert-success">Success alert</div>
<div class="alert alert-danger">Danger alert</div>
<div class="alert alert-warning">Warning alert</div>
```

### Cards
```html
<div class="card">
  <div class="card-header">Card Header</div>
  <div class="card-body">
    Card content
  </div>
  <div class="card-footer">Card Footer</div>
</div>
```

### Tables
```html
<table class="table">
  <thead>
    <tr>
      <th>Header 1</th>
      <th>Header 2</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Data 1</td>
      <td>Data 2</td>
    </tr>
  </tbody>
</table>

<!-- Variants -->
<table class="table table-striped">Striped rows</table>
<table class="table table-bordered">Bordered cells</table>
<table class="table table-hover">Hover effect on rows</table>
```

## Utilities

### Display
```html
<div class="d-none">Hidden on all screen sizes</div>
<div class="d-none d-md-block">Hidden on small screens, visible on medium and up</div>
<div class="d-flex">Flex container</div>
```

### Flexbox
```html
<div class="d-flex justify-content-between align-items-center">
  <div>Left content</div>
  <div>Right content</div>
</div>

<div class="d-flex flex-column">
  <div>Top content</div>
  <div>Bottom content</div>
</div>
```

### Text
```html
<p class="text-center">Centered text</p>
<p class="text-right">Right-aligned text</p>
<p class="text-bold">Bold text</p>
<p class="text-primary">Primary colored text</p>
```

### Spacing
```html
<div class="m-0">No margin</div>
<div class="mt-lg">Large top margin</div>
<div class="p-md">Medium padding</div>
<div class="mx-auto">Horizontally centered</div>
```

### Borders
```html
<div class="border">Border on all sides</div>
<div class="border-top">Border on top only</div>
<div class="rounded">Rounded corners</div>
<div class="rounded-circle">Circular shape</div>
```

## RTL Support

The theme includes built-in RTL (Right-to-Left) support for languages like Hebrew and Arabic.

### HTML Setup
```html
<!-- For LTR (Left-to-Right) languages like English -->
<html lang="en" dir="ltr">

<!-- For RTL (Right-to-Left) languages like Hebrew -->
<html lang="he" dir="rtl">
```

### CSS Considerations
All directional properties (margin-left, padding-right, etc.) are automatically flipped in RTL mode. Use the RTL mixin for custom RTL styles:

```scss
.example {
  margin-left: 1rem;
  
  @include rtl {
    margin-left: 0;
    margin-right: 1rem;
  }
}
```

## Best Practices

1. **Use Variables**: Always use the theme variables for colors, spacing, etc. instead of hardcoded values
2. **Responsive Design**: Use the responsive utilities and breakpoints for adaptive layouts
3. **Component Consistency**: Follow the established patterns for components
4. **Accessibility**: Ensure sufficient color contrast and focus states
5. **RTL Support**: Test layouts in both LTR and RTL modes

## Mixins

The theme includes several helpful mixins:

```scss
// Responsive breakpoints
@include respond-to("md") {
  // Styles for medium screens and up
}

// Flexbox helper
@include flex(column, center, center);

// Typography
@include font-size(1.25rem, 1.5);

// Transitions
@include transition(all, 0.3s, ease-in-out);

// Box shadows
@include box-shadow(2);
```

---

For any questions or clarifications about the theme system, please contact the design team.
