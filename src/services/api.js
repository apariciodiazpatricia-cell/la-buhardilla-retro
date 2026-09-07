import axios from 'axios';

const apiBaseUrl = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '/api' : 'http://localhost:3001');

export const api = axios.create({
    baseURL: apiBaseUrl,
});