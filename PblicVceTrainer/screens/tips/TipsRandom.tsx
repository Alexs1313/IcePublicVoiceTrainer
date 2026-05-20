import {useNavigation} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import React, {useCallback, useState} from 'react';
import {Image, Pressable, Share, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import Layout from '../../components/Layout';
import PromptrStreakHeader from '../../components/promptr/PromptrStreakHeader';
import {getRandomTip} from '../../data/tipsData';
import type {TipsStackParamList} from '../../routes/tipsTypes';
import {
  pblicvcepromptrAccentAlt,
  pblicvcepromptrMuted,
  pblicvcepromptrTitle,
} from '../../theme/promptrTheme';

type Nav = StackNavigationProp<TipsStackParamList, 'TipsRandom'>;

const TipsRandom = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<Nav>();
  const [current, setCurrent] = useState(() => getRandomTip());

  const pickNext = useCallback(() => {
    let next = getRandomTip();
    while (next.id === current.id && next.category.tips.length > 1) {
      next = getRandomTip();
    }
    setCurrent(next);
  }, [current.id]);

  const shareTip = async () => {
    try {
      await Share.share({
        message: `${current.title}\n\n${current.body}\n\n— ${current.category.title} · Ice Public Voice Trainer`,
        title: current.title,
      });
    } catch {
      console.log('Error sharing tip');
    }
  };

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
        <PromptrStreakHeader />

        <View style={styles.body}>
          <View style={styles.headerRow}>
            <Pressable
              onPress={() => navigation.goBack()}
              style={({pressed}) => [
                styles.backBtn,
                pressed && styles.pressed,
              ]}>
              <Image
                source={require('../../assets/images/pblicvcetraiback.png')}
              />
            </Pressable>
            <Text style={styles.screenTitle}>Random Tip</Text>
            <View style={styles.headerSpacer} />
          </View>

          <View style={styles.hero}>
            <View
              style={[
                styles.heroIcon,
                {backgroundColor: current.category.iconBg},
              ]}>
              <Text style={styles.heroIconText}>{current.category.icon}</Text>
            </View>
            <View
              style={[
                styles.categoryBadge,
                {backgroundColor: `${current.category.badgeColor}22`},
              ]}>
              <Text
                style={[
                  styles.categoryBadgeText,
                  {color: current.category.badgeColor},
                ]}>
                {current.category.title}
              </Text>
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>{current.title}</Text>
            <Text style={styles.cardBody}>{current.body}</Text>
          </View>

          <View style={styles.actions}>
            <Pressable
              onPress={shareTip}
              style={({pressed}) => [
                styles.shareBtn,
                pressed && styles.pressed,
              ]}>
              <Image
                source={require('../../assets/images/pblicvcetrshrbt.png')}
              />
              <Text style={styles.shareBtnText}>Share</Text>
            </Pressable>

            <Pressable
              onPress={pickNext}
              style={({pressed}) => [
                styles.nextWrap,
                pressed && styles.pressed,
              ]}>
              <LinearGradient
                colors={['#E4AD1B', '#F07911']}
                style={styles.nextBtn}>
                <Image
                  source={require('../../assets/images/pblicvcetrrndbt.png')}
                />
                <Text style={styles.nextBtnText}>Next Tip</Text>
              </LinearGradient>
            </Pressable>
          </View>
        </View>
      </View>
    </Layout>
  );
};

export default TipsRandom;

const styles = StyleSheet.create({
  body: {
    paddingHorizontal: 20.312,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20.12,
    gap: 10.12,
  },
  backBtn: {
    width: 35.124,
    height: 35.124,
    borderRadius: 14.21,
    backgroundColor: '#54C0DA1A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  screenTitle: {
    textAlign: 'center',
    color: pblicvcepromptrTitle,
    fontSize: 20.127,
    fontWeight: '700',
    marginRight: 35.124,
  },
  headerSpacer: {
    width: 0,
  },
  hero: {
    alignItems: 'center',
    marginBottom: 16,
  },
  heroIcon: {
    width: 96.021,
    height: 96.021,
    borderRadius: 24.021,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10.12,
  },
  heroIconText: {
    fontSize: 32.22,
  },
  categoryBadge: {
    borderRadius: 12.142,
    paddingHorizontal: 14.162,
    paddingVertical: 6.12,
  },
  categoryBadgeText: {
    fontSize: 13,
    fontWeight: '700',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 22,
    marginBottom: 20.12,
    shadowColor: '#0A1F33',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.06,
    shadowRadius: 12.12,
    elevation: 3,
  },
  cardTitle: {
    color: pblicvcepromptrTitle,
    fontSize: 20.127,
    fontWeight: '800',
    marginBottom: 12.162,
    textAlign: 'center',
  },
  cardBody: {
    color: pblicvcepromptrMuted,
    fontSize: 15.129,
    lineHeight: 24,
    textAlign: 'center',
  },
  actions: {
    flexDirection: 'row',
    gap: 12.162,
  },
  shareBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    height: 52.14,
    borderWidth: 1,
    borderColor: '#54C0DA40',
  },
  shareBtnIcon: {
    color: pblicvcepromptrAccentAlt,
    fontSize: 18.129,
    fontWeight: '600',
  },
  shareBtnText: {
    color: pblicvcepromptrAccentAlt,
    fontSize: 15.129,
    fontWeight: '700',
  },
  nextWrap: {
    flex: 1,
  },
  nextBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: 16,
    height: 52.14,
  },
  nextBtnIcon: {
    color: '#FFFFFF',
    fontSize: 18.129,
    fontWeight: '700',
  },
  nextBtnText: {
    color: '#FFFFFF',
    fontSize: 15.129,
    fontWeight: '700',
  },
  pressed: {
    opacity: 0.92,
  },
});
