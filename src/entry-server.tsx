import { renderToString } from "react-dom/server";
import { App } from "./App";
import "./styles.css";

type RenderOptions = {
  platformUrl: string;
};

export function render(_url: string, options: RenderOptions) {
  const html = renderToString(<App platformUrl={options.platformUrl} />);
  const head = [
    "<title>OS7 - Turn intent into operating software</title>",
    '<meta name="description" content="OS7 turns intent into AI-built apps, databases, dashboards, workflows, and agents for a person or company." />',
    '<meta property="og:title" content="OS7 - Turn intent into operating software" />',
    '<meta property="og:description" content="AI-native operating system for personal and company software." />',
    '<meta property="og:type" content="website" />'
  ].join("\n    ");

  return { html, head };
}
