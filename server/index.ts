import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

const app = express();

// Allow reading raw body when needed (e.g. payment webhooks)
declare module "http" {
  interface IncomingMessage {
    rawBody: unknown;
  }
}

app.use(
  express.json({
    verify: (req, _res, buf) => {
      req.rawBody = buf;
    },
  })
);

app.use(express.urlencoded({ extended: false }));

/**
 * Logging middleware for all /api requests
 */
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined;

  const originalJson = res.json.bind(res);

  res.json = (body, ...args) => {
    capturedJsonResponse = body;
    return originalJson(body, ...args);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;

    if (path.startsWith("/api")) {
      let message = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;

      if (capturedJsonResponse) {
        message += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (message.length > 80) {
        message = message.slice(0, 79) + "…";
      }

      log(message);
    }
  });

  next();
});

/**
 * Main async bootstrap
 */
(async () => {
  // Register all routes (returns http.Server)
  const server = await registerRoutes(app);

  /**
   * Global error handler
   */
  app.use(
    (err: any, _req: Request, res: Response, _next: NextFunction) => {
      const status = err.status || err.statusCode || 500;
      const message = err.message || "Internal Server Error";

      res.status(status).json({ message });
      log(`ERROR: ${message}`);

      // In dev, we want the stack trace printed
      if (app.get("env") === "development") {
        console.error(err);
      }
    }
  );

  /**
   * Vite only in dev — static build in production
   */
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  /**
   * Start the server
   *
   * NOTE:
   * - Removed "reusePort": true (NOT supported on Windows)
   * - Removed host: "0.0.0.0" (causes ENOTSUP in Node 25 on Windows)
   * - Using server.listen(port) → safe & universal
   */
  const port = parseInt(process.env.PORT || "5000", 10);

  server.listen(port, () => {
    log(`Server running on http://localhost:${port}`);
  });
})();
