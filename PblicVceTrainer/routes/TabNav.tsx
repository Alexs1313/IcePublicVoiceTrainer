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

import PromptrScrrn from '../screens/PromptrScrrn.tsx';
import Workshopscrn from '../screens/Workshopscrn.tsx';
import Blogscrrn from '../screens/Blogscrrn.tsx';
import TipsScrn from '../screens/TipsScrn.tsx';
import Battlescrrn from '../screens/Battlescrrn.tsx';

const Tab = createBottomTabNavigator();

const glaciertrailsIcadventretabBg = '#FFFFFFF2';

const glaciertrailsIcadventretabActive = '#5BB0D9';
const glaciertrailsIcadventretabIdle = '#6B7C8E';

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
  const glaciertrailsIcadventretabColor = focused
    ? glaciertrailsIcadventretabActive
    : glaciertrailsIcadventretabIdle;
  return (
    <View
      style={[
        styles.glaciertrailsIcadventretabItem,
        {backgroundColor: focused ? '#54C0DA1A' : 'transparent'},
      ]}>
      <View style={styles.glaciertrailsIcadventretabIconImageWrap}>
        <Image
          source={source}
          style={styles.glaciertrailsIcadventretabIconImg}
          resizeMode="contain"
          tintColor={glaciertrailsIcadventretabColor}
        />
      </View>
      <Text
        style={[
          styles.glaciertrailsIcadventretabLabel,
          {color: glaciertrailsIcadventretabColor},
        ]}>
        {label}
      </Text>
      <View style={styles.glaciertrailsIcadventretabDotRow}>
        {focused ? (
          <View style={styles.glaciertrailsIcadventretabDot} />
        ) : (
          <View style={styles.glaciertrailsIcadventretabDotGhost} />
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
    source={require('../assets/images/pblicvcetrainertb1.png')}
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
    source={require('../assets/images/pblicvcetrainertb2.png')}
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
    source={require('../assets/images/pblicvcetrainertb3.png')}
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
    source={require('../assets/images/pblicvcetrainertb4.png')}
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
    source={require('../assets/images/pblicvcetrainertb5.png')}
  />
);

const GlacierTrailsIcadventretabBarBg = () => (
  <View pointerEvents="none" style={styles.glaciertrailsIcadventretabBarFill} />
);

const TabNav = () => {
  const glaciertrailsIcadventretabInsets = useSafeAreaInsets();
  const glaciertrailsIcadventretabBarH =
    58 + Math.max(glaciertrailsIcadventretabInsets.bottom, 10);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: glaciertrailsIcadventretabActive,
        tabBarInactiveTintColor: glaciertrailsIcadventretabIdle,
        tabBarStyle: [
          styles.glaciertrailsIcadventretabBar,
          {
            height: glaciertrailsIcadventretabBarH,
            paddingBottom: Math.max(
              glaciertrailsIcadventretabInsets.bottom,
              10,
            ),
          },
        ],
        tabBarBackground: GlacierTrailsIcadventretabBarBg,
      }}>
      <Tab.Screen
        name="PromptrScrrn"
        component={PromptrScrrn}
        options={{
          tabBarIcon: GlacierTrailsIcadventretabTabIconExplore,
        }}
      />
      <Tab.Screen
        name="Workshopscrn"
        component={Workshopscrn}
        options={{
          tabBarIcon: GlacierTrailsIcadventretabTabIconMap,
        }}
      />
      <Tab.Screen
        name="Blogscrrn"
        component={Blogscrrn}
        options={({route}) => {
          const jRoute = getFocusedRouteNameFromRoute(route) ?? 'BlogHome';
          const jHide = jRoute === 'BlogArticleDetail';
          return {
            tabBarIcon: GlacierTrailsIcadventretabTabIconJournal,
            tabBarStyle: jHide
              ? {display: 'none', height: 0}
              : [
                  styles.glaciertrailsIcadventretabBar,
                  {
                    height: glaciertrailsIcadventretabBarH,
                    paddingBottom: Math.max(
                      glaciertrailsIcadventretabInsets.bottom,
                      10,
                    ),
                  },
                ],
          };
        }}
      />
      <Tab.Screen
        name="TipsScrn"
        component={TipsScrn}
        options={({route}) => {
          const calcRoute = getFocusedRouteNameFromRoute(route) ?? 'TipsHome';
          const calcHideTab = calcRoute !== 'TipsHome';
          return {
            tabBarIcon: GlacierTrailsIcadventretabTabIconCalc,
            tabBarStyle: calcHideTab
              ? {display: 'none', height: 0}
              : [
                  styles.glaciertrailsIcadventretabBar,
                  {
                    height: glaciertrailsIcadventretabBarH,
                    paddingBottom: Math.max(
                      glaciertrailsIcadventretabInsets.bottom,
                      10,
                    ),
                  },
                ],
          };
        }}
      />
      <Tab.Screen
        name="Battlescrrn"
        component={Battlescrrn}
        options={({route}) => {
          const gameRoute = getFocusedRouteNameFromRoute(route) ?? 'BattleHome';
          const gameHideTab = gameRoute === 'BattlePlayerReady';
          return {
            tabBarIcon: GlacierTrailsIcadventretabTabIconGame,
            tabBarStyle: gameHideTab
              ? {display: 'none', height: 0}
              : [
                  styles.glaciertrailsIcadventretabBar,
                  {
                    height: glaciertrailsIcadventretabBarH,
                    paddingBottom: Math.max(
                      glaciertrailsIcadventretabInsets.bottom,
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

const styles = StyleSheet.create({
  glaciertrailsIcadventretabBar: {
    elevation: 0,
    paddingTop: 18,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderColor: '#6CD0F740',
    borderTopColor: '#6CD0F740',
  },
  glaciertrailsIcadventretabBarFill: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: glaciertrailsIcadventretabBg,
  },
  glaciertrailsIcadventretabIconImageWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 54,
    height: 28,
  },
  glaciertrailsIcadventretabIconImg: {},
  glaciertrailsIcadventretabItem: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 2,
    backgroundColor: '#54C0DA1A',
    borderRadius: 14,
    paddingVertical: 4,
    minWidth: 72,
    minHeight: 53,
  },
  glaciertrailsIcadventretabLabel: {
    marginTop: 2,
    fontSize: 9,
    fontWeight: '500',
    textAlign: 'center',
  },
  glaciertrailsIcadventretabDotRow: {
    marginTop: 4,
    height: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  glaciertrailsIcadventretabDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: glaciertrailsIcadventretabActive,
  },
  glaciertrailsIcadventretabDotGhost: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    opacity: 0,
  },
});

export default TabNav;
