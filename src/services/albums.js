import axios from 'axios'
import { getSearchParameters } from '../config/spotifyConfig'

// ! Vanilla
export const fetchAlbums = async (artist) => {
    try {
        const searchParameters = await getSearchParameters()
        const artistResponse = await fetch(`https://api.spotify.com/v1/search?q=${artist}&type=artist`, searchParameters)
        const artistData = await artistResponse.json()
        let artistId = artistData.artists.items[0].id

        const albumsResponse = await fetch(`https://api.spotify.com/v1/artists/${artistId}/albums?include_groups=album&market=US&limit=50`, searchParameters)
        const albumsData = await albumsResponse.json()
        return albumsData.items
    } catch (error) {
        console.error('Error fetching artist albums:', error)
        throw error
    }
}

// ! Then
// export const fetchAlbums = async (artist) => {
//     try {
//         const searchParameters = await getSearchParameters()
//         let artistId = await fetch(`https://api.spotify.com/v1/search?q=${artist}&type=artist`, searchParameters)
//                         .then(response => response.json())
//                         .then(data => { return data.artists.items[0].id })
//         let returnedAlbums = await fetch(`https://api.spotify.com/v1/artists/${artistId}/albums?include_groups=album&market=US&limit=50`, searchParameters)
//                         .then(response => response.json())
//                         .then(data => { return data.items })
//        return returnedAlbums
//     } catch (error) {
//       console.error('Error fetching artist albums:', error)
//       throw error
//     }
// }
  
// ! Axios
// export const fetchAlbums = async (artist) => {
//     try {
//         const token = await getToken()
//         const headers = {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`
//         }

//         const artistResponse = await axios.get(`https://api.spotify.com/v1/search`, {
//             headers,
//             params: {
//                 q: artist,
//                 type: 'artist'
//             }
//         })
        
//         const artistData = artistResponse.data
//         let artistId = artistData.artists.items[0].id

//         const albumsResponse = await axios.get(`https://api.spotify.com/v1/artists/${artistId}/albums`, {
//             headers,
//             params: {
//                 include_groups: 'album',
//                 market: 'US',
//                 limit: 50
//             }
//         })

//         const albumsData = albumsResponse.data;
//         return albumsData.items;

//     } catch (error) {
//         console.error('Error fetching artist albums:', error)
//         throw error
//     }
// }

