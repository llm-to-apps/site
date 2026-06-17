import { renderToString } from "react-dom/server";
import { App } from "./App";
import "./styles.css";

type RenderOptions = {
  platformUrl: string;
};

export function render(_url: string, options: RenderOptions) {
  const html = renderToString(<App platformUrl={options.platformUrl} />);
  const head = [
    "<title>OS7 - Build your own OS with AI</title>",
    '<meta name="description" content="Describe how you live or work. OS7 creates apps, databases, dashboards, and workflows adapted to you or your company with voice control and chat." />',
    '<meta property="og:title" content="OS7" />',
    '<meta property="og:description" content="Build your own OS with AI." />',
    '<meta property="og:type" content="website" />'
  ].join("\n    ");

  return { html, head };
}
