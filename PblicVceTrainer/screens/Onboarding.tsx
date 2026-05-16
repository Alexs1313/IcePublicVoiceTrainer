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

const ONBOARDING_DONE_KEY = 'pblicvce_onboarding_done';

type OnboardingStep = {
  overline: string;
  title: string;
  body: string;
  icon: string;
};

const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    overline: 'YOUR PERSONAL ORATORY COACH',
    title: 'Welcome to VoiceCraft',
    body: 'Transform your speaking skills with daily practice, professional techniques, and real-time feedback. Your journey to confident, powerful speech starts here.',
    icon: '🎙️',
  },
  {
    overline: 'READ. EXPRESS. INSPIRE.',
    title: 'Teleprompter Training',
    body: 'Use our built-in teleprompter to practice reading with confidence. Choose from Public Speaking, Diction, or Storytelling texts — and control speed to match your level.',
    icon: '📺',
  },
  {
    overline: 'BUILD YOUR PERSONAL LIBRARY',
    title: 'Text Workshop',
    body: 'Browse default texts or create your own. Add, edit, and manage custom scripts tailored to your practice goals. Your library, your rules.',
    icon: '📚',
  },
  {
    overline: 'LEARN FROM THE EXPERTS',
    title: 'Tips & Blog',
    body: 'Explore curated tips on Confidence, Breathing, and Clarity. Read in-depth articles from our oratory blog. Save favorites and share wisdom with others.',
    icon: '💡',
  },
  {
    overline: 'COMPETE WITH FRIENDS',
    title: 'Diction Battle',
    body: 'Challenge a friend to a live diction battle! Take turns reading, then let the crowd vote for the better speaker. The ultimate test of your vocal mastery.',
    icon: '⚔️',
  },
];

const pblicvceonboardAccent = '#5BB0D9';
const pblicvceonboardTitle = '#0A1F33';
const pblicvceonboardBody = '#5A6B7D';
const pblicvceonboardDotIdle = '#C5D9E8';

const Onboarding = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const [step, setStep] = useState(0);

  const isLastStep = step === ONBOARDING_STEPS.length - 1;
  const current = ONBOARDING_STEPS[step];

  const finishOnboarding = useCallback(async () => {
    await AsyncStorage.setItem(ONBOARDING_DONE_KEY, 'true');
    navigation.navigate('TabNav' as never);
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
      source={require('../assets/images/pblicvcetrainonb.png')}
      style={styles.pblicvceonboardBg}
      resizeMode="cover">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}>
        <View
          style={[
            styles.pblicvceonboardRoot,
            {paddingTop: insets.top, paddingBottom: insets.bottom},
          ]}>
          <Pressable
            onPress={handleSkip}
            style={({pressed}) => [
              styles.pblicvceonboardSkip,
              pressed && styles.pblicvceonboardSkipPressed,
            ]}
            hitSlop={12}>
            <Text style={styles.pblicvceonboardSkipText}>Skip</Text>
          </Pressable>

          <View style={styles.pblicvceonboardHero}>
            <View style={styles.pblicvceonboardGlass}>
              <Text style={styles.pblicvceonboardIcon}>{current.icon}</Text>
            </View>
          </View>

          <View style={styles.pblicvceonboardCard}>
            <View style={styles.pblicvceonboardProgress}>
              {ONBOARDING_STEPS.map((_, index) =>
                index === step ? (
                  <View
                    key={index}
                    style={styles.pblicvceonboardProgressActive}
                  />
                ) : (
                  <View key={index} style={styles.pblicvceonboardProgressDot} />
                ),
              )}
            </View>

            <Text style={styles.pblicvceonboardOverline}>
              {current.overline}
            </Text>
            <Text style={styles.pblicvceonboardTitle}>{current.title}</Text>
            <Text style={styles.pblicvceonboardBody}>{current.body}</Text>

            {isLastStep ? (
              <Pressable
                onPress={handleContinue}
                style={({pressed}) => [
                  styles.pblicvceonboardCtaWrap,
                  pressed && styles.pblicvceonboardCtaPressed,
                ]}>
                <LinearGradient
                  colors={['#F07911', '#E4AD1B']}
                  style={styles.pblicvceonboardCtaGradient}>
                  <Text style={styles.pblicvceonboardCtaText}>
                    Let&apos;s Begin! 🚀
                  </Text>
                </LinearGradient>
              </Pressable>
            ) : (
              <Pressable onPress={handleContinue}>
                <LinearGradient
                  colors={['#54C0DA', '#6CD0F7']}
                  style={styles.pblicvceonboardCta}>
                  <Text style={styles.pblicvceonboardCtaText}>Continue</Text>
                </LinearGradient>
              </Pressable>
            )}
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  pblicvceonboardBg: {
    flex: 1,
  },
  pblicvceonboardRoot: {
    flex: 1,
  },
  pblicvceonboardSkip: {
    alignSelf: 'flex-end',
    marginTop: 8,
    marginRight: 20,
    paddingHorizontal: 15,
    paddingVertical: 9,
    borderRadius: 14,
    backgroundColor: '#FFFFFF33',
  },
  pblicvceonboardSkipPressed: {
    opacity: 0.85,
  },
  pblicvceonboardSkipText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  pblicvceonboardHero: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 24,
  },
  pblicvceonboardGlass: {
    width: 140,
    height: 140,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF40',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.45)',
  },
  pblicvceonboardIcon: {
    fontSize: 46,
  },
  pblicvceonboardCard: {
    backgroundColor: 'rgba(218, 248, 255, 0.85)',
    borderRadius: 24,
    paddingHorizontal: 28,
    paddingTop: 28,
    paddingBottom: 32,
    width: '92%',
    alignSelf: 'center',
  },
  pblicvceonboardProgress: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 22,
  },
  pblicvceonboardProgressActive: {
    width: 28,
    height: 6,
    borderRadius: 3,
    backgroundColor: pblicvceonboardAccent,
  },
  pblicvceonboardProgressDot: {
    width: 7,
    height: 4,
    borderRadius: 3,
    backgroundColor: pblicvceonboardDotIdle,
  },
  pblicvceonboardOverline: {
    color: '#54C0DA',
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 1.2,

    marginBottom: 10,
  },
  pblicvceonboardTitle: {
    color: '#1C2B3A',
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 14,
  },
  pblicvceonboardBody: {
    color: '#4A6A7A',
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 28,
  },
  pblicvceonboardCtaWrap: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  pblicvceonboardCta: {
    backgroundColor: pblicvceonboardAccent,
    borderRadius: 16,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pblicvceonboardCtaGradient: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    borderRadius: 16,
  },
  pblicvceonboardCtaPressed: {
    opacity: 0.9,
  },
  pblicvceonboardCtaText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
  },
});
