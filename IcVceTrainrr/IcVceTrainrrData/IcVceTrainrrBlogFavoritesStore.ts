import AsyncStorage from '@react-native-async-storage/async-storage';

import {icVceTrainrrDEFAULT_FAVORITE_ARTICLE_ID} from './IcVceTrainrrBlogArticles';

const icVceTrainrrSTORAGE_KEY = '@ice_voice_blog_favorites_v1';

let cache: string[] | null = null;

export const loadBlogFavorites = async (): Promise<string[]> => {
  if (cache) {
    return [...cache];
  }

  const raw = await AsyncStorage.getItem(icVceTrainrrSTORAGE_KEY);
  if (raw) {
    cache = JSON.parse(raw) as string[];
    return [...cache];
  }

  cache = [icVceTrainrrDEFAULT_FAVORITE_ARTICLE_ID];
  await AsyncStorage.setItem(icVceTrainrrSTORAGE_KEY, JSON.stringify(cache));
  return [...cache];
};

const icVceTrainrrPersist = async (ids: string[]) => {
  cache = [...ids];
  await AsyncStorage.setItem(icVceTrainrrSTORAGE_KEY, JSON.stringify(cache));
};

export const isBlogFavorite = async (articleId: string): Promise<boolean> => {
  const favorites = await loadBlogFavorites();
  return favorites.includes(articleId);
};

export const toggleBlogFavorite = async (
  articleId: string,
): Promise<boolean> => {
  const favorites = await loadBlogFavorites();
  const exists = favorites.includes(articleId);
  const next = exists
    ? favorites.filter(id => id !== articleId)
    : [...favorites, articleId];
  await icVceTrainrrPersist(next);
  return !exists;
};
