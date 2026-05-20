import {useNavigation, useRoute} from '@react-navigation/native';
import type {RouteProp} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import React, {useState} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import Layout from '../../components/Layout';
import PromptrStreakHeader from '../../components/promptr/PromptrStreakHeader';
import type {BattleStackParamList} from '../../routes/battleTypes';
import {BATTLE_ORANGE_GRADIENT} from '../../theme/battleTheme';
import {
  SCROLL_SPEED_OPTIONS,
  TEXT_SIZE_OPTIONS,
  pblicvcepromptrMuted,
  pblicvcepromptrTitle,
  type ScrollSpeedId,
  type TextSizeId,
} from '../../theme/promptrTheme';

type Nav = StackNavigationProp<BattleStackParamList, 'BattleSettings'>;
type Route = RouteProp<BattleStackParamList, 'BattleSettings'>;

const BattleSettings = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<Nav>();
  const route = useRoute<Route>();
  const {player1Name, player2Name} = route.params;

  const [scrollSpeed, setScrollSpeed] = useState<ScrollSpeedId>('slow');
  const [textSize, setTextSize] = useState<TextSizeId>('medium');

  const startBattle = () => {
    navigation.navigate('BattlePlayerReady', {
      player1Name,
      player2Name,
      scrollSpeed,
      textSize,
      playerIndex: 0,
    });
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
        <PromptrStreakHeader showDivider={false} />

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
            <View>
              <Text style={styles.heading}>Battle Settings</Text>
              <Text style={styles.subtitle}>
                Same settings apply to both players
              </Text>
            </View>
          </View>

          <Text style={styles.section}>Scroll Speed</Text>
          <View style={styles.optionRow}>
            {SCROLL_SPEED_OPTIONS.map(option => {
              const selected = scrollSpeed === option.id;
              const inner = (
                <>
                  <Text
                    style={[
                      styles.optionIcon,
                      selected && styles.optionIconSelected,
                    ]}>
                    {option.icon}
                  </Text>
                  <Text
                    style={[
                      styles.optionLabel,
                      selected && styles.optionLabelSelected,
                    ]}>
                    {option.label}
                  </Text>
                </>
              );

              if (selected) {
                return (
                  <Pressable
                    key={option.id}
                    style={styles.optionFlex}
                    onPress={() => setScrollSpeed(option.id)}>
                    <LinearGradient
                      colors={[...BATTLE_ORANGE_GRADIENT]}
                      style={[styles.optionCard, styles.optionCardSelected]}>
                      <View style={styles.optionInner}>{inner}</View>
                    </LinearGradient>
                  </Pressable>
                );
              }

              return (
                <Pressable
                  key={option.id}
                  style={[styles.optionCard, styles.optionFlex]}
                  onPress={() => setScrollSpeed(option.id)}>
                  <View style={styles.optionInner}>{inner}</View>
                </Pressable>
              );
            })}
          </View>

          <Text style={styles.section}>Text Size</Text>
          <View style={styles.optionRow}>
            {TEXT_SIZE_OPTIONS.map(option => {
              const selected = textSize === option.id;
              const fontScale =
                option.id === 'small' ? 14 : option.id === 'medium' ? 20 : 26;

              const inner = (
                <>
                  <Text
                    style={[
                      styles.sizeAa,
                      {fontSize: fontScale},
                      selected && styles.sizeAaSelected,
                    ]}>
                    Aa
                  </Text>
                  <Text
                    style={[
                      styles.optionLabel,
                      selected && styles.optionLabelSelected,
                    ]}>
                    {option.label}
                  </Text>
                </>
              );

              if (selected) {
                return (
                  <Pressable
                    key={option.id}
                    style={styles.optionFlex}
                    onPress={() => setTextSize(option.id)}>
                    <LinearGradient
                      colors={['#54C0DA', '#6CD0F7']}
                      style={[styles.optionCard, styles.optionCardSelected]}>
                      <View style={styles.optionInner}>{inner}</View>
                    </LinearGradient>
                  </Pressable>
                );
              }

              return (
                <Pressable
                  key={option.id}
                  style={[styles.optionCard, styles.optionFlex]}
                  onPress={() => setTextSize(option.id)}>
                  <View style={styles.optionInner}>{inner}</View>
                </Pressable>
              );
            })}
          </View>

          <Pressable
            onPress={startBattle}
            style={({pressed}) => [pressed && styles.pressed]}>
            <LinearGradient
              colors={[...BATTLE_ORANGE_GRADIENT]}
              start={{x: 0, y: 0.5}}
              end={{x: 1, y: 0.5}}
              style={styles.cta}>
              <Text style={styles.ctaText}>Start Battle ⚔️</Text>
            </LinearGradient>
          </Pressable>
        </View>
      </View>
    </Layout>
  );
};

export default BattleSettings;

const styles = StyleSheet.create({
  content: {},
  body: {
    paddingHorizontal: 20,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 22,
  },
  backBtn: {
    width: 35.12,
    height: 35.12,
    borderRadius: 14.21,
    backgroundColor: '#54C0DA1A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    color: pblicvcepromptrTitle,
    fontSize: 20.12,
    fontWeight: '700',
    marginBottom: 2,
  },
  subtitle: {
    color: '#8AA8B8',
    fontSize: 12.12,
    fontWeight: '400',
    marginBottom: 4,
  },
  section: {
    color: pblicvcepromptrTitle,
    fontSize: 15.162,
    fontWeight: '700',
    marginBottom: 12,
  },
  optionRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 22.1,
  },
  optionFlex: {
    flex: 1,
  },
  optionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18.22,
    minHeight: 100.142,
    shadowColor: '#0A1F33',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  optionCardSelected: {
    shadowOpacity: 0.12,
    elevation: 4,
  },
  optionInner: {
    padding: 16,
    alignItems: 'center',
    gap: 6,
  },
  optionIcon: {
    fontSize: 28.21,
  },
  optionIconSelected: {},
  sizeAa: {
    fontWeight: '800',
    color: pblicvcepromptrTitle,
  },
  sizeAaSelected: {
    color: '#FFFFFF',
  },
  optionLabel: {
    color: pblicvcepromptrTitle,
    fontSize: 14.21,
    fontWeight: '700',
  },
  optionLabelSelected: {
    color: '#FFFFFF',
  },
  cta: {
    borderRadius: 16.12,
    height: 56.14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  ctaText: {
    color: '#FFFFFF',
    fontSize: 17.17,
    fontWeight: '700',
  },
  pressed: {
    opacity: 0.92,
  },
});
