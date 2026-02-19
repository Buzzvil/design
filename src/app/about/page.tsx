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
      { name: 'Next.js 16', detail: 'App Router, Turbopack dev, static export (output: "export")', href: 'https://nextjs.org' },
      { name: 'React 19', detail: 'Client components, concurrent features', href: 'https://react.dev' },
      { name: 'TypeScript', detail: 'Strict mode, end-to-end type safety', href: 'https://www.typescriptlang.org' },
    ],
  },
  {
    category: 'Styling & Motion',
    items: [
      { name: 'Tailwind CSS', detail: 'Utility-first, custom theme (HSL tokens)', href: 'https://tailwindcss.com' },
      { name: 'Framer Motion', detail: 'Scroll-linked motion, parallax, blur reveal, hero blobs', href: 'https://www.framer.com/motion' },
      { name: 'Lucide React', detail: 'Icons across layout and sections', href: 'https://lucide.dev' },
    ],
  },
  {
    category: 'Typography',
    items: [
      { name: 'Nunito', detail: 'Display / hero (EN)', href: 'https://fonts.google.com/specimen/Nunito' },
      { name: 'Noto Sans KR', detail: 'Primary (KR)', href: 'https://fonts.google.com/noto/specimen/Noto+Sans+KR' },
      { name: 'Inter', detail: 'Primary (EN body)', href: 'https://fonts.google.com/specimen/Inter' },
      { name: 'Anonymous Pro / Nanum Gothic Coding', detail: 'Monospace (EN / KR)', href: null },
    ],
  },
  {
    category: 'Deployment',
    items: [
      { name: 'GitHub Pages', detail: 'Static hosting via GitHub Actions', href: 'https://pages.github.com' },
      { name: 'Static Export', detail: 'basePath /design, trailing slash, no server runtime', href: null },
    ],
  },
];

const architectureDetails = [
  {
    icon: Palette,
    title: 'Theming',
    description: 'HSL-based color tokens as CSS custom properties. Accent, primary, and muted tokens cascade through all components. Hero and brand/product pages use per-page palettes for background blobs.',
  },
  {
    icon: Globe,
    title: 'Internationalization',
    description: 'Fully bilingual (English / Korean). LanguageContext provides t() across the app. All copy is translated: nav, section headers, team profiles, tools, routines, principles, and values.',
  },
  {
    icon: Layers,
    title: 'Site Structure',
    description: 'Foundations (home): Mission & Vision, Philosophy, Working Principles, Team, Our Stack, Design Routines. Brand: principles, guidelines, resources. Product: Principles table, Composition, Variables, Patterns, Conventions. Shared: Header, Footer, section nav, parallax sections.',
  },
  {
    icon: Zap,
    title: 'Motion & Layout',
    description: 'Framer Motion for scroll-linked parallax, blur reveals, and hero background blobs (white/gray gradients). Principles and Values are presented in readable tables; no carousels. Contact form and brand generators use client-side logic.',
  },
  {
    icon: Code2,
    title: 'Static Export',
    description: 'Next.js output: "export" with basePath /design and trailing slash. Entire site is pre-rendered at build time for GitHub Pages. No server or API routes.',
  },
  {
    icon: Users,
    title: 'Open by Design',
    description: 'Source is public on GitHub. The portal is for the Buzzvil design team and partners; anyone can browse how we work, use our structure as reference, or contribute.',
  },
];

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen relative">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-16 px-8 min-h-screen flex flex-col justify-center">
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
      <section className="py-12 px-8 min-h-screen flex flex-col justify-center">
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
              <p className="font-semibold text-lg">Maxence Mauduit</p>
              <p className="text-sm text-muted-foreground">Experienced Product Designer and CDO · Buzzvil</p>
            </div>
            <a
              href="https://www.linkedin.com/in/mmaxence/"
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
      <section className="py-12 px-8 min-h-screen flex flex-col justify-center">
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
      <section className="py-12 px-8 pb-20 min-h-screen flex flex-col justify-center">
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
