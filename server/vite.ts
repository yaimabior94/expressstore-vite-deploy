import { Application } from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

// Simple logging function
export function log(msg: string) {
  console.log(msg);
}

/**
 * Setup Vite dev server — only for local development
 */
export async function setupVite(app: Application, server: any) {
  if (process.env.NODE_ENV !== "development") return;

  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: "custom",
  });

  app.use(vite.middlewares);

  log("Vite dev server running (local only)");
}

/**
 * Serve static files for production
 */
export function serveStatic(app: Application) {
  // Path to production build
  const root = path.resolve(__dirname, "../dist");

  if (!fs.existsSync(root)) {
    log("Production build not found. Run 'vite build' first.");
    return;
  }

  app.use(express.static(root));

  // Serve index.html for SPA
  app.get("*", (_req, res) => {
    res.sendFile(path.resolve(root, "index.html"));
  });

  log("Serving static production files");
}
