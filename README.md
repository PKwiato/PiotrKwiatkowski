# Piotr Kwiatkowski // EM Portfolio & Showcase

A high-performance, interactive Engineering Manager portfolio built with **Astro**, **Vue**, and **Tailwind CSS**. Designed following the "Elevated Brutalism & Machine Experience (MX)" aesthetic.

**Official Domain:** [https://www.kwiatkowskipiotr.pl](https://www.kwiatkowskipiotr.pl)

## 🚀 The Vision: "The Kinetic Monolith"
This portfolio is not just a CV—it's a technical instrument. It moves away from standard template looks by leaning into intentional asymmetry, high-contrast grids, and retro-futurist accents.

- **Visual Direction:** High-Voltage Noir (#0e0e0e / #ff8f73).
- **Typography:** Editorial pairing of *Newsreader* (serif) and *Space Grotesk* (technical mono).
- **Interactivity:** Vue-powered particle background and smooth, mechanical-style easing.

## 🛠️ Tech Stack
- **Framework:** [Astro 4.x](https://astro.build/) (Static Site Generation)
- **UI Components:** [Vue 3](https://vuejs.org/) (Interactive layers)
- **Styling:** [Tailwind CSS 4.x](https://tailwindcss.com/) (Utility-first styling with CSS variables)
- **SEO:** JSON-LD Structured Data, Open Graph, and Twitter Cards.

## 📁 Project Structure
```text
/
├── public/                 # Static assets (favicon, me.png, robots.txt)
├── src/
│   ├── components/         # Interactive Vue components (ParticleBackground)
│   ├── layouts/            # BaseLayout.astro with SEO and Global Styles
│   ├── pages/              # index.astro (Primary content & data mapping)
│   └── styles/             # global.css (Design system variables & animations)
├── DESIGN.md               # Foundation Design System document
├── package.json            # Project dependencies and scripts
└── astro.config.mjs        # Astro & Integration configuration
```

## 🧞 Commands
| Command | Action |
| :--- | :--- |
| `npm install` | Installs dependencies |
| `npm run dev` | Starts local dev server at `localhost:4321` |
| `npm run build` | Build your production site to `./dist/` |
| `npm run preview` | Preview your build locally |

## 📐 Design Principles (from DESIGN.md)
- **The "No-Line" Rule:** Boundaries defined by background color shifts, not 1px borders.
- **0px Radius:** Strictly rectangular components for a raw, brutalist feel.
- **Mechanical Easing:** Snappy, high-precision movements (`cubic-bezier(0.2, 1, 0.3, 1)`).
- **Glassmorphism 2.0:** High-blur overlays for navigation and floating modules.
