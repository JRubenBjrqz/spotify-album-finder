import axios from 'axios'
import { getSearchParameters } from '../config/spotifyConfig'

// ! Vanilla
export const fetchTracks = async (albumId) => {
    try {
        const searchParameters = await getSearchParameters()
        const response = await fetch(`https://api.spotify.com/v1/albums/${albumId}/tracks?market=US&limit=20`, searchParameters)
        const data = await response.json()
        return data.items
    } catch (error) {
        console.error('Error fetching album tracks:', error)
        throw error
    }
}

// ! Then
// export const fetchTracks = async (albumId) => {
//     try {
//         const searchParameters = await getSearchParameters()
//         let albumTracks = await fetch(`https://api.spotify.com/v1/albums/${albumId}/tracks?market=US&limit=20`, getSearchParameters)
//                             .then(response => response.json())
//                             .then(data => { return data.items })
//         return albumTracks
//     } catch (error) {
//         console.error('Error fetching album tracks:', error)
//         throw error
//     }
// }
  
// ! Axios 
// export const fetchTracks = async (albumId) => {
//     try {
//         const token = await getToken()
//         const albumParameters = {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${token}`
//             }
//         }
//         const response = await fetch(`https://api.spotify.com/v1/albums/${albumId}/tracks?market=US&limit=20`, albumParameters)
//         const data = await response.json()
//         return data.items
//     } catch (error) {
//         console.error('Error fetching album tracks:', error)
//         throw error
//     }
// }