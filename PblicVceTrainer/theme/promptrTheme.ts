export const pblicvcepromptrAccent = '#5BB0D9';
export const pblicvcepromptrAccentAlt = '#54C0DA';
export const pblicvcepromptrTitle = '#1C2B3A';
export const pblicvcepromptrTitleDark = '#0A1F33';
export const pblicvcepromptrMuted = '#6B8A9E';
export const pblicvcepromptrBg = '#DFF9FF';
export const pblicvcepromptrReadingBg = '#121B2B';

export type ScrollSpeedId = 'slow' | 'medium' | 'fast';
export type TextSizeId = 'small' | 'medium' | 'large';

export const SCROLL_SPEED_OPTIONS: {
  id: ScrollSpeedId;
  label: string;
  subtitle: string;
  icon: string;
}[] = [
  {id: 'slow', label: 'Slow', subtitle: 'Relaxed pace', icon: '🐢'},
  {id: 'medium', label: 'Medium', subtitle: 'Comfortable', icon: '🚶'},
  {id: 'fast', label: 'Fast', subtitle: 'Challenge mode', icon: '🚀'},
];

export const TEXT_SIZE_OPTIONS: {
  id: TextSizeId;
  label: string;
  subtitle: string;
  sizeLabel: string;
}[] = [
  {id: 'small', label: 'Small', subtitle: 'More text visible', sizeLabel: 'Aa'},
  {id: 'medium', label: 'Medium', subtitle: 'Balanced', sizeLabel: 'Aa'},
  {id: 'large', label: 'Large', subtitle: 'Easy to read', sizeLabel: 'Aa'},
];

export const SCROLL_SPEED_PX: Record<ScrollSpeedId, number> = {
  slow: 0.8,
  medium: 1.4,
  fast: 2.2,
};

export const TEXT_SIZE_PX: Record<TextSizeId, number> = {
  small: 18,
  medium: 22,
  large: 28,
};

export const speedLabel = (id: ScrollSpeedId) =>
  SCROLL_SPEED_OPTIONS.find(o => o.id === id)?.label ?? id;

export const sizeLabel = (id: TextSizeId) =>
  TEXT_SIZE_OPTIONS.find(o => o.id === id)?.label ?? id;
