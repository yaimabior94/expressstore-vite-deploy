# E-Commerce Store

## Overview

This is a modern e-commerce web application built for selling premium home decor and lifestyle products. The application features a product catalog, shopping cart functionality, and order management. It follows a product-first design philosophy inspired by contemporary e-commerce platforms like Shopify and Etsy, with emphasis on clean presentation and seamless shopping experience.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React with TypeScript using Vite as the build tool and development server.

**UI Component Library**: Shadcn/ui components built on Radix UI primitives, providing accessible and customizable UI components. The design system uses the "new-york" style variant with Tailwind CSS for styling.

**Routing**: Wouter for client-side routing, providing a lightweight alternative to React Router.

**State Management**: 
- TanStack Query (React Query) for server state management, data fetching, and caching
- Local React state for UI state management (cart drawer visibility, etc.)

**Styling System**:
- Tailwind CSS as the primary styling solution
- Custom design tokens defined in CSS variables for theming (light/dark mode support)
- Typography system using Inter (sans-serif) and Playfair Display (serif) fonts
- Responsive grid layouts following mobile-first design principles

**Design Philosophy**:
- Product-first visual hierarchy with emphasis on high-quality imagery
- Spacing based on Tailwind's 4px unit system
- Consistent border radius and shadow patterns for depth
- Trust-building through clean, professional presentation

### Backend Architecture

**Server Framework**: Express.js running on Node.js with TypeScript.

**API Design**: RESTful API architecture with JSON responses. All API routes are prefixed with `/api`. The server handles:
- Product catalog endpoints (GET /api/products, GET /api/products/:id)
- Shopping cart operations (GET /api/cart, POST /api/cart, PUT /api/cart/:id, DELETE /api/cart/:id)
- Order management (GET /api/orders, POST /api/orders)

**Data Storage Strategy**: Currently using file-based JSON storage for development/prototyping. The storage layer is abstracted through an `IStorage` interface, making it straightforward to migrate to a database solution. Data is stored in the `/data` directory with separate JSON files for different entities.

**Session Management**: Uses a default user ID pattern for simulating user sessions during development. In production, this would be replaced with proper authentication and session management.

**Development Server**: Vite integration in middleware mode for hot module replacement (HMR) and development experience. Production builds serve static assets from the dist directory.

### Database Schema

**ORM**: Drizzle ORM configured for PostgreSQL, though currently using file-based storage in development.

**Schema Design**:
- **Users**: Authentication and user profile data (id, username, email, password)
- **Products**: Product catalog (id, name, description, price, category, imageUrl, stock)
- **Cart Items**: Shopping cart entries linking users to products with quantities
- **Orders**: Order records (id, userId, total, status, createdAt)
- **Order Items**: Line items within orders (id, orderId, productId, quantity, price)

**Validation**: Zod schemas generated from Drizzle table definitions using drizzle-zod for runtime type safety and validation.

**Migration Strategy**: Drizzle Kit configured for schema migrations with migrations stored in `/migrations` directory.

### External Dependencies

**UI Component Libraries**:
- Radix UI primitives for accessible headless components (dialogs, dropdowns, menus, etc.)
- Embla Carousel for image carousels
- Lucide React for iconography
- React Hook Form with Zod resolvers for form handling

**Styling**:
- Tailwind CSS for utility-first styling
- PostCSS with Autoprefixer for CSS processing
- class-variance-authority for component variant management
- clsx and tailwind-merge for conditional className composition

**Data Fetching & State**:
- TanStack Query v5 for server state management
- date-fns for date formatting and manipulation

**Database & ORM** (configured but not actively used):
- Drizzle ORM for type-safe database queries
- @neondatabase/serverless for PostgreSQL connectivity
- connect-pg-simple for session storage (when using PostgreSQL)

**Build Tools**:
- Vite for frontend bundling and development server
- esbuild for backend bundling
- TypeScript compiler for type checking

**Development Tools**:
- Replit-specific plugins for development environment integration
- Runtime error overlay for debugging

**Asset Management**: Generated product images stored in `/generated_images` directory and referenced via `/generated_images/` URLs. Hero images and other static assets stored in `/attached_assets`.