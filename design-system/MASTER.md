# OS7 Master Design System

## Positioning

OS7 is an AI-native operating system for a person or company.

The site should communicate that the user describes intent, and OS7 turns it into durable software: apps, databases, dashboards, workflows, and operational memory.

## Primary Pattern

Real-Time / Operations Landing.

Use:

- hero with product-like live preview
- command or intent composer
- system status indicators
- generated modules
- dashboard and workflow surfaces
- trust and clarity after the first screen

Avoid:

- static brochure sections
- generic SaaS cards without product state
- purely decorative gradients
- oversized marketing claims without interface evidence

## Visual Style

Dark, technical, premium, and operational.

The page should feel like a calm command center:

- dark base
- thin borders
- mint status color
- violet/gold as secondary semantic highlights
- compact data surfaces
- subtle glow only where it reinforces system activity

## Current Palette

Keep the current Tailwind tokens unless there is a strong reason to change them:

- `ink`: `#080a0d`
- `panel`: `#101419`
- `line`: `rgba(255,255,255,0.1)`
- `mint`: `#25d59b`
- `violet`: `#8b5cf6`
- `gold`: `#f4c867`

Use status semantics:

- mint: active, ready, generated, safe
- gold: processing, intent, waiting
- violet: interface, model output, product surface
- red only for real destructive or critical states

## Typography

Default: Inter.

For product-preview labels and runtime output, use `font-mono` sparingly. The mono voice should imply system state, not turn the whole site into a terminal.

Candidate future typography direction from UI UX Pro Max:

- headings: Fira Code
- body: Fira Sans

Do not switch fonts casually. A font change should be tested visually across desktop and mobile.

## Motion

Use motion to express state, not decoration.

Good:

- active cursor pulse in command input
- loading spinner for "building"
- subtle border scan on product preview
- hover states on generated modules

Required:

- respect `prefers-reduced-motion`
- avoid infinite decorative motion in dense content
- keep animation durations calm and predictable

## Layout

Desktop hero:

- text and CTA on the left
- live product preview on the right
- first viewport should strongly signal the product

Mobile hero:

- stacked layout
- no horizontal scrolling
- primary CTA remains visible before preview
- preview may be dense, but must remain readable

## Component Principles

Use lucide-react icons for UI actions and semantic labels.

Use cards for actual repeated entities, modules, logs, or preview panels. Do not wrap every section in a decorative card.

Keep cards at `rounded-lg` or `rounded-xl` where already established. Avoid pill-heavy interfaces except for compact status labels.

## Copy Principles

Russian copy should stay concrete and product-like.

Prefer:

- "OS7 создает приложения, базы данных, дашборды и процессы"
- "Опиши, как ты живешь или работаешь"
- "Хочу оцифровать компанию"

Avoid:

- vague AI hype
- abstract productivity language
- long explanatory text inside the first viewport

