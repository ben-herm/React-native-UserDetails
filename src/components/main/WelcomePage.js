import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import {
  ScrollView,
  Text,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native'
import {fetchPopularMovies} from '../../api'
import {CustomLoader} from './common/CustomLoader'
import {setPopularMovies} from '../../actions/MoviesActions'
import {navigateToPage} from '../../utils/utilities'

const WelcomePage = props => {
  const dispatch = useDispatch()
  const {movies} = useSelector(state => state.MovieReducer)

  useEffect(() => {
    if (!movies) {
      fetchPopularMovies().then(results =>
        dispatch(setPopularMovies(results.data)),
      )
    }
  }, [])

  const FadeInView = () => {
    const [fadeIn] = useState(new Animated.Value(0)) // Initial value for opacity: 0

    React.useEffect(() => {
      Animated.timing(fadeIn, {
        toValue: 1,
        duration: 750,
        useNativeDriver: true,
      }).start()
    }, [])

    return (
      <Animated.View // Special animatable View
        style={{
          alignSelf: 'center',
          marginTop: 75,
          opacity: fadeIn, // Bind opacity to animated value
        }}>
        <Text style={styles.doneButtonText}> {'Welcome'}</Text>
      </Animated.View>
    )
  }

  const renderBtn = () => {
    const [fadeInBtn] = useState(new Animated.Value(0)) // Initial value for opacity: 0

    React.useEffect(() => {
      Animated.timing(fadeInBtn, {
        toValue: 1,
        duration: 750,
        delay: 900,
        useNativeDriver: true,
      }).start()
    }, [])
    return (
      <Animated.View style={{...styles.buttonsViewStyle, opacity: fadeInBtn}}>
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
      </Animated.View>
    )
  }

  // render welcome screen with two buttons

  return (
    <View style={styles.container}>
      {FadeInView()}
      {renderBtn()}
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
