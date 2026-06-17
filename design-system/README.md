# OS7 Design System Notes

This folder keeps the design direction for the OS7 public site.

It is based on:

- The local OS7 product/site direction.
- UI UX Pro Max design-system search output.
- 21st.dev component inspiration, adapted manually into this codebase.

Use this folder before making visual changes to `src/App.tsx` or `src/styles.css`.

## Workflow

1. Read `MASTER.md`.
2. Check `CHECKLIST.md` before and after implementation.
3. If exploring a new page or section, run the UI UX Pro Max commands from `ui-ux-pro-max/commands.md`.
4. Keep final code native to this project: React, Tailwind, lucide-react, no extra UI dependencies unless there is a clear reason.

## Current Site Direction

OS7 should feel like an AI-native operating cockpit, not a generic SaaS landing page.

The first screen should show the product idea directly:

- command input
- generated apps/databases/dashboards/workflows
- live system status
- dense but readable dashboard surfaces
- restrained motion with reduced-motion support

