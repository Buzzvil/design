# Buzzvil Design System

A modern, minimal design system website for Buzzvil, featuring a dark theme, interactive animations, and bilingual support (English/Korean).

## 🌟 Features

- **Dark Theme**: Minimal, Linear-inspired design with blue accent colors
- **Interactive Minimap**: Full-screen animated minimap with scroll-based progress
- **Bilingual Support**: Seamless language switching between English and Korean
- **Smooth Animations**: Choreographed page transitions and blur reveal effects
- **Responsive Design**: Optimized for all device sizes
- **Modern Stack**: Built with Next.js 15, TypeScript, Tailwind CSS, and Framer Motion

## 🚀 Live Demo

Visit the live site: [design.buzzvil.com](https://design.buzzvil.com)

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Fonts**: Nunito (English), Pretendard (Korean)
- **Deployment**: GitHub Pages

## 📦 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Buzzvil/design.git
cd design
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎨 Design System

### Color Palette
- **Primary**: Black (#000000)
- **Accent**: Blue (#3B82F6)
- **Background**: Dark (#0A0A0A)
- **Text**: White (#FFFFFF)
- **Muted**: Gray (#6B7280)

### Typography
- **English**: Nunito (Google Fonts)
- **Korean**: Pretendard (Local font)

### Components
- Interactive Minimap
- Language Switcher
- Blur Reveal Animations
- Parallax Sections
- Avatar Generator

## 🌐 Internationalization

The site supports two languages:
- **English** (en)
- **Korean** (ko)

Language switching is handled through React Context with smooth page-wide transitions.

## 🚀 Deployment

### GitHub Pages (Automatic)

The site is automatically deployed to GitHub Pages on every push to the `main` branch using GitHub Actions.

### Manual Deployment

```bash
npm run build
npm run deploy
```

## 📁 Project Structure

```
src/
├── app/                 # Next.js App Router
│   ├── globals.css     # Global styles and CSS variables
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Home page
├── components/         # React components
│   ├── Header.tsx      # Navigation header
│   ├── Hero.tsx        # Hero section
│   ├── InteractiveMinimap.tsx  # Animated minimap
│   ├── LanguageSwitcher.tsx    # Language toggle
│   └── ...
├── contexts/           # React contexts
│   └── LanguageContext.tsx     # Language management
└── utils/              # Utility functions
    ├── avatar.ts       # Avatar generation
    └── clamp.ts        # Math utilities
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Max** - Design Lead
- **Jia** - Frontend Developer
- **Elle** - UX Designer
- **Joy** - Product Designer
- **Rina** - Design System Engineer

## 🔗 Links

- [Live Site](https://design.buzzvil.com)
- [Buzzvil](https://buzzvil.com)
- [Design System Documentation](https://design.buzzvil.com/foundations)

---

Built with ❤️ by the Buzzvil Design Team