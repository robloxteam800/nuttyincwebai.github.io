
export enum SectionType {
  HERO = 'hero',
  FEATURES = 'features',
  ABOUT = 'about',
  PRICING = 'pricing',
  TESTIMONIALS = 'testimonials',
  GALLERY = 'gallery',
  CONTACT = 'contact',
  FOOTER = 'footer'
}

export interface WebsiteSection {
  id: string;
  type: SectionType;
  title: string;
  subtitle?: string;
  content?: string;
  items?: any[];
  imageUrl?: string;
  ctaText?: string;
  ctaLink?: string;
}

export interface WebsiteTheme {
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  mode: 'light' | 'dark';
}

export interface WebsiteData {
  name: string;
  description: string;
  theme: WebsiteTheme;
  sections: WebsiteSection[];
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  isAction?: boolean;
}
