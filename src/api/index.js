import axios from 'axios'
import {API_KEY} from '@env'

// TMDb Configuration

export const fetchPopularMovies = (pages = 100) =>
  new Promise((resolve, reject) => {
    const BASE_URL = 'https://api.themoviedb.org/3'
    axios
      .request({
        url: `${BASE_URL}/movie/popular?page=${pages}&api_key=${API_KEY}`,
        timeout: 5000,
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
