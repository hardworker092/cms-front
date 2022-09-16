import axios from 'axios';
import { baseUrl } from '../services/configServer';

export const register = async (username, password) => {
    const params = new FormData();
    params.append('username', username);
    params.append('password', password);
    const res = await axios.post(baseUrl + 'register', params);
    return res;
}

export const login = async (username, password) => {
    const params = new FormData();
    params.append('username', username);
    params.append('password', password);
    const res = await axios.post(baseUrl + 'login', params);
    return res;
}