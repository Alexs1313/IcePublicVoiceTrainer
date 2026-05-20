import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const icVceTrainrrONBOARDING_DONE_KEY = 'pblicvce_onboarding_done';

type IcVceTrainrrOnboardingStep = {
  overline: string;
  title: string;
  body: string;
  icon: string;
};

const icVceTrainrrONBOARDING_STEPS: IcVceTrainrrOnboardingStep[] = [
  {
    overline: 'YOUR SPEAKING PRACTICE SPACE',
    title: 'Welcome to Voice Craft',
    body: 'Build clearer speech habits with guided practice, helpful techniques, and simple session feedback. Create a steady routine for confident everyday speaking.',
    icon: '🎙️',
  },
  {
    overline: 'READ. EXPRESS. IMPROVE.',
    title: 'Teleprompter Training',
    body: 'Use the built-in teleprompter to practice reading at your own pace. Choose from public speaking, diction, or storytelling texts, then adjust the speed to match your comfort level.',
    icon: '📺',
  },
  {
    overline: 'CREATE YOUR TEXT LIBRARY',
    title: 'Text Workshop',
    body: 'Browse built-in practice texts or create your own. Add, edit, and manage custom scripts for presentations, diction exercises, storytelling, or daily voice practice.',
    icon: '📚',
  },
  {
    overline: 'DISCOVER HELPFUL IDEAS',
    title: 'Tips & Blog',
    body: 'Explore simple tips about confidence, breathing, clarity, and speaking habits. Read short articles, save favorites, and return to useful ideas anytime.',
    icon: '💡',
  },
  {
    overline: 'PRACTICE TOGETHER',
    title: 'Speaking Round',
    body: 'Practice aloud with another speaker in a relaxed reading activity. Compare clarity, pace, and expression, then finish with a simple reflection on the session.',
    icon: '💬',
  },
];

const icVceTrainrrPblicvceonboardAccent = '#5BB0D9';
const icVceTrainrrPblicvceonboardDotIdle = '#C5D9E8';

const IcVceTrainrrOnboarding = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const [step, setStep] = useState(0);

  const isLastStep = step === icVceTrainrrONBOARDING_STEPS.length - 1;
  const current = icVceTrainrrONBOARDING_STEPS[step];

  const finishOnboarding = useCallback(async () => {
    await AsyncStorage.setItem(icVceTrainrrONBOARDING_DONE_KEY, 'true');
    navigation.navigate('IcVceTrainrrTabNav' as never);
  }, [navigation]);

  const handleSkip = () => {
    finishOnboarding();
  };

  const handleContinue = () => {
    if (isLastStep) {
      finishOnboarding();
      return;
    }
    setStep(prev => prev + 1);
  };

  return (
    <ImageBackground
      source={require('../IcVceTrainrrAssets/IcVceTrainrrImages/IcVceTrainrrPblicvcetrainonb.png')}
      style={icVceTrainrrStyles.icVceTrainrrPblicvceonboardBg}
      resizeMode="cover">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}>
        <View
          style={[
            icVceTrainrrStyles.icVceTrainrrPblicvceonboardRoot,
            {paddingTop: insets.top, paddingBottom: insets.bottom},
          ]}>
          <Pressable
            onPress={handleSkip}
            style={({pressed}) => [
              icVceTrainrrStyles.icVceTrainrrPblicvceonboardSkip,
              pressed &&
                icVceTrainrrStyles.icVceTrainrrPblicvceonboardSkipPressed,
            ]}
            hitSlop={12}>
            <Text
              style={icVceTrainrrStyles.icVceTrainrrPblicvceonboardSkipText}>
              Skip
            </Text>
          </Pressable>

          <View style={icVceTrainrrStyles.icVceTrainrrPblicvceonboardHero}>
            <View style={icVceTrainrrStyles.icVceTrainrrPblicvceonboardGlass}>
              <Text style={icVceTrainrrStyles.icVceTrainrrPblicvceonboardIcon}>
                {current.icon}
              </Text>
            </View>
          </View>

          <View style={icVceTrainrrStyles.icVceTrainrrPblicvceonboardCard}>
            <View
              style={icVceTrainrrStyles.icVceTrainrrPblicvceonboardProgress}>
              {icVceTrainrrONBOARDING_STEPS.map((_, index) =>
                index === step ? (
                  <View
                    key={index}
                    style={
                      icVceTrainrrStyles.icVceTrainrrPblicvceonboardProgressActive
                    }
                  />
                ) : (
                  <View
                    key={index}
                    style={
                      icVceTrainrrStyles.icVceTrainrrPblicvceonboardProgressDot
                    }
                  />
                ),
              )}
            </View>

            <Text
              style={icVceTrainrrStyles.icVceTrainrrPblicvceonboardOverline}>
              {current.overline}
            </Text>
            <Text style={icVceTrainrrStyles.icVceTrainrrPblicvceonboardTitle}>
              {current.title}
            </Text>
            <Text style={icVceTrainrrStyles.icVceTrainrrPblicvceonboardBody}>
              {current.body}
            </Text>

            {isLastStep ? (
              <Pressable
                onPress={handleContinue}
                style={({pressed}) => [
                  icVceTrainrrStyles.icVceTrainrrPblicvceonboardCtaWrap,
                  pressed &&
                    icVceTrainrrStyles.icVceTrainrrPblicvceonboardCtaPressed,
                ]}>
                <LinearGradient
                  colors={['#F07911', '#E4AD1B']}
                  style={
                    icVceTrainrrStyles.icVceTrainrrPblicvceonboardCtaGradient
                  }>
                  <Text
                    style={
                      icVceTrainrrStyles.icVceTrainrrPblicvceonboardCtaText
                    }>
                    Let&apos;s Begin! 🚀
                  </Text>
                </LinearGradient>
              </Pressable>
            ) : (
              <Pressable onPress={handleContinue}>
                <LinearGradient
                  colors={['#54C0DA', '#6CD0F7']}
                  style={icVceTrainrrStyles.icVceTrainrrPblicvceonboardCta}>
                  <Text
                    style={
                      icVceTrainrrStyles.icVceTrainrrPblicvceonboardCtaText
                    }>
                    Continue
                  </Text>
                </LinearGradient>
              </Pressable>
            )}
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default IcVceTrainrrOnboarding;

