# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

The marketing site for Blundell Analytics, a small quantitative football transfer-intelligence consultancy. It's a single long-scrolling page (`app/page.tsx`) built with Next.js 16 (App Router, Turbopack) and Tailwind CSS v4, plus one API route (`app/api/contact/route.ts`) that emails contact-form submissions via Resend.

The repo started from the "Launch UI" shadcn/ui template (see `package.json`'s `name: "launch-ui"` and the generic `README.md`), but nearly everything from that scaffold has since been replaced with site-specific sections and a custom design system in `app/globals.css`. Don't take the README or `components.json` (which points at a nonexistent `styles/globals.css` and `tailwind.config.ts`) as accurate descriptions of the current structure — the real CSS lives in `app/globals.css`, and there is no `tailwind.config.ts` (Tailwind v4 is configured via `@theme` in CSS, not a JS/TS config file). `components/ui/button.tsx` is an unused leftover from the scaffold; buttons on the site use the `.btn-mono`/`.btn-primary`/`.btn-ghost`-style classes in `globals.css` instead.

## Commands

- `npm run dev` — dev server with Turbopack, http://localhost:3000
- `npm run build` — production build (also runs the TypeScript check)
- `npm run start` — serve a production build (build first)
- `npm run lint` — ESLint (`next/core-web-vitals`, `next/typescript`, plus `unused-imports` and `simple-import-sort`)
- `npx tsc --noEmit` — typecheck only, faster than a full build when iterating
- No test suite exists in this repo.

There's no separate format command; Prettier (with `prettier-plugin-tailwindcss` for class sorting) is a devDependency — run `npx prettier --write .` if needed.

When verifying a UI change, `npm run build` first (catches type errors fast), then start a server (`npx next start -p <port>`, since `next dev`'s HMR can serve stale state in a scripted check) and screenshot with Playwright — Chromium is preinstalled at `/opt/pw-browsers/chromium`.

## Architecture

**Page composition** (`app/page.tsx`): `Navbar`, `Hero`, `About`, `DashboardShowcase` (rendered as "Platform" on the page), `Coverage`, `Team`, `Faq`, `ContactSection`, `Footer`, `FloatingActions` — imported directly, one per `components/sections/<name>/default.tsx`. There's exactly one file per section; there's no variant system despite the `default.tsx` naming (a holdover from the template's convention of multiple variants per section, now just one).

**Design system, all in `app/globals.css`:**
- Zero-radius, hairline-bordered aesthetic: `--radius-*` are all `0px`, and `.rule-t`/`.rule-b` draw full-viewport-width 1px dividers between sections.
- `.rail` is the page's padding-only content gutter (no max-width) — content runs edge to edge behind a fixed inset, so hairlines span the full viewport rather than floating inside a centered column.
- Every section that has a heading uses the shared `SectionHeader` component (`components/ui/section.tsx`), which draws its own `.rule-t` above the label/title/lead. Do not add another `.rule-t` immediately below it in the section body — that was a recurring bug (double hairline) fixed multiple times across Platform/About/Team.
- Light/dark theming: `next-themes` (`components/contexts/theme-provider.tsx`, `defaultTheme="dark"`) toggles a `.dark` class on `<html>`; `@custom-variant dark (&:where(.dark, .dark *))` in `globals.css` wires that into Tailwind's `dark:` variant. Design tokens (`--ink`, `--band`, `--panel`, `--mark`, `--hairline`, `--glow`, etc.) are defined once under `:root` and re-defined under a `.dark` block — components should reference the token (`var(--mark)`, or the Tailwind alias like `text-mark`) rather than hardcoding a color, so they work in both themes automatically.
- Typography: `.eyebrow` (mono uppercase label above headings) and `.display-hero`/`.display-xl`/`.display-lg`/`.display-md` (fluid-clamped Inter Tight headings, largest to smallest) are the reusable type scale — prefer these over ad hoc inline `font-size`/`clamp()`.
- Any color passed as a prop that needs its alpha channel manipulated in JS (see `components/ui/interactive-grid-pattern.tsx`) must be a literal `"R, G, B"` triple, not a `var(--token)` reference — CSS custom properties can't be parsed/modified by JS string operations. `--glow` follows this format for exactly that reason.

**Data grounding:** Coverage numbers and any claims about scale (leagues covered, player-seasons analysed, etc.) must be traceable to real figures — see the comment block at the top of `components/sections/coverage/default.tsx` for how each number is sourced. Do not invent or round statistics; when updating a number, find the source and re-cite it in that comment.

**Scope boundary (content, not code):** this is a company-facing marketing site, not a place to disclose how the underlying trading/scouting model works. Do not add backtest results, model objectives, or model internals to any section — only company-level information, data-coverage/scale numbers, and team info belong here.

**Scroll behavior** (`lib/scroll-to.ts`): in-page anchor links use an eased scroll (`scrollToId`/`scrollToTop`, built on framer-motion's `animate()`) rather than the browser's native smooth-scroll, because native smooth-scroll reads as an abrupt snap over the length of this page. `handleAnchorClick` is the click handler every nav/footer link uses; reuse it (and `scrollToId`/`scrollToTop`) instead of calling `window.scrollTo` directly.

**Contact form** (`components/sections/contact/default.tsx` → `POST /api/contact`): client-side form posts JSON to the API route, which emails the submission to `info@blundellanalytics.ca` via Resend (`RESEND_API_KEY` env var) and replies-to the submitter's address.
