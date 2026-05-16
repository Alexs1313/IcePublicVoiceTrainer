import {useNavigation} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import Layout from '../../components/Layout';
import PromptrStreakHeader from '../../components/promptr/PromptrStreakHeader';
import type {BattleStackParamList} from '../../routes/battleTypes';
import {BATTLE_ORANGE_GRADIENT} from '../../theme/battleTheme';
import {
  pblicvcepromptrMuted,
  pblicvcepromptrTitle,
} from '../../theme/promptrTheme';

type Nav = StackNavigationProp<BattleStackParamList, 'BattleHome'>;

const INFO_ITEMS = [
  {
    icon: '👥',
    iconBg: '#E3F4FC',
    title: '2 Players',
    desc: 'Each player reads aloud with expression',
  },
  {
    icon: '⚖️',
    iconBg: '#FFF5D6',
    title: 'Crowd Votes',
    desc: 'Audience votes for the best speaker in 30 seconds',
  },
  {
    icon: '🏆',
    iconBg: '#FFE8DC',
    title: 'Winner Takes All',
    desc: 'The most votes wins the Diction Battle!',
  },
];

const BattleHome = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<Nav>();

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
          <View style={styles.hero}>
            <LinearGradient
              colors={[...BATTLE_ORANGE_GRADIENT]}
              style={styles.heroIcon}>
              <Text style={styles.heroEmoji}>🏆</Text>
            </LinearGradient>
            <Text style={styles.overline}>MINI GAME</Text>
            <Text style={styles.heading}>Diction Battle</Text>
          </View>

          <View style={styles.cards}>
            {INFO_ITEMS.map(item => (
              <View key={item.title} style={styles.card}>
                <View style={[styles.cardIcon, {backgroundColor: item.iconBg}]}>
                  <Text style={styles.cardIconText}>{item.icon}</Text>
                </View>
                <View style={styles.cardBody}>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <Text style={styles.cardDesc}>{item.desc}</Text>
                </View>
              </View>
            ))}
          </View>

          <Pressable
            onPress={() => navigation.navigate('BattleEnterPlayers')}
            style={({pressed}) => [pressed && styles.pressed]}>
            <LinearGradient
              colors={[...BATTLE_ORANGE_GRADIENT]}
              style={styles.cta}>
              <Text style={styles.ctaText}>Start Battle ⚔️</Text>
            </LinearGradient>
          </Pressable>
        </View>
      </View>
    </Layout>
  );
};

export default BattleHome;

const styles = StyleSheet.create({
  content: {},
  body: {
    paddingHorizontal: 20,
  },
  hero: {
    alignItems: 'center',
    marginBottom: 22,
    marginTop: 8,
  },
  heroIcon: {
    width: 111,
    height: 111,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
    shadowColor: '#F5A623',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 6,
  },
  heroEmoji: {
    fontSize: 40,
  },
  overline: {
    color: '#F07911',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 1.4,
    marginBottom: 6,
  },
  heading: {
    color: pblicvcepromptrTitle,
    fontSize: 30,
    fontWeight: '800',
  },
  cards: {
    gap: 12,
    marginBottom: 22,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 16,
    shadowColor: '#0A1F33',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  },
  cardIcon: {
    width: 52,
    height: 52,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  cardIconText: {
    fontSize: 24,
  },
  cardBody: {
    flex: 1,
  },
  cardTitle: {
    color: pblicvcepromptrTitle,
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  cardDesc: {
    color: pblicvcepromptrMuted,
    fontSize: 13,
    lineHeight: 18,
  },
  cta: {
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
  ctaText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
  },
  pressed: {
    opacity: 0.92,
  },
});
