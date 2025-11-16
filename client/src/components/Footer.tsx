import { Link } from "wouter";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-muted/50 mt-auto">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-serif font-semibold">Luxe Home</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Curated premium home decor and lifestyle products for the modern home.
            </p>
          </div>

          {/* Shop */}
          <div className="space-y-4">
            <h4 className="font-semibold">Shop</h4>
            <nav className="flex flex-col gap-2">
              <Link href="/products">
                <span className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer" data-testid="link-footer-products">
                  All Products
                </span>
              </Link>
              <Link href="/products?category=decor">
                <span className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                  Home Decor
                </span>
              </Link>
              <Link href="/products?category=lighting">
                <span className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                  Lighting
                </span>
              </Link>
            </nav>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h4 className="font-semibold">Customer Service</h4>
            <nav className="flex flex-col gap-2">
              <Link href="/orders">
                <span className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer" data-testid="link-footer-orders">
                  Orders
                </span>
              </Link>
              <span className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                Shipping
              </span>
              <span className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                Returns
              </span>
            </nav>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="font-semibold">Stay Updated</h4>
            <p className="text-sm text-muted-foreground">
              Subscribe to our newsletter for exclusive offers and new arrivals.
            </p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Luxe Home. All rights reserved.
          </p>
          <div className="flex gap-6">
            <span className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
              Privacy Policy
            </span>
            <span className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
              Terms of Service
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
