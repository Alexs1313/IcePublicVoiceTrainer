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

import IcVceTrainrrPromptrStreakHeader from '../../IcVceTrainrrComponents/IcVceTrainrrPromptr/IcVceTrainrrPromptrStreakHeader';
import type {IcVceTrainrrPromptrStackParamList} from '../../IcVceTrainrrRoutes/IcVceTrainrrPromptrTypes';
import {
  icVceTrainrrSCROLL_SPEED_PX,
  icVceTrainrrTEXT_SIZE_PX,
  icVceTrainrrPblicvcepromptrAccent,
  icVceTrainrrPblicvcepromptrReadingBg,
} from '../../IcVceTrainrrTheme/IcVceTrainrrPromptrTheme';
import Orientation from 'react-native-orientation-locker';

type Nav = StackNavigationProp<IcVceTrainrrPromptrStackParamList, 'IcVceTrainrrPromptrReading'>;
type Route = RouteProp<IcVceTrainrrPromptrStackParamList, 'IcVceTrainrrPromptrReading'>;

const IcVceTrainrrPromptrReading = () => {
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

  const fontSize = icVceTrainrrTEXT_SIZE_PX[textSize];
  const scrollStep = icVceTrainrrSCROLL_SPEED_PX[scrollSpeed];

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
    navigation.replace('IcVceTrainrrPromptrSessionComplete', {
      categoryTitle,
      textTitle,
    });
  };

  return (
    <View style={icVceTrainrrStyles.icVceTrainrrRoot}>
      <View style={[icVceTrainrrStyles.icVceTrainrrLightTop, {paddingTop: Math.max(insets.top, 8)}]}>
        <IcVceTrainrrPromptrStreakHeader showDivider={false} />
      </View>

      <View style={icVceTrainrrStyles.icVceTrainrrDarkPanel}>
        <View style={icVceTrainrrStyles.icVceTrainrrToolbar}>
          <Pressable
            onPress={() => navigation.goBack()}
            style={({pressed}) => [icVceTrainrrStyles.icVceTrainrrToolBtn, pressed && icVceTrainrrStyles.icVceTrainrrPressed]}>
            <Image
              source={require('../../IcVceTrainrrAssets/IcVceTrainrrImages/IcVceTrainrrPblicvcetraiback.png')}
              tintColor="#FFFFFF"
            />
          </Pressable>

          <View style={icVceTrainrrStyles.icVceTrainrrToolbarCenter}>
            <Text style={icVceTrainrrStyles.icVceTrainrrCategoryLabel}>{categoryTitle}</Text>
            <Text style={icVceTrainrrStyles.icVceTrainrrSessionTitle} numberOfLines={1}>
              {textTitle}
            </Text>
          </View>

          <View style={icVceTrainrrStyles.icVceTrainrrProgressBadge}>
            <Text style={icVceTrainrrStyles.icVceTrainrrProgressBadgeText}>{progress}%</Text>
          </View>
        </View>

        <View style={icVceTrainrrStyles.icVceTrainrrProgressTrack}>
          <View
            style={[icVceTrainrrStyles.icVceTrainrrProgressFill, {flex: Math.max(progress, 0.001)}]}
          />
          <View style={{flex: Math.max(100 - progress, 0.001)}} />
        </View>

        <View style={icVceTrainrrStyles.icVceTrainrrScrollViewport} onLayout={handleLayout}>
          <ScrollView
            ref={scrollRef}
            style={icVceTrainrrStyles.icVceTrainrrScroll}
            contentContainerStyle={icVceTrainrrStyles.icVceTrainrrScrollContent}
            showsVerticalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            onContentSizeChange={handleContentSizeChange}>
            <Text
              style={[
                icVceTrainrrStyles.icVceTrainrrBodyText,
                {fontSize, lineHeight: fontSize * 1.45},
              ]}>
              {textBody}
            </Text>
          </ScrollView>
        </View>

        <View style={[icVceTrainrrStyles.icVceTrainrrControls, {paddingBottom: 15}]}>
          <Pressable
            onPress={resetScroll}
            style={({pressed}) => [icVceTrainrrStyles.icVceTrainrrSideBtn, pressed && icVceTrainrrStyles.icVceTrainrrPressed]}>
            <Image
              source={require('../../IcVceTrainrrAssets/IcVceTrainrrImages/IcVceTrainrrPblicvcetraistrrestr.png')}
            />
          </Pressable>

          <Pressable
            onPress={() => setIsPlaying(prev => !prev)}
            style={({pressed}) => [icVceTrainrrStyles.icVceTrainrrPlayBtn, pressed && icVceTrainrrStyles.icVceTrainrrPressed]}>
            <Image
              source={
                isPlaying
                  ? require('../../IcVceTrainrrAssets/IcVceTrainrrImages/IcVceTrainrrPblicvcetraistrpaus.png')
                  : require('../../IcVceTrainrrAssets/IcVceTrainrrImages/IcVceTrainrrPblicvcetraistrread.png')
              }
            />
          </Pressable>

          <Pressable
            onPress={completeSession}
            style={({pressed}) => [icVceTrainrrStyles.icVceTrainrrSideBtn, pressed && icVceTrainrrStyles.icVceTrainrrPressed]}>
            <Image
              source={require('../../IcVceTrainrrAssets/IcVceTrainrrImages/IcVceTrainrrPblicvcetraistrdone.png')}
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default IcVceTrainrrPromptrReading;

const icVceTrainrrStyles = StyleSheet.create({
  icVceTrainrrRoot: {
    flex: 1,
    backgroundColor: '#DFF9FF',
  },
  icVceTrainrrLightTop: {
    backgroundColor: '#DFF9FF',
  },
  icVceTrainrrDarkPanel: {
    flex: 1,
    backgroundColor: icVceTrainrrPblicvcepromptrReadingBg,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  icVceTrainrrToolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16.12,
    paddingTop: 8,
    paddingBottom: 12.162,
    gap: 12.112,
    justifyContent: 'space-between',
    marginTop: 8.12,
  },
  icVceTrainrrToolBtn: {
    width: 35.12,
    height: 35.124,
    borderRadius: 14.21,
    backgroundColor: '#FFFFFF1A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icVceTrainrrToolBtnText: {
    color: '#FFFFFF',
    fontSize: 26.213,
    fontWeight: '600',
    marginTop: -2,
  },
  icVceTrainrrToolbarCenter: {},
  icVceTrainrrCategoryLabel: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 11.162,
    marginBottom: 2.12,
    textAlign: 'center',
  },
  icVceTrainrrSessionTitle: {
    color: '#FFFFFF',
    fontSize: 16.129,
    fontWeight: '700',
  },
  icVceTrainrrProgressBadge: {
    width: 35.12,
    height: 35.124,
    borderRadius: 14.21,
    backgroundColor: '#FFFFFF1A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icVceTrainrrProgressBadgeText: {
    color: '#FFFFFF80',
    fontSize: 11.162,
    fontWeight: '700',
  },
  icVceTrainrrProgressTrack: {
    alignSelf: 'stretch',
    height: 6.12,
    backgroundColor: '#FFFFFF1A',
    marginHorizontal: 16.12,
    borderRadius: 3.12,
    marginBottom: 8.12,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  icVceTrainrrProgressFill: {
    height: '100%',
    backgroundColor: '#6CD0F7',
    borderRadius: 3.12,
  },
  icVceTrainrrScrollViewport: {
    flex: 1,
  },
  icVceTrainrrScroll: {
    flex: 1,
    paddingHorizontal: 20.332,
  },
  icVceTrainrrScrollContent: {
    paddingVertical: 24.162,
    paddingBottom: 24.162,
  },
  icVceTrainrrBodyText: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
  icVceTrainrrControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 28,
    paddingTop: 12.162,
    paddingHorizontal: 24.62,
  },
  icVceTrainrrSideBtn: {
    width: 55.131,
    height: 55.131,
    borderRadius: 16.12,
    backgroundColor: '#FFFFFF14',
    alignItems: 'center',
    justifyContent: 'center',

    borderWidth: 1,
    borderColor: '#FFFFFF1F',
  },
  icVceTrainrrSideBtnIcon: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '600',
  },
  icVceTrainrrPlayBtn: {
    width: 72,
    height: 72,
    borderRadius: 20,
    backgroundColor: icVceTrainrrPblicvcepromptrAccent,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: icVceTrainrrPblicvcepromptrAccent,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 8,
  },
  icVceTrainrrPlayBtnIcon: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '700',
  },
  icVceTrainrrPressed: {
    opacity: 0.85,
  },
});
