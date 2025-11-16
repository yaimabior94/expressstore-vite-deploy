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
 * Global error handler
 */
app.use(
  (err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    log(`ERROR: ${message}`);

    if (app.get("env") === "development") {
      console.error(err);
    }
  }
);

/**
 * Main async bootstrap for routes & Vite
 * NOTE: For Vercel, do NOT start the server here
 */
(async () => {
  // Register all routes (async)
  await registerRoutes(app);

  if (app.get("env") === "development") {
    // In dev locally, you may want to setup Vite
    const dummyServer = { listen: () => {} } as any;
    await setupVite(app, dummyServer);
  } else {
    // Serve static production assets
    serveStatic(app);
  }
})();

// ✅ Export the app for Vercel serverless
export default app;
