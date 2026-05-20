import {useNavigation, useRoute} from '@react-navigation/native';
import type {RouteProp} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import React, {useState} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import IcVceTrainrrLayout from '../../IcVceTrainrrComponents/IcVceTrainrrLayout';
import IcVceTrainrrPromptrStreakHeader from '../../IcVceTrainrrComponents/IcVceTrainrrPromptr/IcVceTrainrrPromptrStreakHeader';
import type {IcVceTrainrrBattleStackParamList} from '../../IcVceTrainrrRoutes/IcVceTrainrrBattleTypes';
import {icVceTrainrrBATTLE_ORANGE_GRADIENT} from '../../IcVceTrainrrTheme/IcVceTrainrrBattleTheme';
import {
  icVceTrainrrSCROLL_SPEED_OPTIONS,
  icVceTrainrrTEXT_SIZE_OPTIONS,
  icVceTrainrrPblicvcepromptrMuted,
  icVceTrainrrPblicvcepromptrTitle,
  type ScrollSpeedId,
  type TextSizeId,
} from '../../IcVceTrainrrTheme/IcVceTrainrrPromptrTheme';

type Nav = StackNavigationProp<IcVceTrainrrBattleStackParamList, 'IcVceTrainrrBattleSettings'>;
type Route = RouteProp<IcVceTrainrrBattleStackParamList, 'IcVceTrainrrBattleSettings'>;

const IcVceTrainrrBattleSettings = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<Nav>();
  const route = useRoute<Route>();
  const {player1Name, player2Name} = route.params;

  const [scrollSpeed, setScrollSpeed] = useState<ScrollSpeedId>('slow');
  const [textSize, setTextSize] = useState<TextSizeId>('medium');

  const startBattle = () => {
    navigation.navigate('IcVceTrainrrBattlePlayerReady', {
      player1Name,
      player2Name,
      scrollSpeed,
      textSize,
      playerIndex: 0,
    });
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
        <IcVceTrainrrPromptrStreakHeader showDivider={false} />

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
            <View>
              <Text style={icVceTrainrrStyles.icVceTrainrrHeading}>Battle Settings</Text>
              <Text style={icVceTrainrrStyles.icVceTrainrrSubtitle}>
                Same settings apply to both players
              </Text>
            </View>
          </View>

          <Text style={icVceTrainrrStyles.icVceTrainrrSection}>Scroll Speed</Text>
          <View style={icVceTrainrrStyles.icVceTrainrrOptionRow}>
            {icVceTrainrrSCROLL_SPEED_OPTIONS.map(option => {
              const selected = scrollSpeed === option.id;
              const inner = (
                <>
                  <Text
                    style={[
                      icVceTrainrrStyles.icVceTrainrrOptionIcon,
                      selected && icVceTrainrrStyles.icVceTrainrrOptionIconSelected,
                    ]}>
                    {option.icon}
                  </Text>
                  <Text
                    style={[
                      icVceTrainrrStyles.icVceTrainrrOptionLabel,
                      selected && icVceTrainrrStyles.icVceTrainrrOptionLabelSelected,
                    ]}>
                    {option.label}
                  </Text>
                </>
              );

              if (selected) {
                return (
                  <Pressable
                    key={option.id}
                    style={icVceTrainrrStyles.icVceTrainrrOptionFlex}
                    onPress={() => setScrollSpeed(option.id)}>
                    <LinearGradient
                      colors={[...icVceTrainrrBATTLE_ORANGE_GRADIENT]}
                      style={[icVceTrainrrStyles.icVceTrainrrOptionCard, icVceTrainrrStyles.icVceTrainrrOptionCardSelected]}>
                      <View style={icVceTrainrrStyles.icVceTrainrrOptionInner}>{inner}</View>
                    </LinearGradient>
                  </Pressable>
                );
              }

              return (
                <Pressable
                  key={option.id}
                  style={[icVceTrainrrStyles.icVceTrainrrOptionCard, icVceTrainrrStyles.icVceTrainrrOptionFlex]}
                  onPress={() => setScrollSpeed(option.id)}>
                  <View style={icVceTrainrrStyles.icVceTrainrrOptionInner}>{inner}</View>
                </Pressable>
              );
            })}
          </View>

          <Text style={icVceTrainrrStyles.icVceTrainrrSection}>Text Size</Text>
          <View style={icVceTrainrrStyles.icVceTrainrrOptionRow}>
            {icVceTrainrrTEXT_SIZE_OPTIONS.map(option => {
              const selected = textSize === option.id;
              const fontScale =
                option.id === 'small' ? 14 : option.id === 'medium' ? 20 : 26;

              const inner = (
                <>
                  <Text
                    style={[
                      icVceTrainrrStyles.icVceTrainrrSizeAa,
                      {fontSize: fontScale},
                      selected && icVceTrainrrStyles.icVceTrainrrSizeAaSelected,
                    ]}>
                    Aa
                  </Text>
                  <Text
                    style={[
                      icVceTrainrrStyles.icVceTrainrrOptionLabel,
                      selected && icVceTrainrrStyles.icVceTrainrrOptionLabelSelected,
                    ]}>
                    {option.label}
                  </Text>
                </>
              );

              if (selected) {
                return (
                  <Pressable
                    key={option.id}
                    style={icVceTrainrrStyles.icVceTrainrrOptionFlex}
                    onPress={() => setTextSize(option.id)}>
                    <LinearGradient
                      colors={['#54C0DA', '#6CD0F7']}
                      style={[icVceTrainrrStyles.icVceTrainrrOptionCard, icVceTrainrrStyles.icVceTrainrrOptionCardSelected]}>
                      <View style={icVceTrainrrStyles.icVceTrainrrOptionInner}>{inner}</View>
                    </LinearGradient>
                  </Pressable>
                );
              }

              return (
                <Pressable
                  key={option.id}
                  style={[icVceTrainrrStyles.icVceTrainrrOptionCard, icVceTrainrrStyles.icVceTrainrrOptionFlex]}
                  onPress={() => setTextSize(option.id)}>
                  <View style={icVceTrainrrStyles.icVceTrainrrOptionInner}>{inner}</View>
                </Pressable>
              );
            })}
          </View>

          <Pressable
            onPress={startBattle}
            style={({pressed}) => [pressed && icVceTrainrrStyles.icVceTrainrrPressed]}>
            <LinearGradient
              colors={[...icVceTrainrrBATTLE_ORANGE_GRADIENT]}
              start={{x: 0, y: 0.5}}
              end={{x: 1, y: 0.5}}
              style={icVceTrainrrStyles.icVceTrainrrCta}>
              <Text style={icVceTrainrrStyles.icVceTrainrrCtaText}>Start Battle ⚔️</Text>
            </LinearGradient>
          </Pressable>
        </View>
      </View>
    </IcVceTrainrrLayout>
  );
};

