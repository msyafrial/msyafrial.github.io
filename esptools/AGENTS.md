Purpose

This repository hosts the public landing site for The Last Outpost Workshop:
https://thelastoutpostworkshop.github.io/

The site is complete. Future work should be incremental, preserving layout, performance, and the sci-fi/HUD visual identity.

Tech stack and constraints

Vue 3 + TypeScript (Composition API)

Tailwind CSS

Static site only (GitHub Pages). No backend, auth, or CMS.

Keep routing minimal and Pages-friendly:

Prefer a single-page layout with anchor navigation

Avoid history-mode routing that requires rewrites

Design rules
Look & feel

Maintain the tasteful sci-fi console/HUD aesthetic:

thin borders, subtle glows, light grid/texture accents

clean modern typography

dark background with restrained accent colors

Avoid gimmicks or heavy visual effects.

Motion

Keep animations subtle and lightweight:

micro-interactions on hover

small entrance/reveal transitions

Respect prefers-reduced-motion.

Performance rules

Avoid large bundles and unnecessary dependencies.

Optimize images (prefer modern formats where relevant).

No heavy video backgrounds.

Dependency policy

Only add packages that provide clear UX value.

Tailwind is required.

Avoid large UI frameworks (no Vuetify/PrimeVue for this repo).

Prefer minimal icon/motion/meta utilities if already in use; do not add duplicates.

Accessibility requirements

Maintain adequate contrast and visible focus states.

Ensure keyboard navigation works for nav + CTAs.

Use semantic HTML and a correct heading hierarchy.

Deployment notes

This is a GitHub Pages user site deployed at the domain root.

Ensure base path remains correct for root hosting.

Keep README instructions accurate:

how to run dev server

how to build

high-level deploy steps

Change philosophy

Prefer small, safe changes.

Do not break existing URLs or tool paths.

If a change impacts layout, links, or performance, include a brief rationale in the PR description.