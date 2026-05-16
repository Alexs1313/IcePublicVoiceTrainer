import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  type TextStyle,
  type ViewStyle,
} from 'react-native';

import {
  getStreakLabel,
  getWeekDayStates,
  recordAppVisit,
  type WeekDayState,
} from '../../data/streakStore';
import {
  pblicvcepromptrAccent,
  pblicvcepromptrMuted,
} from '../../theme/promptrTheme';

const WEEK_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as const;

type StreakDayProps = {
  label: string;
  state: WeekDayState;
};

const StreakDay = ({label, state}: StreakDayProps) => {
  const circleStyle: ViewStyle[] = [styles.circle];
  const dotStyle: ViewStyle[] = [styles.dot];
  const labelStyle: TextStyle[] = [styles.dayLabel];

  if (state === 'completed') {
    circleStyle.push(styles.circleDone);
    dotStyle.push(styles.dotDone);
  } else if (state === 'active') {
    circleStyle.push(styles.circleActive);
    dotStyle.push(styles.dotActive);
    labelStyle.push(styles.dayLabelActive);
  } else {
    circleStyle.push(styles.circleUpcoming);
    dotStyle.push(styles.dotUpcoming);
  }

  return (
    <View style={styles.day}>
      <View style={circleStyle}>
        <View style={dotStyle} />
      </View>
      <Text style={labelStyle}>{label}</Text>
    </View>
  );
};

type PromptrStreakHeaderProps = {
  streakLabel?: string;
  showDivider?: boolean;
};

const PromptrStreakHeader = ({
  streakLabel,
  showDivider = true,
}: PromptrStreakHeaderProps) => {
  const [dayStates, setDayStates] = useState<WeekDayState[]>([
    'upcoming',
    'upcoming',
    'upcoming',
    'active',
    'upcoming',
    'upcoming',
    'upcoming',
  ]);
  const [resolvedLabel, setResolvedLabel] = useState(
    streakLabel ?? 'Start your streak today',
  );

  const refreshStreak = useCallback(async () => {
    const visitDates = await recordAppVisit();
    setDayStates(getWeekDayStates(visitDates));
    if (streakLabel === undefined) {
      setResolvedLabel(getStreakLabel(visitDates));
    }
  }, [streakLabel]);

  useFocusEffect(
    useCallback(() => {
      refreshStreak();
    }, [refreshStreak]),
  );

  return (
    <View style={[styles.block, !showDivider && styles.blockNoDivider]}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image source={require('../../assets/images/pblicvcetraifir.png')} />
          <Text style={styles.title}>{streakLabel ?? resolvedLabel}</Text>
        </View>
        <Text style={styles.week}>This week</Text>
      </View>
      <View style={styles.row}>
        {WEEK_DAYS.map((day, index) => (
          <StreakDay key={day} label={day} state={dayStates[index]} />
        ))}
      </View>
    </View>
  );
};

export default PromptrStreakHeader;

const styles = StyleSheet.create({
  block: {
    marginBottom: 22,
  },
  blockNoDivider: {
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
    paddingHorizontal: 20,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  title: {
    color: pblicvcepromptrMuted,
    fontSize: 13,
    fontWeight: '600',
  },
  week: {
    color: pblicvcepromptrMuted,
    fontSize: 13,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#6CD0F733',
    paddingHorizontal: 20,
  },
  day: {
    alignItems: 'center',
    flex: 1,
  },
  circle: {
    width: 44,
    height: 34,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  circleDone: {
    backgroundColor: '#D8F5E6',
    borderWidth: 1,
    borderColor: '#4CAF50',
  },
  circleActive: {
    backgroundColor: '#54C0DA1A',
    borderWidth: 1,
    borderColor: '#54C0DA',
  },
  circleUpcoming: {
    backgroundColor: 'rgba(107, 138, 158, 0.12)',
  },
  dot: {
    width: 16,
    height: 16,
    borderRadius: 10,
  },
  dotDone: {
    backgroundColor: '#4CAF50',
  },
  dotActive: {
    backgroundColor: '#54C0DA',
  },
  dotUpcoming: {
    backgroundColor: '#E0E0E0',
  },
  dayLabel: {
    fontSize: 11,
    fontWeight: '500',
    color: pblicvcepromptrMuted,
  },
  dayLabelActive: {
    color: pblicvcepromptrAccent,
    fontWeight: '700',
  },
});
