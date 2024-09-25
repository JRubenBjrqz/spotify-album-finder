<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { fetchTracks } from '../services/tracks';
import { fetchTrackDetails } from '../services/trackDetails'

const route = useRoute()
const tracksWithDetails = ref([])
const albumDetails = ref([])

const getTracks = async () => {
    try {
        const response = await fetchTracks(route.params.id)
        await getTracksDetails(response)
    } catch(error) {
        console.error('Error getting tracks', error)
        throw error
    }
}

const getTracksDetails = async (tracks) => {
    const trackDetailsPromises = tracks.map(track => fetchTrackDetails(track.id))
    const trackDetails = await Promise.all(trackDetailsPromises)
    tracksWithDetails.value = trackDetails
    console.log(tracksWithDetails.value)
    albumDetails.value = {
        cover: tracksWithDetails.value[0].album.images[0].url,
        artist: tracksWithDetails.value[0].album.artists[0].name,
        artist_url: tracksWithDetails.value[0].album.artists[0].external_urls.spotify,
        name: tracksWithDetails.value[0].album.name,
        total_tracks: tracksWithDetails.value[0].album.total_tracks
    }
}

onMounted(() => {
    getTracks()
})
</script>

<template>
    <section class="album">
        <header class="header-album">
            <img class="img-album" :src="albumDetails.cover" width="176">
            <div class="info-album">
                <small>Album</small>
                <h1 class="title-album">{{ albumDetails.name }}</h1>
                <div class="details-album">
                    <a 
                        :href="albumDetails.artist_url"
                        target="_blank"
                    >
                        {{ albumDetails.artist }}
                    </a> •
                    <span>{{ albumDetails.total_tracks }} songs</span>
                </div>
            </div>
        </header>
        <ul class="list-track">
            <li v-for="track in tracksWithDetails" :key="track.id">
                <a 
                    class="track"
                    :href="track.external_urls.spotify"
                    target="_blank"
                >
                    <span>{{ track.track_number }}</span>
                    <div class="content-track">
                        <div class="details-track">
                            <span class="track-name">{{ track.name }}</span>
                            <a class="artist-track" :href="track.artists[0].external_urls.spotify">
                                <small>
                                    {{ track.artists[0].name }}
                                </small>
                            </a>
                        </div>
                    </div>
                    <span class="track-duration">{{ Math.floor(track.duration_ms / 60000)}}:{{  Math.floor((track.duration_ms % 60000) / 1000) }}</span>
                </a>
            </li>
        </ul>
    </section>
</template>

<style scoped>
.header-album {
    display: flex;
    align-items: end;
    padding: 24px;
    border-radius: 12px 12px 0px 0px;
}

.img-album {
    border-radius: 6px;
    -webkit-box-shadow: 0 4px 60px rgba(0, 0, 0, .1); 
    box-shadow: 0 4px 60px rgba(0, 0, 0, .2);
}

.info-album {
    width: 100%;
    padding: 4px 16px;
}

.title-album {
    font-size: 4.5rem;
    white-space: nowrap;
    margin-top: 8px;
}

.details-album {
    margin-top: 16px;
    font-size: 14px;
}

.details-album a {
    font-weight: 600;
}

.details-album:hover a {
    text-decoration: underline;
}

.details-album span {
    opacity: 75%;
}

.list-track {
    list-style-type: none;
    padding: 16px 8px;
    border-radius: 0px 0px 12px 12px;
}

.track {
    padding: 16px;
    display: flex;
    align-items: center;
    border-radius: 8px;
}

.track:hover {
    background-color: #F6F8FA;
}

.track-name {
    color: #1E1E1E;
    font-weight: 600;
    width: 200px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.track-name:hover {
  text-decoration: underline;
}

.track-duration {
    font-size: 14px;
    color: #1e1e1e;
}

.details-track {
    display: flex;
    flex-direction: column;
    margin-inline: 16px;
}

.artist-track:hover {
    text-decoration: underline;
}

.content-track {
    width: 100%;
}
</style>
