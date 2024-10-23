import { Facebook, Instagram, TikTok, Twitter } from '@src/assets/icons';

interface ISocialMedium {
  url: string;
  icon: any;
}
const socialMedia: ISocialMedium[] = [
  { url: 'https://www.instagram.com/thehelperlink.sa/', icon: Instagram },
  { url: 'https://twitter.com/TheHelperLink', icon: Twitter },
  { url: 'https://www.facebook.com/thehelperlink/', icon: Facebook },
  { url: 'https://www.tiktok.com/@thehelperlink.sa', icon: TikTok },
  // { url: '#', icon: FacebookMessanger },
  // { url: '#', icon: Pinterest },
  // { url: '#', icon: Google },
];
const production = `${process.env.NEXT_PUBLIC_DOMAIN_API_PROTOCOL}://${process.env.NEXT_PUBLIC_DOMAIN_API}`;
const staging = `${process.env.NEXT_PUBLIC_DOMAIN_API_PROTOCOL_DEV}://${process.env.NEXT_PUBLIC_DOMAIN_API_DEV}`;
// process.env.NODE_ENV !== 'development'

const API_URL = staging;

const homeSlider = {
  fisrtSlider: ['/images/cleaning.png', '/images/cleaning-img.png', '/images/vacuum-cleaner.png'],
  secondSlider: ['/images/washing-img.png', '/images/ironing.png', '/images/washing.png'],
};

export { socialMedia, homeSlider, API_URL };
