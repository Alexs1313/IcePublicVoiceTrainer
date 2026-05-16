import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@ice_voice_app_visits_v1';

export const getMondayBasedIndex = (date: Date) => (date.getDay() + 6) % 7;

export const formatVisitDateKey = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const getWeekStartMonday = (reference = new Date()) => {
  const monday = new Date(reference);
  const offset = getMondayBasedIndex(monday);
  monday.setDate(monday.getDate() - offset);
  monday.setHours(0, 0, 0, 0);
  return monday;
};

export const getCurrentWeekDateKeys = (reference = new Date()) => {
  const monday = getWeekStartMonday(reference);
  return Array.from({length: 7}, (_, index) => {
    const date = new Date(monday);
    date.setDate(monday.getDate() + index);
    return formatVisitDateKey(date);
  });
};

const loadVisitDates = async (): Promise<string[]> => {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return [];
  }

  const parsed = JSON.parse(raw) as string[];
  return Array.isArray(parsed) ? parsed : [];
};

const saveVisitDates = async (dates: string[]) => {
  const unique = [...new Set(dates)].sort();
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(unique));
};

export const recordAppVisit = async (date = new Date()): Promise<string[]> => {
  const todayKey = formatVisitDateKey(date);
  const dates = await loadVisitDates();

  if (!dates.includes(todayKey)) {
    dates.push(todayKey);
    await saveVisitDates(dates);
  }

  return dates;
};

export const getConsecutiveStreak = (visitDates: string[]) => {
  const visitSet = new Set(visitDates);
  let streak = 0;
  const cursor = new Date();
  cursor.setHours(0, 0, 0, 0);

  while (visitSet.has(formatVisitDateKey(cursor))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }

  return streak;
};

export const getStreakLabel = (visitDates: string[]) => {
  const streak = getConsecutiveStreak(visitDates);

  if (streak <= 1) {
    return 'Start your streak today';
  }

  const completedDays = streak - 1;
  if (completedDays === 1) {
    return '1-day streak!';
  }

  return `${completedDays}-day streak!`;
};

export type WeekDayState = 'completed' | 'active' | 'upcoming';

export const getWeekDayStates = (
  visitDates: string[],
  reference = new Date(),
): WeekDayState[] => {
  const visitSet = new Set(visitDates);
  const todayKey = formatVisitDateKey(reference);
  const weekKeys = getCurrentWeekDateKeys(reference);
  return weekKeys.map(key => {
    if (key === todayKey) {
      return 'active';
    }
    if (visitSet.has(key)) {
      return 'completed';
    }
    return 'upcoming';
  });
};
