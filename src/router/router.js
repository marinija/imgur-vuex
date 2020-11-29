import { createRouter, createWebHistory } from 'vue-router';
import AuthHandler from '../components/AuthHandler.vue';
import ImageList from '../components/ImageList.vue';
import UploadForm from '../components/UploadForm';
import Favorites from '../components/Favorites.vue';

const routes = [
    {
        path: '/oauth2/callback', component: AuthHandler
    },
    {
        path: '/upload', component: UploadForm
    },
    {
        path: '/favorites', component: Favorites
    },
    {
        path: '/', component: ImageList
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;