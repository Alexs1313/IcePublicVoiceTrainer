import type {TipCategoryId} from '../data/tipsData';

export type TipsStackParamList = {
  TipsHome: undefined;
  TipsCategoryList: {
    categoryId: TipCategoryId;
  };
  TipsRandom: undefined;
};
