import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Package, Truck, Shield } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import type { Product } from "@shared/schema";
import heroImage from "@assets/generated_images/E-commerce_hero_lifestyle_shot_22f1474c.png";

interface HomePageProps {
  onAddToCart: (productId: string) => void;
}

export default function HomePage({ onAddToCart }: HomePageProps) {
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const featuredProducts = products?.slice(0, 4) || [];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[500px] md:min-h-[600px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="Luxe Home Collection"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-20 md:py-32">
          <div className="max-w-2xl space-y-6">
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-white leading-tight" data-testid="text-hero-title">
              Elevate Your Living Space
            </h1>
            <p className="text-lg md:text-xl text-white/90 leading-relaxed" data-testid="text-hero-subtitle">
              Discover curated home decor that combines timeless design with exceptional craftsmanship
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link href="/products">
                <Button
                  size="lg"
                  className="bg-white text-black border-white hover:bg-white/90"
                  data-testid="button-shop-now"
                >
                  Shop Now
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                className="bg-white/10 text-white border-white/30 backdrop-blur-md hover:bg-white/20"
                data-testid="button-view-collection"
              >
                View Collection
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-16 bg-muted/30 border-y">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Package className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Premium Quality</h3>
                <p className="text-sm text-muted-foreground">
                  Handpicked products crafted with the finest materials
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center text-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Truck className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Free Shipping</h3>
                <p className="text-sm text-muted-foreground">
                  Complimentary delivery on all orders over $100
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center text-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Secure Shopping</h3>
                <p className="text-sm text-muted-foreground">
                  Safe and secure payment processing guaranteed
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8 md:mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-2" data-testid="text-featured-title">
                Featured Products
              </h2>
              <p className="text-muted-foreground">
                Explore our handpicked collection
              </p>
            </div>
            <Link href="/products">
              <Button variant="ghost" data-testid="button-view-all">
                View All
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <Card key={i}>
                  <Skeleton className="aspect-square" />
                  <CardContent className="p-4 space-y-3">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-8 w-1/2" />
                    <Skeleton className="h-10 w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" data-testid="grid-featured-products">
              {featuredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={onAddToCart}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Category Grid */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-8 md:mb-12 text-center">
            Shop by Category
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Home Decor", category: "decor" },
              { name: "Lighting", category: "lighting" },
              { name: "Textiles", category: "textiles" },
            ].map((cat) => (
              <Link key={cat.category} href={`/products?category=${cat.category}`}>
                <Card className="group overflow-hidden cursor-pointer hover-elevate transition-all duration-300" data-testid={`card-category-${cat.category}`}>
                  <div className="aspect-[4/3] bg-muted flex items-center justify-center">
                    <h3 className="text-2xl font-serif font-semibold">
                      {cat.name}
                    </h3>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
