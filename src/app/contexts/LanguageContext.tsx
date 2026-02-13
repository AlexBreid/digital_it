import React, { createContext, useContext, useState } from 'react';

type Language = 'en' | 'ru';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Header
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.services': 'Services',
    'nav.portfolio': 'Portfolio',
    'nav.testimonials': 'Testimonials',
    'nav.contact': 'Contact',
    
    // Hero
    'hero.title': 'We build digital products that inspire',
    'hero.subtitle': 'Leading IT company specializing in web development, mobile applications, UI/UX design, and innovative digital solutions',
    'hero.cta.projects': 'Our Services',
    'hero.cta.contact': 'Contact Us',
    
    // About
    'about.title': 'About Us',
    'about.description': 'We are a team of passionate professionals dedicated to creating outstanding digital experiences. Our mission is to transform your ideas into innovative, scalable, and user-centric solutions.',
    'about.value1': 'Speed',
    'about.value1.desc': 'Fast delivery without compromising quality',
    'about.value2': 'Quality',
    'about.value2.desc': 'Exceptional standards in every project',
    'about.value3': 'Innovation',
    'about.value3.desc': 'Cutting-edge technologies and solutions',
    'about.stat1': 'Projects',
    'about.stat2': 'Clients',
    'about.stat3': 'Years Experience',
    
    // Services
    'services.title': 'Our Services',
    'services.subtitle': 'Comprehensive solutions for your digital needs',
    'services.web': 'Web Development',
    'services.web.desc': 'Custom websites and web applications built with modern technologies',
    'services.mobile': 'Mobile Apps',
    'services.mobile.desc': 'Native and cross-platform mobile applications for iOS and Android',
    'services.design': 'UI/UX Design',
    'services.design.desc': 'Beautiful, intuitive interfaces that users love',
    'services.branding': 'Branding',
    'services.branding.desc': 'Complete brand identity and visual design systems',
    'services.ai': 'AI Solutions',
    'services.ai.desc': 'Intelligent automation and machine learning integration',
    
    // Portfolio
    'portfolio.title': 'Our Works',
    'portfolio.subtitle': 'Real projects built by our team — from concept to launch',
    'portfolio.visit': 'Visit Site',
    'portfolio.project1': 'NovaBite',
    'portfolio.project1.desc': 'A modern food delivery and restaurant platform with a sleek UI, smooth animations, and intuitive user experience.',
    'portfolio.project2': 'STO Service',
    'portfolio.project2.desc': 'A professional auto service website with online booking, service catalog, and customer management system.',
    
    // Testimonials
    'testimonials.title': 'What Our Clients Say',
    'testimonials.subtitle': 'Trusted by industry leaders worldwide',
    'testimonials.quote1': 'Working with this team was an absolute pleasure. They delivered beyond our expectations and brought our vision to life.',
    'testimonials.author1': 'Sarah Johnson',
    'testimonials.position1': 'CEO, TechCorp',
    'testimonials.quote2': 'Exceptional quality and professionalism. The project was delivered on time and exceeded all our requirements.',
    'testimonials.author2': 'Michael Chen',
    'testimonials.position2': 'CTO, InnovateLab',
    'testimonials.quote3': 'Their innovative approach and attention to detail transformed our digital presence. Highly recommended!',
    'testimonials.author3': 'Emma Williams',
    'testimonials.position3': 'Founder, StartupHub',
    
    // Contact
    'contact.title': 'Get In Touch',
    'contact.subtitle': 'Let\'s discuss your next project',
    'contact.name': 'Name',
    'contact.email': 'Email',
    'contact.message': 'Message',
    'contact.send': 'Send Message',
    'contact.sending': 'Sending...',
    'contact.success': 'Message sent successfully! We will get back to you soon.',
    'contact.error': 'Failed to send message. Please try again or email us directly.',
    'contact.info': 'Contact Information',
    'contact.social': 'Follow Us',
    
    // Footer
    'footer.rights': 'All rights reserved.',
  },
  ru: {
    // Header
    'nav.home': 'Главная',
    'nav.about': 'О нас',
    'nav.services': 'Услуги',
    'nav.portfolio': 'Портфолио',
    'nav.testimonials': 'Отзывы',
    'nav.contact': 'Контакты',
    
    // Hero
    'hero.title': 'Мы создаём цифровые продукты, которые вдохновляют',
    'hero.subtitle': 'Ведущая IT-компания, специализирующаяся на веб-разработке, мобильных приложениях, UI/UX дизайне и инновационных цифровых решениях',
    'hero.cta.projects': 'Наши услуги',
    'hero.cta.contact': 'Связаться',
    
    // About
    'about.title': 'О нас',
    'about.description': 'Мы команда увлечённых профессионалов, создающих выдающиеся цифровые продукты. Наша миссия — превращать ваши идеи в инновационные, масштабируемые и ориентированные на пользователя решения.',
    'about.value1': 'Скорость',
    'about.value1.desc': 'Быстрая реализация без потери качества',
    'about.value2': 'Качество',
    'about.value2.desc': 'Исключительные стандарты в каждом проекте',
    'about.value3': 'Инновации',
    'about.value3.desc': 'Передовые технологии и решения',
    'about.stat1': 'Проектов',
    'about.stat2': 'Клиентов',
    'about.stat3': 'Лет Опыта',
    
    // Services
    'services.title': 'Наши Услуги',
    'services.subtitle': 'Комплексные решения для ваших цифровых потребностей',
    'services.web': 'Веб-разработка',
    'services.web.desc': 'Кастомные сайты и веб-приложения на современных технологиях',
    'services.mobile': 'Мобильные приложения',
    'services.mobile.desc': 'Нативные и кросс-платформенные приложения для iOS и Android',
    'services.design': 'UI/UX Дизайн',
    'services.design.desc': 'Красивые, интуитивные интерфейсы, которые любят пользователи',
    'services.branding': 'Брендинг',
    'services.branding.desc': 'Полная идентичность бренда и визуальные дизайн-системы',
    'services.ai': 'AI Решения',
    'services.ai.desc': 'Интеллектуальная автоматизация и интеграция машинного обучения',
    
    // Portfolio
    'portfolio.title': 'Наши работы',
    'portfolio.subtitle': 'Реальные проекты нашей команды — от идеи до запуска',
    'portfolio.visit': 'Открыть сайт',
    'portfolio.project1': 'NovaBite',
    'portfolio.project1.desc': 'Современная платформа доставки еды и ресторанов с красивым интерфейсом, плавными анимациями и удобным UX.',
    'portfolio.project2': 'СТО Сервис',
    'portfolio.project2.desc': 'Профессиональный сайт автосервиса с онлайн-записью, каталогом услуг и системой управления клиентами.',
    
    // Testimonials
    'testimonials.title': 'Что говорят наши клиенты',
    'testimonials.subtitle': 'Нам доверяют лидеры индустрии по всему миру',
    'testimonials.quote1': 'Работа с этой командой была настоящим удовольствием. Они превзошли наши ожидания и воплотили нашу мечту в реальность.',
    'testimonials.author1': 'Сара Джонсон',
    'testimonials.position1': 'CEO, TechCorp',
    'testimonials.quote2': 'Исключительное качество и профессионализм. Проект был сдан вовремя и превзошёл все наши требования.',
    'testimonials.author2': 'Майкл Чен',
    'testimonials.position2': 'CTO, InnovateLab',
    'testimonials.quote3': 'Их инновационный подход и внимание к деталям трансформировали наше цифровое присутствие. Очень рекомендую!',
    'testimonials.author3': 'Эмма Уильямс',
    'testimonials.position3': 'Основатель, StartupHub',
    
    // Contact
    'contact.title': 'Свяжитесь с нами',
    'contact.subtitle': 'Давайте обсудим ваш следующий проект',
    'contact.name': 'Имя',
    'contact.email': 'Email',
    'contact.message': 'Сообщение',
    'contact.send': 'Отправить',
    'contact.sending': 'Отправка...',
    'contact.success': 'Сообщение успешно отправлено! Мы свяжемся с вами в ближайшее время.',
    'contact.error': 'Не удалось отправить сообщение. Попробуйте ещё раз или напишите нам на почту.',
    'contact.info': 'Контактная информация',
    'contact.social': 'Мы в соцсетях',
    
    // Footer
    'footer.rights': 'Все права защищены.',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
