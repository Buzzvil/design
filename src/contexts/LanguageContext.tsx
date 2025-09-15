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
    
    // Philosophy & Foundations
    'foundations.title': 'Philosophy & Foundations',
    'foundations.subtitle': 'Our core beliefs and guiding principles that shape everything we design.',
    'foundations.mission.title': 'Mission',
    'foundations.mission.content': 'We design fair and delightful reward experiences that connect users, advertisers, and publishers across every touchpoint.',
    'foundations.vision.title': 'Vision',
    'foundations.vision.content': 'We set the next standard for AdTech design by creating trusted, scalable, and enjoyable experiences that power Buzzvil\'s growth.',
    'foundations.philosophy.title': 'Philosophy: Design 
    
    as One-Team',
    'foundations.philosophy.content1': 'Buzzvil Design exists for an ecosystem: users, advertisers, and publishers — all connected through rewards.',
    'foundations.philosophy.content2': 'Design is the unifying layer across Demand, Supply, and Frontier.',
    'foundations.philosophy.content3': 'Our role is not to optimize for one side, but to create fair, delightful, and scalable experiences that benefit the entire system.',
    'foundations.philosophy.content4': 'By working as One-Team, Design ensures Buzzvil grows as a whole, not in silos.',
    
    // Principles
    'principles.title': 'Principles',
    'principles.1.title': '1. Reward = Time Well Spent',
    'principles.1.content1': 'Rewards are a transparent and fair exchange of user attention.',
    'principles.1.content2': 'Mechanism: 1P ≈ 1 second of attention.',
    'principles.1.content3': 'We never use dark patterns: never overlay one ad on another, never mislead, never trap.',
    'principles.1.content4': 'Interactions must feel playful, clear, and respectful.',
    'principles.2.title': '2. Playful by Design',
    'principles.2.content1': 'Every interaction should feel engaging and delightful, not transactional.',
    'principles.2.content2': 'We use gamification, micro-animations, and thoughtful feedback to create moments of joy.',
    'principles.2.content3': 'Playfulness builds emotional connection and increases user engagement.',
    'principles.3.title': '3. Scalable by Design',
    'principles.3.content1': 'Every design decision must scale across products, partners, and business models.',
    'principles.3.content2': 'We provide meaningful customization, but avoid unsustainable exceptions.',
    'principles.3.content3': 'These principles can veto business or product decisions that fragment the system.',
    
    // Values
    'values.title': 'Values (How We Work)',
    'values.build.title': 'Build in the Open',
    'values.build.content': 'We start rough, share early, and iterate fast. Every designer has access to AI tools that accelerate exploration. Feedback and quick loops help us refine ideas into solid, production-ready solutions.',
    'values.build.slogan': 'Build in the open, iterate fast.',
    'values.clarity.title': 'Clarity Through Feedback',
    'values.clarity.content': 'We communicate with candor and precision. Feedback is how we grow: giving it clearly, receiving it openly, and applying it constructively. Clear communication builds trust and avoids wasted effort.',
    'values.clarity.slogan': 'Clarity first, feedback always.',
    'values.grit.title': 'Lead with Grit',
    'values.grit.content': 'Designers don\'t just stop at drafts. We take ownership of user stories and projects, pushing them from first sketches through to production. We lead with persistence and craft until the outcome is real.',
    'values.grit.slogan': 'Own it, ship it.',
    'values.explore.title': 'Bold Explorers',
    'values.explore.content': 'We embrace research, experimentation, and AI adoption as core to our craft. With powerful tools and a culture of inquiry, we have no excuse not to explore widely, validate rigorously, and design with confidence.',
    'values.explore.slogan': 'Explore boldly, research deeply.',
    'values.team.title': 'One-Team in Practice',
    'values.team.content': 'We align as a design team before we scale out. That means syncing often, sharing conventions, and applying consistent practices. Our alignment ensures partners, users, and advertisers experience Buzzvil design as one coherent system.',
    'values.team.slogan': 'Align first, scale together.',
    'values.delight.title': 'Delight with Integrity',
    'values.delight.content': 'We design for joy, playfulness, and engagement — never at the cost of fairness. No dark patterns, no tricks. Every interaction balances user delight, advertiser value, and long-term trust.',
    'values.delight.slogan': 'Joyful design, honest intent.',
    
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
    'hero.title': '버즈빌 디자인',
    'hero.subtitle': '보상받는. 재미있는. 확장 가능한.',
    'hero.explore': '기반 탐색',
    'hero.browse': '리소스 둘러보기',
    'hero.scroll': '스크롤하여 탐색',
    
    // Philosophy & Foundations
    'foundations.title': '철학과 기반',
    'foundations.subtitle': '우리가 디자인하는 모든 것을 형성하는 핵심 신념과 가이드 원칙.',
    'foundations.mission.title': '미션',
    'foundations.mission.content': '사용자, 광고주, 퍼블리셔를 모든 접점에서 연결하는 공정하고 즐거운 보상 경험을 디자인합니다.',
    'foundations.vision.title': '비전',
    'foundations.vision.content': '신뢰할 수 있고 확장 가능하며 즐거운 경험을 만들어 버즈빌의 성장을 이끄는 AdTech 디자인의 새로운 표준을 제시합니다.',
    'foundations.philosophy.title': '철학: 원팀으로서의 디자인',
    'foundations.philosophy.content1': '버즈빌 디자인은 생태계를 위해 존재합니다: 보상을 통해 연결된 사용자, 광고주, 퍼블리셔.',
    'foundations.philosophy.content2': '디자인은 수요, 공급, 프론티어를 아우르는 통합 레이어입니다.',
    'foundations.philosophy.content3': '우리의 역할은 한쪽을 최적화하는 것이 아니라, 전체 시스템에 이익이 되는 공정하고 즐겁고 확장 가능한 경험을 만드는 것입니다.',
    'foundations.philosophy.content4': '원팀으로 일함으로써, 디자인은 버즈빌이 실리오가 아닌 전체로서 성장하도록 보장합니다.',
    
    // Principles
    'principles.title': '원칙',
    'principles.1.title': '1. 보상 = 잘 보낸 시간',
    'principles.1.content1': '보상은 사용자 주의의 투명하고 공정한 교환입니다.',
    'principles.1.content2': '메커니즘: 1P ≈ 1초의 주의.',
    'principles.1.content3': '우리는 절대 다크 패턴을 사용하지 않습니다: 광고를 다른 광고 위에 겹치지 않고, 오해를 불러일으키지 않으며, 함정에 빠뜨리지 않습니다.',
    'principles.1.content4': '상호작용은 재미있고 명확하며 존중스러워야 합니다.',
    'principles.2.title': '2. 디자인으로 재미있게',
    'principles.2.content1': '모든 상호작용은 거래적이 아닌 매력적이고 즐거워야 합니다.',
    'principles.2.content2': '우리는 게임화, 마이크로 애니메이션, 신중한 피드백을 사용하여 기쁨의 순간을 만듭니다.',
    'principles.2.content3': '재미는 감정적 연결을 구축하고 사용자 참여를 증가시킵니다.',
    'principles.3.title': '3. 디자인으로 확장 가능하게',
    'principles.3.content1': '모든 디자인 결정은 제품, 파트너, 비즈니스 모델에 걸쳐 확장되어야 합니다.',
    'principles.3.content2': '우리는 의미 있는 맞춤화를 제공하지만 지속 불가능한 예외는 피합니다.',
    'principles.3.content3': '이러한 원칙은 시스템을 분할하는 비즈니스나 제품 결정을 거부할 수 있습니다.',
    
    // Values
    'values.title': '가치 (우리가 일하는 방식)',
    'values.build.title': '열린 공간에서 구축',
    'values.build.content': '우리는 거칠게 시작하고, 일찍 공유하며, 빠르게 반복합니다. 모든 디자이너는 탐색을 가속화하는 AI 도구에 접근할 수 있습니다. 피드백과 빠른 루프는 아이디어를 견고하고 프로덕션 준비된 솔루션으로 정제하는 데 도움이 됩니다.',
    'values.build.slogan': '열린 공간에서 구축하고, 빠르게 반복하라.',
    'values.clarity.title': '피드백을 통한 명확성',
    'values.clarity.content': '우리는 솔직하고 정확하게 소통합니다. 피드백은 우리가 성장하는 방법입니다: 명확하게 주고, 열린 마음으로 받고, 건설적으로 적용합니다. 명확한 소통은 신뢰를 구축하고 낭비된 노력을 피합니다.',
    'values.clarity.slogan': '명확성을 먼저, 피드백은 항상.',
    'values.grit.title': '그릿으로 이끌기',
    'values.grit.content': '디자이너는 단순히 초안에서 멈추지 않습니다. 우리는 사용자 스토리와 프로젝트의 소유권을 가지고, 첫 스케치부터 프로덕션까지 밀어붙입니다. 우리는 결과가 실제가 될 때까지 끈기와 기술로 이끕니다.',
    'values.grit.slogan': '소유하고, 출시하라.',
    'values.explore.title': '대담한 탐험가',
    'values.explore.content': '우리는 연구, 실험, AI 채택을 우리 기술의 핵심으로 받아들입니다. 강력한 도구와 탐구 문화를 가지고, 넓게 탐색하고, 엄격하게 검증하고, 자신감 있게 디자인하지 않을 변명이 없습니다.',
    'values.explore.slogan': '대담하게 탐험하고, 깊이 연구하라.',
    'values.team.title': '실제 원팀',
    'values.team.content': '우리는 확장하기 전에 디자인 팀으로 정렬합니다. 이는 자주 동기화하고, 관례를 공유하고, 일관된 관행을 적용하는 것을 의미합니다. 우리의 정렬은 파트너, 사용자, 광고주가 버즈빌 디자인을 하나의 일관된 시스템으로 경험하도록 보장합니다.',
    'values.team.slogan': '먼저 정렬하고, 함께 확장하라.',
    'values.delight.title': '진정성으로 기쁨을',
    'values.delight.content': '우리는 기쁨, 재미, 참여를 위해 디자인합니다 — 공정성을 희생해서라도 말이죠. 다크 패턴도, 속임수도 없습니다. 모든 상호작용은 사용자 기쁨, 광고주 가치, 장기적 신뢰의 균형을 맞춥니다.',
    'values.delight.slogan': '즐거운 디자인, 정직한 의도.',
    
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
