import axios from 'axios'

export const fetchContacts = (cities = 20) =>
  new Promise((resolve, reject) => {
    axios
      .request({
        url: `https://randomuser.me/api/?results=10`,
        timeout: 5000,
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        resolve(response)
      })
      .catch(error => {
        reject(error)
      })
  })
