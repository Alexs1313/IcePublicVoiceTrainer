import {useNavigation, useRoute} from '@react-navigation/native';
import type {RouteProp} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import React, {useState} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import IcVceTrainrrLayout from '../../IcVceTrainrrComponents/IcVceTrainrrLayout';
import IcVceTrainrrPromptrStreakHeader from '../../IcVceTrainrrComponents/IcVceTrainrrPromptr/IcVceTrainrrPromptrStreakHeader';
import type {IcVceTrainrrPromptrStackParamList} from '../../IcVceTrainrrRoutes/IcVceTrainrrPromptrTypes';
import {
  icVceTrainrrSCROLL_SPEED_OPTIONS,
  icVceTrainrrTEXT_SIZE_OPTIONS,
  icVceTrainrrPblicvcepromptrAccent,
  icVceTrainrrPblicvcepromptrMuted,
  icVceTrainrrPblicvcepromptrTitle,
  icVceTrainrrSizeLabel,
  icVceTrainrrSpeedLabel,
  type ScrollSpeedId,
  type TextSizeId,
} from '../../IcVceTrainrrTheme/IcVceTrainrrPromptrTheme';

type Nav = StackNavigationProp<IcVceTrainrrPromptrStackParamList, 'IcVceTrainrrPromptrDifficulty'>;
type Route = RouteProp<IcVceTrainrrPromptrStackParamList, 'IcVceTrainrrPromptrDifficulty'>;

const IcVceTrainrrPromptrDifficulty = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<Nav>();
  const route = useRoute<Route>();
  const {categoryTitle, textTitle, textBody} = route.params;

  const [scrollSpeed, setScrollSpeed] = useState<ScrollSpeedId>('slow');
  const [textSize, setTextSize] = useState<TextSizeId>('medium');

  const startReading = () => {
    navigation.navigate('IcVceTrainrrPromptrReading', {
      categoryTitle,
      textTitle,
      textBody,
      scrollSpeed,
      textSize,
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
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
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
              <Text style={icVceTrainrrStyles.icVceTrainrrHeading}>Set Difficulty</Text>
              <Text style={icVceTrainrrStyles.icVceTrainrrSubtitle}>
                Choose scroll speed and font size
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
                  <Text
                    style={[
                      icVceTrainrrStyles.icVceTrainrrOptionSub,
                      selected && icVceTrainrrStyles.icVceTrainrrOptionSubSelected,
                    ]}>
                    {option.subtitle}
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
                      colors={['#54C0DA', '#6CD0F7']}
                      style={[icVceTrainrrStyles.icVceTrainrrOptionCard, icVceTrainrrStyles.icVceTrainrrOptionCardSelected]}>
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
                  style={[icVceTrainrrStyles.icVceTrainrrOptionCard, icVceTrainrrStyles.icVceTrainrrOptionFlex]}
                  onPress={() => setScrollSpeed(option.id)}>
                  <View style={{padding: 16, alignItems: 'center', gap: 3}}>
                    {inner}
                  </View>
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
                  <Text
                    style={[
                      icVceTrainrrStyles.icVceTrainrrOptionSub,
                      selected && icVceTrainrrStyles.icVceTrainrrOptionSubSelected,
                    ]}>
                    {option.subtitle}
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
                      colors={['#E4AD1B', '#F07911']}
                      style={[icVceTrainrrStyles.icVceTrainrrOptionCard, icVceTrainrrStyles.icVceTrainrrOptionCardSelected]}>
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
                  style={[icVceTrainrrStyles.icVceTrainrrOptionCard, icVceTrainrrStyles.icVceTrainrrOptionFlex]}
                  onPress={() => setTextSize(option.id)}>
                  <View style={{padding: 16, alignItems: 'center', gap: 3}}>
                    {inner}
                  </View>
                </Pressable>
              );
            })}
          </View>

          <View style={icVceTrainrrStyles.icVceTrainrrSummary}>
            <Text style={icVceTrainrrStyles.icVceTrainrrSummaryIcon}>🚀</Text>
            <View style={icVceTrainrrStyles.icVceTrainrrSummaryTextWrap}>
              <Text style={icVceTrainrrStyles.icVceTrainrrSummaryTitle}>
                {icVceTrainrrSpeedLabel(scrollSpeed)} speed · {icVceTrainrrSizeLabel(textSize)} text
              </Text>
              <Text style={icVceTrainrrStyles.icVceTrainrrSummarySub}>Your selected configuration</Text>
            </View>
          </View>

          <Pressable onPress={startReading}>
            <LinearGradient colors={['#54C0DA', '#6CD0F7']} style={icVceTrainrrStyles.icVceTrainrrCta}>
              <Text style={icVceTrainrrStyles.icVceTrainrrCtaText}>Start Reading →</Text>
            </LinearGradient>
          </Pressable>
        </View>
      </View>
    </IcVceTrainrrLayout>
  );
};

