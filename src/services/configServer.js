import axios from "axios";
export const baseUrl = 'http://seyedkazem.runflare.run/api/';
const apiToken = sessionStorage.getItem('api_token');
export const instance = axios.create({
    baseURL: 'http://seyedkazem.runflare.run/api/',
    headers: {
        'Authorization': `Bearer ${apiToken}`,
    },
})