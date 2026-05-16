import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

import BlogArticleDetail from '../screens/blog/BlogArticleDetail';
import BlogHome from '../screens/blog/BlogHome';
import type {BlogStackParamList} from './blogTypes';

const Stack = createStackNavigator<BlogStackParamList>();

const BlogStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {backgroundColor: '#DFF9FF'},
      }}>
      <Stack.Screen name="BlogHome" component={BlogHome} />
      <Stack.Screen name="BlogArticleDetail" component={BlogArticleDetail} />
    </Stack.Navigator>
  );
};

export default BlogStack;
