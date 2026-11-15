# Sachin Dada — Portfolio

Single-page portfolio for Sachin Mallick: video editor, web developer and Odia tech creator.
Built with Next.js 15, TypeScript and Tailwind CSS.

## Design

Colourful maximalist "Sachu®" pattern: paper background, full-bleed blue, pink and lime
sections, 1.5px ink outlines, pill buttons, stickers and a tilted ticker.

| Token    | Value     |
| -------- | --------- |
| `paper`  | `#F7F1E7` |
| `ink`    | `#171717` |
| `pink`   | `#FF4FA0` |
| `blue`   | `#4C55FF` |
| `lime`   | `#C7FF47` |
| `orange` | `#FF6B35` |
| `purple` | `#BBA2FF` |

Type: Syne (display), Space Grotesk (text), DM Mono (labels).
All site styles live in `app/globals.css` under the `.site` scope.

## Page flow

Hero → clients → work → about → toolkit → gear → packages → onboarding (DM a keyword) →
teaching in Odia → experience and education → testimonials → FAQ → contact.

## Editing content

- Text, packages, FAQ, testimonials, gear, links, brand name: `lib/constants.ts`
- Instagram numbers: `HERO_STATS`, `IG_STATS`, `IG_PERIOD` in `lib/constants.ts`
- Projects: `data/projects.json`, or the `/admin` dashboard (Upstash Redis, see `.env.local.example`)
- Images: `public/assets/images/`

## Run it

```bash
npm install
```

```bash
npm run dev
```

```bash
npm run build
```
