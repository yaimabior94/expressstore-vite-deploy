# E-Commerce Store Design Guidelines

## Design Approach
**Reference-Based**: Drawing inspiration from modern e-commerce platforms (Shopify, Etsy, contemporary online stores) with emphasis on product showcase and seamless shopping experience.

**Core Principles**:
- Product-first visual hierarchy
- Trust-building through clean, professional presentation
- Frictionless shopping flow
- Mobile-responsive grid systems

---

## Typography System

**Font Stack**: 
- Primary: 'Inter' or 'DM Sans' (Google Fonts) - clean, modern sans-serif
- Accent: 'Playfair Display' or 'Crimson Pro' for product names (optional elegance)

**Hierarchy**:
- Hero/Page Titles: text-5xl to text-6xl, font-bold
- Product Names: text-2xl, font-semibold
- Section Headers: text-3xl, font-bold
- Body Text: text-base (16px), font-normal, leading-relaxed
- Product Prices: text-xl to text-2xl, font-bold
- Small Details (SKU, stock): text-sm, font-medium
- Button Text: text-base, font-semibold, tracking-wide

---

## Layout System

**Spacing Units**: Tailwind units of **4, 6, 8, 12, 16, 20** (p-4, gap-6, my-8, etc.)

**Container Strategy**:
- Max-width: max-w-7xl for main content
- Page padding: px-4 md:px-6 lg:px-8
- Section spacing: py-12 md:py-16 lg:py-20

**Grid Patterns**:
- Product Grid: grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
- Feature Sections: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Cart Items: Single column with horizontal layout per item

---

## Component Library

### Navigation
**Desktop Header**:
- Fixed top navigation with logo (left), main nav (center), cart/user icons (right)
- Height: h-16 to h-20
- Sticky positioning with subtle shadow on scroll
- Search bar: Prominent, expandable, with icon

**Mobile Navigation**:
- Hamburger menu triggering full-screen overlay
- Bottom navigation bar with Home, Search, Cart, Account icons

### Hero Section
**Layout**: Full-width hero with large product imagery
- Height: min-h-[500px] md:min-h-[600px]
- Content overlay with semi-transparent backdrop (backdrop-blur-sm)
- CTA buttons with blurred backgrounds (backdrop-blur-md bg-white/20)
- Typography: Large headline (text-4xl md:text-6xl) with supporting subtext

**Images**: High-quality lifestyle product photography showing products in use, warm and inviting atmosphere

### Product Cards
**Structure**:
- Aspect ratio: aspect-square or aspect-[4/5] for product images
- Image with hover zoom effect (transform scale-105)
- Product name, price, quick-add button
- Padding: p-4, gap-3 between elements
- Border: Subtle border or shadow (shadow-sm hover:shadow-md)
- Rating stars (if applicable): Small, below product name

### Product Detail Page
**Layout**: Two-column on desktop (grid-cols-1 lg:grid-cols-2)
- Left: Image gallery with thumbnail navigation
- Right: Product info, price, variant selectors, add-to-cart
- Below: Tabs for Description, Specifications, Reviews
- Spacing: gap-8 md:gap-12

### Shopping Cart
**Drawer/Sidebar**: Slides from right (w-full sm:w-96)
- Fixed height with scrollable items area
- Each item: Horizontal layout (grid-cols-[80px_1fr_auto])
- Quantity controls: Compact +/- buttons
- Subtotal/Total: Sticky at bottom with checkout CTA

**Cart Page** (full page):
- Two columns: Items list (left, 2/3 width), Order summary (right, 1/3 width)
- Sticky order summary on desktop

### Forms & Inputs
**Input Fields**:
- Height: h-12
- Padding: px-4
- Border: border-2, rounded-lg
- Focus state: ring-2 ring-offset-2
- Labels: text-sm font-medium mb-2

**Buttons**:
- Primary CTA: h-12, px-8, rounded-lg, font-semibold
- Secondary: Similar size with outline variant
- Icon buttons: w-10 h-10, rounded-full

### Product Listing/Catalog
**Filters Sidebar** (desktop):
- Width: w-64, sticky positioning
- Collapsible categories
- Checkboxes, price range sliders
- Spacing: space-y-6 for filter groups

**Sort & View Controls**:
- Horizontal bar: flex justify-between items-center
- Sort dropdown + grid/list view toggle

### Footer
**Multi-column** (grid-cols-1 md:grid-cols-4):
- About, Customer Service, Quick Links, Newsletter signup
- Social media icons: Circular, w-10 h-10
- Padding: pt-16 pb-8
- Newsletter: Input with inline submit button

---

## Page-Specific Layouts

### Homepage
1. Hero with featured collection
2. Category grid (3-4 columns with images and overlay text)
3. Featured products carousel
4. Benefits/USP section (3-column grid with icons)
5. Newsletter signup CTA
6. Footer

### Product Listing Page
- Breadcrumb navigation (text-sm, mb-6)
- Page title with product count
- Filters (sidebar) + Products grid (main area)
- Pagination at bottom: Centered, with Previous/Next and page numbers

### Product Detail
- Breadcrumb navigation
- Main product section (images + info)
- Related products: "You may also like" horizontal scroll or grid
- Reviews section with rating summary

### Checkout (if implemented)
- Multi-step indicator at top
- Single column form on mobile, two-column on desktop
- Order summary sticky sidebar (desktop)

---

## Interaction Patterns

**Micro-interactions**:
- Add to cart: Brief success animation/toast notification
- Product image: Smooth zoom on hover
- Cards: Subtle lift on hover (transform -translate-y-1)
- Loading states: Skeleton screens for product grids

**No excessive animations**: Keep transitions quick (duration-200 to duration-300)

---

## Images

**Hero Image**: 
- Large lifestyle shot showcasing featured products in an aspirational setting
- Natural lighting, warm tones, products prominently displayed
- Dimensions: Full-width, 600-800px height on desktop

**Product Images**:
- Clean white or subtle gradient backgrounds for product photography
- Consistent aspect ratios across catalog
- Minimum 800x800px for detail pages

**Category/Feature Images**:
- Lifestyle photography showing product categories in context
- Used in homepage category grid and feature sections

---

## Responsive Strategy

**Breakpoints**:
- Mobile-first: Base styles for mobile
- sm (640px): 2-column product grids
- md (768px): Show filters sidebar, 3-column grids
- lg (1024px): 4-column grids, full desktop layout
- xl (1280px): Max container width reached

**Mobile Optimizations**:
- Larger tap targets (min h-12 for buttons)
- Full-width CTAs on mobile
- Simplified navigation
- Single-column layouts

---

This design system creates a modern, trustworthy e-commerce experience that prioritizes product discovery and seamless purchasing while maintaining visual appeal and professional polish.