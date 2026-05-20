import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import type {RouteProp} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import React, {useCallback, useState} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import IcVceTrainrrLayout from '../../IcVceTrainrrComponents/IcVceTrainrrLayout';
import IcVceTrainrrPromptrStreakHeader from '../../IcVceTrainrrComponents/IcVceTrainrrPromptr/IcVceTrainrrPromptrStreakHeader';
import {icVceTrainrrGetLibraryTexts} from '../../IcVceTrainrrData/IcVceTrainrrTextLibraryStore';
import type {PromptrText} from '../../IcVceTrainrrData/IcVceTrainrrPromptrTexts';
import type {IcVceTrainrrPromptrStackParamList} from '../../IcVceTrainrrRoutes/IcVceTrainrrPromptrTypes';
import {
  icVceTrainrrPblicvcepromptrAccent,
  icVceTrainrrPblicvcepromptrAccentAlt,
  icVceTrainrrPblicvcepromptrMuted,
  icVceTrainrrPblicvcepromptrTitle,
} from '../../IcVceTrainrrTheme/IcVceTrainrrPromptrTheme';
import LinearGradient from 'react-native-linear-gradient';

type Nav = StackNavigationProp<IcVceTrainrrPromptrStackParamList, 'IcVceTrainrrPromptrTextList'>;
type Route = RouteProp<IcVceTrainrrPromptrStackParamList, 'IcVceTrainrrPromptrTextList'>;

const IcVceTrainrrPromptrTextList = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<Nav>();
  const route = useRoute<Route>();
  const {categoryId, categoryTitle} = route.params;
  const [texts, setTexts] = useState<PromptrText[]>([]);

  const loadTexts = useCallback(async () => {
    const items = await icVceTrainrrGetLibraryTexts(categoryId);
    setTexts(items);
  }, [categoryId]);

  useFocusEffect(
    useCallback(() => {
      loadTexts();
    }, [loadTexts]),
  );

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
        <IcVceTrainrrPromptrStreakHeader />

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
              <Text style={icVceTrainrrStyles.icVceTrainrrHeading}>{categoryTitle}</Text>
              <Text style={icVceTrainrrStyles.icVceTrainrrCount}>{texts.length} texts available</Text>
            </View>
          </View>

          <View style={icVceTrainrrStyles.icVceTrainrrList}>
            {texts.map(item => (
              <Pressable
                key={item.id}
                onPress={() =>
                  navigation.navigate('IcVceTrainrrPromptrDifficulty', {
                    categoryId,
                    categoryTitle,
                    textId: item.id,
                    textTitle: item.title,
                    textBody: item.body,
                  })
                }
                style={({pressed}) => [icVceTrainrrStyles.icVceTrainrrCard, pressed && icVceTrainrrStyles.icVceTrainrrPressed]}>
                <View style={icVceTrainrrStyles.icVceTrainrrBadge}>
                  <Text style={icVceTrainrrStyles.icVceTrainrrBadgeText}>Default</Text>
                </View>
                <Text style={icVceTrainrrStyles.icVceTrainrrCardTitle}>{item.title}</Text>
                <Text style={icVceTrainrrStyles.icVceTrainrrCardPreview} numberOfLines={2}>
                  {item.preview}
                </Text>
                <LinearGradient
                  colors={['#54C0DA', '#54C0DA99']}
                  style={icVceTrainrrStyles.icVceTrainrrPlayBtn}>
                  <Image
                    source={require('../../IcVceTrainrrAssets/IcVceTrainrrImages/IcVceTrainrrPblicvcetraistrt.png')}
                  />
                </LinearGradient>
              </Pressable>
            ))}
          </View>
        </View>
      </View>
    </IcVceTrainrrLayout>
  );
};

export default IcVceTrainrrPromptrTextList;

const icVceTrainrrStyles = StyleSheet.create({
  icVceTrainrrContent: {},
  icVceTrainrrBody: {
    paddingHorizontal: 20,
  },
  icVceTrainrrBackBtn: {
    width: 35,
    height: 35,
    borderRadius: 14,
    backgroundColor: '#54C0DA1A',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  icVceTrainrrBackIcon: {
    color: icVceTrainrrPblicvcepromptrTitle,
    fontSize: 28,
    fontWeight: '600',
    marginTop: -2,
    marginLeft: -2,
  },
  icVceTrainrrHeading: {
    color: '#1C2B3A',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  icVceTrainrrCount: {
    color: icVceTrainrrPblicvcepromptrAccentAlt,
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 18,
  },
  icVceTrainrrList: {
    gap: 12,
  },
  icVceTrainrrCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22.12,
    padding: 18.12,
    paddingRight: 64.021,
    shadowColor: '#0A1F33',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.06,
    shadowRadius: 12.12,
    elevation: 3,
    position: 'relative',
  },
  icVceTrainrrBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#E8F7FB',
    borderRadius: 10.12,
    paddingHorizontal: 10.13,
    paddingVertical: 4.12,
    marginBottom: 10,
  },
  icVceTrainrrBadgeText: {
    color: '#54C0DA',
    fontSize: 11.163,
    fontWeight: '700',
  },
  icVceTrainrrCardTitle: {
    color: icVceTrainrrPblicvcepromptrTitle,
    fontSize: 17.17,
    fontWeight: '700',
    marginBottom: 6.12,
  },
  icVceTrainrrCardPreview: {
    color: icVceTrainrrPblicvcepromptrMuted,
    fontSize: 13.15,
    lineHeight: 18,
  },
  icVceTrainrrPlayBtn: {
    position: 'absolute',
    right: 16.191,
    top: '50%',
    marginTop: -22.191,
    width: 34.12,
    height: 34.12,
    borderRadius: 14.21,
    backgroundColor: icVceTrainrrPblicvcepromptrAccent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icVceTrainrrPlayIcon: {
    color: '#FFFFFF',
    fontSize: 14.21,
    marginLeft: 3.12,
  },
  icVceTrainrrPressed: {
    opacity: 0.92,
  },
});
