import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import type {RouteProp} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import PromptrStreakHeader from '../../components/promptr/PromptrStreakHeader';
import type {PromptrStackParamList} from '../../routes/promptrTypes';
import {
  SCROLL_SPEED_PX,
  TEXT_SIZE_PX,
  pblicvcepromptrAccent,
  pblicvcepromptrReadingBg,
} from '../../theme/promptrTheme';
import Orientation from 'react-native-orientation-locker';

type Nav = StackNavigationProp<PromptrStackParamList, 'PromptrReading'>;
type Route = RouteProp<PromptrStackParamList, 'PromptrReading'>;

const PromptrReading = () => {
  const insets = useSafeAreaInsets();
  const tabBarHeight = useBottomTabBarHeight();
  const navigation = useNavigation<Nav>();
  const route = useRoute<Route>();
  const {categoryTitle, textTitle, textBody, scrollSpeed, textSize} =
    route.params;

  const scrollRef = useRef<ScrollView>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const scrollYRef = useRef(0);
  const contentHeightRef = useRef(0);
  const viewportHeightRef = useRef(0);

  const fontSize = TEXT_SIZE_PX[textSize];
  const scrollStep = SCROLL_SPEED_PX[scrollSpeed];

  const updateProgress = useCallback(() => {
    const maxScroll = Math.max(
      contentHeightRef.current - viewportHeightRef.current,
      1,
    );
    const pct = Math.min(
      100,
      Math.round((scrollYRef.current / maxScroll) * 100),
    );
    setProgress(pct);
  }, []);

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    scrollYRef.current = e.nativeEvent.contentOffset.y;
    updateProgress();
  };

  const handleContentSizeChange = (_w: number, h: number) => {
    contentHeightRef.current = h;
    updateProgress();
  };

  const handleLayout = (e: {nativeEvent: {layout: {height: number}}}) => {
    viewportHeightRef.current = e.nativeEvent.layout.height;
    updateProgress();
  };

  useEffect(() => {
    if (!isPlaying) {
      return undefined;
    }

    const timer = setInterval(() => {
      const maxScroll = Math.max(
        contentHeightRef.current - viewportHeightRef.current,
        0,
      );
      const nextY = Math.min(scrollYRef.current + scrollStep, maxScroll);
      scrollRef.current?.scrollTo({y: nextY, animated: false});
      scrollYRef.current = nextY;
      updateProgress();

      if (nextY >= maxScroll) {
        setIsPlaying(false);
      }
    }, 50);

    return () => clearInterval(timer);
  }, [isPlaying, scrollStep, updateProgress]);

  const resetScroll = () => {
    scrollRef.current?.scrollTo({y: 0, animated: true});
    scrollYRef.current = 0;
    setProgress(0);
    setIsPlaying(false);
  };

  useFocusEffect(
    useCallback(() => {
      Orientation.lockToPortrait();
      return () => {
        Orientation.unlockAllOrientations();
      };
    }, []),
  );

  const completeSession = () => {
    setIsPlaying(false);
    navigation.replace('PromptrSessionComplete', {
      categoryTitle,
      textTitle,
    });
  };

  return (
    <View style={styles.root}>
      <View style={[styles.lightTop, {paddingTop: Math.max(insets.top, 8)}]}>
        <PromptrStreakHeader showDivider={false} />
      </View>

      <View style={styles.darkPanel}>
        <View style={styles.toolbar}>
          <Pressable
            onPress={() => navigation.goBack()}
            style={({pressed}) => [styles.toolBtn, pressed && styles.pressed]}>
            <Image
              source={require('../../assets/images/pblicvcetraiback.png')}
              tintColor="#FFFFFF"
            />
          </Pressable>

          <View style={styles.toolbarCenter}>
            <Text style={styles.categoryLabel}>{categoryTitle}</Text>
            <Text style={styles.sessionTitle} numberOfLines={1}>
              {textTitle}
            </Text>
          </View>

          <View style={styles.progressBadge}>
            <Text style={styles.progressBadgeText}>{progress}%</Text>
          </View>
        </View>

        <View style={styles.progressTrack}>
          <View
            style={[styles.progressFill, {flex: Math.max(progress, 0.001)}]}
          />
          <View style={{flex: Math.max(100 - progress, 0.001)}} />
        </View>

        <View style={styles.scrollViewport} onLayout={handleLayout}>
          <ScrollView
            ref={scrollRef}
            style={styles.scroll}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            onContentSizeChange={handleContentSizeChange}>
            <Text
              style={[
                styles.bodyText,
                {fontSize, lineHeight: fontSize * 1.45},
              ]}>
              {textBody}
            </Text>
          </ScrollView>
        </View>

        <View style={[styles.controls, {paddingBottom: 15}]}>
          <Pressable
            onPress={resetScroll}
            style={({pressed}) => [styles.sideBtn, pressed && styles.pressed]}>
            <Image
              source={require('../../assets/images/pblicvcetraistrrestr.png')}
            />
          </Pressable>

          <Pressable
            onPress={() => setIsPlaying(prev => !prev)}
            style={({pressed}) => [styles.playBtn, pressed && styles.pressed]}>
            <Image
              source={
                isPlaying
                  ? require('../../assets/images/pblicvcetraistrpaus.png')
                  : require('../../assets/images/pblicvcetraistrread.png')
              }
            />
          </Pressable>

          <Pressable
            onPress={completeSession}
            style={({pressed}) => [styles.sideBtn, pressed && styles.pressed]}>
            <Image
              source={require('../../assets/images/pblicvcetraistrdone.png')}
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default PromptrReading;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#DFF9FF',
  },
  lightTop: {
    backgroundColor: '#DFF9FF',
  },
  darkPanel: {
    flex: 1,
    backgroundColor: pblicvcepromptrReadingBg,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
    gap: 12,
    justifyContent: 'space-between',
    marginTop: 8,
  },
  toolBtn: {
    width: 35,
    height: 35,
    borderRadius: 14,
    backgroundColor: '#FFFFFF1A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  toolBtnText: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '600',
    marginTop: -2,
  },
  toolbarCenter: {},
  categoryLabel: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 11,
    marginBottom: 2,
    textAlign: 'center',
  },
  sessionTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  progressBadge: {
    width: 35,
    height: 35,
    borderRadius: 14,
    backgroundColor: '#FFFFFF1A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressBadgeText: {
    color: '#FFFFFF80',
    fontSize: 11,
    fontWeight: '700',
  },
  progressTrack: {
    alignSelf: 'stretch',
    height: 6,
    backgroundColor: '#FFFFFF1A',
    marginHorizontal: 16,
    borderRadius: 3,
    marginBottom: 8,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#6CD0F7',
    borderRadius: 3,
  },
  scrollViewport: {
    flex: 1,
  },
  scroll: {
    flex: 1,
    paddingHorizontal: 20,
  },
  scrollContent: {
    paddingVertical: 24,
    paddingBottom: 24,
  },
  bodyText: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 28,
    paddingTop: 12,
    paddingHorizontal: 24,
  },
  sideBtn: {
    width: 55,
    height: 55,
    borderRadius: 16,
    backgroundColor: '#FFFFFF14',
    alignItems: 'center',
    justifyContent: 'center',

    borderWidth: 1,
    borderColor: '#FFFFFF1F',
  },
  sideBtnIcon: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '600',
  },
  playBtn: {
    width: 72,
    height: 72,
    borderRadius: 20,
    backgroundColor: pblicvcepromptrAccent,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: pblicvcepromptrAccent,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 8,
  },
  playBtnIcon: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '700',
  },
  pressed: {
    opacity: 0.85,
  },
});
