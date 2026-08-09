# Design System — Hopping Mouse Automation

## Product Context
- **What this is:** Marketing website for Hopping Mouse Automation (trading name of Qualitiv Pty Ltd), an Australian industrial automation consultancy — SCADA, PLC/RTU, prototyping, AI/Industry 4.0 integration.
- **Who it's for:** Production managers and plant engineers at factories and plants; technical buyers who distrust marketing fluff.
- **Space/industry:** Industrial automation / systems integration. Peers: SAGE Automation, Enterprise Automation, ACE, Crossmuller — all blue-corporate, stock-photo templates.
- **Project type:** Marketing site (Astro static).

## Aesthetic Direction
- **Direction:** "Sodium Vapour" — Industrial/Utilitarian × Editorial. The 3am plant control room made beautiful: HMI-native visual language (P&IDs, tag names, alarm logs) executed with magazine-grade typography. Approved visual reference: `~/.gstack/projects/HOPPINGMOUSEAUTOMATION/designs/design-system-20260809/variant-B.png` (Variant B — live-HMI feel).
- **Decoration level:** Intentional — 1px schematic hairlines, subtle grain, monospace annotations. No gradients, no blobs, no rounded SaaS cards.
- **Mood:** Technical, calm under pressure, incapable of bullshit. A production manager should feel recognition ("that's my screen, except beautiful"), not marketing.
- **Reference sites (researched, to depart from):** gotosage.com, eaintegrator.com, acectrl.com, crossmuller.com.au.

## Typography
- **Display/Hero:** Archivo (Expanded widths, 700–800) — wide, mechanical, stencilled-signage feel. ALL-CAPS with slight tracking for headlines and kickers.
- **Body:** Source Sans 3 — deliberately plain; reads like an engineer wrote it.
- **UI/Labels:** IBM Plex Mono — nav labels (numbered: `01_HOME`), kickers, buttons.
- **Data/Tables:** IBM Plex Mono (tabular-nums) — tag names, timestamps, alarm logs, spec tables, footer.
- **Code:** IBM Plex Mono.
- **Loading:** Self-hosted via `@fontsource` npm packages (no external CDN requests).
- **Scale:** hero clamp(2.5rem, 7vw, 5.5rem) / h2 2rem / h3 1.375rem / body 1.0625rem / small 0.875rem / mono-label 0.8125rem.
- **Upgrade path:** Klim Söhne Breit / Untitled Sans / Söhne Mono if commercial licensing is approved later.

## Color
- **Approach:** Restrained, dark-only. Amber is the only accent. **No blue anywhere on the site.**
- **Background:** `#131110` — warm near-black (asphalt at night, not #000).
- **Surface/cards:** `#1E1A16` — dust on dark steel.
- **Hairlines/rules:** `#37302A` — 1px schematic-style rules.
- **Primary text:** `#EDE4D6` — bone/paper. Pure `#FFFFFF` reserved for the hero headline only.
- **Muted text:** `#94897A` — spinifex-dry grey.
- **Accent:** `#FFB000` — sodium-vapour amber. Links, CTAs, live tag values, kickers, the mouse mark. (Approved mockup renders it near `#F5C65E` on soft surfaces — use `#FFB000` for interactive elements, `#F5C65E` for large filled areas like the CTA if `#FFB000` feels harsh in context.)
- **Semantic (HMI convention, used sparingly and honestly):** running/healthy `#3FC478`, alarm `#C1413F` (only in alarm timelines, never decorative), warning shares accent amber.
- **Dark mode:** The site is dark-only by design; no light theme.

## Spacing
- **Base unit:** 8px
- **Density:** Comfortable in marketing sections, compact in spec/alarm tables.
- **Scale:** 2xs(2) xs(4) sm(8) md(16) lg(24) xl(32) 2xl(48) 3xl(64) 4xl(96)

## Layout
- **Approach:** Grid-disciplined with poster-first composition. First viewport = statement + animated P&ID schematic, not a document.
- **Grid:** 12 columns desktop, 4 mobile. Section panels separated by 1px hairlines (schematic feel).
- **Max content width:** 1280px.
- **Border radius:** 0 everywhere. Corners are square, like equipment.
- **Left-aligned everything.** No centered body sections.

## Motion
- **Approach:** Minimal-mechanical. Nothing floats, pulses, or follows the cursor.
- **Signature moves:** schematic lines draw once on entry (600ms); tag values tick (simulated live data); hero copy reveals in two firm steps (280ms); hover = colour change or 1px translate, never scale.
- **Easing:** enter(ease-out) exit(ease-in) move(ease-in-out)
- **Duration:** micro(120ms) short(280ms) medium(400ms) draw(600ms)
- **Accessibility:** full `prefers-reduced-motion` support — schematics render static, ticks stop.

## Signature Elements
- **Hero P&ID:** hand-built SVG schematic of a representative nut-processing plant (hopper → cleaning → dryer → silos → PLC panel → SCADA server → cloud) in thin greyscale linework with amber tag-callout boxes showing live values (`SILO3.TEMP = 22.4°C  GOOD`). Clearly labelled REPRESENTATIVE — SIMULATED VALUES.
- **Sensor-to-cloud strip:** horizontal chain — sensors → I/O → PLC → SCADA/HMI → historian → AI/analytics → cloud — as the services spine.
- **Case study as alarm log:** timestamped event table (`02:41 SILO3 HIGH TEMP → 02:52 RTN NORMAL`, labelled ILLUSTRATIVE) opening the flagship field report.
- **Commissioning Record:** founder's 30 years as a plain mono table (site, system, outcome), not a biography.
- **The mouse:** appears once in the header as a small line-drawn amber mark. Never a mascot.

## Anti-patterns (hard rules)
No purple gradients · no 3-column icon grids · no centered everything · no stock photos · no glassmorphism · no rounded SaaS cards · no blue · no "unlocking innovation"/"digital transformation" copy · no AI-generated factory photography.

## Decisions Log
| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-08-09 | Initial design system created | /design-consultation: research (4 competitor sites) + 3 outside voices (Claude main, Codex, Claude subagent); user approved "Sodium Vapour" dark direction, mockup Variant B |