export default IcVceTrainrrPromptrDifficulty;

const icVceTrainrrStyles = StyleSheet.create({
  icVceTrainrrContent: {},
  icVceTrainrrBody: {
    paddingHorizontal: 20.332,
  },
  icVceTrainrrBackBtn: {
    width: 40.612,
    height: 40.612,
    borderRadius: 20,
    backgroundColor: '#54C0DA1A',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12.162,
  },
  icVceTrainrrBackIcon: {
    color: icVceTrainrrPblicvcepromptrTitle,
    fontSize: 28.21,
    fontWeight: '600',
    marginTop: -2,
    marginLeft: -2,
  },
  icVceTrainrrHeading: {
    color: icVceTrainrrPblicvcepromptrTitle,
    fontSize: 20.12,
    fontWeight: '700',
    marginBottom: 6.12,
  },
  icVceTrainrrSubtitle: {
    color: icVceTrainrrPblicvcepromptrMuted,
    fontSize: 15.119,
    marginBottom: 22.42,
  },
  icVceTrainrrSection: {
    color: icVceTrainrrPblicvcepromptrTitle,
    fontSize: 15.14,
    fontWeight: '700',
    marginBottom: 12.19,
  },
  icVceTrainrrOptionRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 22.88,
  },
  icVceTrainrrOptionFlex: {
    flex: 1,
  },
  icVceTrainrrOptionCard: {
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
  icVceTrainrrOptionCardSelected: {
    shadowOpacity: 0.12,
    shadowRadius: 12.19,
    elevation: 4,
  },
  icVceTrainrrOptionIcon: {
    fontSize: 28.23,
    marginBottom: 8,
  },
  icVceTrainrrOptionIconSelected: {
    marginBottom: 8.12,
  },
  icVceTrainrrSizeAa: {
    fontWeight: '800',
    color: icVceTrainrrPblicvcepromptrTitle,
    marginBottom: 8.12,
  },
  icVceTrainrrSizeAaSelected: {
    color: '#FFFFFF',
  },
  icVceTrainrrOptionLabel: {
    color: icVceTrainrrPblicvcepromptrTitle,
    fontSize: 14.22,
    fontWeight: '700',
    marginBottom: 2.12,
  },
  icVceTrainrrOptionLabelSelected: {
    color: '#FFFFFF',
  },
  icVceTrainrrOptionSub: {
    color: icVceTrainrrPblicvcepromptrMuted,
    fontSize: 11.162,
    textAlign: 'center',
  },
  icVceTrainrrOptionSubSelected: {
    color: 'rgba(255,255,255,0.9)',
  },
  icVceTrainrrSummary: {
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
  icVceTrainrrSummaryIcon: {
    fontSize: 26.21,
  },
  icVceTrainrrSummaryTextWrap: {
    flex: 1,
  },
  icVceTrainrrSummaryTitle: {
    color: icVceTrainrrPblicvcepromptrTitle,
    fontSize: 15.129,
    fontWeight: '700',
    marginBottom: 2.12,
  },
  icVceTrainrrSummarySub: {
    color: icVceTrainrrPblicvcepromptrMuted,
    fontSize: 12.162,
  },
  icVceTrainrrCta: {
    backgroundColor: icVceTrainrrPblicvcepromptrAccent,
    borderRadius: 16,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icVceTrainrrCtaText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
  },
  icVceTrainrrPressed: {
    opacity: 0.9,
  },
});
