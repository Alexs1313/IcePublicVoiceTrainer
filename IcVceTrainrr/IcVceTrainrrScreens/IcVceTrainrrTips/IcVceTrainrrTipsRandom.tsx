import IcVceTrainrrPromptrStreakHeader from '../../IcVceTrainrrComponents/IcVceTrainrrPromptr/IcVceTrainrrPromptrStreakHeader';
import {icVceTrainrrGetRandomTip} from '../../IcVceTrainrrData/IcVceTrainrrTipsData';

import {useNavigation} from '@react-navigation/native';

import type {StackNavigationProp} from '@react-navigation/stack';
import React, {useCallback, useState} from 'react';
import {Image, Pressable, Share, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import IcVceTrainrrLayout from '../../IcVceTrainrrComponents/IcVceTrainrrLayout';

import type {IcVceTrainrrTipsStackParamList} from '../../IcVceTrainrrRoutes/IcVceTrainrrTipsTypes';
import {
  icVceTrainrrPblicvcepromptrAccentAlt,
  icVceTrainrrPblicvcepromptrMuted,
  icVceTrainrrPblicvcepromptrTitle,
} from '../../IcVceTrainrrTheme/IcVceTrainrrPromptrTheme';

type Nav = StackNavigationProp<
  IcVceTrainrrTipsStackParamList,
  'IcVceTrainrrTipsRandom'
>;

const IcVceTrainrrTipsRandom = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<Nav>();
  const [current, setCurrent] = useState(() => icVceTrainrrGetRandomTip());

  const pickNext = useCallback(() => {
    let next = icVceTrainrrGetRandomTip();
    while (next.id === current.id && next.category.tips.length > 1) {
      next = icVceTrainrrGetRandomTip();
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
    <IcVceTrainrrLayout>
      <View
        style={[
          icVceTrainrrStyles.icVceTrainrrContent,
          {
            paddingTop: Math.max(insets.top, 52),
            paddingBottom: 24 + insets.bottom,
          },
        ]}>
        <IcVceTrainrrPromptrStreakHeader />

        <View style={icVceTrainrrStyles.icVceTrainrrBody}>
          <View style={icVceTrainrrStyles.icVceTrainrrHeaderRow}>
            <Pressable
              onPress={() => navigation.goBack()}
              style={({pressed}) => [
                icVceTrainrrStyles.icVceTrainrrBackBtn,
                pressed && icVceTrainrrStyles.icVceTrainrrPressed,
              ]}>
              <Image
                source={require('../../IcVceTrainrrAssets/IcVceTrainrrImages/IcVceTrainrrPblicvcetraiback.png')}
              />
            </Pressable>
            <Text style={icVceTrainrrStyles.icVceTrainrrScreenTitle}>
              Random Tip
            </Text>
            <View style={icVceTrainrrStyles.icVceTrainrrHeaderSpacer} />
          </View>

          <View style={icVceTrainrrStyles.icVceTrainrrHero}>
            <View
              style={[
                icVceTrainrrStyles.icVceTrainrrHeroIcon,
                {backgroundColor: current.category.iconBg},
              ]}>
              <Text style={icVceTrainrrStyles.icVceTrainrrHeroIconText}>
                {current.category.icon}
              </Text>
            </View>
            <View
              style={[
                icVceTrainrrStyles.icVceTrainrrCategoryBadge,
                {backgroundColor: `${current.category.badgeColor}22`},
              ]}>
              <Text
                style={[
                  icVceTrainrrStyles.icVceTrainrrCategoryBadgeText,
                  {color: current.category.badgeColor},
                ]}>
                {current.category.title}
              </Text>
            </View>
          </View>

          <View style={icVceTrainrrStyles.icVceTrainrrCard}>
            <Text style={icVceTrainrrStyles.icVceTrainrrCardTitle}>
              {current.title}
            </Text>
            <Text style={icVceTrainrrStyles.icVceTrainrrCardBody}>
              {current.body}
            </Text>
          </View>

          <View style={icVceTrainrrStyles.icVceTrainrrActions}>
            <Pressable
              onPress={shareTip}
              style={({pressed}) => [
                icVceTrainrrStyles.icVceTrainrrShareBtn,
                pressed && icVceTrainrrStyles.icVceTrainrrPressed,
              ]}>
              <Image
                source={require('../../IcVceTrainrrAssets/IcVceTrainrrImages/IcVceTrainrrPblicvcetrshrbt.png')}
              />
              <Text style={icVceTrainrrStyles.icVceTrainrrShareBtnText}>
                Share
              </Text>
            </Pressable>

            <Pressable
              onPress={pickNext}
              style={({pressed}) => [
                icVceTrainrrStyles.icVceTrainrrNextWrap,
                pressed && icVceTrainrrStyles.icVceTrainrrPressed,
              ]}>
              <LinearGradient
                colors={['#E4AD1B', '#F07911']}
                style={icVceTrainrrStyles.icVceTrainrrNextBtn}>
                <Image
                  source={require('../../IcVceTrainrrAssets/IcVceTrainrrImages/IcVceTrainrrPblicvcetrrndbt.png')}
                />
                <Text style={icVceTrainrrStyles.icVceTrainrrNextBtnText}>
                  Next Tip
                </Text>
              </LinearGradient>
            </Pressable>
          </View>
        </View>
      </View>
    </IcVceTrainrrLayout>
  );
};

export default IcVceTrainrrTipsRandom;

const icVceTrainrrStyles = StyleSheet.create({
  icVceTrainrrContent: {},
  icVceTrainrrBody: {
    paddingHorizontal: 20.312,
  },
  icVceTrainrrHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20.12,
    gap: 10.12,
  },
  icVceTrainrrBackBtn: {
    width: 35.124,
    height: 35.124,
    borderRadius: 14.21,
    backgroundColor: '#54C0DA1A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icVceTrainrrScreenTitle: {
    textAlign: 'center',
    color: icVceTrainrrPblicvcepromptrTitle,
    fontSize: 20.127,
    fontWeight: '700',
    marginRight: 35.124,
  },
  icVceTrainrrHeaderSpacer: {
    width: 0,
  },
  icVceTrainrrHero: {
    alignItems: 'center',
    marginBottom: 16,
  },
  icVceTrainrrHeroIcon: {
    width: 96.021,
    height: 96.021,
    borderRadius: 24.021,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10.12,
  },
  icVceTrainrrHeroIconText: {
    fontSize: 32.22,
  },
  icVceTrainrrCategoryBadge: {
    borderRadius: 12.142,
    paddingHorizontal: 14.162,
    paddingVertical: 6.12,
  },
  icVceTrainrrCategoryBadgeText: {
    fontSize: 13,
    fontWeight: '700',
  },
  icVceTrainrrCard: {
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
  icVceTrainrrCardTitle: {
    color: icVceTrainrrPblicvcepromptrTitle,
    fontSize: 20.127,
    fontWeight: '800',
    marginBottom: 12.162,
    textAlign: 'center',
  },
  icVceTrainrrCardBody: {
    color: icVceTrainrrPblicvcepromptrMuted,
    fontSize: 15.129,
    lineHeight: 24,
    textAlign: 'center',
  },
  icVceTrainrrActions: {
    flexDirection: 'row',
    gap: 12.162,
  },
  icVceTrainrrShareBtn: {
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
  icVceTrainrrShareBtnIcon: {
    color: icVceTrainrrPblicvcepromptrAccentAlt,
    fontSize: 18.129,
    fontWeight: '600',
  },
  icVceTrainrrShareBtnText: {
    color: icVceTrainrrPblicvcepromptrAccentAlt,
    fontSize: 15.129,
    fontWeight: '700',
  },
  icVceTrainrrNextWrap: {
    flex: 1,
  },
  icVceTrainrrNextBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: 16,
    height: 52.14,
  },
  icVceTrainrrNextBtnIcon: {
    color: '#FFFFFF',
    fontSize: 18.129,
    fontWeight: '700',
  },
  icVceTrainrrNextBtnText: {
    color: '#FFFFFF',
    fontSize: 15.129,
    fontWeight: '700',
  },
  icVceTrainrrPressed: {
    opacity: 0.92,
  },
});
