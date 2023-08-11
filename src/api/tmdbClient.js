// tmdbClient.js
import axios from 'axios';

const apiKey = 'c3b918399cd5c79edc572b39e29235bd';

const tmdbClient = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    params: {
        api_key: apiKey,
    },
});

export default tmdbClient;
