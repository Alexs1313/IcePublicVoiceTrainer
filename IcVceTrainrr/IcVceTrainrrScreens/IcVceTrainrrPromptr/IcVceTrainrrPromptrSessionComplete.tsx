import {CommonActions, useNavigation, useRoute} from '@react-navigation/native';
import type {RouteProp} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {Pressable, Share, StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import IcVceTrainrrLayout from '../../IcVceTrainrrComponents/IcVceTrainrrLayout';
import IcVceTrainrrPromptrStreakHeader from '../../IcVceTrainrrComponents/IcVceTrainrrPromptr/IcVceTrainrrPromptrStreakHeader';
import {
  getConsecutiveStreak,
  getStreakLabel,
  icVceTrainrrRecordAppVisit,
} from '../../IcVceTrainrrData/IcVceTrainrrStreakStore';
import type {IcVceTrainrrPromptrStackParamList} from '../../IcVceTrainrrRoutes/IcVceTrainrrPromptrTypes';
import {
  icVceTrainrrPblicvcepromptrMuted,
  icVceTrainrrPblicvcepromptrTitle,
} from '../../IcVceTrainrrTheme/IcVceTrainrrPromptrTheme';
import LinearGradient from 'react-native-linear-gradient';

type Nav = StackNavigationProp<IcVceTrainrrPromptrStackParamList, 'IcVceTrainrrPromptrSessionComplete'>;
type Route = RouteProp<IcVceTrainrrPromptrStackParamList, 'IcVceTrainrrPromptrSessionComplete'>;

const IcVceTrainrrPromptrSessionComplete = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<Nav>();
  const route = useRoute<Route>();
  const {categoryTitle, textTitle} = route.params;
  const [streakDays, setStreakDays] = useState(0);
  const [streakLabel, setStreakLabel] = useState('Start your streak today');

  useFocusEffect(
    useCallback(() => {
      icVceTrainrrRecordAppVisit().then(dates => {
        setStreakDays(getConsecutiveStreak(dates));
        setStreakLabel(getStreakLabel(dates));
      });
    }, []),
  );

  const goHome = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'IcVceTrainrrPromptrHome'}],
      }),
    );
  };

  const shareResult = useCallback(async () => {
    const message = [
      '🎉 Great session!',
      '',
      `I just completed "${textTitle}" in ${categoryTitle}.`,
      '',
      streakDays > 0 ? `🔥 ${streakLabel}` : '🔥 Start your streak today',
      '',
      'Practicing public speaking with Ice Public Voice Trainer.',
    ].join('\n');

    try {
      await Share.share({
        message,
        title: 'Session Complete',
      });
    } catch {
      // dismissed or failed
    }
  }, [categoryTitle, streakDays, streakLabel, textTitle]);

  return (
    <IcVceTrainrrLayout>
      <View
        style={[
          icVceTrainrrStyles.icVceTrainrrContent,
          {
            paddingTop: Math.max(insets.top, 52),
            paddingBottom: 24 + insets.bottom,
          },
        ]}>
        <IcVceTrainrrPromptrStreakHeader streakLabel={streakLabel} showDivider={false} />

        <View style={icVceTrainrrStyles.icVceTrainrrBody}>
          <LinearGradient
            colors={['#54C0DA', '#6CD0F7']}
            style={icVceTrainrrStyles.icVceTrainrrCelebrationIcon}>
            <Text style={icVceTrainrrStyles.icVceTrainrrCelebrationEmoji}>🎉</Text>
          </LinearGradient>

          <Text style={icVceTrainrrStyles.icVceTrainrrHeading}>Great Session!</Text>
          <Text style={icVceTrainrrStyles.icVceTrainrrSubtitle}>
            You completed{' '}
            <Text style={icVceTrainrrStyles.icVceTrainrrSubtitleBold}>&apos;{textTitle}&apos;</Text>
          </Text>

          <View style={icVceTrainrrStyles.icVceTrainrrDetailsCard}>
            <Text style={icVceTrainrrStyles.icVceTrainrrDetailsTitle}>Session Details</Text>
            <View style={icVceTrainrrStyles.icVceTrainrrDetailsRow}>
              <View style={icVceTrainrrStyles.icVceTrainrrDetailItem}>
                <Text style={icVceTrainrrStyles.icVceTrainrrDetailIcon}>✅</Text>
                <Text style={icVceTrainrrStyles.icVceTrainrrDetailLabel}>Completed</Text>
              </View>
              <View style={icVceTrainrrStyles.icVceTrainrrDetailItem}>
                <Text style={icVceTrainrrStyles.icVceTrainrrDetailIcon}>🎤</Text>
                <Text style={icVceTrainrrStyles.icVceTrainrrDetailLabel}>{categoryTitle}</Text>
              </View>
              <View style={icVceTrainrrStyles.icVceTrainrrDetailItem}>
                <Text style={icVceTrainrrStyles.icVceTrainrrDetailIcon}>🔥</Text>
                <Text style={icVceTrainrrStyles.icVceTrainrrDetailLabel}>Streak +1</Text>
              </View>
            </View>
          </View>

          <Pressable
            onPress={shareResult}
            style={({pressed}) => [
              icVceTrainrrStyles.icVceTrainrrShareBtnWrap,
              pressed && icVceTrainrrStyles.icVceTrainrrPressed,
            ]}>
            <LinearGradient
              colors={['#54C0DA', '#6CD0F7']}
              style={icVceTrainrrStyles.icVceTrainrrShareBtn}>
              <Text style={icVceTrainrrStyles.icVceTrainrrShareBtnText}>Share</Text>
            </LinearGradient>
          </Pressable>

          <Pressable onPress={goHome} style={icVceTrainrrStyles.icVceTrainrrHomeLink}>
            <Text style={icVceTrainrrStyles.icVceTrainrrHomeLinkText}>Go to Home</Text>
          </Pressable>
        </View>
      </View>
    </IcVceTrainrrLayout>
  );
};

