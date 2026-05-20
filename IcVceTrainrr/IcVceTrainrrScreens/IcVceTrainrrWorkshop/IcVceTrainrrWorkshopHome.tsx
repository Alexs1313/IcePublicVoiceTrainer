import {useFocusEffect, useNavigation} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import React, {useCallback, useState} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';

import {useSafeAreaInsets} from 'react-native-safe-area-context';

import IcVceTrainrrLayout from '../../IcVceTrainrrComponents/IcVceTrainrrLayout';
import IcVceTrainrrPromptrStreakHeader from '../../IcVceTrainrrComponents/IcVceTrainrrPromptr/IcVceTrainrrPromptrStreakHeader';
import {icVceTrainrrGetLibraryTexts} from '../../IcVceTrainrrData/IcVceTrainrrTextLibraryStore';
import {
  icVceTrainrrPROMPTR_CATEGORIES,
  type PromptrCategory,
  type PromptrCategoryId,
} from '../../IcVceTrainrrData/IcVceTrainrrPromptrTexts';
import type {IcVceTrainrrWorkshopStackParamList} from '../../IcVceTrainrrRoutes/IcVceTrainrrWorkshopTypes';
import {
  icVceTrainrrPblicvcepromptrAccentAlt,
  icVceTrainrrPblicvcepromptrMuted,
  icVceTrainrrPblicvcepromptrTitle,
} from '../../IcVceTrainrrTheme/IcVceTrainrrPromptrTheme';

type Nav = StackNavigationProp<
  IcVceTrainrrWorkshopStackParamList,
  'IcVceTrainrrWorkshopHome'
>;

const IcVceTrainrrCategoryRow = ({
  item,
  count,
  onPress,
}: {
  item: PromptrCategory;
  count: number;
  onPress: () => void;
}) => (
  <Pressable
    onPress={onPress}
    style={({pressed}) => [
      icVceTrainrrStyles.icVceTrainrrCard,
      pressed && icVceTrainrrStyles.icVceTrainrrCardPressed,
    ]}>
    <View
      style={[
        icVceTrainrrStyles.icVceTrainrrCardIcon,
        {backgroundColor: item.iconBg},
      ]}>
      <Text style={icVceTrainrrStyles.icVceTrainrrCardIconText}>
        {item.icon}
      </Text>
    </View>
    <View style={icVceTrainrrStyles.icVceTrainrrCardBody}>
      <Text style={icVceTrainrrStyles.icVceTrainrrCardTitle}>{item.title}</Text>
      <Text style={icVceTrainrrStyles.icVceTrainrrCardDesc}>
        {count} {count === 1 ? 'text' : 'texts'}
      </Text>
    </View>
    <Image
      source={require('../../IcVceTrainrrAssets/IcVceTrainrrImages/IcVceTrainrrPblicvcetraifarr.png')}
    />
  </Pressable>
);

const IcVceTrainrrWorkshopHome = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<Nav>();
  const [counts, setCounts] = useState<Record<PromptrCategoryId, number>>({
    'public-speaking': 0,
    diction: 0,
    storytelling: 0,
  });

  const loadCounts = useCallback(async () => {
    const next = {} as Record<PromptrCategoryId, number>;
    await Promise.all(
      icVceTrainrrPROMPTR_CATEGORIES.map(async category => {
        const texts = await icVceTrainrrGetLibraryTexts(category.id);
        next[category.id] = texts.length;
      }),
    );
    setCounts(next);
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadCounts();
    }, [loadCounts]),
  );

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
          <Text style={icVceTrainrrStyles.icVceTrainrrOverline}>WORKSHOP</Text>
          <Text style={icVceTrainrrStyles.icVceTrainrrHeading}>
            Text Library
          </Text>
          <Text style={icVceTrainrrStyles.icVceTrainrrSubtitle}>
            Browse, edit, and create your own practice texts.
          </Text>

          <View style={icVceTrainrrStyles.icVceTrainrrCards}>
            {icVceTrainrrPROMPTR_CATEGORIES.map(item => (
              <IcVceTrainrrCategoryRow
                key={item.id}
                item={item}
                count={counts[item.id]}
                onPress={() =>
                  navigation.navigate('IcVceTrainrrWorkshopTextList', {
                    categoryId: item.id,
                    categoryTitle: item.title,
                  })
                }
              />
            ))}
          </View>
        </View>
      </View>
    </IcVceTrainrrLayout>
  );
};

export default IcVceTrainrrWorkshopHome;

const icVceTrainrrStyles = StyleSheet.create({
  icVceTrainrrContent: {},
  icVceTrainrrBody: {
    paddingHorizontal: 20.3112,
  },
  icVceTrainrrOverline: {
    color: icVceTrainrrPblicvcepromptrAccentAlt,
    fontSize: 13.162,
    fontWeight: '600',
    letterSpacing: 1.4,
    marginBottom: 6.12,
    marginTop: 14.161,
  },
  icVceTrainrrHeading: {
    color: icVceTrainrrPblicvcepromptrTitle,
    fontSize: 28.01,
    fontWeight: '800',
    marginBottom: 8.133,
  },
  icVceTrainrrSubtitle: {
    color: icVceTrainrrPblicvcepromptrMuted,
    fontSize: 15.229,
    lineHeight: 21,
    marginBottom: 20.12,
  },
  icVceTrainrrCards: {
    gap: 12.01,
  },
  icVceTrainrrCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 22.12,
    padding: 16,
    shadowColor: '#0A1F33',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.06,
    shadowRadius: 12.12,
    elevation: 3,
  },
  icVceTrainrrCardPressed: {
    opacity: 0.92,
  },
  icVceTrainrrCardIcon: {
    width: 64.021,
    height: 64.021,
    borderRadius: 16.022,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14.021,
  },
  icVceTrainrrCardIconText: {
    fontSize: 26.213,
  },
  icVceTrainrrCardBody: {
    flex: 1,
    paddingRight: 8,
  },
  icVceTrainrrCardTitle: {
    color: icVceTrainrrPblicvcepromptrTitle,
    fontSize: 17.17,
    fontWeight: '700',
    marginBottom: 4,
  },
  icVceTrainrrCardDesc: {
    color: icVceTrainrrPblicvcepromptrMuted,
    fontSize: 13.11,
    lineHeight: 18,
  },
});
