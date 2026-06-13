import { renderToString } from "react-dom/server";
import { App } from "./App";
import "./styles.css";

export function render(_url: string) {
  const html = renderToString(<App />);
  const head = [
    "<title>OS7 - операционная система тебя</title>",
    '<meta name="description" content="Опиши, как ты живешь или работаешь. OS7 создаст приложения, базы данных, дашборды и процессы под тебя или твою компанию." />',
    '<meta property="og:title" content="OS7" />',
    '<meta property="og:description" content="Операционная система тебя." />',
    '<meta property="og:type" content="website" />'
  ].join("\n    ");

  return { html, head };
}
