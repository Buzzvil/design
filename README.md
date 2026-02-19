# Buzzvil Design Portal

Buzzvil’s design portal: foundations, brand, and product system in one bilingual, statically exported site. Built with Next.js 16, React 19, TypeScript, Tailwind CSS, and Framer Motion.

## Features

- **Foundations (home)**: Mission & Vision, Philosophy, Working Principles (table), Team (with profile links), Our Stack (tools), Design Routines
- **Brand**: Principles, guidelines, resources, logo/icon/isometric generators
- **Product**: Principles (table + alignment questions), Composition (interaction layers), Variables (Chameleon theming), Patterns, Conventions
- **Bilingual**: English and Korean with seamless switching (LanguageContext, `t()`)
- **Static export**: Full static build for GitHub Pages (`output: "export"`, `basePath: "/design"`)
- **Motion**: Hero background blobs, parallax sections, blur reveals, scroll-linked behavior
- **Navigation**: Header (Foundations, Brand, Product dropdown), side section nav, footer aligned with header

## Live site

[design.buzzvil.com](https://design.buzzvil.com)

## Tech stack

- **Framework**: Next.js 16 (App Router, Turbopack in dev), React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS, CSS custom properties (HSL theme)
- **Motion**: Framer Motion
- **Icons**: Lucide React
- **Fonts**: Nunito, Noto Sans KR, Inter, Anonymous Pro, Nanum Gothic Coding
- **Deploy**: GitHub Pages (static)

## Getting started

### Prerequisites

- Node.js 18+
- npm or yarn

### Install and run

```bash
git clone https://github.com/Buzzvil/design.git
cd design
npm install
npm run dev
```

Open [http://localhost:3000/design](http://localhost:3000/design) (dev server uses basePath).

### Build (static export)

```bash
npm run build
```

Output is in `out/`. Deploy `out/` to GitHub Pages or any static host.

## Information architecture

### Foundations (`/design/`)

- **The Mission** – Mission & Vision (with abstract planet / blueprint visuals)
- **Our Mindset** – Philosophy
- **Working Principles** – Values in a table with alignment questions (Build in the Open, Clarity, Grit, Explorers, One-UX)
- **Our Team** – Team cards (name, role, description, keywords, optional profile link)
- **Our Stack** – Design and dev tools (e.g. Figma, GPT, Cursor)
- **Our Routines** – Design routines (biweekly sync, 1:1s, lunch study, design week)

### Brand (`/design/brand/`)

- Principles, guidelines, resources
- Logo generator, icon generator, isometric generator (client-side)

### Product (`/design/product/`)

- **Principles** – Table: Simple, Iconic, Delightful, Purposeful, Trustworthy + alignment questions
- **Composition** – Interaction layers (Delivery / Signature)
- **Variables** – Chameleon theming (tokens, presets)
- **Patterns** – Interaction, UI Kit, visual language
- **Conventions** – Workflow, token governance, naming, versioning

## Project structure

```
src/
├── app/
│   ├── about/          # About this site (/design/about/)
│   ├── brand/          # Brand page
│   ├── product/       # Product page
│   ├── layout.tsx     # Root layout, fonts, LanguageProvider
│   ├── page.tsx       # Home (Foundations)
│   └── globals.css
├── components/
│   ├── layout/        # Header, Footer, Logo, LanguageSwitcher, ContactBanner
│   ├── sections/      # Hero, MissionVision, Values, Team, Tools, Routines
│   ├── product/       # ProductPrinciples, InteractionLayers, ChameleonTheming, etc.
│   ├── ui/            # SectionHeader, BlurReveal, HeroBackground, Avatar, etc.
│   └── ...
├── contexts/          # LanguageContext (translations), ContactFormContext
└── utils/             # teamParser (team XML/data), avatar helpers
```

## i18n

- **Languages**: English (en), Korean (ko)
- **Mechanism**: `LanguageContext` with `t(key)`. All UI strings and section content (team, tools, routines, principles, values) use translation keys.
- **Persistence**: Language preference in `localStorage`; optional browser-language detection.

## Deployment

- **GitHub Pages**: Typically via GitHub Actions on push to `main` (build + deploy `out/`).
- **Manual**: `npm run build` then upload `out/` to any static host. Site is served under `/design` (basePath).

## Contributing

1. Fork the repo
2. Create a branch: `git checkout -b feature/your-feature`
3. Commit: `git commit -m 'Add your feature'`
4. Push: `git push origin feature/your-feature`
5. Open a Pull Request

## Team

- **Max (Maxence Mauduit)** – Experienced Product Designer and CDO
- **Jia (Sophie Cui)** – Principal Product Designer
- **Elle (신성욱)** – Product Designer
- **Joy (배희준)** – Product Designer
- **Rina (Erin Lee)** – Product Designer
- **Mido (정초원)** – Product Design intern

## Links

- [Live site](https://design.buzzvil.com)
- [Foundations](https://design.buzzvil.com/design/) – Mission, Philosophy, Values, Team, Stack, Routines
- [Brand](https://design.buzzvil.com/design/brand/) – Principles, guidelines, resources
- [Product](https://design.buzzvil.com/design/product/) – Principles, Composition, Variables, Patterns, Conventions
- [About this site](https://design.buzzvil.com/design/about/)
- [Buzzvil](https://buzzvil.com)
- [Repository](https://github.com/Buzzvil/design)

---

Built with ❤️ by the Buzzvil Design Team
