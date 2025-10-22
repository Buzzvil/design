# Buzzvil Design System

A comprehensive design system website for Buzzvil, featuring a modern dark theme, interactive animations, bilingual support (English/Korean), and a structured information architecture.

## 🌟 Features

- **Structured Information Architecture**: Organized into Foundations, Brand, and Product sections
- **Interactive Navigation**: Elegant section navigation with auto-scroll and active states
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

### Information Architecture

#### Foundations (`/`)
- **The Mission**: Mission & Vision statements
- **Our Mindset**: Philosophy and design approach
- **How we work**: Core values and working principles
- **The team**: Meet the design team
- **Tools**: Design and development tools

#### Brand (`/design/brand`)
- **Principles**: Brand principles and guidelines
- **Guidelines**: Comprehensive brand guidelines
- **Resources**: Brand assets and templates

#### Product (`/design/product`)
- **Principles**: Product design principles (Reward = Time, Delight Without Deception, Scalable by Design)
- **Guidelines**: Product design guidelines
- **Resources**: Product design resources

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
- Section Navigation (auto-scroll, active states)
- Language Switcher
- Blur Reveal Animations
- Parallax Sections
- Values Slider (3D transitions)
- Product Principles (interactive elements)

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
├── app/                    # Next.js App Router
│   ├── design/            # Design system pages
│   │   ├── brand/         # Brand page (/design/brand)
│   │   └── product/       # Product page (/design/product)
│   ├── globals.css        # Global styles and CSS variables
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage (Foundations)
│   └── not-found.tsx      # 404 error page
├── components/            # React components
│   ├── Header.tsx         # Navigation header
│   ├── Hero.tsx           # Hero section
│   ├── SectionNavigation.tsx  # Section navigation
│   ├── Values.tsx         # Values slider
│   ├── ProductPrinciples.tsx  # Product principles
│   ├── SectionPlaceholder.tsx # Placeholder components
│   ├── InteractiveMinimap.tsx # Animated minimap
│   ├── LanguageSwitcher.tsx   # Language toggle
│   └── ...
├── contexts/              # React contexts
│   └── LanguageContext.tsx # Language management & translations
└── utils/                 # Utility functions
    ├── avatar.ts          # Avatar generation
    └── teamParser.ts      # Team data parsing
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
- **Jia** - Product Designer
- **Elle** - Product Designer
- **Joy** - Product Designer
- **Rina** - Product Designer

## 🔗 Links

- [Live Site](https://design.buzzvil.com)
- [Foundations](https://design.buzzvil.com/) - Mission, Philosophy, Values, Team, Tools
- [Brand](https://design.buzzvil.com/design/brand) - Brand principles, guidelines, and resources
- [Product](https://design.buzzvil.com/design/product) - Product design principles and guidelines
- [Buzzvil](https://buzzvil.com)

## 🎯 Key Features

### Navigation
- **Elegant Section Navigation**: Fixed sub-navigation with auto-scroll and active states
- **Smooth Transitions**: Seamless page transitions and scroll animations
- **Responsive Design**: Optimized for desktop, tablet, and mobile

### Content
- **Interactive Principles**: 3D animated product principles with interactive elements
- **Values Slider**: Auto-advancing values showcase with smooth transitions
- **Team Showcase**: Dynamic team member profiles with avatars
- **Bilingual Support**: Complete English and Korean translations

### Technical
- **Modern Architecture**: Next.js 15 with App Router
- **Type Safety**: Full TypeScript implementation
- **Performance**: Optimized with Tailwind CSS and Framer Motion
- **Accessibility**: WCAG compliant navigation and interactions

---

Built with ❤️ by the Buzzvil Design Team
