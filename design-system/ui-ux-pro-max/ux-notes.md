# UI UX Pro Max UX Notes For OS7

Extracted and adapted from UI UX Pro Max searches for:

- `AI SaaS internal tools dashboard workflow operating system`
- `real-time dashboard animation accessibility loading`

## Loading And Feedback

Show system status during waits.

Use:

- spinner or progress state for operations longer than roughly 300ms
- skeletons for content that is loading
- runtime logs or status rows for AI generation flows

Avoid:

- frozen UI
- blank states with no feedback

## Continuous Animation

Use infinite animation only when it represents active work or live status.

Good:

- loader spin
- active build cursor
- subtle live status pulse

Avoid:

- bouncing decorative icons
- attention-grabbing loops in reading areas
- motion that continues without semantic purpose

## Mobile Interaction

Vertical scroll should remain the primary mobile interaction.

Avoid custom horizontal swipe patterns in the main content unless there is a strong, accessible alternative.

## Performance

Lazy-load below-fold media when added.

Keep web font loading non-blocking. Existing Google Fonts imports should use `display=swap`.

## Accessibility

Maintain visible focus states.

Respect `prefers-reduced-motion`.

Check text contrast independently when adding new colors or translucent surfaces.

