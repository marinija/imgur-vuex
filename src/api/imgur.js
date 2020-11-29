import qs from 'qs';
import axios from 'axios';

const CLIENT_ID = '1c8952f8f188ebf';
const ROOT_URL = 'https://api.imgur.com';

export default {
    login() {
        const queryString = {
            client_id: CLIENT_ID,
            response_type: 'token'
        };

        window.location = `${ROOT_URL}/oauth2/authorize?${qs.stringify(queryString)}`;
    },
    fetchImages(token) {
        return axios.get(`${ROOT_URL}/3/account/me/images`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    },
    uploadImages(images, token) {
        const promises = Array.from(images).map(image => {
            const formData = new FormData();
            formData.append('image', image);
            return axios.post(`${ROOT_URL}/3/image`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        });
        return Promise.all(promises);
    },
    favoritesImages(username, token) {
        return axios.get(`${ROOT_URL}/3/account/${username}/favorites`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    },
    imageDelete(imageHash, token) {
        return axios.delete(`${ROOT_URL}/3/image/${imageHash}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    },
    userAvatar(username, token) {
        return axios.get(`${ROOT_URL}/3/account/${username}/avatar`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }
}