import type {PromptrCategoryId} from '../data/promptrTexts';

export type WorkshopStackParamList = {
  WorkshopHome: undefined;
  WorkshopTextList: {
    categoryId: PromptrCategoryId;
    categoryTitle: string;
  };
  WorkshopTextEditor: {
    categoryId: PromptrCategoryId;
    categoryTitle: string;
    mode: 'new' | 'edit';
    textId?: string;
  };
};
