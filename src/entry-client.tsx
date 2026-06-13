import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { App } from "./App";
import "./styles.css";

hydrateRoot(
  document.getElementById("root") as HTMLElement,
  <StrictMode>
    <App platformUrl={window.__OS7_SITE_CONFIG__?.platformUrl} />
  </StrictMode>
);
