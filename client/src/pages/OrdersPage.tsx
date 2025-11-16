import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Package, ShoppingBag } from "lucide-react";
import { format } from "date-fns";
import type { OrderWithItems } from "@shared/schema";

export default function OrdersPage() {
  const { data: orders, isLoading } = useQuery<OrderWithItems[]>({
    queryKey: ["/api/orders"],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen py-8 md:py-12">
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
          <Skeleton className="h-10 w-48 mb-8" />
          <div className="space-y-6">
            {[...Array(3)].map((_, i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-6 w-full" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-20 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 md:py-12">
      <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-8" data-testid="text-page-title">
          My Orders
        </h1>

        {!orders || orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center" data-testid="empty-orders">
            <ShoppingBag className="w-16 h-16 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No orders yet</h3>
            <p className="text-sm text-muted-foreground">
              Your order history will appear here
            </p>
          </div>
        ) : (
          <div className="space-y-6" data-testid="list-orders">
            {orders.map((order) => (
              <Card key={order.id} className="hover-elevate" data-testid={`card-order-${order.id}`}>
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <CardTitle className="text-lg" data-testid={`text-order-id-${order.id}`}>
                        Order #{order.id.slice(0, 8)}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground mt-1" data-testid={`text-order-date-${order.id}`}>
                        {format(new Date(order.createdAt), "MMMM d, yyyy 'at' h:mm a")}
                      </p>
                    </div>
                    <Badge
                      variant={order.status === "completed" ? "secondary" : "default"}
                      data-testid={`badge-order-status-${order.id}`}
                    >
                      {order.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {order.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-4"
                        data-testid={`order-item-${item.id}`}
                      >
                        <div className="w-16 h-16 rounded-md overflow-hidden bg-muted flex-shrink-0">
                          <img
                            src={item.product.imageUrl}
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                            data-testid={`img-order-item-${item.id}`}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate" data-testid={`text-item-name-${item.id}`}>
                            {item.product.name}
                          </p>
                          <p className="text-sm text-muted-foreground" data-testid={`text-item-quantity-${item.id}`}>
                            Quantity: {item.quantity}
                          </p>
                        </div>
                        <p className="font-semibold flex-shrink-0" data-testid={`text-item-price-${item.id}`}>
                          ${parseFloat(item.price).toFixed(2)}
                        </p>
                      </div>
                    ))}

                    <Separator />

                    <div className="flex items-center justify-between">
                      <span className="font-semibold">Total</span>
                      <span className="text-xl font-bold" data-testid={`text-order-total-${order.id}`}>
                        ${parseFloat(order.total).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
