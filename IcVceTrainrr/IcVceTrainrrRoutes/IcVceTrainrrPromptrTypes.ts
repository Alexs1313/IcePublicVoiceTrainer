import type {PromptrCategoryId} from '../IcVceTrainrrData/IcVceTrainrrPromptrTexts';
import type {ScrollSpeedId, TextSizeId} from '../IcVceTrainrrTheme/IcVceTrainrrPromptrTheme';

export type IcVceTrainrrPromptrStackParamList = {
  IcVceTrainrrPromptrHome: undefined;
  IcVceTrainrrPromptrTextList: {
    categoryId: PromptrCategoryId;
    categoryTitle: string;
  };
  IcVceTrainrrPromptrDifficulty: {
    categoryId: PromptrCategoryId;
    categoryTitle: string;
    textId: string;
    textTitle: string;
    textBody: string;
  };
  IcVceTrainrrPromptrReading: {
    categoryTitle: string;
    textTitle: string;
    textBody: string;
    scrollSpeed: ScrollSpeedId;
    textSize: TextSizeId;
  };
  IcVceTrainrrPromptrSessionComplete: {
    categoryTitle: string;
    textTitle: string;
  };
};
