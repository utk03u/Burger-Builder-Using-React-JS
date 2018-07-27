import axios from 'axios';

const instance = axios.create(
    {
        baseURL: 'https://burger-mania.firebaseio.com/'
    }
);

export default instance;