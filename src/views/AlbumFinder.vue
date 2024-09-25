<script setup>
import { ref } from 'vue'
import { fetchAlbums } from '../services/albums';

const searchInput = ref('')
const albums = ref([])

const searchArtist = async () => {
  try {
    const response = await fetchAlbums(searchInput.value)
    albums.value = response
  } catch (error) {
    console.error('Error searching artist albums:', error)
    throw error
  } finally {
    searchInput.value = ''
  }
}
</script>

<template>
  <header>
    <form class="form-artist" @submit.prevent="searchArtist">
      <h1 class="title-artist">Spotify Album Finder</h1>
      <input
        v-model="searchInput" 
        type="text" 
        placeholder="Search for an Artist"
        class="input-artist"
        @keyup.enter="searchArtist" 
      />
      <button class="btn btn-primary" type="submit">Search Artist</button>
    </form>
  </header>
  <main class="album-container">
    <article class="album" v-for="album in albums" :key="album.name">
      <router-link
        :to="{ 
          name: 'Track', 
          params: { 
            id: album.id, 
          } 
        }"
      >
        <img class="album-img" :src="album.images[0].url" :alt="album.name" width="200"/>
        <h4 class="album-name">{{ album.name }}</h4>
      </router-link>
    </article>
  </main>
</template>

<style scoped>
.title-artist {
  margin: 8px auto;
}

.form-artist {
  width: 100%;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.input-artist {
  width: 100%;
  min-height: 40px;
  border: 1px solid #EEEEEE;
  border-radius: 24px;
  padding: 16px;
}

.input-artist:focus { 
  outline: 1px solid #d3d3d4;
}

.btn:hover {
  background-color: #d3d3d4;
}

.btn-primary {
  background-color: #F6F8FA;
  color: #1E1E1E;
}

.album-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px; 
  justify-content: space-around;
}

.album {
  background-color: #F6F8FA;
  padding: 16px;
  border-radius: 8px;
  cursor: pointer;
}

.album:hover {
  background-color: #d3d3d4;
}

.album-img {
  border-radius: 6px;
  -webkit-box-shadow: 4px 10px 36px -21px rgba(173,163,173,1);
  -moz-box-shadow: 4px 10px 36px -21px rgba(173,163,173,1);
  box-shadow: 4px 10px 36px -21px rgba(173,163,173,1);
}

.album-name {
  margin: 8px 0px;
  color: #2196f3;
  font-weight: 500;
  width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.album-name:hover {
  color: #1b86de;
}
</style>
