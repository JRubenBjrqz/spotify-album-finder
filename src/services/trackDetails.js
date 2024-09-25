import { getSearchParameters } from '../config/spotifyConfig'

export const fetchTrackDetails = async (id) => {
    try {
        const searchParameters = await getSearchParameters()
        const response = await fetch(`https://api.spotify.com/v1/tracks/${id}?market=US`, searchParameters)
        if(!response.ok) {
            throw new error('Error fetching track details')
        }
        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error fetching trac details:', error)
        throw error
    }
}