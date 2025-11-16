import {
  type User,
  type InsertUser,
  type Product,
  type InsertProduct,
  type CartItem,
  type InsertCartItem,
  type Order,
  type InsertOrder,
  type OrderItem,
  type InsertOrderItem,
  type CartItemWithProduct,
  type OrderWithItems,
} from "@shared/schema";
import { randomUUID } from "crypto";
import { promises as fs } from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");

// Ensure data directory exists
async function ensureDataDir() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
  } catch (error) {
    console.error("Error creating data directory:", error);
  }
}

// Helper functions for file operations
async function readJSONFile<T>(filename: string, defaultValue: T): Promise<T> {
  try {
    const filePath = path.join(DATA_DIR, filename);
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return defaultValue;
  }
}

async function writeJSONFile<T>(filename: string, data: T): Promise<void> {
  const filePath = path.join(DATA_DIR, filename);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
}

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Products
  getAllProducts(): Promise<Product[]>;
  getProduct(id: string): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: string, product: Partial<InsertProduct>): Promise<Product | undefined>;
  deleteProduct(id: string): Promise<boolean>;

  // Cart
  getCartItems(userId: string): Promise<CartItemWithProduct[]>;
  addToCart(item: InsertCartItem): Promise<CartItem>;
  updateCartItem(id: string, quantity: number): Promise<CartItem | undefined>;
  removeFromCart(id: string): Promise<boolean>;
  clearCart(userId: string): Promise<void>;

  // Orders
  getOrders(userId: string): Promise<OrderWithItems[]>;
  getOrder(id: string): Promise<OrderWithItems | undefined>;
  createOrder(order: InsertOrder, items: InsertOrderItem[]): Promise<OrderWithItems>;
}

export class JSONStorage implements IStorage {
  private initialized = false;

  async init() {
    if (this.initialized) return;
    await ensureDataDir();
    
    // Initialize with sample products if products.json doesn't exist
    const products = await readJSONFile<Product[]>("products.json", []);
    if (products.length === 0) {
      await this.initializeSampleProducts();
    }
    
    this.initialized = true;
  }

  private async initializeSampleProducts() {
    const sampleProducts: Product[] = [
      {
        id: randomUUID(),
        name: "Ceramic Vase",
        description: "Elegant minimalist ceramic vase with a matte white finish. Perfect for fresh or dried flowers, adding a touch of sophistication to any room.",
        price: "45.00",
        category: "decor",
        imageUrl: "/generated_images/White_ceramic_vase_product_0bfec5ac.png",
        stock: 15,
      } as Product,
      {
        id: randomUUID(),
        name: "Modern Table Lamp",
        description: "Contemporary brass table lamp with linen shade. Provides warm ambient lighting while serving as a stylish accent piece for your desk or nightstand.",
        price: "89.00",
        category: "lighting",
        imageUrl: "/generated_images/Modern_brass_table_lamp_f92993df.png",
        stock: 8,
      } as Product,
      {
        id: randomUUID(),
        name: "Luxury Scented Candle",
        description: "Premium soy wax candle in elegant glass vessel with wooden lid. Features a sophisticated blend of natural fragrances for a calming atmosphere.",
        price: "32.00",
        category: "decor",
        imageUrl: "/generated_images/Luxury_scented_candle_glass_50ab2043.png",
        stock: 24,
      } as Product,
      {
        id: randomUUID(),
        name: "Handwoven Throw Blanket",
        description: "Luxuriously soft throw blanket in beige herringbone pattern. Handcrafted from premium materials for ultimate comfort and timeless style.",
        price: "78.00",
        category: "textiles",
        imageUrl: "/generated_images/Handwoven_throw_blanket_beige_29bb57e8.png",
        stock: 12,
      } as Product,
      {
        id: randomUUID(),
        name: "Geometric Planter Set",
        description: "Set of three modern terracotta planters in varying sizes. Perfect for succulents and small plants, featuring contemporary geometric design.",
        price: "54.00",
        category: "decor",
        imageUrl: "/generated_images/Geometric_terracotta_planters_set_0215fcb0.png",
        stock: 10,
      } as Product,
      {
        id: randomUUID(),
        name: "Botanical Wall Art",
        description: "Minimalist botanical line drawing print in natural oak frame. Adds a touch of nature-inspired elegance to your walls with Scandinavian aesthetic.",
        price: "65.00",
        category: "decor",
        imageUrl: "/generated_images/Botanical_wall_art_print_d48bf179.png",
        stock: 18,
      } as Product,
    ];

    await writeJSONFile("products.json", sampleProducts);
  }

