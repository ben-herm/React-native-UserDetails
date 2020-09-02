import React from 'react'
import {Dimensions, StyleSheet, Platform} from 'react-native'
import {
  createStackNavigator,
  TransitionSpecs,
  HeaderStyleInterpolators,
} from '@react-navigation/stack'

import WelcomePage from '../components/main/WelcomePage'
import PopularMovies from '../components/main/screens/PopularMovies'
import FavoriteMovies from '../components/main/screens/FavoriteMovies'
import MovieDetails from '../components/main/screens/MovieDetails'
import HeaderButton from '../components/main/common/HeaderButton'

global.currentScreenIndex = 0
const Stack = createStackNavigator()

// set screen transition animation.

const MyTransition = {
  gestureDirection: 'horizontal',
  transitionSpec: {
    open: TransitionSpecs.TransitionIOSSpec,
    close: TransitionSpecs.TransitionIOSSpec,
  },
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
    }
  },
}

export const MainStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={'WelcomeScreen'}
      headerMode='screen'
      mode='modal'
      screenOptions={{
        gestureEnabled: false,
      }}>
      <Stack.Screen
        name='WelcomeScreen'
        component={WelcomePage}
        options={{
          ...MyTransition,
          header: () => null,
        }}
      />
      <Stack.Screen
        name='PopularMovies'
        component={PopularMovies}
        headerMode='screen'
        options={({route, navigation}) => ({
          ...MyTransition,
          title: 'Popular Movies',
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
          headerBackImage: () => null,
          headerBackTitleVisible: false,
          headerTitleStyle: {
            marginTop: Platform.OS == 'ios' ? 0 : 45,
            marginLeft: Platform.OS == 'ios' ? 0 : 45,
            color: 'white',
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
      <Stack.Screen
        name='FavoriteMovies'
        component={FavoriteMovies}
        headerMode='screen'
        options={({route, navigation}) => ({
          ...MyTransition,
          title: 'Favorite Movies',
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
          headerBackImage: () => null,
          headerBackTitleVisible: false,
          headerTitleStyle: {
            marginTop: Platform.OS == 'ios' ? 0 : 45,
            marginLeft: Platform.OS == 'ios' ? 0 : 45,
            color: 'white',
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
      <Stack.Screen
        name='MovieDetails'
        component={MovieDetails}
        options={({route, navigation}) => ({
          ...MyTransition,
          title: 'Movie Details',
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
          headerBackImage: () => null,
          headerBackTitleVisible: false,
          headerTitleStyle: {
            marginTop: Platform.OS == 'ios' ? 0 : 45,
            marginLeft: Platform.OS == 'ios' ? 0 : 45,
            color: 'white',
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
  )
}

const styles = StyleSheet.create({
  headerLeftIconStyle: {
    marginLeft: 15,
  },
  searchInputContainer: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#999',
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  searchInputIconStyle: {
    padding: 5,
  },
  searchInputStyle: {
    flex: 1,
    paddingRight: 10,
    textAlign: 'left',
  },
})

export default MainStack
