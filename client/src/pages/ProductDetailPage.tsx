import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { ShoppingCart, ArrowLeft, Package } from "lucide-react";
import { Link } from "wouter";
import type { Product } from "@shared/schema";

interface ProductDetailPageProps {
  onAddToCart: (productId: string) => void;
}

export default function ProductDetailPage({ onAddToCart }: ProductDetailPageProps) {
  const [, params] = useRoute("/product/:id");
  const productId = params?.id;

  const { data: product, isLoading } = useQuery<Product>({
    queryKey: ["/api/products", productId],
    queryFn: async () => {
      if (!productId) throw new Error("Product ID is required");
      const response = await fetch(`/api/products/${productId}`);
      if (!response.ok) throw new Error("Failed to fetch product");
      return response.json();
    },
    enabled: !!productId,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <Skeleton className="h-6 w-32 mb-8" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            <Skeleton className="aspect-square rounded-lg" />
            <div className="space-y-6">
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-8 w-1/4" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 text-center" data-testid="not-found">
          <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Product Not Found</h2>
          <p className="text-muted-foreground mb-6">
            The product you're looking for doesn't exist
          </p>
          <Link href="/products">
            <Button data-testid="button-back-to-products">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Products
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link href="/products">
            <Button variant="ghost" className="pl-0" data-testid="button-back">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Products
            </Button>
          </Link>
        </div>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* Product Image */}
          <div className="aspect-square rounded-lg overflow-hidden bg-muted">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover"
              data-testid="img-product"
            />
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge className="mb-4" data-testid="badge-category">
                {product.category}
              </Badge>
              <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4" data-testid="text-product-name">
                {product.name}
              </h1>
              <p className="text-3xl font-bold" data-testid="text-product-price">
                ${parseFloat(product.price).toFixed(2)}
              </p>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold mb-3">Description</h3>
              <p className="text-muted-foreground leading-relaxed" data-testid="text-product-description">
                {product.description}
              </p>
            </div>

            <Separator />

            <div className="flex items-center gap-4">
              <span className="font-semibold">Availability:</span>
              {product.stock > 0 ? (
                <Badge variant="secondary" data-testid="badge-in-stock">
                  {product.stock} in stock
                </Badge>
              ) : (
                <Badge variant="destructive" data-testid="badge-out-of-stock">
                  Out of stock
                </Badge>
              )}
            </div>

            <Button
              size="lg"
              className="w-full"
              onClick={() => onAddToCart(product.id)}
              disabled={product.stock <= 0}
              data-testid="button-add-to-cart"
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Add to Cart
            </Button>

            <div className="space-y-3 pt-6">
              <div className="flex gap-3 text-sm">
                <Package className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                <div>
                  <p className="font-medium">Free Shipping</p>
                  <p className="text-muted-foreground">On orders over $100</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
