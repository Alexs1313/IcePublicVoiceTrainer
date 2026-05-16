import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  PROMPTR_TEXTS,
  type PromptrCategoryId,
  type PromptrText,
} from './promptrTexts';

const STORAGE_KEY = '@ice_voice_text_library_v1';

export type LibraryText = PromptrText & {
  isDefault: boolean;
};

type StoredLibrary = Record<PromptrCategoryId, LibraryText[]>;

const preview = (body: string) =>
  body.length > 96 ? `${body.slice(0, 96).trim()}…` : body;

const buildDefaults = (): StoredLibrary => {
  const library = {} as StoredLibrary;
  (Object.keys(PROMPTR_TEXTS) as PromptrCategoryId[]).forEach(categoryId => {
    library[categoryId] = PROMPTR_TEXTS[categoryId].map(text => ({
      ...text,
      isDefault: true,
    }));
  });
  return library;
};

let cache: StoredLibrary | null = null;

const persist = async (library: StoredLibrary) => {
  cache = library;
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(library));
};

export const loadTextLibrary = async (): Promise<StoredLibrary> => {
  if (cache) {
    return cache;
  }

  const raw = await AsyncStorage.getItem(STORAGE_KEY);
  if (raw) {
    cache = JSON.parse(raw) as StoredLibrary;
    return cache;
  }

  const defaults = buildDefaults();
  await persist(defaults);
  return defaults;
};

export const getLibraryTexts = async (
  categoryId: PromptrCategoryId,
): Promise<LibraryText[]> => {
  const library = await loadTextLibrary();
  return [...(library[categoryId] ?? [])];
};

export const getLibraryText = async (
  categoryId: PromptrCategoryId,
  textId: string,
): Promise<LibraryText | undefined> => {
  const texts = await getLibraryTexts(categoryId);
  return texts.find(item => item.id === textId);
};

export const saveLibraryText = async (
  categoryId: PromptrCategoryId,
  text: LibraryText,
): Promise<void> => {
  const library = await loadTextLibrary();
  const texts = [...(library[categoryId] ?? [])];
  const index = texts.findIndex(item => item.id === text.id);
  const nextText: LibraryText = {
    ...text,
    preview: preview(text.body),
  };

  if (index >= 0) {
    texts[index] = nextText;
  } else {
    texts.push(nextText);
  }

  await persist({...library, [categoryId]: texts});
};

export const deleteLibraryText = async (
  categoryId: PromptrCategoryId,
  textId: string,
): Promise<void> => {
  const library = await loadTextLibrary();
  await persist({
    ...library,
    [categoryId]: (library[categoryId] ?? []).filter(item => item.id !== textId),
  });
};

export const createLibraryTextId = () =>
  `custom-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
