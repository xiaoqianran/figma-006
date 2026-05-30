/**
 * Figma Design Tokens - Rideshare UI Kit (Meteor)
 * Extracted from Style Guide + Final UI pages via MCP
 * All values match the official Figma file as closely as possible.
 */

export const colors = {
  // Primary
  blue100: '#4C5DF9',
  blue80: '#707DFA',
  blue60: '#949EFB',
  blue40: '#B7BEFD',
  blue20: '#DBDFFE',

  // Accent / Secondary
  orange100: '#F89B54',
  orange80: '#F9AF76',
  orange60: '#FBC398',
  orange40: '#FCD7BB',
  orange20: '#FEEBDD',

  // Dark backgrounds (Gary Dark)
  dark100: '#161A21',
  dark80: '#45484D',
  dark60: '#73767A',
  dark40: '#A2A3A6',
  dark20: '#D0D1D3',

  // Grays
  gray100: '#9FA1B0',
  gray80: '#B2B4C0',
  gray60: '#C5C7D0',
  gray40: '#D9D9DF',
  gray20: '#ECECEF',

  // Semantic
  success: '#38C978',
  alert: '#FF6B3B',
  danger: '#FF5050',

  // Dark theme surfaces
  darkSurface1: '#261814', // approx from rgb in context
  darkSurface2: '#3B2A20',

  // Text on dark
  white: '#F8F4F4', // Dark Version/White
  whiteMuted: '#E8E4DC',

  // Light surfaces
  whiteSurface: '#FFFFFF',
} as const;

export const radii = {
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '24px',
  '2xl': '32px',
  full: '9999px',
} as const;

export const spacing = {
  // Common paddings/gaps observed in frames
  screenPadding: '24px',
  cardPadding: '20px',
  buttonPaddingY: '16px',
  buttonPaddingX: '32px',
} as const;

export const typography = {
  fontFamily: "'Sen', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  // From Figma text styles (Sen)
  h1: { size: '32px', weight: 700, lineHeight: '1.1' },
  h2: { size: '20px', weight: 700, lineHeight: '1.2' },
  h3: { size: '18px', weight: 700, lineHeight: '1.25' },
  body: { size: '14px', weight: 400, lineHeight: '1.4' },
  button: { size: '16px', weight: 700, lineHeight: '1' },
  small: { size: '12px', weight: 400, lineHeight: '1.3' },
} as const;

export const shadows = {
  card: '0 4px 20px -4px rgba(0,0,0,0.12), 0 2px 8px -2px rgba(0,0,0,0.08)',
  button: '0 2px 8px -1px rgba(76,93,249,0.3)',
} as const;

// Helper to build style objects
export function getTextStyle(variant: Exclude<keyof typeof typography, 'fontFamily'>) {
  const t = typography[variant];
  return {
    fontFamily: typography.fontFamily,
    fontSize: t.size,
    fontWeight: t.weight,
    lineHeight: t.lineHeight,
  };
}
