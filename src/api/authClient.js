import axios from 'axios';

const authClient = axios.create({
    baseURL: 'http://localhost:8080/auth',
    params: {

    },
});


export default authClient;
