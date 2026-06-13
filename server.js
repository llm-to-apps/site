import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import express from "express";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isProduction = process.env.NODE_ENV === "production";
const port = Number(process.env.PORT || 5173);
const platformUrl = process.env.PLATFORM_URL || "https://os7.dev/";
const app = express();

let vite;

if (!isProduction) {
  const { createServer } = await import("vite");
  vite = await createServer({
    server: { middlewareMode: true },
    appType: "custom"
  });
  app.use(vite.middlewares);
} else {
  app.use(
    "/assets",
    express.static(path.resolve(__dirname, "dist/client/assets"), {
      immutable: true,
      maxAge: "1y"
    })
  );
}

app.use(async (req, res, next) => {
  const url = req.originalUrl;

  try {
    let template;
    let render;

    if (!isProduction) {
      template = await fs.readFile(path.resolve(__dirname, "index.html"), "utf-8");
      template = await vite.transformIndexHtml(url, template);
      ({ render } = await vite.ssrLoadModule("/src/entry-server.tsx"));
    } else {
      template = await fs.readFile(path.resolve(__dirname, "dist/client/index.html"), "utf-8");
      ({ render } = await import("./dist/server/entry-server.js"));
    }

    const { html, head } = render(url, { platformUrl });
    const config = `<script>window.__OS7_SITE_CONFIG__=${JSON.stringify({ platformUrl })}</script>`;
    const page = template
      .replace("<!--app-head-->", head)
      .replace("<!--app-config-->", config)
      .replace("<!--app-html-->", html);

    res.status(200).set({ "Content-Type": "text/html" }).end(page);
  } catch (error) {
    vite?.ssrFixStacktrace(error);
    next(error);
  }
});

app.listen(port, () => {
  console.log(`Site SSR server running at http://localhost:${port}`);
});
