import React from 'react'
import {useDispatch} from 'react-redux'

import {
  ScrollView,
  Text,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import {navigateToPage} from '../../utils/utilities'

const WelcomePage = props => {
  const dispatch = useDispatch()

  // render welcome screen with two buttons

  return (
    <View style={styles.container}>
      <View style={styles.welcomeTxtView}>
        <Text style={styles.doneButtonText}> {'Welcome'}</Text>
      </View>
      <View style={styles.buttonsViewStyle}>
        <TouchableOpacity
          onPress={() => navigateToPage('PopularMovies', props.navigation)}
          style={{
            ...styles.popularBtn,
          }}>
          <Text
            style={{
              ...styles.BtnText,
            }}>
            {'Popular Movies'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigateToPage('FavoriteMovies', props.navigation)}
          style={{
            ...styles.favoritesBtn,
          }}>
          <Text
            style={{
              ...styles.BtnText,
            }}>
            {'Favorites'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
    flexDirection: 'column',
  },
  buttonsViewStyle: {
    position: 'absolute',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'space-between',
    padding: 10,
    paddingHorizontal: 25,
    bottom: 25,
  },
  favoritesBtn: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderStyle: 'solid',
    marginLeft: 10,
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  popularBtn: {
    flex: 1,
    marginRight: 10,
    backgroundColor: '#ffffff',
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  BtnText: {
    fontSize: 13,
    fontWeight: '900',
    fontStyle: 'normal',
    lineHeight: 30.1,
    letterSpacing: 0,
    textAlign: 'center',
    color: '#c86833',
  },
  doneButtonText: {
    fontSize: 42,
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: 'white',
  },
  welcomeTxtView: {alignSelf: 'center', marginTop: 75},
})

export default WelcomePage
