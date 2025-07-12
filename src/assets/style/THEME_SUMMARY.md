# Project Theme System Summary

This document provides an overview of the comprehensive theme system implemented for this project. It serves as a reference for developers to understand the structure, components, and usage of the styling infrastructure.

## Theme Structure

The theme system is organized into several key components:

### 1. Setup Files
- **_variables.scss**: Defines all theme variables including colors, spacing, typography, etc.
- **_mixins.scss**: Contains reusable SCSS mixins for consistent styling patterns
- **_functions.scss**: Utility functions for calculations and transformations
- **_typography.scss**: Font definitions and basic text styling

### 2. Base Components
- **_base.scss**: Core element styling and resets
- **_layout.scss**: Grid system, containers, and page structure
- **_typography.scss**: Comprehensive typography system
- **_buttons.scss**: Button styles, variants, and states
- **_forms.scss**: Form controls and input styling
- **_alerts.scss**: Notification and alert components
- **_tables.scss**: Data display and table styling
- **_animations.scss**: Transitions and animation effects
- **_icons.scss**: Icon system and styling
- **_cards.scss**: Card components and containers
- **_utilities.scss**: Utility classes for common styling needs
- **_helpers.scss**: Helper classes for specific use cases

### 3. Component-Specific Styles
- Located in `src/assets/style/cmps/`
- Each component has its own SCSS file

### 4. Page-Specific Styles
- Located in `src/assets/style/pages/`
- Each page has its own SCSS file

## Key Design Decisions

### Color System
- **Primary Color**: Teal (#2a7f62) - Used for primary actions and brand elements
- **Secondary Color**: Amber (#d9a441) - Used for secondary actions and accents
- **Semantic Colors**: Success, warning, error, and info colors for status indicators
- **Neutral Colors**: Background, text, and border colors in various shades
- **Color Variants**: Light and dark variants of each color for different states and backgrounds

### Typography
- **Primary Font**: Heebo - Used for body text and general UI
- **Secondary Font**: Rubik - Used for headings and emphasis
- **Font Scale**: Consistent sizing from small (0.875rem) to h1 (2.5rem)
- **Font Weights**: Light (300), Regular (400), Medium (500), Semibold (600), Bold (700)
- **Line Heights**: Optimized for readability across different text sizes

### Spacing System
- **Consistent Scale**: From xxs (0.25rem) to xxxl (4rem)
- **Vertical Rhythm**: Consistent spacing between elements
- **Component Spacing**: Standardized padding and margins within components

### Component Design
- **Consistent Styling**: Shared visual language across all components
- **State Management**: Hover, active, focus, and disabled states for interactive elements
- **Accessibility**: Focus indicators, color contrast, and semantic markup
- **Responsive Behavior**: Adapts to different screen sizes and devices

### Responsive Approach
- **Mobile-First**: Designed for small screens first, then enhanced for larger screens
- **Breakpoints**: xs (0), sm (576px), md (768px), lg (992px), xl (1200px), xxl (1400px)
- **Flexible Grid**: 12-column system with responsive modifiers

### Cross-Browser & RTL Support
- **RTL Support**: Right-to-left language support throughout the theme
- **Browser Compatibility**: Tested across modern browsers
- **Fallbacks**: Graceful degradation for older browsers

## Usage Guidelines

### Importing the Theme
The main entry point is `main.scss` which imports all theme components in the correct order.

### Using Variables
Always use theme variables instead of hardcoded values:

```scss
// Good
color: $clr-primary;
margin: $spacing-md;

// Avoid
color: #2a7f62;
margin: 1rem;
```

### Using Mixins
Leverage the provided mixins for consistent patterns:

```scss
// Responsive behavior
@include respond-to('md') {
  // Styles for medium screens and up
}

// Flexbox layouts
@include flex(row, center, space-between);

// Typography
@include font-size(1.25rem, 1.5);
```

### Component Creation
When creating new components:

1. Use existing theme variables and mixins
2. Follow the established naming conventions
3. Ensure responsive behavior
4. Support RTL languages
5. Test across different screen sizes

### Utility Classes
Use utility classes for common styling needs:

```html
<div class="d-flex justify-content-between align-items-center">
  <div class="text-primary mb-md">Content</div>
  <button class="btn btn-primary">Action</button>
</div>
```

## Theme Components Reference

### Layout
- **Containers**: `.container`, `.container-fluid`
- **Grid**: `.row`, `.col-*`, `.col-{breakpoint}-*`
- **Flexbox**: `.d-flex`, `.flex-row`, `.flex-column`, etc.
- **Spacing**: `.m-*`, `.p-*`, `.mx-*`, `.py-*`, etc.

### Typography
- **Headings**: `h1`-`h6` or `.h1`-`.h6`
- **Text Styles**: `.text-primary`, `.text-bold`, `.text-center`, etc.
- **Font Sizes**: `.fs-small`, `.fs-body`, `.fs-large`, etc.

### Components
- **Buttons**: `.btn`, `.btn-primary`, `.btn-sm`, etc.
- **Forms**: `.form-group`, `.form-control`, `.form-check`, etc.
- **Alerts**: `.alert`, `.alert-success`, `.alert-dismissible`, etc.
- **Cards**: `.card`, `.card-header`, `.card-body`, etc.
- **Tables**: `.table`, `.table-striped`, `.table-responsive`, etc.
- **Icons**: `.icon`, `.icon-sm`, `.icon-primary`, etc.

### Animations
- **Transitions**: `.transition-base`, `.transition-fast`, etc.
- **Animations**: `.animate-fade-in`, `.animate-slide-in-up`, etc.
- **Loading**: `.loading-spinner`, `.loading-dots`

## Extending the Theme

When extending the theme:

1. Follow the established patterns and organization
2. Add new variables to the appropriate section in `_variables.scss`
3. Create new mixins in `_mixins.scss` if needed
4. Document new additions for other developers

## Best Practices

1. **Consistency**: Use the theme system consistently across all components
2. **Maintainability**: Keep styles modular and avoid deep nesting
3. **Performance**: Minimize CSS specificity and redundancy
4. **Documentation**: Document custom components and their usage
5. **Accessibility**: Ensure all UI elements are accessible

## Future Considerations

- **Dark Mode**: Framework is prepared for dark mode implementation
- **Theme Switching**: Variables structure supports multiple themes
- **CSS Custom Properties**: Could be implemented for runtime theme switching
- **Component Library**: Could be extracted into a standalone package

---

For detailed usage examples, refer to the `STYLE_GUIDE.md` document.
