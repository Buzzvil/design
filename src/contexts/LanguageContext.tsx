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
    'nav.resources': 'Resources',
    'nav.team': 'Team',
    'nav.tools': 'Tools',
    
    // Hero
    'hero.title': 'Buzzvil Design',
    'hero.subtitle': 'Rewarded. Playful. Scalable.',
    'hero.explore': 'Explore Foundations',
    'hero.browse': 'Browse Resources',
    'hero.scroll': 'Scroll to explore',
    
    // Mission & Vision
    'mission.title': 'Mission & Vision',
    'mission.subtitle': 'Our mission and vision guide everything we do at Buzzvil.',
    'mission.mission.title': 'Mission',
    'mission.mission.content': 'We design meaningful interactions that engage and delight. Rewards are the tool we use to spark motivation and sustain attention, turning every interaction into a richer, more impactful experience.',
    'mission.vision.title': 'Vision',
    'mission.vision.content': 'We define the next standard for AdTech design by shaping interactions that are scalable, rewarding, and engaging for our entire ecosystem.',
    
    // Philosophy
    'philosophy.title': 'Philosophy',
    'philosophy.content': 'Buzzvil Design begins with the belief that rewards can transform attention into meaningful experiences. We design for the harmony of our entire ecosystem: users, advertisers, and publishers alike. As the connective layer across our organization, our role is to shape experiences that are rewarded, playful, and scalable. This philosophy lives in our principles: reward as time well spent, delight without deception, and design that scales by default. Together, these guide us to grow as One-Team and build the next standard of AdTech design.',
    
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
    
    // Values
    'values.title': 'Values',
    'values.subtitle': 'The core values that drive everything we do at Buzzvil.',
            'values.build.title': 'Build in the Open',
            'values.build.shortTitle': 'Iterate',
    'values.build.content': 'We start rough, share early, and iterate fast. Every designer has access to AI tools that accelerate exploration. Feedback and quick loops help us refine ideas into solid, production-ready solutions.',
    'values.build.tagline': 'iterate fast.',
    'values.clarity.title': 'Clarity Through Feedback',
    'values.clarity.shortTitle': 'Clarity',
    'values.clarity.content': 'We communicate with candor and precision. Feedback is how we grow: giving it clearly, receiving it openly, and applying it constructively. Clear communication builds trust and avoids wasted effort.',
    'values.clarity.tagline': 'Clarity first, feedback always.',
    'values.grit.title': 'Design with Grit',
    'values.grit.shortTitle': 'Grit',
    'values.grit.content': 'Designers don\'t just stop at drafts. We take ownership of user stories and projects, pushing them from first sketches through to production. We lead with persistence and craft until the outcome is real.',
    'values.grit.tagline': 'Own it, ship it.',
    'values.explore.title': 'Bold Explorers',
    'values.explore.shortTitle': 'Explorers',
    'values.explore.content': 'We embrace research, experimentation, and AI adoption as core to our craft. With powerful tools and a culture of inquiry, we have no excuse not to explore widely, validate rigorously, and design with confidence.',
    'values.explore.tagline': 'Explore boldly, research deeply.',
    'values.team.title': 'One-UX',
    'values.team.shortTitle': 'One-UX',
    'values.team.content': 'We align as a design team before we scale out. That means syncing often, sharing conventions, and applying consistent practices. Our alignment ensures partners, users, and advertisers experience Buzzvil design as one coherent system.',
    'values.team.tagline': 'Align first, scale together.',
    'values.delight.title': 'Delight',
    'values.delight.shortTitle': 'Delight',
    'values.delight.content': 'We design for joy, playfulness, and engagement. No dark patterns, no tricks. Every interaction balances user delight, advertiser value, and long-term trust.',
    'values.delight.tagline': 'Joyful design, honest intent.',
    
    // Resources
    'resources.title': 'Design Resources',
    'resources.subtitle': 'Everything you need to create exceptional user experiences. Download our latest design files, guidelines, and templates.',
    
    // Team
    'team.title': 'Meet Our Design Team',
    'team.subtitle': 'A diverse group of creative minds working together to create exceptional user experiences and drive design excellence.',
    
    // Tools
    'tools.title': 'Design Tools',
    'tools.subtitle': 'The tools and platforms we use to create, collaborate, and deliver exceptional design experiences. Stay updated with our tech stack.',
    'tools.visit': 'Visit Tool',
    
    // Footer
    'footer.description': 'Empowering designers with the tools, resources, and knowledge needed to create exceptional user experiences.',
    'footer.made': 'Made with',
    'footer.by': 'by the Buzzvil Design Team',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
  },
  ko: {
    // Navigation
    'nav.foundations': '기반',
    'nav.resources': '리소스',
    'nav.team': '팀',
    'nav.tools': '도구',
    
    // Hero
    'hero.title': 'Buzzvil Design',
    'hero.subtitle': '보상받는. 재미있는. 확장 가능한.',
    'hero.explore': '기반 탐색',
    'hero.browse': '리소스 둘러보기',
    'hero.scroll': '스크롤하여 탐색',
    
    // Mission & Vision
    'mission.title': '미션 & 비전',
    'mission.subtitle': '버즈빌에서 우리가 하는 모든 일을 이끄는 미션과 비전.',
    'mission.mission.title': '미션',
    'mission.mission.content': '우리는 참여하고 기쁨을 주는 의미 있는 상호작용을 디자인합니다. 보상은 동기를 불러일으키고 주의를 지속시키는 도구로, 모든 상호작용을 더 풍부하고 영향력 있는 경험으로 만듭니다.',
    'mission.vision.title': '비전',
    'mission.vision.content': '우리는 전체 생태계를 위해 확장 가능하고, 보상받으며, 매력적인 상호작용을 만들어 AdTech 디자인의 새로운 표준을 정의합니다.',
    
    // Philosophy
    'philosophy.title': '철학',
    'philosophy.content': '버즈빌 디자인은 보상이 주의를 의미 있는 경험으로 변화시킬 수 있다는 믿음에서 시작됩니다. 우리는 전체 생태계의 조화를 위해 디자인합니다 — 사용자, 광고주, 퍼블리셔 모두를 위해. 조직 전반의 연결 레이어로서, 우리의 역할은 보상받고, 재미있고, 확장 가능한 경험을 만드는 것입니다. 이 철학은 우리의 원칙에 살아있습니다: 시간을 잘 보낸 보상, 기만 없는 기쁨, 기본적으로 확장되는 디자인. 함께, 이것들은 우리가 원팀으로 성장하고 AdTech 디자인의 새로운 표준을 구축하도록 이끕니다.',
    
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
    
    // Values
    'values.title': '가치',
    'values.subtitle': '버즈빌에서 우리가 하는 모든 일을 이끄는 핵심 가치들.',
    'values.build.title': '열린 공간에서 구축',
    'values.build.shortTitle': '반복',
    'values.build.content': '우리는 거칠게 시작하고, 일찍 공유하며, 빠르게 반복합니다. 모든 디자이너는 탐색을 가속화하는 AI 도구에 접근할 수 있습니다. 피드백과 빠른 루프는 아이디어를 견고하고 프로덕션 준비된 솔루션으로 정제하는 데 도움이 됩니다.',
    'values.build.tagline': '빠르게 반복하라.',
    'values.clarity.title': '피드백을 통한 명확성',
    'values.clarity.shortTitle': '명확성',
    'values.clarity.content': '우리는 솔직하고 정확하게 소통합니다. 피드백은 우리가 성장하는 방법입니다: 명확하게 주고, 열린 마음으로 받고, 건설적으로 적용합니다. 명확한 소통은 신뢰를 구축하고 낭비된 노력을 피합니다.',
    'values.clarity.tagline': '명확성을 먼저, 피드백은 항상.',
    'values.grit.title': '그릿으로 디자인',
    'values.grit.shortTitle': '그릿',
    'values.grit.content': '디자이너는 단순히 초안에서 멈추지 않습니다. 우리는 사용자 스토리와 프로젝트의 소유권을 가지고, 첫 스케치부터 프로덕션까지 밀어붙입니다. 우리는 결과가 실제가 될 때까지 끈기와 기술로 이끕니다.',
    'values.grit.tagline': '소유하고, 출시하라.',
    'values.explore.title': '대담한 탐험가',
    'values.explore.shortTitle': '탐험가',
    'values.explore.content': '우리는 연구, 실험, AI 채택을 우리 기술의 핵심으로 받아들입니다. 강력한 도구와 탐구 문화를 가지고, 넓게 탐색하고, 엄격하게 검증하고, 자신감 있게 디자인하지 않을 변명이 없습니다.',
    'values.explore.tagline': '대담하게 탐험하고, 깊이 연구하라.',
    'values.team.title': 'One-UX',
    'values.team.shortTitle': 'One-UX',
    'values.team.content': '우리는 확장하기 전에 디자인 팀으로 정렬합니다. 이는 자주 동기화하고, 관례를 공유하고, 일관된 관행을 적용하는 것을 의미합니다. 우리의 정렬은 파트너, 사용자, 광고주가 버즈빌 디자인을 하나의 일관된 시스템으로 경험하도록 보장합니다.',
    'values.team.tagline': '먼저 정렬하고, 함께 확장하라.',
    'values.delight.title': '기쁨',
    'values.delight.shortTitle': '기쁨',
    'values.delight.content': '우리는 기쁨, 재미, 참여를 위해 디자인합니다. 다크 패턴도, 속임수도 없습니다. 모든 상호작용은 사용자 기쁨, 광고주 가치, 장기적 신뢰의 균형을 맞춥니다.',
    'values.delight.tagline': '즐거운 디자인, 정직한 의도.',
    
    // Resources
    'resources.title': '디자인 리소스',
    'resources.subtitle': '탁월한 사용자 경험을 만들기 위해 필요한 모든 것. 최신 디자인 파일, 가이드라인, 템플릿을 다운로드하세요.',
    
    // Team
    'team.title': '우리 디자인 팀을 만나보세요',
    'team.subtitle': '탁월한 사용자 경험을 만들고 디자인 우수성을 추진하기 위해 함께 일하는 다양한 창의적 마음의 그룹.',
    
    // Tools
    'tools.title': '디자인 도구',
    'tools.subtitle': '탁월한 디자인 경험을 만들고, 협업하고, 전달하기 위해 사용하는 도구와 플랫폼. 우리의 기술 스택을 최신 상태로 유지하세요.',
    'tools.visit': '도구 방문',
    
    // Footer
    'footer.description': '탁월한 사용자 경험을 만들기 위해 필요한 도구, 리소스, 지식으로 디자이너를 강화합니다.',
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
