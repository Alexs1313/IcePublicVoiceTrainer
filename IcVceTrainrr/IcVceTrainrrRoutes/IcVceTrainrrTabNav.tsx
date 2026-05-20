import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  type ImageSourcePropType,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import IcVceTrainrrPromptrScrrn from '../IcVceTrainrrScreens/IcVceTrainrrPromptrScrrn.tsx';
import IcVceTrainrrWorkshopscrn from '../IcVceTrainrrScreens/IcVceTrainrrWorkshopscrn.tsx';
import IcVceTrainrrBlogscrrn from '../IcVceTrainrrScreens/IcVceTrainrrBlogscrrn.tsx';
import IcVceTrainrrTipsScrn from '../IcVceTrainrrScreens/IcVceTrainrrTipsScrn.tsx';
import IcVceTrainrrBattlescrrn from '../IcVceTrainrrScreens/IcVceTrainrrBattlescrrn.tsx';

const Tab = createBottomTabNavigator();

const icVceTrainrrGlaciertrailsIcadventretabBg = '#FFFFFFF2';

const icVceTrainrrGlaciertrailsIcadventretabActive = '#5BB0D9';
const icVceTrainrrGlaciertrailsIcadventretabIdle = '#6B7C8E';

type GlacierTrailsIcadventretabItemProps = {
  label: string;
  focused: boolean;
  source: ImageSourcePropType;
};

const GlacierTrailsIcadventretabItem = ({
  label,
  focused,
  source,
}: GlacierTrailsIcadventretabItemProps) => {
  const icVceTrainrrGlaciertrailsIcadventretabColor = focused
    ? icVceTrainrrGlaciertrailsIcadventretabActive
    : icVceTrainrrGlaciertrailsIcadventretabIdle;
  return (
    <View
      style={[
        icVceTrainrrStyles.icVceTrainrrGlaciertrailsIcadventretabItem,
        {backgroundColor: focused ? '#54C0DA1A' : 'transparent'},
      ]}>
      <View style={icVceTrainrrStyles.icVceTrainrrGlaciertrailsIcadventretabIconImageWrap}>
        <Image
          source={source}
          style={icVceTrainrrStyles.icVceTrainrrGlaciertrailsIcadventretabIconImg}
          resizeMode="contain"
          tintColor={icVceTrainrrGlaciertrailsIcadventretabColor}
        />
      </View>
      <Text
        style={[
          icVceTrainrrStyles.icVceTrainrrGlaciertrailsIcadventretabLabel,
          {color: icVceTrainrrGlaciertrailsIcadventretabColor},
        ]}>
        {label}
      </Text>
      <View style={icVceTrainrrStyles.icVceTrainrrGlaciertrailsIcadventretabDotRow}>
        {focused ? (
          <View style={icVceTrainrrStyles.icVceTrainrrGlaciertrailsIcadventretabDot} />
        ) : (
          <View style={icVceTrainrrStyles.icVceTrainrrGlaciertrailsIcadventretabDotGhost} />
        )}
      </View>
    </View>
  );
};

const GlacierTrailsIcadventretabTabIconExplore = ({
  focused,
}: {
  focused: boolean;
}) => (
  <GlacierTrailsIcadventretabItem
    label="Prompter"
    focused={focused}
    source={require('../IcVceTrainrrAssets/IcVceTrainrrImages/IcVceTrainrrPblicvcetrainertb1.png')}
  />
);

const GlacierTrailsIcadventretabTabIconMap = ({
  focused,
}: {
  focused: boolean;
}) => (
  <GlacierTrailsIcadventretabItem
    label="Workshop"
    focused={focused}
    source={require('../IcVceTrainrrAssets/IcVceTrainrrImages/IcVceTrainrrPblicvcetrainertb2.png')}
  />
);

const GlacierTrailsIcadventretabTabIconJournal = ({
  focused,
}: {
  focused: boolean;
}) => (
  <GlacierTrailsIcadventretabItem
    label="Blog"
    focused={focused}
    source={require('../IcVceTrainrrAssets/IcVceTrainrrImages/IcVceTrainrrPblicvcetrainertb3.png')}
  />
);

const GlacierTrailsIcadventretabTabIconCalc = ({
  focused,
}: {
  focused: boolean;
}) => (
  <GlacierTrailsIcadventretabItem
    label="Tips"
    focused={focused}
    source={require('../IcVceTrainrrAssets/IcVceTrainrrImages/IcVceTrainrrPblicvcetrainertb4.png')}
  />
);

const GlacierTrailsIcadventretabTabIconGame = ({
  focused,
}: {
  focused: boolean;
}) => (
  <GlacierTrailsIcadventretabItem
    label="Battle"
    focused={focused}
    source={require('../IcVceTrainrrAssets/IcVceTrainrrImages/IcVceTrainrrPblicvcetrainertb5.png')}
  />
);

const GlacierTrailsIcadventretabBarBg = () => (
  <View pointerEvents="none" style={icVceTrainrrStyles.icVceTrainrrGlaciertrailsIcadventretabBarFill} />
);

