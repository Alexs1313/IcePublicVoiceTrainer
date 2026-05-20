import {useNavigation, useRoute} from '@react-navigation/native';
import type {RouteProp} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import React, {useState} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import Layout from '../../components/Layout';
import PromptrStreakHeader from '../../components/promptr/PromptrStreakHeader';
import type {PromptrStackParamList} from '../../routes/promptrTypes';
import {
  SCROLL_SPEED_OPTIONS,
  TEXT_SIZE_OPTIONS,
  pblicvcepromptrAccent,
  pblicvcepromptrMuted,
  pblicvcepromptrTitle,
  sizeLabel,
  speedLabel,
  type ScrollSpeedId,
  type TextSizeId,
} from '../../theme/promptrTheme';

type Nav = StackNavigationProp<PromptrStackParamList, 'PromptrDifficulty'>;
type Route = RouteProp<PromptrStackParamList, 'PromptrDifficulty'>;

const PromptrDifficulty = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<Nav>();
  const route = useRoute<Route>();
  const {categoryTitle, textTitle, textBody} = route.params;

  const [scrollSpeed, setScrollSpeed] = useState<ScrollSpeedId>('slow');
  const [textSize, setTextSize] = useState<TextSizeId>('medium');

  const startReading = () => {
    navigation.navigate('PromptrReading', {
      categoryTitle,
      textTitle,
      textBody,
      scrollSpeed,
      textSize,
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
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
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
              <Text style={styles.heading}>Set Difficulty</Text>
              <Text style={styles.subtitle}>
                Choose scroll speed and font size
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
                  <Text
                    style={[
                      styles.optionSub,
                      selected && styles.optionSubSelected,
                    ]}>
                    {option.subtitle}
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
                      colors={['#54C0DA', '#6CD0F7']}
                      style={[styles.optionCard, styles.optionCardSelected]}>
                      <View style={{padding: 16, alignItems: 'center', gap: 3}}>
                        {inner}
                      </View>
                    </LinearGradient>
                  </Pressable>
                );
              }

              return (
                <Pressable
                  key={option.id}
                  style={[styles.optionCard, styles.optionFlex]}
                  onPress={() => setScrollSpeed(option.id)}>
                  <View style={{padding: 16, alignItems: 'center', gap: 3}}>
                    {inner}
                  </View>
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
                  <Text
                    style={[
                      styles.optionSub,
                      selected && styles.optionSubSelected,
                    ]}>
                    {option.subtitle}
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
                      colors={['#E4AD1B', '#F07911']}
                      style={[styles.optionCard, styles.optionCardSelected]}>
                      <View style={{padding: 16, alignItems: 'center', gap: 3}}>
                        {inner}
                      </View>
                    </LinearGradient>
                  </Pressable>
                );
              }

              return (
                <Pressable
                  key={option.id}
                  style={[styles.optionCard, styles.optionFlex]}
                  onPress={() => setTextSize(option.id)}>
                  <View style={{padding: 16, alignItems: 'center', gap: 3}}>
                    {inner}
                  </View>
                </Pressable>
              );
            })}
          </View>

          <View style={styles.summary}>
            <Text style={styles.summaryIcon}>🚀</Text>
            <View style={styles.summaryTextWrap}>
              <Text style={styles.summaryTitle}>
                {speedLabel(scrollSpeed)} speed · {sizeLabel(textSize)} text
              </Text>
              <Text style={styles.summarySub}>Your selected configuration</Text>
            </View>
          </View>

          <Pressable onPress={startReading}>
            <LinearGradient colors={['#54C0DA', '#6CD0F7']} style={styles.cta}>
              <Text style={styles.ctaText}>Start Reading →</Text>
            </LinearGradient>
          </Pressable>
        </View>
      </View>
    </Layout>
  );
};

export default PromptrDifficulty;

const styles = StyleSheet.create({
  content: {},
  body: {
    paddingHorizontal: 20.332,
  },
  backBtn: {
    width: 40.612,
    height: 40.612,
    borderRadius: 20,
    backgroundColor: '#54C0DA1A',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12.162,
  },
  backIcon: {
    color: pblicvcepromptrTitle,
    fontSize: 28.21,
    fontWeight: '600',
    marginTop: -2,
    marginLeft: -2,
  },
  heading: {
    color: pblicvcepromptrTitle,
    fontSize: 20.12,
    fontWeight: '700',
    marginBottom: 6.12,
  },
  subtitle: {
    color: pblicvcepromptrMuted,
    fontSize: 15.119,
    marginBottom: 22.42,
  },
  section: {
    color: pblicvcepromptrTitle,
    fontSize: 15.14,
    fontWeight: '700',
    marginBottom: 12.19,
  },
  optionRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 22.88,
  },
  optionFlex: {
    flex: 1,
  },
  optionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18.22,

    alignItems: 'center',
    shadowColor: '#0A1F33',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    minHeight: 120,
  },
  optionCardSelected: {
    shadowOpacity: 0.12,
    shadowRadius: 12.19,
    elevation: 4,
  },
  optionIcon: {
    fontSize: 28.23,
    marginBottom: 8,
  },
  optionIconSelected: {
    marginBottom: 8.12,
  },
  sizeAa: {
    fontWeight: '800',
    color: pblicvcepromptrTitle,
    marginBottom: 8.12,
  },
  sizeAaSelected: {
    color: '#FFFFFF',
  },
  optionLabel: {
    color: pblicvcepromptrTitle,
    fontSize: 14.22,
    fontWeight: '700',
    marginBottom: 2.12,
  },
  optionLabelSelected: {
    color: '#FFFFFF',
  },
  optionSub: {
    color: pblicvcepromptrMuted,
    fontSize: 11.162,
    textAlign: 'center',
  },
  optionSubSelected: {
    color: 'rgba(255,255,255,0.9)',
  },
  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#54C0DA14',
    borderRadius: 16.192,
    padding: 14.222,
    marginBottom: 18.12,
    gap: 12.162,
    borderWidth: 1,
    borderColor: '#54C0DA26',
    minHeight: 80,
  },
  summaryIcon: {
    fontSize: 26.21,
  },
  summaryTextWrap: {
    flex: 1,
  },
  summaryTitle: {
    color: pblicvcepromptrTitle,
    fontSize: 15.129,
    fontWeight: '700',
    marginBottom: 2.12,
  },
  summarySub: {
    color: pblicvcepromptrMuted,
    fontSize: 12.162,
  },
  cta: {
    backgroundColor: pblicvcepromptrAccent,
    borderRadius: 16,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ctaText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
  },
  pressed: {
    opacity: 0.9,
  },
});
