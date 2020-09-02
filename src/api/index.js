import axios from 'axios'
import {fetch} from 'react-native-ssl-pinning'
import type {Response} from 'react-native-ssl-pinning'
import {API_KEY} from '@env'

// TMDb Configuration

// export const proxyGeneralRequest = (action: String, requestBody: Object = {}) =>
//     new Promise((resolve, reject) => {
//         fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`, {
//             method: 'GET',
//             timeoutInterval: 1000,
//             sslPinning: {
//                 certs: getCertificateName(),
//             },
//             body: requestBody ? JSON.stringify(requestBody) : '{}',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         })
//             .then((data: Response) => {
//                 resolve(JSON.parse(data.bodyString))
//             })
//             .catch(error => {
//                 reject(error)
//             })
//     })

export const fetchPopularMovies = (pages = 100) =>
  new Promise((resolve, reject) => {
    const BASE_URL = 'https://api.themoviedb.org/3'
    axios
      .request({
        url: `${BASE_URL}/movie/popular?page=${pages}&api_key=${API_KEY}`,
        timeout: 1000,
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        // console.log('response', response)
        resolve(response)
      })
      .catch(error => {
        // console.log('ALOOOOO', error)
        reject(error)
      })
  })

// export function fetchPopularMovies () {
//   const url = `/movie/popular?api_key=${API_KEY}`
//   return axios.get(url)
// }

// export function fetchMoviesForGenreId(genreId, page) {
//     const url = `discover/movie?with_genres=${genreId}&page=${page}&api_key=${TMDB_API_KEY}`
//     return axios.get(url)
// }

// export function postMovie(data) {
//     //Here I should post the movie.
//     const url = `/genre/movie/list?api_key=${TMDB_API_KEY}`
//     return axios.get(url)
// }
