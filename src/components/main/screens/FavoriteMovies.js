import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {
  View,
  Dimensions,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Text,
} from 'react-native'
import {fetchPopularMovies} from '../../../api'
import {setPopularMovies} from '../../../actions/MoviesActions'
import Constants from '../../../utils/constants'
import {navigateToPage} from '../../../utils/utilities'

const FavoriteMovies = props => {
  const dispatch = useDispatch()
  const {favorites, movies} = useSelector(state => state.MovieReducer)
  const [favoritesDetails, setFavoritesDetails] = useState([])

  // if movies is null fetch movies from tmdb

  useEffect(() => {
    if (!movies) {
      fetchPopularMovies().then(results =>
        dispatch(setPopularMovies(results.data)),
      )
    }
  }, [])

  // set favorite movies

  useEffect(() => {
    if (movies) setFavorites()
  }, [movies, favorites])

  const setFavorites = () => {
    let newFavorites = []
    if (movies && favorites) {
      movies.forEach(movie => {
        let found = favorites.some(id => id == movie.id)
        if (found) {
          newFavorites.push(movie)
        }
      })
      setFavoritesDetails(newFavorites)
    }
  }

  // render flat list item

  const renderFlatListItem = data => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigateToPage('MovieDetails', props.navigation, {
            movie: data.item,
            from: 'favorites',
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

  // render flat list

  const renderFlatList = () => {
    return (
      <FlatList
        bounces={false}
        data={favoritesDetails}
        showsVerticalScrollIndicator={false}
        renderItem={item => renderFlatListItem(item)}
        keyExtractor={item => item.id}
        numColumns={2}
        extraData={null}
        style={styles.listStyle}
      />
    )
  }

  // render no favorites simple msg

  const renderNoFavoritesMsg = () => {
    return (
      <View style={styles.noFavoritesMsg}>
        <Text style={styles.noFavortiesTxt}>
          {'Please Add A Favorite Movie From The Popular Movies Screen'}
        </Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {favorites && favorites.length > 0 ? (
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
        renderNoFavoritesMsg()
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
  noFavoritesMsg: {
    flex: 1,
    justifyContent: 'center',
  },
  noFavortiesTxt: {
    color: 'white',
    fontSize: 22,
    textAlign: 'center',
  },
  image: {width: 140, height: 200},
})

export default FavoriteMovies
