import { ref } from 'vue'
import { fetchSpotifyToken } from '../services/token'

const token = ref(null)

const getToken = async () => {
    if (!token.value) {
        token.value = await fetchSpotifyToken()
    }
    return token.value
}

const setToken = (newToken) => {
    token.value = newToken
}

export const useSpotifyToken = () => {
    return {
        token,
        getToken,
        setToken
    }
}