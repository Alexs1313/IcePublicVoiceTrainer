export const icVceTrainrrPblicvcepromptrAccent = '#5BB0D9';
export const icVceTrainrrPblicvcepromptrAccentAlt = '#54C0DA';
export const icVceTrainrrPblicvcepromptrTitle = '#1C2B3A';
export const icVceTrainrrPblicvcepromptrTitleDark = '#0A1F33';
export const icVceTrainrrPblicvcepromptrMuted = '#6B8A9E';
export const icVceTrainrrPblicvcepromptrBg = '#DFF9FF';
export const icVceTrainrrPblicvcepromptrReadingBg = '#121B2B';

export type ScrollSpeedId = 'slow' | 'medium' | 'fast';
export type TextSizeId = 'small' | 'medium' | 'large';

export const icVceTrainrrSCROLL_SPEED_OPTIONS: {
  id: ScrollSpeedId;
  label: string;
  subtitle: string;
  icon: string;
}[] = [
  {id: 'slow', label: 'Slow', subtitle: 'Relaxed pace', icon: '🐢'},
  {id: 'medium', label: 'Medium', subtitle: 'Comfortable', icon: '🚶'},
  {id: 'fast', label: 'Fast', subtitle: 'Challenge mode', icon: '🚀'},
];

export const icVceTrainrrTEXT_SIZE_OPTIONS: {
  id: TextSizeId;
  label: string;
  subtitle: string;
  icVceTrainrrSizeLabel: string;
}[] = [
  {id: 'small', label: 'Small', subtitle: 'More text visible', icVceTrainrrSizeLabel: 'Aa'},
  {id: 'medium', label: 'Medium', subtitle: 'Balanced', icVceTrainrrSizeLabel: 'Aa'},
  {id: 'large', label: 'Large', subtitle: 'Easy to read', icVceTrainrrSizeLabel: 'Aa'},
];

export const icVceTrainrrSCROLL_SPEED_PX: Record<ScrollSpeedId, number> = {
  slow: 0.8,
  medium: 1.4,
  fast: 2.2,
};

export const icVceTrainrrTEXT_SIZE_PX: Record<TextSizeId, number> = {
  small: 18,
  medium: 22,
  large: 28,
};

export const icVceTrainrrSpeedLabel = (id: ScrollSpeedId) =>
  icVceTrainrrSCROLL_SPEED_OPTIONS.find(o => o.id === id)?.label ?? id;

export const icVceTrainrrSizeLabel = (id: TextSizeId) =>
  icVceTrainrrTEXT_SIZE_OPTIONS.find(o => o.id === id)?.label ?? id;
