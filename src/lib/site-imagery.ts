export interface BannerConfig {
  image: string;        // path relative to @/assets/
  title: string;
  subtitle: string;
  tone: 'warm' | 'leaf' | 'ink';
  height: 'sm' | 'md' | 'lg';
  alt: string;
}

// Lazy-import images so they're only bundled when needed
// For now, use static imports of the available images
import heroFeast from '@/assets/hero-feast.jpg';
import bananaLeaf from '@/assets/banana-leaf-real.jpg';
import weddingHall from '@/assets/wedding-hall.jpg';
import corporate from '@/assets/corporate-catering.jpg';
import engagement from '@/assets/engagement-catering.jpg';
import spices from '@/assets/spices.jpg';
import feastHero from '@/assets/feast-hero.png';
import feastFood1 from '@/assets/feast-food-1.png';

export const ROUTE_BANNERS: Record<string, BannerConfig> = {
  '/': {
    image: heroFeast,
    title: 'My Chennai Catering Services',
    subtitle: 'Authentic South Indian vegetarian catering for your most cherished celebrations',
    tone: 'warm',
    height: 'lg',
    alt: 'Grand South Indian banana leaf feast spread',
  },
  '/about': {
    image: feastFood1,
    title: 'Our Story',
    subtitle: 'Two decades of authentic taste, traditional excellence',
    tone: 'warm',
    height: 'md',
    alt: 'Traditional South Indian cuisine preparation',
  },
  '/services': {
    image: weddingHall,
    title: 'Our Services',
    subtitle: 'Weddings · Engagements · Corporate Events',
    tone: 'warm',
    height: 'md',
    alt: 'Elegant wedding hall catering setup',
  },
  '/wedding-catering-services-in-chennai': {
    image: weddingHall,
    title: 'Wedding Catering',
    subtitle: 'Grand kalyana virundhu with authentic banana-leaf service',
    tone: 'warm',
    height: 'md',
    alt: 'Traditional South Indian wedding feast',
  },
  '/engagement-catering-services-in-chennai': {
    image: engagement,
    title: 'Engagement Catering',
    subtitle: 'Making your betrothal celebrations unforgettable',
    tone: 'warm',
    height: 'md',
    alt: 'Engagement ceremony catering',
  },
  '/corporate-catering-services-in-chennai': {
    image: corporate,
    title: 'Corporate Catering',
    subtitle: 'Professional vegetarian catering for corporate events',
    tone: 'warm',
    height: 'md',
    alt: 'Corporate event catering setup',
  },
  '/menu': {
    image: bananaLeaf,
    title: 'Our Menu',
    subtitle: 'From traditional saapadu to grand feast spreads',
    tone: 'leaf',
    height: 'md',
    alt: 'Banana leaf with traditional South Indian meal',
  },
  '/gallery': {
    image: spices,
    title: 'Gallery',
    subtitle: 'Moments from our memorable events',
    tone: 'ink',
    height: 'sm',
    alt: 'South Indian spices and ingredients',
  },
  '/contact': {
    image: feastHero,
    title: 'Get in Touch',
    subtitle: 'Let us help you plan the perfect event',
    tone: 'warm',
    height: 'sm',
    alt: 'Contact My Chennai Catering',
  },
  '/builder': {
    image: bananaLeaf,
    title: 'Our Menu Builder',
    subtitle: 'Design your custom menu, dish by dish',
    tone: 'leaf',
    height: 'sm',
    alt: 'Customize your menu',
  },
};

export function getBanner(pathname: string): BannerConfig | null {
  // No banners for admin/crm
  if (pathname === '/admin' || pathname === '/crm') return null;
  return ROUTE_BANNERS[pathname] ?? null;
}
