import {useNavigation, useRoute} from '@react-navigation/native';
import type {RouteProp} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import React, {useMemo} from 'react';
import {Image, Pressable, Share, StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import IcVceTrainrrLayout from '../../IcVceTrainrrComponents/IcVceTrainrrLayout';
import IcVceTrainrrPromptrStreakHeader from '../../IcVceTrainrrComponents/IcVceTrainrrPromptr/IcVceTrainrrPromptrStreakHeader';
import {icVceTrainrrGetTipCategory, type SpeakingTip} from '../../IcVceTrainrrData/IcVceTrainrrTipsData';
import type {IcVceTrainrrTipsStackParamList} from '../../IcVceTrainrrRoutes/IcVceTrainrrTipsTypes';
import {
  icVceTrainrrPblicvcepromptrAccentAlt,
  icVceTrainrrPblicvcepromptrMuted,
  icVceTrainrrPblicvcepromptrTitle,
} from '../../IcVceTrainrrTheme/IcVceTrainrrPromptrTheme';

type Nav = StackNavigationProp<IcVceTrainrrTipsStackParamList, 'IcVceTrainrrTipsCategoryList'>;
type Route = RouteProp<IcVceTrainrrTipsStackParamList, 'IcVceTrainrrTipsCategoryList'>;

const IcVceTrainrrTipCard = ({
  tip,
  categoryTitle,
}: {
  tip: SpeakingTip;
  categoryTitle: string;
}) => {
  const shareTip = async () => {
    try {
      await Share.share({
        message: `${tip.title}\n\n${tip.body}\n\n— ${categoryTitle} · Ice Public Voice Trainer`,
        title: tip.title,
      });
    } catch {
      console.log('Error sharing tip');
    }
  };

  return (
    <View style={icVceTrainrrStyles.icVceTrainrrTipCard}>
      <View style={icVceTrainrrStyles.icVceTrainrrTipTop}>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
          <View style={icVceTrainrrStyles.icVceTrainrrTipBadge}>
            <Text style={icVceTrainrrStyles.icVceTrainrrTipBadgeText}>#{tip.number}</Text>
          </View>

          <Text style={icVceTrainrrStyles.icVceTrainrrTipTitle}>{tip.title}</Text>
        </View>
        <Pressable
          onPress={shareTip}
          style={({pressed}) => [icVceTrainrrStyles.icVceTrainrrShareBtn, pressed && icVceTrainrrStyles.icVceTrainrrPressed]}>
          <Image
            source={require('../../IcVceTrainrrAssets/IcVceTrainrrImages/IcVceTrainrrPblicvcetraistshr.png')}
            style={{width: 13, height: 13}}
          />
        </Pressable>
      </View>

      <Text style={icVceTrainrrStyles.icVceTrainrrTipBody}>{tip.body}</Text>
    </View>
  );
};

const IcVceTrainrrTipsCategoryList = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<Nav>();
  const route = useRoute<Route>();
  const category = useMemo(
    () => icVceTrainrrGetTipCategory(route.params.categoryId),
    [route.params.categoryId],
  );

  if (!category) {
    return null;
  }

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
            <View style={icVceTrainrrStyles.icVceTrainrrHeaderTitles}>
              <View style={icVceTrainrrStyles.icVceTrainrrTitleRow}>
                <Text style={icVceTrainrrStyles.icVceTrainrrCategoryIcon}>{category.icon}</Text>
                <Text style={icVceTrainrrStyles.icVceTrainrrHeading}>{category.title}</Text>
              </View>
              <Text style={icVceTrainrrStyles.icVceTrainrrCount}>
                {category.tips.length}{' '}
                {category.tips.length === 1 ? 'tip' : 'tips'}
              </Text>
            </View>
          </View>

          <View style={icVceTrainrrStyles.icVceTrainrrList}>
            {category.tips.map(tip => (
              <IcVceTrainrrTipCard key={tip.id} tip={tip} categoryTitle={category.title} />
            ))}
          </View>
        </View>
      </View>
    </IcVceTrainrrLayout>
  );
};

export default IcVceTrainrrTipsCategoryList;

const icVceTrainrrStyles = StyleSheet.create({
  icVceTrainrrContent: {},
  icVceTrainrrBody: {
    paddingHorizontal: 20,
  },
  icVceTrainrrHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 18,
  },
  icVceTrainrrBackBtn: {
    width: 35.124,
    height: 35.124,
    borderRadius: 14,
    backgroundColor: '#54C0DA1A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icVceTrainrrHeaderTitles: {
    flex: 1,
  },
  icVceTrainrrTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 2,
  },
  icVceTrainrrCategoryIcon: {
    fontSize: 22.191,
  },
  icVceTrainrrHeading: {
    color: icVceTrainrrPblicvcepromptrTitle,
    fontSize: 20.129,
    fontWeight: '700',
  },
  icVceTrainrrCount: {
    color: '#8AA8B8',
    fontSize: 12,
    fontWeight: '400',
    marginTop: 2,
  },
  icVceTrainrrList: {
    gap: 12,
  },
  icVceTrainrrTipCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22.12,
    padding: 18.12,
    shadowColor: '#0A1F33',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.06,
    shadowRadius: 12.144,
    elevation: 3,
  },
  icVceTrainrrTipTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10.12,
  },
  icVceTrainrrTipBadge: {
    backgroundColor: '#E8F7FB',
    borderRadius: 14.21,
    width: 30.12,
    height: 30.12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icVceTrainrrTipBadgeText: {
    color: icVceTrainrrPblicvcepromptrAccentAlt,
    fontSize: 12.162,
    fontWeight: '700',
  },
  icVceTrainrrShareBtn: {
    width: 32.12,
    height: 32.12,
    borderRadius: 12.162,
    backgroundColor: 'rgba(107, 138, 158, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icVceTrainrrShareIcon: {
    color: icVceTrainrrPblicvcepromptrMuted,
    fontSize: 18.12,
    fontWeight: '600',
  },
  icVceTrainrrTipTitle: {
    color: icVceTrainrrPblicvcepromptrTitle,
    fontSize: 17.199,
    fontWeight: '700',
  },
  icVceTrainrrTipBody: {
    color: icVceTrainrrPblicvcepromptrMuted,
    fontSize: 14,
    lineHeight: 22,
  },
  icVceTrainrrPressed: {
    opacity: 0.92,
  },
});
