import api from '../../api/imgur';
import qs from 'qs';
import router from '../../router/router';

const state = {
    token: window.localStorage.getItem('imgur_token'),
    username: window.localStorage.getItem('username'),
    userAvatar: ''
};

const getters = {
    isLoggedIn: state => !!state.token,
    userName: state => state.username,
    userAvatarImg: state => state.userAvatar
};

const actions = {
    logout: ({ commit }) => {
        commit('setToken', null);
        window.localStorage.removeItem('imgur_token');
    },
    login: () => {
        api.login();
    },
    finalizeLogin: ({ commit }, hash) => {
        const query = qs.parse(hash.replace('#', ''));
        console.log(query);
        commit('setToken', query.access_token);
        window.localStorage.setItem('imgur_token', query.access_token);
        window.localStorage.setItem('username', query.account_username)
        router.push('/');
    },
    async userAvatar({ commit }) {
        const username = state.username;
        const token = state.token;
        const response = await api.userAvatar(username, token);
        console.log(response);
        commit('avatarImg', response.data.data);
    }
};

const mutations = {
    setToken: (state, token) => {
        state.token = token;
    },
    avatarImg: (state, avatar) => {
        state.userAvatar = avatar;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}