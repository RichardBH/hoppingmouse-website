# Hopping Mouse Automation — marketing website

Marketing site for Hopping Mouse Automation, a trading name of Qualitiv Pty Ltd.
Industrial automation consultancy: SCADA (Ignition, ClearSCADA, Citect, Qualitiv SCADA),
PLC/RTU programming (Siemens, Rockwell/Allen-Bradley, Schneider, IDEC), plus electronic
and software prototyping and AI/Industry 4.0 integration (MES, cloud data). Audience:
production managers and plant engineers across water/wastewater, agriculture, rail, and
general manufacturing. Partner network: Corematic (machine vision), Tronlec (electrical),
specialist process consultants.

Flagship case study: a large nut-processing plant in regional Victoria (control system
design, PLC programming, SCADA — Ignition + IDEC PLCs). The client is anonymised in this
repo and on the site pending their written approval — never name them in committed files.

## Stack

- Astro static site (npm), deployed via GitHub Pages.
- No backend: contact form is mailto-backed.

## Design System

Always read DESIGN.md before making any visual or UI decisions.
All font choices, colors, spacing, and aesthetic direction are defined there.
Do not deviate without explicit user approval.
In QA mode, flag any code that doesn't match DESIGN.md.

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

## Skill routing

When the user's request matches an available skill, invoke it via the Skill tool. When in doubt, invoke the skill.

Key routing rules:
- Product ideas/brainstorming → invoke /office-hours
- Strategy/scope → invoke /plan-ceo-review
- Architecture → invoke /plan-eng-review
- Design system/plan review → invoke /design-consultation or /plan-design-review
- Full review pipeline → invoke /autoplan
- Bugs/errors → invoke /investigate
- QA/testing site behavior → invoke /qa or /qa-only
- Code review/diff check → invoke /review
- Visual polish → invoke /design-review
- Ship/deploy/PR → invoke /ship or /land-and-deploy
- Save progress → invoke /context-save
- Resume context → invoke /context-restore
- Author a backlog-ready spec/issue → invoke /spec
