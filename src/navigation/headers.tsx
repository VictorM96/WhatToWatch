import { BlurView } from 'expo-blur';
import React from 'react';
import { StyleSheet } from 'react-native';

import { Box } from 'components/Box';
import { CrossIcon, Icon } from 'components/Icon';
import { Touchable } from 'components/Touchable';

export const modalHeaderOptions = ({ navigation, route, theme }) => {
  return {
    headerShown: true,
    headerLeft: () => null,
    headerRight: () => (
      <Touchable onPress={() => navigation.goBack()}>
        <Box mr="sm" backgroundColor="dark900" borderRadius={30}>
          <Icon size={30} icon={CrossIcon} />
        </Box>
      </Touchable>
    ),
    title: route.params.name,
    headerTintColor: theme.colors.light900,
    headerTransparent: true,
    headerBackground: () => (
      <BlurView tint="dark" intensity={100} style={StyleSheet.absoluteFill} />
    )
  };
};