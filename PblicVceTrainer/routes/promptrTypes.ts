import type {PromptrCategoryId} from '../data/promptrTexts';
import type {ScrollSpeedId, TextSizeId} from '../theme/promptrTheme';

export type PromptrStackParamList = {
  PromptrHome: undefined;
  PromptrTextList: {
    categoryId: PromptrCategoryId;
    categoryTitle: string;
  };
  PromptrDifficulty: {
    categoryId: PromptrCategoryId;
    categoryTitle: string;
    textId: string;
    textTitle: string;
    textBody: string;
  };
  PromptrReading: {
    categoryTitle: string;
    textTitle: string;
    textBody: string;
    scrollSpeed: ScrollSpeedId;
    textSize: TextSizeId;
  };
  PromptrSessionComplete: {
    categoryTitle: string;
    textTitle: string;
  };
};
