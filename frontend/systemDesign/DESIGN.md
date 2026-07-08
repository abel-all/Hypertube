---
name: Cinematic Noir
colors:
  surface: '#131314'
  surface-dim: '#131314'
  surface-bright: '#3a393a'
  surface-container-lowest: '#0e0e0f'
  surface-container-low: '#1c1b1c'
  surface-container: '#201f20'
  surface-container-high: '#2a2a2b'
  surface-container-highest: '#353436'
  on-surface: '#e5e2e3'
  on-surface-variant: '#e9bcb6'
  inverse-surface: '#e5e2e3'
  inverse-on-surface: '#313031'
  outline: '#af8782'
  outline-variant: '#5e3f3b'
  surface-tint: '#ffb4aa'
  primary: '#ffb4aa'
  on-primary: '#690003'
  primary-container: '#e50914'
  on-primary-container: '#fff7f6'
  inverse-primary: '#c0000c'
  secondary: '#c6bfff'
  on-secondary: '#2900a0'
  secondary-container: '#4029ba'
  on-secondary-container: '#b4abff'
  tertiary: '#a7c8ff'
  on-tertiary: '#003061'
  tertiary-container: '#0072d7'
  on-tertiary-container: '#f8f9ff'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdad5'
  primary-fixed-dim: '#ffb4aa'
  on-primary-fixed: '#410001'
  on-primary-fixed-variant: '#930007'
  secondary-fixed: '#e4dfff'
  secondary-fixed-dim: '#c6bfff'
  on-secondary-fixed: '#160066'
  on-secondary-fixed-variant: '#4029ba'
  tertiary-fixed: '#d5e3ff'
  tertiary-fixed-dim: '#a7c8ff'
  on-tertiary-fixed: '#001b3c'
  on-tertiary-fixed-variant: '#004689'
  background: '#131314'
  on-background: '#e5e2e3'
  surface-variant: '#353436'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 64px
    fontWeight: '800'
    lineHeight: 72px
    letterSpacing: -0.02em
  display-sm:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  title-lg:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 48px
  xl: 80px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 64px
---

## Brand & Style

The design system is engineered to deliver a high-end, immersive cinematic experience. It targets an audience that values premium content and a frictionless, theatrical interface. The brand personality is sophisticated, moody, and focused, ensuring the UI recedes to let the cinematography take center stage.

The aesthetic follows a **Modern Glassmorphism** approach. It utilizes deep, dark backgrounds to maximize the vibrance of movie posters and accent colors. Visual interest is generated through translucent layers, subtle background blurs, and precise micro-interactions that mimic the tactile feel of a high-end home theater system.

## Colors

The palette is anchored by a deep charcoal background to create a "lights out" environment. **Cinema Red** is the primary driver for calls-to-action, progress bars, and active states, while **Electric Purple** serves as a secondary accent for specialized content categories or premium features.

Surfaces do not use solid colors; instead, they utilize a semi-transparent glass treatment. This allows the vibrant colors of underlying movie posters or ambient background gradients to bleed through softly, maintaining a sense of depth and continuity across the platform.

## Typography

This design system uses **Inter** for its neutral, highly legible, and modern characteristics. The hierarchy is extremely high-contrast, using heavy weights (`ExtraBold` and `Bold`) for titles to evoke a theatrical poster feel. 

Large display styles are reserved for featured content hero sections, while body text remains clean and functional to ensure metadata (descriptions, cast, crew) is easily scannable against dark backgrounds. Labels and metadata badges use increased letter spacing and uppercase styling to differentiate them from prose.

## Layout & Spacing

The layout philosophy follows a **fluid grid** model with generous horizontal margins to give the content room to breathe, mimicking a wide-screen aspect ratio. 

- **Desktop:** A 12-column grid with 64px outer margins. Content is often organized in horizontally scrolling "shelves" or carousels.
- **Mobile:** A 4-column grid with 16px margins. Cards scale to fit the width, often shifting from a 6-item shelf to a 2-item or 3-item grid display.
- **Spacing Rhythm:** Based on an 8px root unit to ensure mathematical harmony across all components.

## Elevation & Depth

Depth is established through **Backdrop Blurs** and **Tonal Layering** rather than traditional shadows. 

1.  **Level 0 (Background):** Solid `#0B0B0C`.
2.  **Level 1 (Cards/Shelves):** Semi-transparent glass (`rgba(255, 255, 255, 0.03)`) with a 1px border (`rgba(255, 255, 255, 0.1)`).
3.  **Level 2 (Modals/Overlays):** Higher opacity glass with a 20px backdrop-blur. 
4.  **Interactive States:** When a movie card is hovered, it scales slightly (1.05x) and gains a subtle outer glow using the primary Cinema Red, suggesting an "active" or "focused" state typical of smart TV interfaces.

## Shapes

The design system employs a **Rounded** shape language to soften the high-contrast visuals. 

- **Movie Posters:** 16px (1rem) corner radius to create a friendly, modern container.
- **Buttons/Inputs:** 12px (0.75rem) corner radius for a tactile, "squircle" feel.
- **Badges:** 4px (0.25rem) or fully pill-shaped depending on the metadata type.

The consistent 16px radius on primary containers ensures that the UI feels cohesive and premium.

## Components

### Buttons
- **Primary:** Solid Cinema Red background, white text. High-contrast and bold.
- **Secondary:** Semi-transparent glass with white text and a subtle 1px border.
- **Ghost:** No background, white text. Used for less critical actions like "More Info."

### Cards (Movie Poster Style)
Movie cards are the core of the system. They feature a 2:3 aspect ratio with a 16px border radius. On hover, metadata (title, rating, year) should transition in from the bottom using a subtle gradient overlay to ensure text legibility.

### Input Fields
Inputs utilize a dark glass aesthetic (`rgba(255, 255, 255, 0.05)`) with a focused state that highlights the border in Cinema Red. Typography inside inputs should be `body-md`.

### Badges & Tags
- **IMDb Rating:** Yellow text, bold, often paired with a star icon.
- **Quality (4K, HDR, Atmos):** Small, outlined boxes with `label-sm` typography, using semi-transparent white borders.

### Skeletons
Skeleton loaders should mimic the movie card aspect ratios using a shimmering pulse effect. The base color should be `#1A1A1C` with a linear-gradient highlight that moves horizontally to indicate loading.