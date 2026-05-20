import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';

const IcVceTrainrrLayout = ({
  children,
  bounce = true,
}: {
  children: React.ReactNode;
  wudlanndvildexplorrlayScroll?: boolean;
  bounce?: boolean;
}) => {
  return (
    <View style={icVceTrainrrStyles.icVceTrainrrWudlanndvildexplorrlayBackground}>
      <ScrollView
        bounces={bounce}
        contentContainerStyle={icVceTrainrrStyles.icVceTrainrrWudlanndvildexplorrlayScrollContent}
        showsVerticalScrollIndicator={false}>
        {children}
      </ScrollView>
    </View>
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
