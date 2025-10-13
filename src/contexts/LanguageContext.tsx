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
    'hero.sentence.start': 'We build',
    'hero.sentence.end': 'experiences.',
    'hero.keyword.rewarded': 'Rewarded',
    'hero.keyword.playful': 'Playful',
    'hero.keyword.scalable': 'Scalable',
    'hero.explore': 'Explore Foundations',
    'hero.browse': 'Browse Resources',
    'hero.scroll': 'Scroll to explore',
    
    // Mission & Vision
    'mission.title': 'Mission & Vision',
    'mission.subtitle': 'Our mission and vision guide everything we do at Buzzvil.',
    'mission.mission.title': 'Mission',
    'mission.mission.content': 'We design meaningful interactions that shape how people discover, experience, and keep engaging with ad campaigns. Rewards are our tool to spark motivation and sustain attention, turning campaigns into moments that delight users and drive results for advertisers.',
    'mission.vision.title': 'Vision',
    'mission.vision.content': 'We set the next standard for AdTech design by transforming ad campaigns into engaging, repeatable experiences that connect users and advertisers. Through this new way of interaction, Buzzvil leads a future where advertising feels rewarding, sustainable, and scalable across the ecosystem.',
    
    // Philosophy
    'philosophy.title': 'Philosophy',
    'philosophy.content': 'Design at buzzvil turns ad campaigns into experiences people enjoy and return to. We design the interactions that connect users, advertisers, and publishers, shaping how ads are found, felt, and remembered. As the connective layer across our organization, we build rewarded, playful, and scalable experiences guided by clear principles and a One-Team spirit.',
    
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
    'values.title': 'Values',
    'values.subtitle': 'The core values that drive everything we do at Buzzvil.',
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
    'tools.title': 'Design Tools',
    'tools.subtitle': 'The tools and platforms we use to create, collaborate, and deliver exceptional design experiences. Stay updated with our tech stack.',
    'tools.visit': 'Visit Tool',
    'tools.category.design-development': 'Design & Development Tools',
    
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
    'hero.sentence.start': '우리는 구축합니다',
    'hero.sentence.end': '경험을.',
    'hero.keyword.rewarded': '보상받는',
    'hero.keyword.playful': '재미있는',
    'hero.keyword.scalable': '확장 가능한',
    'hero.explore': '기반 탐색',
    'hero.browse': '리소스 둘러보기',
    'hero.scroll': '스크롤하여 탐색',
    
    // Mission & Vision
    'mission.title': '미션 & 비전',
    'mission.subtitle': '버즈빌에서 우리가 하는 모든 일을 이끄는 미션과 비전.',
    'mission.mission.title': '미션',
    'mission.mission.content': '우리는 사람들이 광고 캠페인을 발견하고, 경험하고, 지속적으로 참여하는 방식을 형성하는 의미 있는 상호작용을 디자인합니다. 보상은 동기를 불러일으키고 주의를 지속시키는 도구로, 캠페인을 사용자를 즐겁게 하고 광고주에게 성과를 가져다주는 순간으로 만듭니다.',
    'mission.vision.title': '비전',
    'mission.vision.content': '우리는 광고 캠페인을 사용자와 광고주를 연결하는 매력적이고 반복 가능한 경험으로 변화시켜 AdTech 디자인의 새로운 표준을 제시합니다. 이러한 새로운 상호작용 방식을 통해, 버즈빌은 광고가 보상받고, 지속 가능하며, 생태계 전반에 걸쳐 확장 가능하다고 느껴지는 미래를 이끕니다.',
    
    // Philosophy
    'philosophy.title': '철학',
    'philosophy.content': '버즈빌의 디자인은 광고 캠페인을 사람들이 즐기고 다시 찾는 경험으로 바꿉니다. 우리는 사용자, 광고주, 퍼블리셔를 연결하는 상호작용을 디자인하여 광고가 발견되고, 느껴지고, 기억되는 방식을 형성합니다. 조직 전반의 연결 레이어로서, 우리는 명확한 원칙과 원팀 정신에 이끌려 보상받고, 재미있고, 확장 가능한 경험을 구축합니다.',
    
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
    'values.title': '가치',
    'values.subtitle': '버즈빌에서 우리가 하는 모든 일을 이끄는 핵심 가치들.',
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
    'tools.title': '디자인 도구',
    'tools.subtitle': '탁월한 디자인 경험을 만들고, 협업하고, 전달하기 위해 사용하는 도구와 플랫폼. 우리의 기술 스택을 최신 상태로 유지하세요.',
    'tools.visit': '도구 방문',
    'tools.category.design-development': '디자인 & 개발 도구',
    
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
