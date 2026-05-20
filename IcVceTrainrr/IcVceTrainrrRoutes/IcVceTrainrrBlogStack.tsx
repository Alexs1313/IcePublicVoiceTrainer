import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

import IcVceTrainrrBlogArticleDetail from '../IcVceTrainrrScreens/IcVceTrainrrBlog/IcVceTrainrrBlogArticleDetail';
import IcVceTrainrrBlogHome from '../IcVceTrainrrScreens/IcVceTrainrrBlog/IcVceTrainrrBlogHome';
import type {IcVceTrainrrBlogStackParamList} from './IcVceTrainrrBlogTypes';

const Stack = createStackNavigator<IcVceTrainrrBlogStackParamList>();

const IcVceTrainrrBlogStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {backgroundColor: '#DFF9FF'},
      }}>
      <Stack.Screen name="IcVceTrainrrBlogHome" component={IcVceTrainrrBlogHome} />
      <Stack.Screen name="IcVceTrainrrBlogArticleDetail" component={IcVceTrainrrBlogArticleDetail} />
    </Stack.Navigator>
  );
};

export default IcVceTrainrrBlogStack;
