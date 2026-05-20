import {useNavigation} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import IcVceTrainrrLayout from '../../IcVceTrainrrComponents/IcVceTrainrrLayout';
import IcVceTrainrrPromptrStreakHeader from '../../IcVceTrainrrComponents/IcVceTrainrrPromptr/IcVceTrainrrPromptrStreakHeader';
import type {IcVceTrainrrBattleStackParamList} from '../../IcVceTrainrrRoutes/IcVceTrainrrBattleTypes';
import {icVceTrainrrBATTLE_ORANGE_GRADIENT} from '../../IcVceTrainrrTheme/IcVceTrainrrBattleTheme';
import {
  icVceTrainrrPblicvcepromptrMuted,
  icVceTrainrrPblicvcepromptrTitle,
} from '../../IcVceTrainrrTheme/IcVceTrainrrPromptrTheme';

type Nav = StackNavigationProp<
  IcVceTrainrrBattleStackParamList,
  'IcVceTrainrrBattleHome'
>;

const icVceTrainrrINFO_ITEMS = [
  {
    icon: '👥',
    iconBg: '#E3F4FC',
    title: '2 Speakers',
    desc: 'Two users practice reading aloud with clear expression',
  },
  {
    icon: '💬',
    iconBg: '#FFF5D6',
    title: 'Friendly Feedback',
    desc: 'Listeners choose the reading that felt clearer or more expressive',
  },
  {
    icon: '🌟',
    iconBg: '#FFE8DC',
    title: 'Practice Result',
    desc: 'See a simple result to reflect on your speaking progress',
  },
];

const IcVceTrainrrBattleHome = () => {
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
          <View style={icVceTrainrrStyles.icVceTrainrrHero}>
            <LinearGradient
              colors={[...icVceTrainrrBATTLE_ORANGE_GRADIENT]}
              style={icVceTrainrrStyles.icVceTrainrrHeroIcon}>
              <Text style={icVceTrainrrStyles.icVceTrainrrHeroEmoji}>🏆</Text>
            </LinearGradient>
            <Text style={icVceTrainrrStyles.icVceTrainrrOverline}>
              MINI GAME
            </Text>
            <Text style={icVceTrainrrStyles.icVceTrainrrHeading}>
              Diction Battle
            </Text>
          </View>

          <View style={icVceTrainrrStyles.icVceTrainrrCards}>
            {icVceTrainrrINFO_ITEMS.map(item => (
              <View
                key={item.title}
                style={icVceTrainrrStyles.icVceTrainrrCard}>
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
                  <Text style={icVceTrainrrStyles.icVceTrainrrCardTitle}>
                    {item.title}
                  </Text>
                  <Text style={icVceTrainrrStyles.icVceTrainrrCardDesc}>
                    {item.desc}
                  </Text>
                </View>
              </View>
            ))}
          </View>

          <Pressable
            onPress={() =>
              navigation.navigate('IcVceTrainrrBattleEnterPlayers')
            }
            style={({pressed}) => [
              pressed && icVceTrainrrStyles.icVceTrainrrPressed,
            ]}>
            <LinearGradient
              colors={[...icVceTrainrrBATTLE_ORANGE_GRADIENT]}
              style={icVceTrainrrStyles.icVceTrainrrCta}>
              <Text style={icVceTrainrrStyles.icVceTrainrrCtaText}>
                Start Battle ⚔️
              </Text>
            </LinearGradient>
          </Pressable>
        </View>
      </View>
    </IcVceTrainrrLayout>
  );
};

export default IcVceTrainrrBattleHome;

const icVceTrainrrStyles = StyleSheet.create({
  icVceTrainrrContent: {},
  icVceTrainrrBody: {
    paddingHorizontal: 20.12,
  },
  icVceTrainrrHero: {
    alignItems: 'center',
    marginBottom: 22.5233,
    marginTop: 8,
  },
  icVceTrainrrHeroIcon: {
    width: 111.121,
    height: 111.121,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14.162,
    shadowColor: '#F5A623',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.3,
    shadowRadius: 16.12,
    elevation: 6,
  },
  icVceTrainrrHeroEmoji: {
    fontSize: 40.101,
  },
  icVceTrainrrOverline: {
    color: '#F07911',
    fontSize: 13.162,
    fontWeight: '700',
    letterSpacing: 1.4,
    marginBottom: 6.162,
  },
  icVceTrainrrHeading: {
    color: icVceTrainrrPblicvcepromptrTitle,
    fontSize: 30.121,
    fontWeight: '800',
  },
  icVceTrainrrCards: {
    gap: 12.162,
    marginBottom: 22,
  },
  icVceTrainrrCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 16.12,
    shadowColor: '#0A1F33',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.06,
    shadowRadius: 12.162,
    elevation: 3,
  },
  icVceTrainrrCardIcon: {
    width: 52.131,
    height: 52.131,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14.162,
  },
  icVceTrainrrCardIconText: {
    fontSize: 24.162,
  },
  icVceTrainrrCardBody: {
    flex: 1,
  },
  icVceTrainrrCardTitle: {
    color: icVceTrainrrPblicvcepromptrTitle,
    fontSize: 16.129,
    fontWeight: '700',
    marginBottom: 4,
  },
  icVceTrainrrCardDesc: {
    color: icVceTrainrrPblicvcepromptrMuted,
    fontSize: 13,
    lineHeight: 18,
  },
  icVceTrainrrCta: {
    borderRadius: 16,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#F5A623',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 4,
  },
  icVceTrainrrCtaText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
  },
  icVceTrainrrPressed: {
    opacity: 0.92,
  },
});
