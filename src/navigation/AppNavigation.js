import React from 'react';
import {Dimensions, StyleSheet, Platform} from 'react-native';
import {
  createStackNavigator,
  TransitionSpecs,
  HeaderStyleInterpolators,
} from '@react-navigation/stack';

import ContactsPage from '../components/main/ContactsPage';
import ContactDetails from '../components/main/screens/ContactDetails';
import HeaderButton from '../components/main/common/HeaderButton'

global.currentScreenIndex = 0;
const Stack = createStackNavigator();

// set screen transition animation.

const MyTransition = {
  gestureDirection: 'horizontal',
  headerStyleInterpolator: HeaderStyleInterpolators.forFade,
  cardStyleInterpolator: ({current, next, layouts}) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            }),
          },
          {
            scale: next
              ? next.progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 0.9],
                })
              : 1,
          },
        ],
      },
      overlayStyle: {
        opacity: current.progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 0.5],
        }),
      },
    };
  },
};

export const MainStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={'ContactsPage'}
      headerMode="screen"
      mode="modal"
      screenOptions={{
        gestureEnabled: false,
      }}>
      <Stack.Screen
        name="ContactsPage"
        component={ContactsPage}
        options={{
          ...MyTransition,
          header: () => null,
        }}
      />
      <Stack.Screen
        name="ContactDetails"
        component={ContactDetails}
        options={({route, navigation}) => ({
          ...MyTransition,
          title: 'Contact Details',
          headerStyle: {
            backgroundColor: 'white',
          },
          headerTintColor: 'white',
          headerBackImage: () => null,
          headerBackTitleVisible: false,
          headerTitleStyle: {
            marginTop: Platform.OS == 'ios' ? 0 : 25,
            marginLeft: Platform.OS == 'ios' ? 0 : 45,
            color: 'black',
            alignSelf: 'center',
          },
          headerShown: true,
          headerLeft: () =>
            Platform.OS == 'ios' ? (
              <HeaderButton navigation={navigation} />
            ) : null,
          headerRight: () =>
            Platform.OS == 'android' ? (
              <HeaderButton navigation={navigation} />
            ) : null,
        })}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
