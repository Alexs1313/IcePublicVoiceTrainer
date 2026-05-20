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
import {icVceTrainrrBATTLE_READING_TEXT} from '../../IcVceTrainrrData/IcVceTrainrrBattleText';
import type {IcVceTrainrrBattleStackParamList} from '../../IcVceTrainrrRoutes/IcVceTrainrrBattleTypes';
import {icVceTrainrrGetPlayerColor} from '../../IcVceTrainrrTheme/IcVceTrainrrBattleTheme';
import {
  icVceTrainrrSCROLL_SPEED_PX,
  icVceTrainrrTEXT_SIZE_PX,
  icVceTrainrrPblicvcepromptrAccent,
  icVceTrainrrPblicvcepromptrReadingBg,
} from '../../IcVceTrainrrTheme/IcVceTrainrrPromptrTheme';
import Orientation from 'react-native-orientation-locker';

type Nav = StackNavigationProp<IcVceTrainrrBattleStackParamList, 'IcVceTrainrrBattleReading'>;
type Route = RouteProp<IcVceTrainrrBattleStackParamList, 'IcVceTrainrrBattleReading'>;

const IcVceTrainrrBattleReading = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<Nav>();
  const route = useRoute<Route>();
  const {playerIndex, player1Name, player2Name, scrollSpeed, textSize} =
    route.params;

  const playerName = playerIndex === 0 ? player1Name : player2Name;
  const playerColor = icVceTrainrrGetPlayerColor(playerIndex);

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

  const goNext = () => {
    setIsPlaying(false);
    const session = {player1Name, player2Name, scrollSpeed, textSize};

    if (playerIndex === 0) {
      navigation.replace('IcVceTrainrrBattlePlayerReady', {
        ...session,
        playerIndex: 1,
      });
      return;
    }

    navigation.replace('IcVceTrainrrBattleVoting', session);
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

          <View style={icVceTrainrrStyles.icVceTrainrrTurnBadge}>
            <View style={[icVceTrainrrStyles.icVceTrainrrTurnDot, {backgroundColor: playerColor}]} />
            <Text style={icVceTrainrrStyles.icVceTrainrrTurnText}>{playerName}&apos;s Turn</Text>
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

        <View
          style={icVceTrainrrStyles.icVceTrainrrScrollViewport}
          onLayout={e => {
            viewportHeightRef.current = e.nativeEvent.layout.height;
            updateProgress();
          }}>
          <ScrollView
            ref={scrollRef}
            style={icVceTrainrrStyles.icVceTrainrrScroll}
            contentContainerStyle={icVceTrainrrStyles.icVceTrainrrScrollContent}
            showsVerticalScrollIndicator={false}
            onScroll={(e: NativeSyntheticEvent<NativeScrollEvent>) => {
              scrollYRef.current = e.nativeEvent.contentOffset.y;
              updateProgress();
            }}
            scrollEventThrottle={16}
            onContentSizeChange={(_w, h) => {
              contentHeightRef.current = h;
              updateProgress();
            }}>
            <Text
              style={[
                icVceTrainrrStyles.icVceTrainrrBodyText,
                {fontSize, lineHeight: fontSize * 1.45},
              ]}>
              {icVceTrainrrBATTLE_READING_TEXT}
            </Text>
          </ScrollView>
        </View>

        <View
          style={[
            icVceTrainrrStyles.icVceTrainrrControls,
            {paddingBottom: Math.max(insets.bottom, 16)},
          ]}>
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
            onPress={goNext}
            style={({pressed}) => [icVceTrainrrStyles.icVceTrainrrSideBtn, pressed && icVceTrainrrStyles.icVceTrainrrPressed]}>
            <Image source={require('../../IcVceTrainrrAssets/IcVceTrainrrImages/IcVceTrainrrPblicvcetrnx.png')} />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default IcVceTrainrrBattleReading;

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
  },
  icVceTrainrrToolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
    gap: 10,
  },
  icVceTrainrrToolBtn: {
    width: 35.021,
    height: 35.021,
    borderRadius: 14.21,
    backgroundColor: '#FFFFFF1A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icVceTrainrrTurnBadge: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#FFFFFF14',
    borderRadius: 20.162,
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  icVceTrainrrTurnDot: {
    width: 10.24,
    height: 10.23,
    borderRadius: 3.24,
  },
  icVceTrainrrTurnText: {
    color: '#FFFFFF',
    fontSize: 14.21,
    fontWeight: '600',
  },
  icVceTrainrrProgressBadge: {
    width: 35.021,
    height: 35.021,
    borderRadius: 14,
    backgroundColor: '#FFFFFF1A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icVceTrainrrProgressBadgeText: {
    color: '#FFFFFF80',
    fontSize: 11,
    fontWeight: '700',
  },
  icVceTrainrrProgressTrack: {
    alignSelf: 'stretch',
    height: 6,
    backgroundColor: '#FFFFFF1A',
    marginHorizontal: 16.12,
    borderRadius: 3.24,
    marginBottom: 8,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  icVceTrainrrProgressFill: {
    height: '100%',
    backgroundColor: '#6CD0F7',
    borderRadius: 3.24,
  },
  icVceTrainrrScrollViewport: {
    flex: 1,
  },
  icVceTrainrrScroll: {
    flex: 1,
    paddingHorizontal: 20.12,
  },
  icVceTrainrrScrollContent: {
    paddingVertical: 24.62,
    paddingBottom: 24.62,
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
    paddingTop: 12.22,
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
  icVceTrainrrNextIcon: {
    color: '#FFFFFF',
    fontSize: 28.162,
    fontWeight: '600',
    marginTop: -2,
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
  icVceTrainrrPressed: {
    opacity: 0.85,
  },
});
