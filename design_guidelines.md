# Roda IA Landing Page - Design Guidelines

## Design Approach
**Reference-Based Approach**: Modern SaaS/consultancy aesthetic inspired by Linear, Stripe, and Vercel - emphasizing clean minimalism, generous whitespace, and professional sophistication.

## Core Design Principles
- **Professional Minimalism**: Clean, uncluttered layouts with purposeful negative space
- **Consultative Trust**: Design communicates expertise and reliability
- **Process Clarity**: Visual hierarchy guides users through the service journey
- **Frictionless Conversion**: Clear CTAs with minimal barriers to engagement

## Color Palette

### Light Mode (Primary)
- **Background**: 255 0% 100% (white)
- **Surface Cards**: 255 0% 100% with border at 240 4% 90% (zinc-200)
- **Primary Action**: 0 0% 9% (black/zinc-900)
- **Primary Text**: 0 0% 9% (zinc-900)
- **Secondary Text**: 0 0% 45% (zinc-600)
- **Accent/Hover States**: 0 0% 15% (zinc-800)
- **Subtle Backgrounds**: 0 0% 98% (white/60 with blur)

### Dark Mode
Not required for this implementation

## Typography

### Font Family
- **Primary**: Inter (via rsms.me CDN)
- **Fallback**: ui-sans-serif, system-ui

### Type Scale
- **Hero Title**: text-4xl md:text-5xl lg:text-6xl, font-bold, tracking-tight
- **Section Headings**: text-3xl md:text-4xl, font-bold
- **Subsection Headings**: text-xl md:text-2xl, font-semibold
- **Body Text**: text-base md:text-lg, leading-relaxed
- **Small Text**: text-sm, text-zinc-600

## Layout System

### Spacing Primitives
- **Container**: max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
- **Section Padding**: py-16 md:py-24 lg:py-32
- **Card Padding**: p-6 md:p-8
- **Element Gaps**: gap-4, gap-6, gap-8, gap-12
- **Common Units**: Use Tailwind's 4, 6, 8, 12, 16, 20, 24 for consistency

### Grid Structure
- **Feature Cards**: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- **Two-Column**: grid-cols-1 lg:grid-cols-2
- **Responsive Breakpoints**: Mobile-first (320px+), sm: 640px, md: 768px, lg: 1024px

## Component Library

### Navigation
- **Sticky navbar** with backdrop-blur-lg bg-white/80
- Logo left-aligned, anchor links center, CTA button right
- Shadow on scroll: shadow-sm
- Height: h-16 md:h-20

### Buttons
- **Primary (.btn-primary)**: Black background, white text, rounded-2xl, px-5 py-3, shadow-sm, hover:shadow, hover:bg-zinc-900
- **Ghost (.btn-ghost)**: bg-white/60, border-zinc-200, hover:bg-white, rounded-2xl
- All buttons: inline-flex items-center gap-2, font-medium, transition-all

### Cards
- **Surface**: White background, border-zinc-200, shadow-sm, rounded-2xl
- **Hover State**: hover:shadow-md transition-shadow
- **Padding**: p-6 md:p-8
- **Gaps**: Internal spacing gap-4 or gap-6

### Icons
- **Library**: Lucide React
- **Sizing**: w-5 h-5 for inline, w-8 h-8 md:w-12 md:h-12 for feature icons
- **Color**: text-zinc-900 or text-zinc-600

## Page Sections

### Hero Section
- **Layout**: Full-width, centered content, py-20 md:py-32
- **Title**: Large, bold, tracking-tight
- **Subtitle**: text-lg md:text-xl text-zinc-600, max-w-3xl mx-auto
- **CTA**: Primary button, prominent placement
- **Background**: Clean white or subtle gradient

### Content Sections
- **Value Bullets**: Grid layout with check icons, concise statements
- **How It Works**: 3-step process cards with numbers/icons
- **Deliverables**: Grid of cards with icons and descriptions
- **FAQ**: Accordion-style with expand/collapse animations
- **Detailed Process**: Step-by-step breakdown with visual hierarchy

### CTA Sections
- **Placement**: After major content blocks and at page end
- **Style**: Centered, large button with supporting text
- **Contrast**: Stands out from surrounding content

### Footer
- **Layout**: Multi-column on desktop, stacked on mobile
- **Content**: Email contact, copyright, links
- **Style**: Minimal, text-zinc-600, border-t border-zinc-200

## Animations

### Micro-interactions (Framer Motion)
- **Scroll Reveals**: Fade-in + slide-up (y: 20) on viewport entry
- **Stagger**: Children animate sequentially (staggerChildren: 0.1)
- **Hover**: Subtle scale (1.02) or shadow transitions
- **Duration**: 0.3-0.5s for most animations
- **Easing**: ease-out for entrances, ease-in-out for hovers

### Specific Animations
- Section reveals: initial={{ opacity: 0, y: 20 }}, whileInView={{ opacity: 1, y: 0 }}
- Button hovers: Built-in Tailwind transitions
- Card hovers: shadow-sm to shadow-md
- FAQ accordion: Smooth height transitions

## Accessibility
- **Color Contrast**: WCAG AA minimum (black text on white, 21:1 ratio)
- **Focus States**: Clear focus rings on interactive elements
- **Semantic HTML**: Proper heading hierarchy, nav, section, footer tags
- **Alt Text**: Descriptive text for all images (when added)
- **Keyboard Navigation**: All interactive elements accessible via keyboard

## Images

### Logo & Branding
- **Logo**: Placeholder at /public/logo.png (to be replaced)
- **Favicon**: Placeholder at /public/favicon.ico (to be replaced)
- **Size**: Logo responsive sizing, max-h-8 md:max-h-10

### Hero Image
- **Not Required**: This design uses text-focused hero without large imagery
- **Alternative**: Clean, minimal hero with strong typography

### Content Images
- **OG Image**: /public/og.png for social sharing (1200x630px recommended)
- **Optional Icons**: Feature illustrations can be added as needed

## Responsive Behavior
- **Mobile (320-640px)**: Single column, larger touch targets, stacked navigation
- **Tablet (640-1024px)**: Two-column grids, balanced spacing
- **Desktop (1024px+)**: Full multi-column layouts, optimal reading widths

## Technical Implementation Notes
- **Content Source**: All text from src/content.js (centralized)
- **CTA Links**: WhatsApp link from content.contacts.whatsappLink
- **Email**: mailto:suporte@roda.ia.br in footer and optional nav
- **Build**: Vite + React, optimized for performance
- **Deployment**: GitHub Pages ready with proper scripts