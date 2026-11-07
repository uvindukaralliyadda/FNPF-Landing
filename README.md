# FNPF member sites (Next.js + TypeScript + Tailwind CSS)

Three pages:

| Route | File | What it is |
|---|---|---|
| `/` | `app/page.tsx` | Split landing page (New Members / Existing Members) |
| `/new-members` | `app/new-members/page.tsx` | New Members home page |
| `/members` | `app/members/page.tsx` | Existing Members home page |

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start   # production
```

Requires Node.js 18.18 or newer.

## Stack

- Next.js 15 (App Router), React 19, TypeScript
- Tailwind CSS v4 (theme tokens in `app/globals.css` under `@theme`)
- GSAP + ScrollTrigger via `@gsap/react` for scroll and load animations
- Montserrat via `next/font/google`

## Where things are

| What | File |
|---|---|
| Colours, type, shadows (design tokens) | `app/globals.css` (`@theme`) |
| Split page curve, seam and logo styles | `app/globals.css` (bottom section) |
| Navigation menus, links, contact details | `lib/site.ts` |
| Header (utility bar, dropdowns, mobile menu, reading progress) | `components/Header.tsx` |
| Hero slider (autoplay, pause, swipe, keyboard) | `components/HeroSlider.tsx` |
| Scroll animations (opt in with `data-anim` attributes) | `components/ScrollMotion.tsx` |
| Footer (app panel, phone mock-up, newsletter, links) | `components/Footer.tsx` |
| Favicon | `app/icon.png`, `app/apple-icon.png`, `app/favicon.ico` |
| Local photos and logo | `public/images/` |

## Before going live

- Replace `#` links with real page URLs (search the project for `href="#"`).
- Connect the newsletter form in `components/Footer.tsx` (marked `TODO`).
- The phone mock-up in the footer shows sample figures for illustration.
- Stock photos are free-licence Unsplash/Pexels images loaded remotely
  (allowed in `next.config.ts`). Swap in FNPF's own photography where possible,
  especially the retirement cards.
- All motion is disabled for visitors who prefer reduced motion.
"# FNPF-Landing" 
