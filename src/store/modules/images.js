import api from '../../api/imgur';
import router from '../../router/router';

const state = {
    images: [],
    favoriteImages: []
};

const getters = {
    allImages: state => state.images,
    allFavoriteImages: state => state.favoriteImages
};

const actions = {
    async fetchImages({ rootState, commit }) {
        const { token } = rootState.auth;
        const response = await api.fetchImages(token);
        console.log(response);
        commit('setImages', response.data.data);
    },

    async uploadImages({ rootState }, images) {
        // Get the access token
        const { token } = rootState.auth;
        // Call api for upload
        await api.uploadImages(images, token);
        // redirect to images list
        router.push('/');
    },
    async getFavoriteImages({ rootState, commit }) {
        const { username } = rootState.auth;
        const { token } = rootState.auth;
        const response = await api.favoritesImages(username, token);
        console.log(response.data.data);
        commit('favorites', response.data.data)
    },
    async deleteImage({ rootState, commit }, deletehash) {
        const { token } = rootState.auth;
        await api.imageDelete(deletehash, token);
        commit('removeImage', deletehash);
    }
};

const mutations = {
    setImages: (state, images) => {
        state.images = images;
    },
    favorites: (state, images) => {
        state.favoriteImages = images
    },
    removeImage: (state, hash) => {
        state.images = state.images.filter(el => el.deletehash !== hash);
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}