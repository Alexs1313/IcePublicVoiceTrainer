import {CommonActions, useNavigation, useRoute} from '@react-navigation/native';
import type {RouteProp} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {Pressable, Share, StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import Layout from '../../components/Layout';
import PromptrStreakHeader from '../../components/promptr/PromptrStreakHeader';
import {
  getConsecutiveStreak,
  getStreakLabel,
  recordAppVisit,
} from '../../data/streakStore';
import type {PromptrStackParamList} from '../../routes/promptrTypes';
import {
  pblicvcepromptrMuted,
  pblicvcepromptrTitle,
} from '../../theme/promptrTheme';
import LinearGradient from 'react-native-linear-gradient';

type Nav = StackNavigationProp<PromptrStackParamList, 'PromptrSessionComplete'>;
type Route = RouteProp<PromptrStackParamList, 'PromptrSessionComplete'>;

const PromptrSessionComplete = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<Nav>();
  const route = useRoute<Route>();
  const {categoryTitle, textTitle} = route.params;
  const [streakDays, setStreakDays] = useState(0);
  const [streakLabel, setStreakLabel] = useState('Start your streak today');

  useFocusEffect(
    useCallback(() => {
      recordAppVisit().then(dates => {
        setStreakDays(getConsecutiveStreak(dates));
        setStreakLabel(getStreakLabel(dates));
      });
    }, []),
  );

  const goHome = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'PromptrHome'}],
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
    <Layout>
      <View
        style={[
          styles.content,
          {
            paddingTop: Math.max(insets.top, 52),
            paddingBottom: 24 + insets.bottom,
          },
        ]}>
        <PromptrStreakHeader streakLabel={streakLabel} showDivider={false} />

        <View style={styles.body}>
          <LinearGradient
            colors={['#54C0DA', '#6CD0F7']}
            style={styles.celebrationIcon}>
            <Text style={styles.celebrationEmoji}>🎉</Text>
          </LinearGradient>

          <Text style={styles.heading}>Great Session!</Text>
          <Text style={styles.subtitle}>
            You completed{' '}
            <Text style={styles.subtitleBold}>&apos;{textTitle}&apos;</Text>
          </Text>

          <View style={styles.detailsCard}>
            <Text style={styles.detailsTitle}>Session Details</Text>
            <View style={styles.detailsRow}>
              <View style={styles.detailItem}>
                <Text style={styles.detailIcon}>✅</Text>
                <Text style={styles.detailLabel}>Completed</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailIcon}>🎤</Text>
                <Text style={styles.detailLabel}>{categoryTitle}</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailIcon}>🔥</Text>
                <Text style={styles.detailLabel}>Streak +1</Text>
              </View>
            </View>
          </View>

          <Pressable
            onPress={shareResult}
            style={({pressed}) => [
              styles.shareBtnWrap,
              pressed && styles.pressed,
            ]}>
            <LinearGradient
              colors={['#54C0DA', '#6CD0F7']}
              style={styles.shareBtn}>
              <Text style={styles.shareBtnText}>Share</Text>
            </LinearGradient>
          </Pressable>

          <Pressable onPress={goHome} style={styles.homeLink}>
            <Text style={styles.homeLinkText}>Go to Home</Text>
          </Pressable>
        </View>
      </View>
    </Layout>
  );
};

export default PromptrSessionComplete;

const styles = StyleSheet.create({
  content: {},
  body: {
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  celebrationIcon: {
    width: 96,
    height: 96,
    borderRadius: 24,
    backgroundColor: '#E8F6FC',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    marginTop: 48,
  },
  celebrationEmoji: {
    fontSize: 40,
  },
  heading: {
    color: pblicvcepromptrTitle,
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    color: pblicvcepromptrMuted,
    fontSize: 16,
    lineHeight: 22,
    textAlign: 'center',
    marginBottom: 34,
    paddingHorizontal: 12,
  },
  subtitleBold: {
    color: pblicvcepromptrTitle,
    fontWeight: '700',
  },
  detailsCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 20,
    marginBottom: 22,
    shadowColor: '#0A1F33',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  },
  detailsTitle: {
    color: pblicvcepromptrMuted,
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 18,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  detailItem: {
    alignItems: 'center',
    flex: 1,
  },
  detailIcon: {
    fontSize: 28,
    marginBottom: 8,
  },
  detailLabel: {
    color: pblicvcepromptrMuted,
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
  },
  shareBtnWrap: {
    width: '100%',
    marginBottom: 16,
  },
  shareBtn: {
    borderRadius: 16,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shareBtnText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
  },
  homeLink: {
    paddingVertical: 8,
  },
  homeLinkText: {
    color: '#8AA8B8',
    fontSize: 15,
    fontWeight: '600',
  },
  pressed: {
    opacity: 0.9,
  },
});
