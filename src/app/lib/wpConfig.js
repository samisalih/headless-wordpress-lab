/**
 * WordPress configuration settings
 */

// WordPress site URL
export const WP_URL = process.env.NEXT_PUBLIC_WP_URL || 'https://your-wordpress-site.com';

// Number of posts to fetch per page
export const POSTS_PER_PAGE = 10;

// Default image sizes to use
export const IMAGE_SIZES = {
  thumbnail: 'thumbnail',
  medium: 'medium',
  large: 'large',
  full: 'full',
  hero: 'full', // For hero sections
  card: 'medium', // For news cards
};

// Menu locations
export const MENU_LOCATIONS = {
  primary: 'primary-menu',
  footer: 'footer-menu',
};

// Categories to feature
export const FEATURED_CATEGORIES = [
  'profis',
  'news',
  'c-jugend',
];
