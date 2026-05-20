import type {PromptrCategoryId} from '../IcVceTrainrrData/IcVceTrainrrPromptrTexts';

export type IcVceTrainrrWorkshopStackParamList = {
  IcVceTrainrrWorkshopHome: undefined;
  IcVceTrainrrWorkshopTextList: {
    categoryId: PromptrCategoryId;
    categoryTitle: string;
  };
  IcVceTrainrrWorkshopTextEditor: {
    categoryId: PromptrCategoryId;
    categoryTitle: string;
    mode: 'new' | 'edit';
    textId?: string;
  };
};
