import {useNavigation} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import IcVceTrainrrLayout from '../../IcVceTrainrrComponents/IcVceTrainrrLayout';
import IcVceTrainrrPromptrStreakHeader from '../../IcVceTrainrrComponents/IcVceTrainrrPromptr/IcVceTrainrrPromptrStreakHeader';
import {
  icVceTrainrrPROMPTR_CATEGORIES,
  type PromptrCategory,
} from '../../IcVceTrainrrData/IcVceTrainrrPromptrTexts';
import type {IcVceTrainrrPromptrStackParamList} from '../../IcVceTrainrrRoutes/IcVceTrainrrPromptrTypes';
import {
  icVceTrainrrPblicvcepromptrAccentAlt,
  icVceTrainrrPblicvcepromptrMuted,
  icVceTrainrrPblicvcepromptrTitle,
} from '../../IcVceTrainrrTheme/IcVceTrainrrPromptrTheme';

type Nav = StackNavigationProp<IcVceTrainrrPromptrStackParamList, 'IcVceTrainrrPromptrHome'>;

const IcVceTrainrrCategoryRow = ({
  item,
  onPress,
}: {
  item: PromptrCategory;
  onPress: () => void;
}) => (
  <Pressable
    onPress={onPress}
    style={({pressed}) => [icVceTrainrrStyles.icVceTrainrrCard, pressed && icVceTrainrrStyles.icVceTrainrrCardPressed]}>
    <View style={[icVceTrainrrStyles.icVceTrainrrCardIcon, {backgroundColor: item.iconBg}]}>
      <Text style={icVceTrainrrStyles.icVceTrainrrCardIconText}>{item.icon}</Text>
    </View>
    <View style={icVceTrainrrStyles.icVceTrainrrCardBody}>
      <Text style={icVceTrainrrStyles.icVceTrainrrCardTitle}>{item.title}</Text>
      <Text style={icVceTrainrrStyles.icVceTrainrrCardDesc}>{item.description}</Text>
    </View>
    <Image source={require('../../IcVceTrainrrAssets/IcVceTrainrrImages/IcVceTrainrrPblicvcetraifarr.png')} />
  </Pressable>
);

const IcVceTrainrrPromptrHome = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<Nav>();

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
          <Text style={icVceTrainrrStyles.icVceTrainrrOverline}>TELEPROMPTER</Text>
          <Text style={icVceTrainrrStyles.icVceTrainrrHeading}>Choose Category</Text>
          <Text style={icVceTrainrrStyles.icVceTrainrrSubtitle}>
            Select a text type to begin your practice session.
          </Text>

          <View style={icVceTrainrrStyles.icVceTrainrrCards}>
            {icVceTrainrrPROMPTR_CATEGORIES.map(item => (
              <IcVceTrainrrCategoryRow
                key={item.id}
                item={item}
                onPress={() =>
                  navigation.navigate('IcVceTrainrrPromptrTextList', {
                    categoryId: item.id,
                    categoryTitle: item.title,
                  })
                }
              />
            ))}
          </View>

          <View style={icVceTrainrrStyles.icVceTrainrrTip}>
            <Text style={icVceTrainrrStyles.icVceTrainrrTipText}>
              💡 Tip: Start with{' '}
              <Text style={icVceTrainrrStyles.icVceTrainrrTipHighlight}>Diction Practice</Text> to warm
              up your articulation
            </Text>
          </View>
        </View>
      </View>
    </IcVceTrainrrLayout>
  );
};

export default IcVceTrainrrPromptrHome;

const icVceTrainrrStyles = StyleSheet.create({
  icVceTrainrrContent: {},
  icVceTrainrrBody: {
    paddingHorizontal: 20.332,
  },
  icVceTrainrrOverline: {
    color: icVceTrainrrPblicvcepromptrAccentAlt,
    fontSize: 13.162,
    fontWeight: '600',
    letterSpacing: 1.4,
    marginBottom: 6.12,
    marginTop: 14,
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
    gap: 12.021,
  },
  icVceTrainrrCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
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
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14.021,
  },
  icVceTrainrrCardIconText: {
    fontSize: 26.213,
  },
  icVceTrainrrCardBody: {
    flex: 1,
    paddingRight: 8.021,
  },
  icVceTrainrrCardTitle: {
    color: icVceTrainrrPblicvcepromptrTitle,
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 4,
  },
  icVceTrainrrCardDesc: {
    color: icVceTrainrrPblicvcepromptrMuted,
    fontSize: 13,
    lineHeight: 18,
  },
  icVceTrainrrTip: {
    marginTop: 18,
    backgroundColor: '#54C0DA14',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: '#54C0DA26',
  },
  icVceTrainrrTipText: {
    color: icVceTrainrrPblicvcepromptrAccentAlt,
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
  },
  icVceTrainrrTipHighlight: {
    fontWeight: '700',
  },
});