const IcVceTrainrrTabNav = () => {
  const icVceTrainrrGlaciertrailsIcadventretabInsets = useSafeAreaInsets();
  const icVceTrainrrGlaciertrailsIcadventretabBarH =
    58 + Math.max(icVceTrainrrGlaciertrailsIcadventretabInsets.bottom, 10);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: icVceTrainrrGlaciertrailsIcadventretabActive,
        tabBarInactiveTintColor: icVceTrainrrGlaciertrailsIcadventretabIdle,
        tabBarStyle: [
          icVceTrainrrStyles.icVceTrainrrGlaciertrailsIcadventretabBar,
          {
            height: icVceTrainrrGlaciertrailsIcadventretabBarH,
            paddingBottom: Math.max(
              icVceTrainrrGlaciertrailsIcadventretabInsets.bottom,
              10,
            ),
          },
        ],
        tabBarBackground: GlacierTrailsIcadventretabBarBg,
      }}>
      <Tab.Screen
        name="IcVceTrainrrPromptrScrrn"
        component={IcVceTrainrrPromptrScrrn}
        options={{
          tabBarIcon: GlacierTrailsIcadventretabTabIconExplore,
        }}
      />
      <Tab.Screen
        name="IcVceTrainrrWorkshopscrn"
        component={IcVceTrainrrWorkshopscrn}
        options={{
          tabBarIcon: GlacierTrailsIcadventretabTabIconMap,
        }}
      />
      <Tab.Screen
        name="IcVceTrainrrBlogscrrn"
        component={IcVceTrainrrBlogscrrn}
        options={({route}) => {
          const jRoute = getFocusedRouteNameFromRoute(route) ?? 'IcVceTrainrrBlogHome';
          const jHide = jRoute === 'IcVceTrainrrBlogArticleDetail';
          return {
            tabBarIcon: GlacierTrailsIcadventretabTabIconJournal,
            tabBarStyle: jHide
              ? {display: 'none', height: 0}
              : [
                  icVceTrainrrStyles.icVceTrainrrGlaciertrailsIcadventretabBar,
                  {
                    height: icVceTrainrrGlaciertrailsIcadventretabBarH,
                    paddingBottom: Math.max(
                      icVceTrainrrGlaciertrailsIcadventretabInsets.bottom,
                      10,
                    ),
                  },
                ],
          };
        }}
      />
      <Tab.Screen
        name="IcVceTrainrrTipsScrn"
        component={IcVceTrainrrTipsScrn}
        options={({route}) => {
          const calcRoute = getFocusedRouteNameFromRoute(route) ?? 'IcVceTrainrrTipsHome';
          const calcHideTab = calcRoute !== 'IcVceTrainrrTipsHome';
          return {
            tabBarIcon: GlacierTrailsIcadventretabTabIconCalc,
            tabBarStyle: calcHideTab
              ? {display: 'none', height: 0}
              : [
                  icVceTrainrrStyles.icVceTrainrrGlaciertrailsIcadventretabBar,
                  {
                    height: icVceTrainrrGlaciertrailsIcadventretabBarH,
                    paddingBottom: Math.max(
                      icVceTrainrrGlaciertrailsIcadventretabInsets.bottom,
                      10,
                    ),
                  },
                ],
          };
        }}
      />
      <Tab.Screen
        name="IcVceTrainrrBattlescrrn"
        component={IcVceTrainrrBattlescrrn}
        options={({route}) => {
          const gameRoute = getFocusedRouteNameFromRoute(route) ?? 'IcVceTrainrrBattleHome';
          const gameHideTab = gameRoute === 'IcVceTrainrrBattlePlayerReady';
          return {
            tabBarIcon: GlacierTrailsIcadventretabTabIconGame,
            tabBarStyle: gameHideTab
              ? {display: 'none', height: 0}
              : [
                  icVceTrainrrStyles.icVceTrainrrGlaciertrailsIcadventretabBar,
                  {
                    height: icVceTrainrrGlaciertrailsIcadventretabBarH,
                    paddingBottom: Math.max(
                      icVceTrainrrGlaciertrailsIcadventretabInsets.bottom,
                      10,
                    ),
                  },
                ],
          };
        }}
      />
    </Tab.Navigator>
  );
};

const icVceTrainrrStyles = StyleSheet.create({
  icVceTrainrrGlaciertrailsIcadventretabBar: {
    elevation: 0,
    paddingTop: 18,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderColor: '#6CD0F740',
    borderTopColor: '#6CD0F740',
  },
  icVceTrainrrGlaciertrailsIcadventretabBarFill: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: icVceTrainrrGlaciertrailsIcadventretabBg,
  },
  icVceTrainrrGlaciertrailsIcadventretabIconImageWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 54,
    height: 28,
  },
  icVceTrainrrGlaciertrailsIcadventretabIconImg: {},
  icVceTrainrrGlaciertrailsIcadventretabItem: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 2,
    backgroundColor: '#54C0DA1A',
    borderRadius: 14,
    paddingVertical: 4,
    minWidth: 72,
    minHeight: 53,
  },
  icVceTrainrrGlaciertrailsIcadventretabLabel: {
    marginTop: 2,
    fontSize: 9,
    fontWeight: '500',
    textAlign: 'center',
  },
  icVceTrainrrGlaciertrailsIcadventretabDotRow: {
    marginTop: 4,
    height: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icVceTrainrrGlaciertrailsIcadventretabDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: icVceTrainrrGlaciertrailsIcadventretabActive,
  },
  icVceTrainrrGlaciertrailsIcadventretabDotGhost: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    opacity: 0,
  },
});

export default IcVceTrainrrTabNav;
