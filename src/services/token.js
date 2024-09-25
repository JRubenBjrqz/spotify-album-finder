import axios from 'axios'
import { authParameters } from '../config/authConfig'

// ! Vanilla
export const fetchSpotifyToken = async () => {
  try {
    const response = await fetch('https://accounts.spotify.com/api/token', authParameters)
    if(!response.ok) {
      throw new error('Error fetching Spotify token')
    }
    const data = await response.json()
    return data.access_token
  } catch (error) {
    console.error('Error fetching Spotify token:', error)
    throw error
  }
}

// ! Then
// export const fetchSpotifyToken = async () => {
//   try {
//     const response = await fetch('https://accounts.spotify.com/api/token', authParameters)
//     .then(result => result.json())
//     .then(data => { return data.access_token })
//     return response
//   } catch (error) {
//     console.error('Error fetching token', error)
//     throw error
//   }
// }

// ! Axios  
// export const fetchSpotifyToken = async () => {
//   try {
//     const axiosAuthParameters =`grant_type=client_credentials&client_id=${import.meta.env.VITE_CLIENT_ID}&client_secret=${import.meta.env.VITE_CLIENT_SECRET}`
//     const response = await axios.post('https://accounts.spotify.com/api/token', axiosAuthParameters)
//     const data = response.data
//     return data.access_token
//   } catch (error) {
//     console.error('Error fetching Spotify token:', error)
//     throw error
//   }
// }