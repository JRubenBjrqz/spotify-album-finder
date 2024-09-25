import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'ArtistFinder',
        component: () => import('../views/AlbumFinder.vue')
    },
    {
        path: '/album/:id',
        name: 'Track',
        component: () => import('../views/Tracks.vue'),
        props: true
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router