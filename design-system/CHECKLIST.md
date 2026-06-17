# OS7 UI Checklist

Run this before finishing a visual change.

## Critical

- [ ] First viewport shows OS7 as a product, not only a concept.
- [ ] Primary CTA is visible and clear.
- [ ] The product preview has live/status/product signals.
- [ ] No horizontal overflow at 390px mobile width.
- [ ] Text does not overlap or escape cards/buttons.
- [ ] Focus states remain visible for keyboard users.
- [ ] Reduced motion is respected.

## Product Feel

- [ ] Command/intention input is visible where relevant.
- [ ] Generated apps/databases/dashboards/workflows are represented as concrete modules.
- [ ] Status indicators communicate real system state.
- [ ] Dense surfaces remain scannable.
- [ ] The design does not rely only on gradients/glow.

## Motion

- [ ] Infinite animation is limited to status/loading/system activity.
- [ ] Decorative motion is subtle or disabled under reduced motion.
- [ ] Hover transitions are short and calm.

## Mobile

- [ ] CTA buttons stack cleanly.
- [ ] Preview cards stay readable.
- [ ] Touch targets are at least 44px where interactive.
- [ ] No horizontal swipe-only interactions.

## Verification Commands

```bash
npm run typecheck
npm run build
```

Recommended viewport checks:

- 390px mobile
- 768px tablet
- 1280px desktop
- 1440px desktop