const icVceTrainrrStyles = StyleSheet.create({
  icVceTrainrrPblicvceonboardBg: {
    flex: 1,
  },
  icVceTrainrrPblicvceonboardRoot: {
    flex: 1,
  },
  icVceTrainrrPblicvceonboardSkip: {
    alignSelf: 'flex-end',
    marginTop: 8,
    marginRight: 20,
    paddingHorizontal: 15,
    paddingVertical: 9,
    borderRadius: 14,
    backgroundColor: '#FFFFFF33',
  },
  icVceTrainrrPblicvceonboardSkipPressed: {
    opacity: 0.85,
  },
  icVceTrainrrPblicvceonboardSkipText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  icVceTrainrrPblicvceonboardHero: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 24,
  },
  icVceTrainrrPblicvceonboardGlass: {
    width: 140,
    height: 140,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF40',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.45)',
  },
  icVceTrainrrPblicvceonboardIcon: {
    fontSize: 46,
  },
  icVceTrainrrPblicvceonboardCard: {
    backgroundColor: 'rgba(218, 248, 255, 0.85)',
    borderRadius: 24,
    paddingHorizontal: 28,
    paddingTop: 28,
    paddingBottom: 32,
    width: '92%',
    alignSelf: 'center',
  },
  icVceTrainrrPblicvceonboardProgress: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 22,
  },
  icVceTrainrrPblicvceonboardProgressActive: {
    width: 28,
    height: 6,
    borderRadius: 3,
    backgroundColor: icVceTrainrrPblicvceonboardAccent,
  },
  icVceTrainrrPblicvceonboardProgressDot: {
    width: 7,
    height: 4,
    borderRadius: 3,
    backgroundColor: icVceTrainrrPblicvceonboardDotIdle,
  },
  icVceTrainrrPblicvceonboardOverline: {
    color: '#54C0DA',
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 1.2,

    marginBottom: 10,
  },
  icVceTrainrrPblicvceonboardTitle: {
    color: '#1C2B3A',
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 14,
  },
  icVceTrainrrPblicvceonboardBody: {
    color: '#4A6A7A',
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 28,
  },
  icVceTrainrrPblicvceonboardCtaWrap: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  icVceTrainrrPblicvceonboardCta: {
    backgroundColor: icVceTrainrrPblicvceonboardAccent,
    borderRadius: 16,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icVceTrainrrPblicvceonboardCtaGradient: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    borderRadius: 16,
  },
  icVceTrainrrPblicvceonboardCtaPressed: {
    opacity: 0.9,
  },
  icVceTrainrrPblicvceonboardCtaText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
  },
});
