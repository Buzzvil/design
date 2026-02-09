'use client';

import { motion } from 'framer-motion';
import { Github, ExternalLink, Code2, Palette, Globe, Layers, Zap, Users } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useLanguage } from '@/contexts/LanguageContext';

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08 },
  }),
};

const techStack = [
  {
    category: 'Framework',
    items: [
      { name: 'Next.js 16', detail: 'App Router, static export', href: 'https://nextjs.org' },
      { name: 'React 19', detail: 'Server & Client components', href: 'https://react.dev' },
      { name: 'TypeScript', detail: 'Strict mode, end-to-end type safety', href: 'https://www.typescriptlang.org' },
    ],
  },
  {
    category: 'Styling & Design',
    items: [
      { name: 'Tailwind CSS', detail: 'Utility-first, custom theme tokens', href: 'https://tailwindcss.com' },
      { name: 'CSS Custom Properties', detail: 'Theming via HSL variables', href: null },
      { name: 'Framer Motion', detail: 'Animations, spring physics, layout transitions', href: 'https://www.framer.com/motion' },
    ],
  },
  {
    category: 'Typography',
    items: [
      { name: 'Nunito', detail: 'Primary sans-serif (EN)', href: 'https://fonts.google.com/specimen/Nunito' },
      { name: 'Noto Sans KR', detail: 'Primary sans-serif (KR)', href: 'https://fonts.google.com/noto/specimen/Noto+Sans+KR' },
      { name: 'Anonymous Pro', detail: 'Monospace (EN)', href: 'https://fonts.google.com/specimen/Anonymous+Pro' },
      { name: 'Nanum Gothic Coding', detail: 'Monospace (KR)', href: 'https://fonts.google.com/specimen/Nanum+Gothic+Coding' },
    ],
  },
  {
    category: 'Deployment',
    items: [
      { name: 'GitHub Pages', detail: 'Static hosting via GitHub Actions', href: 'https://pages.github.com' },
      { name: 'Static Export', detail: 'output: "export" with basePath /design', href: null },
    ],
  },
];

const architectureDetails = [
  {
    icon: Palette,
    title: 'Theming',
    description: 'HSL-based color tokens defined as CSS custom properties. Three theme presets (default, light, dark) generated from a single config. The accent, primary, and muted tokens cascade through every component.',
  },
  {
    icon: Globe,
    title: 'Internationalization',
    description: 'Fully bilingual (English / Korean). A custom LanguageContext provides the t() function across all pages. Every string is translated, including navigation, section headers, and body copy.',
  },
  {
    icon: Layers,
    title: 'Component Architecture',
    description: 'Modular section components organized by domain: brand (logo, colors, typography, imagery), product (guidelines, patterns), and shared layout (header, footer, parallax). A separate lib/ namespace hosts a themeable component library.',
  },
  {
    icon: Zap,
    title: 'Animation System',
    description: 'Framer Motion powers all transitions. Custom spring physics for the slingshot animation, sequential SVG line drawing, color-cycling compositions, and scroll-triggered section reveals. Animations are designed to loop gracefully with generous delays.',
  },
  {
    icon: Code2,
    title: 'Static Generation',
    description: 'The entire site is statically exported for GitHub Pages. Dynamic routes use generateStaticParams(). No server runtime required — everything is pre-rendered at build time.',
  },
  {
    icon: Users,
    title: 'Open by Design',
    description: 'Source code is public on GitHub. The portal is primarily an internal tool for the Buzzvil design team and partners, but anyone can browse how we work, learn from our approach, and contribute.',
  },
];

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen relative">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-16 px-8">
        <div className="max-w-4xl mx-auto">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="text-sm font-mono text-muted-foreground tracking-widest uppercase mb-4"
          >
            {t('about.kicker')}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-6"
          >
            {t('about.title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-muted-foreground leading-relaxed max-w-2xl"
          >
            {t('about.description')}
          </motion.p>
        </div>
      </section>

      {/* Contributors */}
      <section className="py-12 px-8">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-2xl font-bold mb-8"
          >
            {t('about.contributors')}
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-5 p-6 rounded-xl border border-border bg-muted/30"
          >
            <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center text-xl font-bold text-white shrink-0">
              M
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-lg">Maxence Bouret</p>
              <p className="text-sm text-muted-foreground">Design Lead · Buzzvil</p>
              <p className="text-xs text-muted-foreground mt-1">{t('about.contributorNote')}</p>
            </div>
            <a
              href="https://www.linkedin.com/in/maxencebouret/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-white transition-colors"
            >
              <ExternalLink className="w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-12 px-8">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-2xl font-bold mb-8"
          >
            {t('about.techStack')}
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {techStack.map((group, gi) => (
              <motion.div
                key={group.category}
                custom={gi}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="p-6 rounded-xl border border-border bg-muted/20"
              >
                <h3 className="text-sm font-mono text-muted-foreground tracking-widest uppercase mb-4">
                  {group.category}
                </h3>
                <ul className="space-y-3">
                  {group.items.map((item) => (
                    <li key={item.name} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-white/40 mt-2 shrink-0" />
                      <div>
                        {item.href ? (
                          <a
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium hover:text-white transition-colors"
                          >
                            {item.name}
                          </a>
                        ) : (
                          <span className="font-medium">{item.name}</span>
                        )}
                        <p className="text-sm text-muted-foreground">{item.detail}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture & Logic */}
      <section className="py-12 px-8 pb-20">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-2xl font-bold mb-8"
          >
            {t('about.architecture')}
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {architectureDetails.map((item, i) => (
              <motion.div
                key={item.title}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="p-6 rounded-xl border border-border bg-muted/20"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-semibold">{item.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Source link */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-12 flex justify-center"
          >
            <a
              href="https://github.com/Buzzvil/design"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border hover:bg-white/10 transition-colors font-medium"
            >
              <Github className="w-5 h-5" />
              {t('about.viewSource')}
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