  // Users
  async getUser(id: string): Promise<User | undefined> {
    const users = await readJSONFile<User[]>("users.json", []);
    return users.find((u) => u.id === id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const users = await readJSONFile<User[]>("users.json", []);
    return users.find((u) => u.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const users = await readJSONFile<User[]>("users.json", []);
    const user: User = { ...insertUser, id: randomUUID() };
    users.push(user);
    await writeJSONFile("users.json", users);
    return user;
  }

  // Products
  async getAllProducts(): Promise<Product[]> {
    return readJSONFile<Product[]>("products.json", []);
  }

  async getProduct(id: string): Promise<Product | undefined> {
    const products = await readJSONFile<Product[]>("products.json", []);
    return products.find((p) => p.id === id);
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const products = await readJSONFile<Product[]>("products.json", []);
    const product: Product = { ...insertProduct, id: randomUUID() };
    products.push(product);
    await writeJSONFile("products.json", products);
    return product;
  }

  async updateProduct(id: string, updates: Partial<InsertProduct>): Promise<Product | undefined> {
    const products = await readJSONFile<Product[]>("products.json", []);
    const index = products.findIndex((p) => p.id === id);
    if (index === -1) return undefined;

    products[index] = { ...products[index], ...updates };
    await writeJSONFile("products.json", products);
    return products[index];
  }

  async deleteProduct(id: string): Promise<boolean> {
    const products = await readJSONFile<Product[]>("products.json", []);
    const index = products.findIndex((p) => p.id === id);
    if (index === -1) return false;

    products.splice(index, 1);
    await writeJSONFile("products.json", products);
    return true;
  }

  // Cart
  async getCartItems(userId: string): Promise<CartItemWithProduct[]> {
    const cartItems = await readJSONFile<CartItem[]>("cart.json", []);
    const products = await readJSONFile<Product[]>("products.json", []);

    const userCartItems = cartItems.filter((item) => item.userId === userId);

    return userCartItems
      .map((item) => {
        const product = products.find((p) => p.id === item.productId);
        if (!product) return null;
        return { ...item, product };
      })
      .filter((item): item is CartItemWithProduct => item !== null);
  }

  async addToCart(insertItem: InsertCartItem): Promise<CartItem> {
    const cartItems = await readJSONFile<CartItem[]>("cart.json", []);

    // Check if item already exists in cart
    const existingIndex = cartItems.findIndex(
      (item) => item.userId === insertItem.userId && item.productId === insertItem.productId
    );

    if (existingIndex !== -1) {
      // Update quantity
      cartItems[existingIndex].quantity += insertItem.quantity ?? 1;
      await writeJSONFile("cart.json", cartItems);
      return cartItems[existingIndex];
    }

    // Add new item
    const cartItem: CartItem = { 
      ...insertItem, 
      id: randomUUID(),
      quantity: insertItem.quantity ?? 1
    };
    cartItems.push(cartItem);
    await writeJSONFile("cart.json", cartItems);
    return cartItem;
  }

  async updateCartItem(id: string, quantity: number): Promise<CartItem | undefined> {
    const cartItems = await readJSONFile<CartItem[]>("cart.json", []);
    const index = cartItems.findIndex((item) => item.id === id);
    if (index === -1) return undefined;

    cartItems[index].quantity = quantity;
    await writeJSONFile("cart.json", cartItems);
    return cartItems[index];
  }

  async removeFromCart(id: string): Promise<boolean> {
    const cartItems = await readJSONFile<CartItem[]>("cart.json", []);
    const index = cartItems.findIndex((item) => item.id === id);
    if (index === -1) return false;

    cartItems.splice(index, 1);
    await writeJSONFile("cart.json", cartItems);
    return true;
  }

  async clearCart(userId: string): Promise<void> {
    const cartItems = await readJSONFile<CartItem[]>("cart.json", []);
    const filtered = cartItems.filter((item) => item.userId !== userId);
    await writeJSONFile("cart.json", filtered);
  }

  // Orders
  async getOrders(userId: string): Promise<OrderWithItems[]> {
    const orders = await readJSONFile<Order[]>("orders.json", []);
    const orderItems = await readJSONFile<OrderItem[]>("order_items.json", []);
    const products = await readJSONFile<Product[]>("products.json", []);

    const userOrders = orders.filter((order) => order.userId === userId);

    return userOrders.map((order) => {
      const items = orderItems
        .filter((item) => item.orderId === order.id)
        .map((item) => {
          const product = products.find((p) => p.id === item.productId);
          return { ...item, product: product! };
        });

      return { ...order, items };
    });
  }

  async getOrder(id: string): Promise<OrderWithItems | undefined> {
    const orders = await readJSONFile<Order[]>("orders.json", []);
    const orderItems = await readJSONFile<OrderItem[]>("order_items.json", []);
    const products = await readJSONFile<Product[]>("products.json", []);

    const order = orders.find((o) => o.id === id);
    if (!order) return undefined;

    const items = orderItems
      .filter((item) => item.orderId === order.id)
      .map((item) => {
        const product = products.find((p) => p.id === item.productId);
        return { ...item, product: product! };
      });

    return { ...order, items };
  }

  async createOrder(insertOrder: InsertOrder, insertItems: InsertOrderItem[]): Promise<OrderWithItems> {
    const orders = await readJSONFile<Order[]>("orders.json", []);
    const orderItems = await readJSONFile<OrderItem[]>("order_items.json", []);
    const products = await readJSONFile<Product[]>("products.json", []);

    const order: Order = {
      ...insertOrder,
      id: randomUUID(),
      createdAt: new Date(),
      status: insertOrder.status ?? "pending",
    };

    orders.push(order);
    await writeJSONFile("orders.json", orders);

    const items: OrderItem[] = insertItems.map((item) => ({
      ...item,
      id: randomUUID(),
      orderId: order.id,
    }));

    orderItems.push(...items);
    await writeJSONFile("order_items.json", orderItems);

    const itemsWithProducts = items.map((item) => {
      const product = products.find((p) => p.id === item.productId);
      return { ...item, product: product! };
    });

    return { ...order, items: itemsWithProducts };
  }
}

export const storage = new JSONStorage();
// Initialize storage on module load
storage.init();