export default IcVceTrainrrBattleSettings;

const icVceTrainrrStyles = StyleSheet.create({
  icVceTrainrrContent: {},
  icVceTrainrrBody: {
    paddingHorizontal: 20,
  },
  icVceTrainrrHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 22,
  },
  icVceTrainrrBackBtn: {
    width: 35.12,
    height: 35.12,
    borderRadius: 14.21,
    backgroundColor: '#54C0DA1A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icVceTrainrrHeading: {
    color: icVceTrainrrPblicvcepromptrTitle,
    fontSize: 20.12,
    fontWeight: '700',
    marginBottom: 2,
  },
  icVceTrainrrSubtitle: {
    color: '#8AA8B8',
    fontSize: 12.12,
    fontWeight: '400',
    marginBottom: 4,
  },
  icVceTrainrrSection: {
    color: icVceTrainrrPblicvcepromptrTitle,
    fontSize: 15.162,
    fontWeight: '700',
    marginBottom: 12,
  },
  icVceTrainrrOptionRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 22.1,
  },
  icVceTrainrrOptionFlex: {
    flex: 1,
  },
  icVceTrainrrOptionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18.22,
    minHeight: 100.142,
    shadowColor: '#0A1F33',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  icVceTrainrrOptionCardSelected: {
    shadowOpacity: 0.12,
    elevation: 4,
  },
  icVceTrainrrOptionInner: {
    padding: 16,
    alignItems: 'center',
    gap: 6,
  },
  icVceTrainrrOptionIcon: {
    fontSize: 28.21,
  },
  icVceTrainrrOptionIconSelected: {},
  icVceTrainrrSizeAa: {
    fontWeight: '800',
    color: icVceTrainrrPblicvcepromptrTitle,
  },
  icVceTrainrrSizeAaSelected: {
    color: '#FFFFFF',
  },
  icVceTrainrrOptionLabel: {
    color: icVceTrainrrPblicvcepromptrTitle,
    fontSize: 14.21,
    fontWeight: '700',
  },
  icVceTrainrrOptionLabelSelected: {
    color: '#FFFFFF',
  },
  icVceTrainrrCta: {
    borderRadius: 16.12,
    height: 56.14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  icVceTrainrrCtaText: {
    color: '#FFFFFF',
    fontSize: 17.17,
    fontWeight: '700',
  },
  icVceTrainrrPressed: {
    opacity: 0.92,
  },
});
