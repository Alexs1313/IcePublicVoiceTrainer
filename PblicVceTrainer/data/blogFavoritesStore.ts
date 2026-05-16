import AsyncStorage from '@react-native-async-storage/async-storage';

import {DEFAULT_FAVORITE_ARTICLE_ID} from './blogArticles';

const STORAGE_KEY = '@ice_voice_blog_favorites_v1';

let cache: string[] | null = null;

export const loadBlogFavorites = async (): Promise<string[]> => {
  if (cache) {
    return [...cache];
  }

  const raw = await AsyncStorage.getItem(STORAGE_KEY);
  if (raw) {
    cache = JSON.parse(raw) as string[];
    return [...cache];
  }

  cache = [DEFAULT_FAVORITE_ARTICLE_ID];
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(cache));
  return [...cache];
};

const persist = async (ids: string[]) => {
  cache = [...ids];
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(cache));
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
  await persist(next);
  return !exists;
};
