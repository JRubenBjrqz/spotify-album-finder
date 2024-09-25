<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { fetchTracks } from '../services/tracks';

const route = useRoute()
const tracks = ref([])

const getTracks = async () => {
    try {
        const response = await fetchTracks(route.params.id)
        tracks.value = response
    } catch(error) {
        console.error('Error getting tracks', error)
        throw error
    }
}

onMounted(() => {
    getTracks()
})
</script>

<template>
    <ul class="list-track">
        <li v-for="track in tracks" :key="track.id">
            <a 
                class="track"
                :href="track.external_urls.spotify"
                target="_blank"
            >   
                <span class="track-name">{{ track.name }}</span>
                <span class="track-time">{{ Math.floor(track.duration_ms / 60000)}}:{{  Math.floor((track.duration_ms % 60000) / 1000) }}</span>
            </a>
        </li>
    </ul>
</template>

<style scoped>
.list-track {
    list-style-type: none;
    padding: 16px;
}

.track {
    padding: 16px;
    display: flex;
    justify-content: space-between;
    border-radius: 8px;
}

.track:hover {
    background-color: #F6F8FA;
}

.track-name {
    color: #2196f3;
    font-weight: 500;
    width: 200px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.track-name:hover {
  color: #1b86de;
}

.track-time {
    font-size: 14px;
    color: #1e1e1e;
}
</style>
