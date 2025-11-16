import { Link } from "wouter";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import type { Product } from "@shared/schema";

interface ProductCardProps {
  product: Product;
  onAddToCart?: (productId: string) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <Card className="group overflow-hidden hover-elevate transition-all duration-300" data-testid={`card-product-${product.id}`}>
      <Link href={`/product/${product.id}`}>
        <div className="aspect-square overflow-hidden bg-muted">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            data-testid={`img-product-${product.id}`}
          />
        </div>
      </Link>
      <CardContent className="p-4 space-y-3">
        <div className="space-y-1">
          <Link href={`/product/${product.id}`}>
            <h3 className="font-semibold text-lg leading-tight hover:text-primary transition-colors cursor-pointer" data-testid={`text-product-name-${product.id}`}>
              {product.name}
            </h3>
          </Link>
          <p className="text-sm text-muted-foreground line-clamp-2" data-testid={`text-product-description-${product.id}`}>
            {product.description}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold" data-testid={`text-product-price-${product.id}`}>
            ${parseFloat(product.price).toFixed(2)}
          </span>
          {product.stock > 0 ? (
            <span className="text-sm text-muted-foreground" data-testid={`text-product-stock-${product.id}`}>
              {product.stock} in stock
            </span>
          ) : (
            <span className="text-sm text-destructive" data-testid={`text-product-out-of-stock-${product.id}`}>
              Out of stock
            </span>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button
          className="w-full"
          onClick={(e) => {
            e.preventDefault();
            onAddToCart?.(product.id);
          }}
          disabled={product.stock <= 0}
          data-testid={`button-add-to-cart-${product.id}`}
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
