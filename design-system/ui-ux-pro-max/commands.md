# UI UX Pro Max Commands For OS7

Source repository:

https://github.com/nextlevelbuilder/ui-ux-pro-max-skill

The full repository should not be vendored into this project by default. Use these commands from a temporary clone when refreshing design direction.

## Clone

```bash
rm -rf /tmp/ui-ux-pro-max-skill
git clone --depth 1 https://github.com/nextlevelbuilder/ui-ux-pro-max-skill.git /tmp/ui-ux-pro-max-skill
cd /tmp/ui-ux-pro-max-skill/src/ui-ux-pro-max
```

## Generate OS7 Design System

```bash
python3 scripts/search.py \
  "AI operating system personal company SaaS internal tools dashboard workflow" \
  --design-system \
  -f markdown \
  -p "OS7"
```

## Search Detailed Domains

```bash
python3 scripts/search.py \
  "AI SaaS internal tools dashboard workflow operating system" \
  --domain style

python3 scripts/search.py \
  "AI SaaS internal tools dashboard workflow operating system" \
  --domain landing

python3 scripts/search.py \
  "AI SaaS internal tools dashboard workflow operating system" \
  --domain typography

python3 scripts/search.py \
  "real-time dashboard animation accessibility loading" \
  --domain ux \
  -n 5
```

## How To Apply Results

Use UI UX Pro Max as a strategy engine:

- pattern selection
- section order
- typography direction
- motion and accessibility warnings
- pre-delivery checklist

Do not blindly copy generated UI into OS7. Adapt every result to the current React/Tailwind codebase and the OS7 product story.

