import { useSpotifyToken } from '../composables/useSpotifyToken';

export const getSearchParameters = async () => {
    const { getToken } = useSpotifyToken()
    const token = await getToken()

    return {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
        }
    }
}
