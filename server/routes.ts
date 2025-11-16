import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertCartItemSchema, insertOrderItemSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Middleware to simulate user (in a real app, this would be from session/auth)
  const DEFAULT_USER_ID = "default-user";

  // ============================================
  // REST API ROUTES - Return JSON
  // ============================================

  // Products API
  app.get("/api/products", async (req, res) => {
    try {
      const products = await storage.getAllProducts();
      res.json(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ error: "Failed to fetch products" });
    }
  });

  app.get("/api/products/:id", async (req, res) => {
    try {
      const product = await storage.getProduct(req.params.id);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      console.error("Error fetching product:", error);
      res.status(500).json({ error: "Failed to fetch product" });
    }
  });

  // Cart API
  app.get("/api/cart", async (req, res) => {
    try {
      const cartItems = await storage.getCartItems(DEFAULT_USER_ID);
      res.json(cartItems);
    } catch (error) {
      console.error("Error fetching cart:", error);
      res.status(500).json({ error: "Failed to fetch cart" });
    }
  });

  app.post("/api/cart", async (req, res) => {
    try {
      const validation = insertCartItemSchema.safeParse({
        userId: DEFAULT_USER_ID,
        productId: req.body.productId,
        quantity: req.body.quantity || 1,
      });

      if (!validation.success) {
        return res.status(400).json({ error: "Invalid cart item data" });
      }

      // Check if product exists and has stock
      const product = await storage.getProduct(validation.data.productId);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      const quantity = validation.data.quantity ?? 1;
      if (product.stock < quantity) {
        return res.status(400).json({ error: "Insufficient stock" });
      }

      const cartItem = await storage.addToCart(validation.data);
      res.json(cartItem);
    } catch (error) {
      console.error("Error adding to cart:", error);
      res.status(500).json({ error: "Failed to add to cart" });
    }
  });

  app.patch("/api/cart/:id", async (req, res) => {
    try {
      const { quantity } = req.body;

      if (typeof quantity !== "number" || quantity < 1) {
        return res.status(400).json({ error: "Invalid quantity" });
      }

      const cartItem = await storage.updateCartItem(req.params.id, quantity);
      if (!cartItem) {
        return res.status(404).json({ error: "Cart item not found" });
      }

      res.json(cartItem);
    } catch (error) {
      console.error("Error updating cart item:", error);
      res.status(500).json({ error: "Failed to update cart item" });
    }
  });

  app.delete("/api/cart/:id", async (req, res) => {
    try {
      const success = await storage.removeFromCart(req.params.id);
      if (!success) {
        return res.status(404).json({ error: "Cart item not found" });
      }

      res.json({ success: true });
    } catch (error) {
      console.error("Error removing cart item:", error);
      res.status(500).json({ error: "Failed to remove cart item" });
    }
  });

  // Orders API
  app.get("/api/orders", async (req, res) => {
    try {
      const orders = await storage.getOrders(DEFAULT_USER_ID);
      res.json(orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
      res.status(500).json({ error: "Failed to fetch orders" });
    }
  });

  app.get("/api/orders/:id", async (req, res) => {
    try {
      const order = await storage.getOrder(req.params.id);
      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }
      res.json(order);
    } catch (error) {
      console.error("Error fetching order:", error);
      res.status(500).json({ error: "Failed to fetch order" });
    }
  });

  app.post("/api/orders", async (req, res) => {
    try {
      // Get cart items
      const cartItems = await storage.getCartItems(DEFAULT_USER_ID);
      if (cartItems.length === 0) {
        return res.status(400).json({ error: "Cart is empty" });
      }

      // Calculate total
      const total = cartItems.reduce(
        (sum, item) => sum + parseFloat(item.product.price) * item.quantity,
        0
      );

      // Create order items
      const orderItems = cartItems.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        price: item.product.price,
        orderId: "", // Will be set by storage.createOrder
      }));

      // Create order
      const order = await storage.createOrder(
        {
          userId: DEFAULT_USER_ID,
          total: total.toFixed(2),
          status: "pending",
        },
        orderItems
      );

      // Update product stock
      for (const item of cartItems) {
        const product = item.product;
        await storage.updateProduct(product.id, {
          stock: product.stock - item.quantity,
        });
      }

      // Clear cart
      await storage.clearCart(DEFAULT_USER_ID);

      res.json(order);
    } catch (error) {
      console.error("Error creating order:", error);
      res.status(500).json({ error: "Failed to create order" });
    }
  });

  // ============================================
  // PUBLIC ROUTES - Return HTML (for future implementation)
  // These routes would render server-side HTML views
  // Currently using React SPA, but structure is in place
  // ============================================

  // app.get("/product/:id", async (req, res) => {
  //   // Would render HTML product detail page
  //   // For now, handled by React router
  // });

  const httpServer = createServer(app);
  return httpServer;
}
