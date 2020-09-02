import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'

import {
  View,
  Dimensions,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native'
import {fetchPopularMovies} from '../../../api'
import {CustomLoader} from '../common/CustomLoader'
import {setPopularMovies} from '../../../actions/MoviesActions'
import Constants from '../../../utils/constants'
import {navigateToPage} from '../../../utils/utilities'

const PopularMovies = props => {
  const dispatch = useDispatch()
  const {movies} = useSelector(state => state.MovieReducer)
  const [movieDetails, setMovieDetails] = useState({})
  const [isLoading, setLoading] = useState(false)

  // fetch movies from tmdb

  useEffect(() => {
    if (!movies) {
      fetchPopularMovies().then(results =>
        dispatch(setPopularMovies(results.data)),
      )
    }
  }, [])

  // set movies in state

  useEffect(() => {
    if (movies) {
      setMovieDetails(movies)
    }
  }, [movies])

  // render flatlist item to show movie image

  const renderFlatListItem = data => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigateToPage('MovieDetails', props.navigation, {
            movie: data.item,
            from: 'popularMovies',
          })
        }>
        <View style={styles.imageCard}>
          <Image
            style={styles.image}
            source={{
              uri:
                data.item.poster_path != null
                  ? Constants.URL.IMAGE_URL + data.item.poster_path
                  : Constants.URL.PLACEHOLDER_IMAGE,
            }}
          />
        </View>
      </TouchableOpacity>
    )
  }

  // render flatlist of items => movie images

  const renderFlatList = () => {
    return (
      <FlatList
        bounces={false}
        data={movieDetails}
        showsVerticalScrollIndicator={false}
        renderItem={item => renderFlatListItem(item)}
        keyExtractor={item => item.id}
        numColumns={2}
        extraData={null}
        style={styles.listStyle}
      />
    )
  }

  // check if movies if not show loader -> show error modal no response / error

  return (
    <View style={styles.container}>
      {movies ? (
        <View
          style={{
            alignSelf: 'center',
            alignItems: 'space-between',
            justifyContent: 'space-between',
            marginTop: 50,
          }}>
          {renderFlatList()}
        </View>
      ) : (
        <View style={styles.loader}>
          <CustomLoader size={20} />
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'black',
    alignItems: 'center',
  },
  loader: {
    position: 'absolute',
    top: '40%',
    bottom: 0,
    left: 0,
    right: 0,
  },
  imageCard: {
    padding: 5,
    margin: 15,
    width: 150,
    textAlign: 'center',
    borderColor: 'white',
    borderRadius: 16,
    borderWidth: 2,
    justifyContent: 'center',
  },
  image: {width: 140, height: 200},
})

export default PopularMovies
