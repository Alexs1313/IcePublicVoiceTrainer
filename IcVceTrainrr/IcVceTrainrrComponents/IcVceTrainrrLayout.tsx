import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const IcVceTrainrrLayout = ({
  children,
  bounce = true,
}: {
  children: React.ReactNode;
  wudlanndvildexplorrlayScroll?: boolean;
  bounce?: boolean;
}) => {
  return (
    <LinearGradient
      colors={['rgb(185, 225, 234)', 'rgb(7, 149, 181)']}
      style={icVceTrainrrStyles.icVceTrainrrWudlanndvildexplorrlayBackground}>
      <ScrollView
        bounces={bounce}
        contentContainerStyle={
          icVceTrainrrStyles.icVceTrainrrWudlanndvildexplorrlayScrollContent
        }
        showsVerticalScrollIndicator={false}>
        {children}
      </ScrollView>
    </LinearGradient>
  );
};

const icVceTrainrrStyles = StyleSheet.create({
  icVceTrainrrWudlanndvildexplorrlayBackground: {
    flex: 1,
    backgroundColor: '#DFF9FF',
  },
  icVceTrainrrWudlanndvildexplorrlayScrollContent: {
    flexGrow: 1,
  },
  icVceTrainrrWudlanndvildexplorrlayFill: {
    flex: 1,
  },
});

export default IcVceTrainrrLayout;
