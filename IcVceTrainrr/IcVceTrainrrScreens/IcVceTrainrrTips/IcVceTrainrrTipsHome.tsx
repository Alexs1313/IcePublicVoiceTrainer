import type {IcVceTrainrrTipsStackParamList} from '../../IcVceTrainrrRoutes/IcVceTrainrrTipsTypes';
import {
  icVceTrainrrPblicvcepromptrAccentAlt,
  icVceTrainrrPblicvcepromptrMuted,
  icVceTrainrrPblicvcepromptrTitle,
} from '../../IcVceTrainrrTheme/IcVceTrainrrPromptrTheme';

import {useNavigation} from '@react-navigation/native';

import type {StackNavigationProp} from '@react-navigation/stack';

import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import IcVceTrainrrLayout from '../../IcVceTrainrrComponents/IcVceTrainrrLayout';
import IcVceTrainrrPromptrStreakHeader from '../../IcVceTrainrrComponents/IcVceTrainrrPromptr/IcVceTrainrrPromptrStreakHeader';
import {
  icVceTrainrrTIP_CATEGORIES,
  type TipCategory,
} from '../../IcVceTrainrrData/IcVceTrainrrTipsData';

type Nav = StackNavigationProp<
  IcVceTrainrrTipsStackParamList,
  'IcVceTrainrrTipsHome'
>;

const IcVceTrainrrCategoryRow = ({
  item,
  onPress,
}: {
  item: TipCategory;
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
        {item.description}
      </Text>
      <Text style={icVceTrainrrStyles.icVceTrainrrCardCount}>
        {item.tips.length} {item.tips.length === 1 ? 'tip' : 'tips'}
      </Text>
    </View>
    <Image
      source={require('../../IcVceTrainrrAssets/IcVceTrainrrImages/IcVceTrainrrPblicvcetraifarr.png')}
    />
  </Pressable>
);

const IcVceTrainrrTipsHome = () => {
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
          <Text style={icVceTrainrrStyles.icVceTrainrrOverline}>TIPS</Text>
          <Text style={icVceTrainrrStyles.icVceTrainrrHeading}>
            Speaking Tips
          </Text>
          <Text style={icVceTrainrrStyles.icVceTrainrrSubtitle}>
            Curated advice to sharpen your oratory skills.
          </Text>

          <Pressable
            onPress={() => navigation.navigate('IcVceTrainrrTipsRandom')}
            style={({pressed}) => [
              pressed && icVceTrainrrStyles.icVceTrainrrCardPressed,
            ]}>
            <LinearGradient
              colors={['#E4AD1B', '#F07911']}
              style={icVceTrainrrStyles.icVceTrainrrRandomBtn}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 10,
                  padding: 16,
                }}>
                <View style={icVceTrainrrStyles.icVceTrainrrRandomIconWrap}>
                  <Image
                    source={require('../../IcVceTrainrrAssets/IcVceTrainrrImages/IcVceTrainrrPblicvcetrrand.png')}
                  />
                </View>
                <View style={icVceTrainrrStyles.icVceTrainrrRandomTextWrap}>
                  <Text style={icVceTrainrrStyles.icVceTrainrrRandomTitle}>
                    Practice Tip
                  </Text>
                  <Text style={icVceTrainrrStyles.icVceTrainrrRandomSubtitle}>
                    Discover a helpful speaking suggestion
                  </Text>
                </View>
              </View>
            </LinearGradient>
          </Pressable>

          <Text style={icVceTrainrrStyles.icVceTrainrrSectionLabel}>
            Browse by Category
          </Text>

          <View style={icVceTrainrrStyles.icVceTrainrrCards}>
            {icVceTrainrrTIP_CATEGORIES.map(item => (
              <IcVceTrainrrCategoryRow
                key={item.id}
                item={item}
                onPress={() =>
                  navigation.navigate('IcVceTrainrrTipsCategoryList', {
                    categoryId: item.id,
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

export default IcVceTrainrrTipsHome;

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
  icVceTrainrrRandomBtn: {
    borderRadius: 22.12,
    minHeight: 90,
    marginBottom: 22.12,
    shadowColor: '#F5A623',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.25,
    shadowRadius: 12.12,
    elevation: 4,

    justifyContent: 'center',
  },
  icVceTrainrrRandomIconWrap: {
    width: 55.131,
    height: 55.137,
    borderRadius: 16.12,
    backgroundColor: '#FFFFFF33',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14.162,
  },
  icVceTrainrrRandomIcon: {
    color: '#FFFFFF',
    fontSize: 22.191,
    fontWeight: '700',
  },
  icVceTrainrrRandomTextWrap: {
    flex: 1,
  },
  icVceTrainrrRandomTitle: {
    color: '#FFFFFF',
    fontSize: 18.129,
    fontWeight: '800',
    marginBottom: 4.12,
  },
  icVceTrainrrRandomSubtitle: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 13.15,
    lineHeight: 18,
  },
  icVceTrainrrSectionLabel: {
    color: icVceTrainrrPblicvcepromptrMuted,
    fontSize: 15.129,
    fontWeight: '600',
    marginBottom: 14.162,
  },
  icVceTrainrrCards: {
    gap: 12,
  },
  icVceTrainrrCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 22.12,
    padding: 16.12,
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
    marginRight: 14.52,
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
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 4,
  },
  icVceTrainrrCardDesc: {
    color: icVceTrainrrPblicvcepromptrMuted,
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 4,
  },
  icVceTrainrrCardCount: {
    color: icVceTrainrrPblicvcepromptrAccentAlt,
    fontSize: 13,
    fontWeight: '600',
  },
});
