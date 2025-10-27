'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'ko';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  getFontClass: () => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation data
const translations = {
  en: {
    // Navigation
    'nav.foundations': 'Foundations',
    'nav.brand': 'Brand',
    'nav.product': 'Product',
    'nav.team': 'Team',
    'nav.tools': 'Tools',
    'nav.sections.mission': 'The Mission',
    'nav.sections.philosophy': 'Our Mindset',
    'nav.sections.values': 'Working Principles',
    'nav.sections.team': 'Our Team',
    'nav.sections.tools': 'Our Stack',
    
    // Contact Banner
    'banner.title': 'Want to meet us over coffee?',
    'banner.cta': 'Schedule a meeting',
    'banner.cta.short': 'Contact',
    'banner.requirements.schedule': 'Schedule a time',
    'banner.requirements.info': 'Include your info',
    
    // Hero
    'hero.title': 'Buzzvil Design',
    'hero.subtitle': 'Engaging. Playful. Scalable.',
    'hero.sentence.start': 'We build',
    'hero.sentence.end': 'experiences.',
    'hero.keyword.engaging': 'Engaging',
    'hero.keyword.playful': 'Playful',
    'hero.keyword.scalable': 'Scalable',
            'hero.explore': 'Explore Foundations',
            'hero.brand': 'Brand',
            'hero.product': 'Product',
            'hero.scroll': 'Scroll to explore',
    
            // Mission & Vision
            'mission.title': 'Mission & Vision',
            'mission.subtitle': 'Our mission and vision guide everything we do at Buzzvil.',
            'mission.mission.title': 'Mission',
            'mission.mission.subtitle': 'what we do now',
            'mission.mission.content': 'We design meaningful interactions that shape how people discover, experience, and stay connected with Buzzvil\'s campaigns and brand.\nOur goal is to turn advertising into experiences people choose to explore—moments that capture attention, spark curiosity, and drive real results for advertisers.',
            'mission.vision.title': 'Vision',
            'mission.vision.subtitle': 'what future we\'re building',
            'mission.vision.content': 'We set the next standard for AdTech design by transforming ads and brand touchpoints into engaging, repeatable experiences that connect users and advertisers.\nWe envision a future where advertising feels natural, enjoyable, and seamlessly part of everyday life.',
    
            // Philosophy
            'philosophy.title': 'Philosophy',
            'philosophy.subtitle': 'how we approach it',
            'philosophy.content': 'At Buzzvil, design shapes how people experience advertising—not as interruptions, but as moments of connection and delight.\nWe believe every touchpoint, from brand to product, should feel playful, engaging, and effortless.\nOur role is to unify how Buzzvil looks, feels, and behaves across the ecosystem, building trust, driving performance, and inspiring what AdTech can become.',
    
            // Ways of Working
            'waysOfWorking.title': 'Ways of Working',
            'waysOfWorking.subtitle': 'How we think, create, and collaborate at Buzzvil Design.',
            'waysOfWorking.principles.title': 'Our Principles',
            'waysOfWorking.principles.subtitle': 'How we work together to design at Buzzvil.',
            'waysOfWorking.team.title': 'Our Team',
            'waysOfWorking.team.subtitle': 'The people behind Buzzvil Design.',
            'waysOfWorking.stack.title': 'Our Stack',
            'waysOfWorking.stack.subtitle': 'The tools that power our design work.',
    
    // Principles
    'principles.title': 'Principles',
    'principles.subtitle': 'The principles that guide our approach to design and development.',
    'principles.reward.title': 'Reward = Time',
    'principles.reward.shortTitle': 'Reward',
    'principles.reward.content': 'Rewards are a transparent and measurable exchange of user attention. Mechanism: 1P ≈ 1 second of attention. This gives consistency to users and predictability to advertisers.',
    'principles.delight.title': 'Delight Without Deception',
    'principles.delight.shortTitle': 'Delight',
    'principles.delight.content': 'Rewards spark motivation, but experiences sustain engagement. We never use dark patterns: never overlay one ad on another, never mislead, never trap. Interactions must feel playful, clear, and respectful.',
    'principles.scalable.title': 'Scalable by Design',
    'principles.scalable.shortTitle': 'Scalable',
    'principles.scalable.content': 'Every design decision must scale across products, partners, and business models. We provide meaningful customization, but avoid unsustainable exceptions. These principles can veto business or product decisions that fragment the system.',
    
    // Principles Characteristics
    'principles.reward.characteristics.0': 'Transparent Exchange',
    'principles.reward.characteristics.1': 'Measurable Attention',
    'principles.reward.characteristics.2': 'User Consistency',
    'principles.reward.characteristics.3': 'Advertiser Predictability',
    'principles.delight.characteristics.0': 'No Dark Patterns',
    'principles.delight.characteristics.1': 'Playful Interactions',
    'principles.delight.characteristics.2': 'Clear Communication',
    'principles.delight.characteristics.3': 'Respectful Design',
    'principles.scalable.characteristics.0': 'Cross-Product Scale',
    'principles.scalable.characteristics.1': 'Meaningful Customization',
    'principles.scalable.characteristics.2': 'System Integrity',
    'principles.scalable.characteristics.3': 'Decision Veto Power',
    
    // Values
            'values.title': 'Working Principles',
    'values.subtitle': 'How we work together to design at Buzzvil.',
            'values.build.title': 'Build in the Open',
            'values.build.shortTitle': 'Build in the Open',
    'values.build.content': 'We start rough, share early, and iterate fast. Every designer has access to AI tools that accelerate exploration. Feedback and quick loops help us refine ideas into solid, production-ready solutions.',
    'values.build.tagline': 'iterate fast.',
    'values.clarity.title': 'Clarity Through Feedback',
    'values.clarity.shortTitle': 'Be Crystal Clear',
    'values.clarity.content': 'We communicate with candor and precision. Feedback is how we grow: giving it clearly, receiving it openly, and applying it constructively. Clear communication builds trust and avoids wasted effort.',
    'values.clarity.tagline': 'Clarity first, feedback always.',
    'values.grit.title': 'Own it, Ship It',
    'values.grit.shortTitle': 'Own it, Ship It',
    'values.grit.content': 'Designers don\'t just stop at drafts. We take ownership of user stories and projects, pushing them from first sketches through to production. We lead with persistence and craft until the outcome is real.',
    'values.grit.tagline': 'Grit.',
    'values.explore.title': 'Bold Explorers',
    'values.explore.shortTitle': 'Explorers',
    'values.explore.content': 'We embrace research, experimentation, and AI adoption as core to our craft. With powerful tools and a culture of inquiry, we have no excuse not to explore widely, validate rigorously, and design with confidence.',
    'values.explore.tagline': 'Explore boldly, research deeply.',
    'values.team.title': 'One-UX',
    'values.team.shortTitle': 'One-UX',
    'values.team.content': 'We align as a design team before we scale out. That means syncing often, sharing conventions, and applying consistent practices. Our alignment ensures partners, users, and advertisers experience Buzzvil design as one coherent system.',
    'values.team.tagline': 'Align first, scale together.',
    
    // Values Characteristics
    'values.build.characteristics.0': 'Rapid Prototyping',
    'values.build.characteristics.1': 'AI-Powered Exploration',
    'values.build.characteristics.2': 'Early Sharing',
    'values.build.characteristics.3': 'Quick Iteration',
    'values.clarity.characteristics.0': 'Candor & Precision',
    'values.clarity.characteristics.1': 'Open Communication',
    'values.clarity.characteristics.2': 'Constructive Growth',
    'values.clarity.characteristics.3': 'Trust Building',
    'values.grit.characteristics.0': 'Full Ownership',
    'values.grit.characteristics.1': 'End-to-End Delivery',
    'values.grit.characteristics.2': 'Persistence',
    'values.grit.characteristics.3': 'Production Focus',
    'values.explore.characteristics.0': 'Research-Driven',
    'values.explore.characteristics.1': 'AI Adoption',
    'values.explore.characteristics.2': 'Wide Exploration',
    'values.explore.characteristics.3': 'Rigorous Validation',
    'values.team.characteristics.0': 'Team Alignment',
    'values.team.characteristics.1': 'Shared Conventions',
    'values.team.characteristics.2': 'Consistent Practices',
    'values.team.characteristics.3': 'Coherent System',
    
    // Resources
    'resources.title': 'Design Resources',
    'resources.subtitle': 'Everything you need to create exceptional user experiences. Download our latest design files, guidelines, and templates.',
    'resources.category.design-system': 'Design System',
    'resources.category.templates-patterns': 'Templates & Patterns',
    'resources.category.brand-assets': 'Brand & Assets',
    
    // Team
    'team.title': 'Meet Our Design Team',
    'team.subtitle': 'A diverse group of creative minds working together to create exceptional user experiences and drive design excellence.',
    
    // Tools
    'tools.title': 'Our Stack',
    'tools.subtitle': 'The tools that power our design work.',
    'tools.visit': 'Visit Tool',
    'tools.category.design-development': 'Design & Development Tools',
    
            // Brand
            'brand.sections.principles': 'Principles',
            'brand.sections.guidelines': 'Guidelines',
            'brand.sections.resources': 'Resources',
            'brand.intro.catchphrase': 'Shaping how Buzzvil looks, feels, and behaves across every touchpoint.',
            'brand.principles.title': 'Brand Principles',
            'brand.principles.description': 'Our core brand principles that guide every decision, interaction, and experience we create. These fundamental values ensure consistency and authenticity across all touchpoints.',
            'brand.guidelines.title': 'Brand Guidelines',
            'brand.guidelines.description': 'Comprehensive guidelines for applying our brand consistently across all platforms and touchpoints. From logo usage to color palettes, typography, and voice.',
            'brand.resources.title': 'Brand Resources',
            'brand.resources.description': 'Download our brand assets, templates, and resources. Everything you need to implement our brand consistently across your projects and campaigns.',
            
            // Product
            'product.sections.principles': 'Principles',
            'product.sections.patterns': 'Interaction Patterns',
            'product.sections.resources': 'Resources',
            'product.intro.catchphrase': 'Designing delightful experiences that users love to engage with.',
            'product.guidelines.title': 'Product Guidelines',
            'product.guidelines.intro': 'Our Product experience gravitates around Interactions, and that is the core attribute to all of our experiences. We first define interaction patterns prior to even drafting a UI kit. Then will come polishing details like micro-interactions, coming on top of the UI kit.',
            
            'product.guidelines.uxPatterns.title': 'UX Patterns',
            'product.guidelines.uxPatterns.description': 'The core user experience patterns that define how users interact with our products. These patterns are established before any visual design work begins.',
            
            'product.guidelines.interactionPatterns.title': 'Interaction Patterns',
            'product.guidelines.interactionPatterns.subtitle': 'The foundation of our product experience',
            'product.guidelines.interactionPatterns.description': 'We define interaction patterns before any visual design work begins. These patterns establish how users navigate, engage, and accomplish tasks within our products.',
            'product.guidelines.interactionPatterns.intro': 'Interaction patterns are the building blocks of user experience. When designed thoughtfully, they create intuitive and delightful experiences. However, when misused, they can lead to dark patterns that manipulate users or create frustrating experiences.',
            'product.guidelines.interactionPatterns.bestPractices': 'Best Practices',
            'product.guidelines.interactionPatterns.bestPractices.content': '• Always prioritize user needs over business goals\n• Provide clear feedback for every interaction\n• Maintain consistency across all touchpoints\n• Test patterns with real users before implementation\n• Document patterns for team alignment',
            'product.guidelines.interactionPatterns.darkPatterns': 'Dark Patterns to Avoid',
            'product.guidelines.interactionPatterns.darkPatterns.content': '• Hidden costs or subscription traps\n• Misleading button labels or placement\n• Forced continuity without clear opt-out\n• Fake urgency or scarcity tactics\n• Confusing or misleading navigation',
            'product.guidelines.interactionPatterns.onLoad': 'OnLoad (skeleton UI, loading states)',
            'product.guidelines.interactionPatterns.onLoad.description': 'Loading states provide immediate feedback when content is being fetched or processed. Skeleton screens maintain visual continuity and reduce perceived loading time.',
            'product.guidelines.interactionPatterns.onScroll': 'OnScroll (default page vertical scroll as primary interaction)',
            'product.guidelines.interactionPatterns.onScroll.description': 'Vertical scrolling is the most natural interaction for mobile and web. Use it as the primary navigation method, with clear visual cues for scrollable content.',
            'product.guidelines.interactionPatterns.notify': 'Notify (Toast, banner, etc.)',
            'product.guidelines.interactionPatterns.notify.description': 'Non-intrusive notifications that inform users without blocking their workflow. Use for success messages, updates, or gentle reminders.',
            'product.guidelines.interactionPatterns.alert': 'Alert (Toast)',
            'product.guidelines.interactionPatterns.alert.description': 'Urgent notifications that require immediate attention. Use sparingly for critical information, errors, or important confirmations.',
            'product.guidelines.interactionPatterns.pauseAsk': 'Pause & Ask (popup)',
            'product.guidelines.interactionPatterns.pauseAsk.description': 'Modal interactions that pause the current flow to gather information or confirm actions. Use for important decisions that need user attention.',
            'product.guidelines.interactionPatterns.magnify': 'Magnify (bottomsheet)',
            'product.guidelines.interactionPatterns.magnify.description': 'Expandable content that reveals additional information or options. Perfect for mobile interfaces where screen space is limited.',
            'product.guidelines.interactionPatterns.screenToScreen': 'Screen to Screen (navigation patterns)',
            'product.guidelines.interactionPatterns.screenToScreen.description': 'Smooth transitions between different views or screens. Maintain context and provide clear navigation hierarchy.',
            'product.guidelines.interactionPatterns.feedback': 'Feedback (touch, swipe, etc.)',
            'product.guidelines.interactionPatterns.feedback.description': 'Immediate visual or haptic feedback for user interactions. Essential for creating responsive and engaging experiences.',
            'product.guidelines.interactionPatterns.moreToCome': '(more to come)',
            'product.guidelines.interactionPatterns.moreToCome.description': 'Additional patterns will be added as we discover and document new interaction needs.',
            
            'product.guidelines.uiKit.title': 'UI Kit',
            'product.guidelines.uiKit.subtitle': 'Visual components built on interaction foundations',
            'product.guidelines.uiKit.description': 'Our UI components are designed to support the interaction patterns we\'ve established. Every component serves a specific interaction purpose.',
            'product.guidelines.uiKit.atoms': 'Atoms (buttons, inputs, icons)',
            'product.guidelines.uiKit.modules': 'Modules (cards, forms, navigation)',
            'product.guidelines.uiKit.views': 'Views (pages, layouts, screens)',
            
            'product.guidelines.microInteractionPatterns.title': 'Micro-interaction Patterns',
            'product.guidelines.microInteractionPatterns.subtitle': 'Polishing details that bring experiences to life',
            'product.guidelines.microInteractionPatterns.description': 'These subtle details add personality and feedback to our interactions, making the experience feel responsive and delightful.',
            'product.guidelines.microInteractionPatterns.livingIcons': 'Living icons',
            'product.guidelines.microInteractionPatterns.emphasisOn': 'EmphasisOn',
            'product.guidelines.microInteractionPatterns.rewardDelights': 'Reward delights',
            'product.guidelines.microInteractionPatterns.moreToCome': 'More to come',
            
            'product.guidelines.visualPatterns.title': 'Visual Patterns',
            'product.guidelines.visualPatterns.subtitle': 'Connecting product design to brand identity',
            'product.guidelines.visualPatterns.description': 'Visual patterns that ensure our products feel cohesive with our brand while supporting the established interaction patterns.',
            'product.guidelines.visualPatterns.principle1': 'Apply brand colors, typography, and visual elements consistently',
            'product.guidelines.visualPatterns.principle2': 'Create visual hierarchy that supports user task completion',
            'product.guidelines.visualPatterns.principle3': 'Ensure visual patterns work across different screen sizes and contexts',
            'product.guidelines.visualPatterns.principle4': 'Balance brand expression with functional clarity',
            
            'product.guidelines.integrationWorkflow.title': 'Integration Workflow',
            'product.guidelines.integrationWorkflow.subtitle': 'How design and development work together',
            'product.guidelines.integrationWorkflow.description': 'The process and tools that ensure our design patterns are properly implemented and maintained across all products.',
            'product.guidelines.integrationWorkflow.principle1': 'Establish clear handoff processes between design and development',
            'product.guidelines.integrationWorkflow.principle2': 'Use design tokens to maintain consistency across platforms',
            'product.guidelines.integrationWorkflow.principle3': 'Implement regular design reviews and quality assurance',
            'product.guidelines.integrationWorkflow.principle4': 'Document and version control all design system changes',
            
            'product.guidelines.cta.title': 'Ready to implement these guidelines?',
            'product.guidelines.cta.description': 'Access our comprehensive design system resources and start building consistent product experiences.',
            'product.guidelines.cta.button': 'View Resources',
            'product.resources.title': 'Product Resources',
            'product.resources.description': 'Download our design system components, templates, and development resources. Everything you need to build consistent product experiences.',
            
            // Footer
            'footer.description': 'Home to Buzzvil\'s design source of truth. We build in the open. This portal is primarily meant to be used internally and by our partners, but we also like anyone to have a look at how we work!',
            'footer.foundations.mission': 'The Mission',
            'footer.foundations.philosophy': 'Our Mindset',
            'footer.foundations.values': 'Working Principles',
            'footer.foundations.team': 'Our Team',
            'footer.foundations.tools': 'Our Stack',
            'footer.brand.principles': 'Principles',
            'footer.brand.guidelines': 'Guidelines',
            'footer.brand.resources': 'Resources',
            'footer.product.principles': 'Principles',
            'footer.product.guidelines': 'Guidelines',
            'footer.product.resources': 'Resources',
            'footer.connect.buzzvil': 'Buzzvil',
            'footer.connect.contact': 'Contact',
            'footer.connect.careers': 'Careers',
            'footer.connect.figma': 'Figma',
            'footer.connect.github': 'GitHub',
            'footer.connect.linkedin': 'LinkedIn',
            'footer.made': 'Made with',
            'footer.by': 'by the Buzzvil Design Team',
            'footer.privacy': 'Privacy Policy',
            'footer.terms': 'Terms of Service',
  },
  ko: {
    // Navigation
    'nav.foundations': '기반',
    'nav.brand': '브랜드',
    'nav.product': '제품',
    'nav.team': '팀',
    'nav.tools': '도구',
    'nav.sections.mission': '미션',
    'nav.sections.philosophy': '마인드셋',
    'nav.sections.values': '작업 원칙',
    'nav.sections.team': '우리의 팀',
    'nav.sections.tools': '우리의 스택',
    
    // Contact Banner
    'banner.title': '커피 한 잔 하며 만나볼까요?',
    'banner.cta': '미팅 예약하기',
    'banner.cta.short': '연락',
    'banner.requirements.schedule': '시간 예약',
    'banner.requirements.info': '정보 포함',
    
    // Hero
    'hero.title': 'Buzzvil Design',
    'hero.subtitle': '매력적인. 재미있는. 확장 가능한.',
    'hero.sentence.start': '우리는 구축합니다',
    'hero.sentence.end': '경험을.',
    'hero.keyword.engaging': '매력적인',
    'hero.keyword.playful': '재미있는',
    'hero.keyword.scalable': '확장 가능한',
            'hero.explore': '기반 탐색',
            'hero.brand': '브랜드',
            'hero.product': '제품',
            'hero.scroll': '스크롤하여 탐색',
    
            // Mission & Vision
            'mission.title': '미션 & 비전',
            'mission.subtitle': '버즈빌에서 우리가 하는 모든 일을 이끄는 미션과 비전.',
            'mission.mission.title': '미션',
            'mission.mission.subtitle': '지금 우리가 하는 일',
            'mission.mission.content': '우리는 사람들이 버즈빌의 광고 캠페인과 브랜드를 발견하고, 경험하고, 지속적으로 참여하는 방식을 형성하는 의미 있는 상호작용을 디자인합니다. 우리의 작업은 광고를 사람들이 탐험하고 싶어하는 경험으로 바꾸며, 주의를 끌고, 호기심을 자극하며, 광고주에게 성과를 가져다주는 순간들을 만듭니다.',
            'mission.vision.title': '비전',
            'mission.vision.subtitle': '우리가 구축하는 미래',
            'mission.vision.content': '우리는 광고 캠페인과 브랜드 경험을 사용자와 광고주를 연결하는 매력적이고 반복 가능한 상호작용으로 변화시켜 AdTech 디자인의 새로운 표준을 제시합니다. 이러한 새로운 참여 방식을 통해, 버즈빌은 광고가 즐겁고, 사람들의 일상 경험에 자연스럽게 통합되는 미래를 이끕니다.',
    
            // Philosophy
            'philosophy.title': '철학',
            'philosophy.subtitle': '우리가 접근하는 방식',
            'philosophy.content': '버즈빌에서 디자인은 사람들이 광고를 경험하는 방식을 형성합니다. 방해가 아닌 즐거운 연결의 순간으로 말입니다. 우리는 브랜드 접점부터 제품 내 경험까지 모든 상호작용이 재미있고, 매력적이며, 자연스러워야 한다고 믿습니다. 우리의 역할은 버즈빌이 생태계 전반에서 어떻게 보이고, 느껴지고, 행동하는지를 통합하여 캠페인과 플랫폼을 하나의 일관되고 즐거운 경험으로 만드는 것입니다. 우리의 원칙과 원팀 정신에 이끌려, 우리는 신뢰를 영감하고, 성과를 추진하며, AdTech가 될 수 있는 새로운 표준을 설정하기 위해 디자인합니다.',
    
            // Ways of Working
            'waysOfWorking.title': '작업 방식',
            'waysOfWorking.subtitle': '버즈빌 디자인에서 우리가 생각하고, 창조하고, 협업하는 방식.',
            'waysOfWorking.principles.title': '우리의 원칙',
            'waysOfWorking.principles.subtitle': '버즈빌에서 디자인하기 위해 함께 작업하는 방식.',
            'waysOfWorking.team.title': '우리의 팀',
            'waysOfWorking.team.subtitle': '버즈빌 디자인을 만드는 사람들.',
            'waysOfWorking.stack.title': '우리의 스택',
            'waysOfWorking.stack.subtitle': '우리의 디자인 작업을 지원하는 도구들.',
    
    // Principles
    'principles.title': '원칙',
    'principles.subtitle': '디자인과 개발 접근 방식을 이끄는 원칙들.',
    'principles.reward.title': '보상 = 시간',
    'principles.reward.shortTitle': '보상',
    'principles.reward.content': '보상은 사용자 주의의 투명하고 측정 가능한 교환입니다. 메커니즘: 1P ≈ 1초의 주의. 이는 사용자에게 일관성을, 광고주에게 예측 가능성을 제공합니다.',
    'principles.delight.title': '기만 없는 기쁨',
    'principles.delight.shortTitle': '기쁨',
    'principles.delight.content': '보상은 동기를 불러일으키지만, 경험이 참여를 지속시킵니다. 우리는 절대 다크 패턴을 사용하지 않습니다: 광고를 다른 광고 위에 겹치지 않고, 오해를 불러일으키지 않으며, 함정에 빠뜨리지 않습니다. 상호작용은 재미있고 명확하며 존중스러워야 합니다.',
    'principles.scalable.title': '디자인으로 확장 가능하게',
    'principles.scalable.shortTitle': '확장성',
    'principles.scalable.content': '모든 디자인 결정은 제품, 파트너, 비즈니스 모델에 걸쳐 확장되어야 합니다. 우리는 의미 있는 맞춤화를 제공하지만 지속 불가능한 예외는 피합니다. 이러한 원칙은 시스템을 분할하는 비즈니스나 제품 결정을 거부할 수 있습니다.',
    
    // Principles Characteristics
    'principles.reward.characteristics.0': '투명한 교환',
    'principles.reward.characteristics.1': '측정 가능한 주의',
    'principles.reward.characteristics.2': '사용자 일관성',
    'principles.reward.characteristics.3': '광고주 예측 가능성',
    'principles.delight.characteristics.0': '다크 패턴 없음',
    'principles.delight.characteristics.1': '재미있는 상호작용',
    'principles.delight.characteristics.2': '명확한 소통',
    'principles.delight.characteristics.3': '존중스러운 디자인',
    'principles.scalable.characteristics.0': '크로스 제품 확장',
    'principles.scalable.characteristics.1': '의미 있는 맞춤화',
    'principles.scalable.characteristics.2': '시스템 무결성',
    'principles.scalable.characteristics.3': '결정 거부 권한',
    
    // Values
    'values.title': '작업 원칙',
    'values.subtitle': '버즈빌에서 디자인하기 위해 함께 작업하는 방식.',
    'values.build.title': '열린 공간에서 구축',
    'values.build.shortTitle': '열린 공간에서 구축',
    'values.build.content': '우리는 거칠게 시작하고, 일찍 공유하며, 빠르게 반복합니다. 모든 디자이너는 탐색을 가속화하는 AI 도구에 접근할 수 있습니다. 피드백과 빠른 루프는 아이디어를 견고하고 프로덕션 준비된 솔루션으로 정제하는 데 도움이 됩니다.',
    'values.build.tagline': '빠르게 반복하라.',
    'values.clarity.title': '피드백을 통한 명확성',
    'values.clarity.shortTitle': '명확하게',
    'values.clarity.content': '우리는 솔직하고 정확하게 소통합니다. 피드백은 우리가 성장하는 방법입니다: 명확하게 주고, 열린 마음으로 받고, 건설적으로 적용합니다. 명확한 소통은 신뢰를 구축하고 낭비된 노력을 피합니다.',
    'values.clarity.tagline': '명확성을 먼저, 피드백은 항상.',
    'values.grit.title': '소유하고, 출시하라',
    'values.grit.shortTitle': '소유하고, 출시하라',
    'values.grit.content': '디자이너는 단순히 초안에서 멈추지 않습니다. 우리는 사용자 스토리와 프로젝트의 소유권을 가지고, 첫 스케치부터 프로덕션까지 밀어붙입니다. 우리는 결과가 실제가 될 때까지 끈기와 기술로 이끕니다.',
    'values.grit.tagline': '그릿.',
    'values.explore.title': '대담한 탐험가',
    'values.explore.shortTitle': '탐험가',
    'values.explore.content': '우리는 연구, 실험, AI 채택을 우리 기술의 핵심으로 받아들입니다. 강력한 도구와 탐구 문화를 가지고, 넓게 탐색하고, 엄격하게 검증하고, 자신감 있게 디자인하지 않을 변명이 없습니다.',
    'values.explore.tagline': '대담하게 탐험하고, 깊이 연구하라.',
    'values.team.title': 'One-UX',
    'values.team.shortTitle': 'One-UX',
    'values.team.content': '우리는 확장하기 전에 디자인 팀으로 정렬합니다. 이는 자주 동기화하고, 관례를 공유하고, 일관된 관행을 적용하는 것을 의미합니다. 우리의 정렬은 파트너, 사용자, 광고주가 버즈빌 디자인을 하나의 일관된 시스템으로 경험하도록 보장합니다.',
    'values.team.tagline': '먼저 정렬하고, 함께 확장하라.',
    
    // Values Characteristics
    'values.build.characteristics.0': '빠른 프로토타이핑',
    'values.build.characteristics.1': 'AI 기반 탐색',
    'values.build.characteristics.2': '조기 공유',
    'values.build.characteristics.3': '빠른 반복',
    'values.clarity.characteristics.0': '솔직함과 정확성',
    'values.clarity.characteristics.1': '열린 소통',
    'values.clarity.characteristics.2': '건설적 성장',
    'values.clarity.characteristics.3': '신뢰 구축',
    'values.grit.characteristics.0': '완전한 소유권',
    'values.grit.characteristics.1': '끝까지 배송',
    'values.grit.characteristics.2': '끈기',
    'values.grit.characteristics.3': '프로덕션 집중',
    'values.explore.characteristics.0': '연구 중심',
    'values.explore.characteristics.1': 'AI 채택',
    'values.explore.characteristics.2': '넓은 탐색',
    'values.explore.characteristics.3': '엄격한 검증',
    'values.team.characteristics.0': '팀 정렬',
    'values.team.characteristics.1': '공유된 관례',
    'values.team.characteristics.2': '일관된 관행',
    'values.team.characteristics.3': '일관된 시스템',
    
    // Resources
    'resources.title': '디자인 리소스',
    'resources.subtitle': '탁월한 사용자 경험을 만들기 위해 필요한 모든 것. 최신 디자인 파일, 가이드라인, 템플릿을 다운로드하세요.',
    'resources.category.design-system': '디자인 시스템',
    'resources.category.templates-patterns': '템플릿 & 패턴',
    'resources.category.brand-assets': '브랜드 & 자산',
    
    // Team
    'team.title': '우리 디자인 팀을 만나보세요',
    'team.subtitle': '탁월한 사용자 경험을 만들고 디자인 우수성을 추진하기 위해 함께 일하는 다양한 창의적 마음의 그룹.',
    
    // Tools
    'tools.title': '우리의 스택',
    'tools.subtitle': '우리의 디자인 작업을 지원하는 도구들.',
    'tools.visit': '도구 방문',
    'tools.category.design-development': '디자인 & 개발 도구',
    
            // Brand
            'brand.sections.principles': '원칙',
            'brand.sections.guidelines': '가이드라인',
            'brand.sections.resources': '리소스',
            'brand.intro.catchphrase': '모든 접점에서 버즈빌이 어떻게 보이고, 느껴지고, 행동하는지를 형성합니다.',
            'brand.principles.title': '브랜드 원칙',
            'brand.principles.description': '모든 결정, 상호작용, 우리가 만드는 경험을 이끄는 핵심 브랜드 원칙들. 이러한 근본적인 가치들은 모든 접점에서 일관성과 진정성을 보장합니다.',
            'brand.guidelines.title': '브랜드 가이드라인',
            'brand.guidelines.description': '모든 플랫폼과 접점에서 브랜드를 일관되게 적용하기 위한 포괄적인 가이드라인. 로고 사용법부터 색상 팔레트, 타이포그래피, 톤앤매너까지.',
            'brand.resources.title': '브랜드 리소스',
            'brand.resources.description': '브랜드 자산, 템플릿, 리소스를 다운로드하세요. 프로젝트와 캠페인에서 브랜드를 일관되게 구현하는 데 필요한 모든 것.',
            
            // Product
            'product.sections.principles': '원칙',
            'product.sections.patterns': '상호작용 패턴',
            'product.sections.resources': '리소스',
            'product.intro.catchphrase': '사용자가 참여하고 싶어하는 즐거운 경험을 디자인합니다.',
            'product.guidelines.title': '제품 가이드라인',
            'product.guidelines.intro': '우리의 제품 경험은 상호작용을 중심으로 회전하며, 이는 모든 경험의 핵심 속성입니다. UI 키트를 작성하기 전에 먼저 상호작용 패턴을 정의합니다. 그 다음 UI 키트 위에 마이크로 상호작용과 같은 세부 사항을 다듬습니다.',
            
            'product.guidelines.uxPatterns.title': 'UX 패턴',
            'product.guidelines.uxPatterns.description': '사용자가 우리 제품과 상호작용하는 방식을 정의하는 핵심 사용자 경험 패턴입니다. 이러한 패턴은 시각적 디자인 작업을 시작하기 전에 설정됩니다.',
            
            'product.guidelines.interactionPatterns.title': '상호작용 패턴',
            'product.guidelines.interactionPatterns.subtitle': '제품 경험의 기초',
            'product.guidelines.interactionPatterns.description': '시각적 디자인 작업을 시작하기 전에 상호작용 패턴을 정의합니다. 이러한 패턴은 사용자가 제품 내에서 탐색하고 참여하며 작업을 완료하는 방법을 설정합니다.',
            'product.guidelines.interactionPatterns.intro': '상호작용 패턴은 사용자 경험의 구성 요소입니다. 신중하게 설계되면 직관적이고 즐거운 경험을 만들지만, 잘못 사용되면 사용자를 조작하거나 좌절스러운 경험을 만드는 다크 패턴으로 이어질 수 있습니다.',
            'product.guidelines.interactionPatterns.bestPractices': '모범 사례',
            'product.guidelines.interactionPatterns.bestPractices.content': '• 항상 비즈니스 목표보다 사용자 요구를 우선시\n• 모든 상호작용에 대한 명확한 피드백 제공\n• 모든 터치포인트에서 일관성 유지\n• 구현 전에 실제 사용자와 패턴 테스트\n• 팀 정렬을 위한 패턴 문서화',
            'product.guidelines.interactionPatterns.darkPatterns': '피해야 할 다크 패턴',
            'product.guidelines.interactionPatterns.darkPatterns.content': '• 숨겨진 비용 또는 구독 함정\n• 오해의 소지가 있는 버튼 라벨이나 배치\n• 명확한 옵트아웃 없이 강제 연속성\n• 가짜 긴급성이나 희소성 전술\n• 혼란스럽거나 오해의 소지가 있는 네비게이션',
            'product.guidelines.interactionPatterns.onLoad': 'OnLoad (스켈레톤 UI, 로딩 상태)',
            'product.guidelines.interactionPatterns.onLoad.description': '로딩 상태는 콘텐츠가 가져오거나 처리될 때 즉각적인 피드백을 제공합니다. 스켈레톤 화면은 시각적 연속성을 유지하고 인지된 로딩 시간을 줄입니다.',
            'product.guidelines.interactionPatterns.onScroll': 'OnScroll (기본 페이지 세로 스크롤을 주요 상호작용으로)',
            'product.guidelines.interactionPatterns.onScroll.description': '세로 스크롤은 모바일과 웹에서 가장 자연스러운 상호작용입니다. 이를 주요 네비게이션 방법으로 사용하고, 스크롤 가능한 콘텐츠에 대한 명확한 시각적 단서를 제공하세요.',
            'product.guidelines.interactionPatterns.notify': 'Notify (토스트, 배너 등)',
            'product.guidelines.interactionPatterns.notify.description': '사용자의 워크플로우를 차단하지 않고 정보를 제공하는 비침습적 알림입니다. 성공 메시지, 업데이트 또는 부드러운 알림에 사용하세요.',
            'product.guidelines.interactionPatterns.alert': 'Alert (토스트)',
            'product.guidelines.interactionPatterns.alert.description': '즉각적인 주의가 필요한 긴급 알림입니다. 중요한 정보, 오류 또는 중요한 확인에만 사용하세요.',
            'product.guidelines.interactionPatterns.pauseAsk': 'Pause & Ask (팝업)',
            'product.guidelines.interactionPatterns.pauseAsk.description': '현재 플로우를 일시 중지하여 정보를 수집하거나 작업을 확인하는 모달 상호작용입니다. 사용자의 주의가 필요한 중요한 결정에 사용하세요.',
            'product.guidelines.interactionPatterns.magnify': 'Magnify (바텀시트)',
            'product.guidelines.interactionPatterns.magnify.description': '추가 정보나 옵션을 보여주는 확장 가능한 콘텐츠입니다. 화면 공간이 제한적인 모바일 인터페이스에 완벽합니다.',
            'product.guidelines.interactionPatterns.screenToScreen': 'Screen to Screen (네비게이션 패턴)',
            'product.guidelines.interactionPatterns.screenToScreen.description': '다른 뷰나 화면 간의 부드러운 전환입니다. 컨텍스트를 유지하고 명확한 네비게이션 계층을 제공하세요.',
            'product.guidelines.interactionPatterns.feedback': 'Feedback (터치, 스와이프 등)',
            'product.guidelines.interactionPatterns.feedback.description': '사용자 상호작용에 대한 즉각적인 시각적 또는 햅틱 피드백입니다. 반응적이고 매력적인 경험을 만드는 데 필수적입니다.',
            'product.guidelines.interactionPatterns.moreToCome': '(더 많은 패턴 예정)',
            'product.guidelines.interactionPatterns.moreToCome.description': '새로운 상호작용 요구를 발견하고 문서화함에 따라 추가 패턴이 추가될 예정입니다.',
            
            'product.guidelines.uiKit.title': 'UI 키트',
            'product.guidelines.uiKit.subtitle': '상호작용 기반 위에 구축된 시각적 컴포넌트',
            'product.guidelines.uiKit.description': '우리의 UI 컴포넌트는 우리가 설정한 상호작용 패턴을 지원하도록 설계되었습니다. 모든 컴포넌트는 특정한 상호작용 목적을 제공합니다.',
            'product.guidelines.uiKit.atoms': 'Atoms (버튼, 입력, 아이콘)',
            'product.guidelines.uiKit.modules': 'Modules (카드, 폼, 네비게이션)',
            'product.guidelines.uiKit.views': 'Views (페이지, 레이아웃, 화면)',
            
            'product.guidelines.microInteractionPatterns.title': '마이크로 상호작용 패턴',
            'product.guidelines.microInteractionPatterns.subtitle': '경험을 생생하게 만드는 세부 사항',
            'product.guidelines.microInteractionPatterns.description': '이러한 미묘한 세부 사항은 우리의 상호작용에 개성과 피드백을 추가하여 경험이 반응적이고 즐겁게 느껴지도록 합니다.',
            'product.guidelines.microInteractionPatterns.livingIcons': 'Living icons',
            'product.guidelines.microInteractionPatterns.emphasisOn': 'EmphasisOn',
            'product.guidelines.microInteractionPatterns.rewardDelights': 'Reward delights',
            'product.guidelines.microInteractionPatterns.moreToCome': 'More to come',
            
            'product.guidelines.visualPatterns.title': '시각적 패턴',
            'product.guidelines.visualPatterns.subtitle': '제품 디자인을 브랜드 아이덴티티와 연결',
            'product.guidelines.visualPatterns.description': '제품이 우리 브랜드와 일관성을 느끼면서도 설정된 상호작용 패턴을 지원하도록 하는 시각적 패턴입니다.',
            'product.guidelines.visualPatterns.principle1': '브랜드 색상, 타이포그래피, 시각적 요소를 일관되게 적용',
            'product.guidelines.visualPatterns.principle2': '사용자 작업 완료를 지원하는 시각적 계층 구조 생성',
            'product.guidelines.visualPatterns.principle3': '다양한 화면 크기와 컨텍스트에서 시각적 패턴이 작동하도록 보장',
            'product.guidelines.visualPatterns.principle4': '브랜드 표현과 기능적 명확성의 균형 유지',
            
            'product.guidelines.integrationWorkflow.title': '통합 워크플로우',
            'product.guidelines.integrationWorkflow.subtitle': '디자인과 개발이 함께 작업하는 방식',
            'product.guidelines.integrationWorkflow.description': '우리의 디자인 패턴이 모든 제품에서 적절히 구현되고 유지되도록 하는 프로세스와 도구입니다.',
            'product.guidelines.integrationWorkflow.principle1': '디자인과 개발 간의 명확한 인수인계 프로세스 수립',
            'product.guidelines.integrationWorkflow.principle2': '플랫폼 간 일관성을 유지하기 위해 디자인 토큰 사용',
            'product.guidelines.integrationWorkflow.principle3': '정기적인 디자인 리뷰와 품질 보증 구현',
            'product.guidelines.integrationWorkflow.principle4': '모든 디자인 시스템 변경사항 문서화 및 버전 관리',
            
            'product.guidelines.cta.title': '이 가이드라인을 구현할 준비가 되셨나요?',
            'product.guidelines.cta.description': '포괄적인 디자인 시스템 리소스에 액세스하고 일관된 제품 경험 구축을 시작하세요.',
            'product.guidelines.cta.button': '리소스 보기',
            'product.resources.title': '제품 리소스',
            'product.resources.description': '디자인 시스템 컴포넌트, 템플릿, 개발 리소스를 다운로드하세요. 일관된 제품 경험을 구축하는 데 필요한 모든 것.',
            
            // Footer
            'footer.description': '버즈빌의 디자인 진실의 원천이 되는 곳입니다. 우리는 공개적으로 구축합니다. 이 포털은 주로 내부적으로 그리고 파트너들이 사용하도록 의도되었지만, 우리가 어떻게 일하는지 누구나 살펴볼 수 있기를 좋아합니다!',
            'footer.foundations.mission': '미션',
            'footer.foundations.philosophy': '마인드셋',
            'footer.foundations.values': '작업 원칙',
            'footer.foundations.team': '우리의 팀',
            'footer.foundations.tools': '우리의 스택',
            'footer.brand.principles': '원칙',
            'footer.brand.guidelines': '가이드라인',
            'footer.brand.resources': '리소스',
            'footer.product.principles': '원칙',
            'footer.product.guidelines': '가이드라인',
            'footer.product.resources': '리소스',
            'footer.connect.buzzvil': '버즈빌',
            'footer.connect.contact': '연락처',
            'footer.connect.careers': '채용',
            'footer.connect.figma': 'Figma',
            'footer.connect.github': 'GitHub',
            'footer.connect.linkedin': 'LinkedIn',
            'footer.made': '만든',
            'footer.by': '버즈빌 디자인 팀',
            'footer.privacy': '개인정보 보호정책',
            'footer.terms': '서비스 약관',
  },
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    // Load language from localStorage on mount
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'ko')) {
      setLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    // Save language to localStorage when it changes
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  const getFontClass = (): string => {
    return language === 'ko' ? 'font-pretendard' : 'font-nunito';
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, getFontClass }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
