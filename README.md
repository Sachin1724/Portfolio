# Sachin Dada — Portfolio

Single-page portfolio for Sachin Mallick: video editor, web developer and Odia tech creator.
Built with Next.js 15, TypeScript and Tailwind CSS.

## Design

A maximalist poster look drawn from Odisha: Pattachitra colours, the pasapali check from
Sambalpuri weaving, ikat zigzags, and film details (clapper slate, film strip) for the editing work.

| Token     | Value     | Named after  |
| --------- | --------- | ------------ |
| `haldi`   | `#FFC21A` | turmeric     |
| `sindoor` | `#DE2A22` | vermilion    |
| `neel`    | `#2531C4` | indigo       |
| `paan`    | `#08774D` | betel leaf   |
| `rani`    | `#F2438F` | rani pink    |
| `kajal`   | `#16110D` | lamp black   |
| `chuna`   | `#FFF6E0` | lime plaster |

Type: Rozha One (display), Anek Odia (text and Odia script), Space Mono (labels).
All site styles live in `app/globals.css` under the `.site` scope.

## Page flow

Hero → clients → work → about → toolkit → gear → packages → onboarding (DM a keyword) →
teaching in Odia → experience and education → testimonials → FAQ → contact.

## Editing content

- Text, packages, FAQ, testimonials, gear, links: `lib/constants.ts`
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
