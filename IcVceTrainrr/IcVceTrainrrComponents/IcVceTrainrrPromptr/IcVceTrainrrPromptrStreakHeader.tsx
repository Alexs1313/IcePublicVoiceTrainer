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
  icVceTrainrrRecordAppVisit,
  type WeekDayState,
} from '../../IcVceTrainrrData/IcVceTrainrrStreakStore';
import {
  icVceTrainrrPblicvcepromptrAccent,
  icVceTrainrrPblicvcepromptrMuted,
} from '../../IcVceTrainrrTheme/IcVceTrainrrPromptrTheme';

const icVceTrainrrWEEK_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as const;

type IcVceTrainrrStreakDayProps = {
  label: string;
  state: WeekDayState;
};

const IcVceTrainrrStreakDay = ({label, state}: IcVceTrainrrStreakDayProps) => {
  const circleStyle: ViewStyle[] = [icVceTrainrrStyles.icVceTrainrrCircle];
  const dotStyle: ViewStyle[] = [icVceTrainrrStyles.icVceTrainrrDot];
  const labelStyle: TextStyle[] = [icVceTrainrrStyles.icVceTrainrrDayLabel];

  if (state === 'completed') {
    circleStyle.push(icVceTrainrrStyles.icVceTrainrrCircleDone);
    dotStyle.push(icVceTrainrrStyles.icVceTrainrrDotDone);
  } else if (state === 'active') {
    circleStyle.push(icVceTrainrrStyles.icVceTrainrrCircleActive);
    dotStyle.push(icVceTrainrrStyles.icVceTrainrrDotActive);
    labelStyle.push(icVceTrainrrStyles.icVceTrainrrDayLabelActive);
  } else {
    circleStyle.push(icVceTrainrrStyles.icVceTrainrrCircleUpcoming);
    dotStyle.push(icVceTrainrrStyles.icVceTrainrrDotUpcoming);
  }

  return (
    <View style={icVceTrainrrStyles.icVceTrainrrDay}>
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

const IcVceTrainrrPromptrStreakHeader = ({
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
    const visitDates = await icVceTrainrrRecordAppVisit();
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
    <View style={[icVceTrainrrStyles.icVceTrainrrBlock, !showDivider && icVceTrainrrStyles.icVceTrainrrBlockNoDivider]}>
      <View style={icVceTrainrrStyles.icVceTrainrrHeader}>
        <View style={icVceTrainrrStyles.icVceTrainrrHeaderLeft}>
          <Image source={require('../../IcVceTrainrrAssets/IcVceTrainrrImages/IcVceTrainrrPblicvcetraifir.png')} />
          <Text style={icVceTrainrrStyles.icVceTrainrrTitle}>{streakLabel ?? resolvedLabel}</Text>
        </View>
        <Text style={icVceTrainrrStyles.icVceTrainrrWeek}>This week</Text>
      </View>
      <View style={icVceTrainrrStyles.icVceTrainrrRow}>
        {icVceTrainrrWEEK_DAYS.map((day, index) => (
          <IcVceTrainrrStreakDay key={day} label={day} state={dayStates[index]} />
        ))}
      </View>
    </View>
  );
};

export default IcVceTrainrrPromptrStreakHeader;

const icVceTrainrrStyles = StyleSheet.create({
  icVceTrainrrBlock: {
    marginBottom: 22,
  },
  icVceTrainrrBlockNoDivider: {
    marginBottom: 16,
  },
  icVceTrainrrHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
    paddingHorizontal: 20,
  },
  icVceTrainrrHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  icVceTrainrrTitle: {
    color: icVceTrainrrPblicvcepromptrMuted,
    fontSize: 13,
    fontWeight: '600',
  },
  icVceTrainrrWeek: {
    color: icVceTrainrrPblicvcepromptrMuted,
    fontSize: 13,
    fontWeight: '500',
  },
  icVceTrainrrRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#6CD0F733',
    paddingHorizontal: 20,
  },
  icVceTrainrrDay: {
    alignItems: 'center',
    flex: 1,
  },
  icVceTrainrrCircle: {
    width: 44,
    height: 34,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  icVceTrainrrCircleDone: {
    backgroundColor: '#D8F5E6',
    borderWidth: 1,
    borderColor: '#4CAF50',
  },
  icVceTrainrrCircleActive: {
    backgroundColor: '#54C0DA1A',
    borderWidth: 1,
    borderColor: '#54C0DA',
  },
  icVceTrainrrCircleUpcoming: {
    backgroundColor: 'rgba(107, 138, 158, 0.12)',
  },
  icVceTrainrrDot: {
    width: 16,
    height: 16,
    borderRadius: 10,
  },
  icVceTrainrrDotDone: {
    backgroundColor: '#4CAF50',
  },
  icVceTrainrrDotActive: {
    backgroundColor: '#54C0DA',
  },
  icVceTrainrrDotUpcoming: {
    backgroundColor: '#E0E0E0',
  },
  icVceTrainrrDayLabel: {
    fontSize: 11,
    fontWeight: '500',
    color: icVceTrainrrPblicvcepromptrMuted,
  },
  icVceTrainrrDayLabelActive: {
    color: icVceTrainrrPblicvcepromptrAccent,
    fontWeight: '700',
  },
});