export default IcVceTrainrrPromptrSessionComplete;

const icVceTrainrrStyles = StyleSheet.create({
  icVceTrainrrContent: {},
  icVceTrainrrBody: {
    paddingHorizontal: 20.332,
    alignItems: 'center',
  },
  icVceTrainrrCelebrationIcon: {
    width: 96.021,
    height: 96.021,
    borderRadius: 24,
    backgroundColor: '#E8F6FC',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20.12,
    marginTop: 48,
  },
  icVceTrainrrCelebrationEmoji: {
    fontSize: 40.213,
  },
  icVceTrainrrHeading: {
    color: icVceTrainrrPblicvcepromptrTitle,
    fontSize: 28.01,
    fontWeight: '800',
    marginBottom: 10.133,
    textAlign: 'center',
  },
  icVceTrainrrSubtitle: {
    color: icVceTrainrrPblicvcepromptrMuted,
    fontSize: 16.129,
    lineHeight: 22,
    textAlign: 'center',
    marginBottom: 34.162,
    paddingHorizontal: 12,
  },
  icVceTrainrrSubtitleBold: {
    color: icVceTrainrrPblicvcepromptrTitle,
    fontWeight: '700',
  },
  icVceTrainrrDetailsCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 22.12,
    padding: 20.12,
    marginBottom: 22,
    shadowColor: '#0A1F33',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.06,
    shadowRadius: 12.12,
    elevation: 3,
  },
  icVceTrainrrDetailsTitle: {
    color: icVceTrainrrPblicvcepromptrMuted,
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 18.12,
  },
  icVceTrainrrDetailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  icVceTrainrrDetailItem: {
    alignItems: 'center',
    flex: 1,
  },
  icVceTrainrrDetailIcon: {
    fontSize: 28.213,
    marginBottom: 8,
  },
  icVceTrainrrDetailLabel: {
    color: icVceTrainrrPblicvcepromptrMuted,
    fontSize: 12.162,
    fontWeight: '500',
    textAlign: 'center',
  },
  icVceTrainrrShareBtnWrap: {
    width: '100%',
    marginBottom: 16.22,
  },
  icVceTrainrrShareBtn: {
    borderRadius: 16.129,
    height: 56.14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icVceTrainrrShareBtnText: {
    color: '#FFFFFF',
    fontSize: 17.17,
    fontWeight: '700',
  },
  icVceTrainrrHomeLink: {
    paddingVertical: 8,
  },
  icVceTrainrrHomeLinkText: {
    color: '#8AA8B8',
    fontSize: 15,
    fontWeight: '600',
  },
  icVceTrainrrPressed: {
    opacity: 0.9,
  },
});
