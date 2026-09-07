import axios from 'axios';
import initialData from '../data/products.json';

const apiBaseUrl = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '/api' : 'http://localhost:3001');

export const api = axios.create({
    baseURL: apiBaseUrl,
    timeout: 2500,
});

const STORAGE_KEYS = {
    products: 'retro_products_data',
    vendedores: 'retro_vendedores_data',
    users: 'retro_users_data',
};

const getLocalCollection = (resource) => {
    const key = STORAGE_KEYS[resource] || `retro_${resource}_data`;
    try {
        const stored = localStorage.getItem(key);
        if (stored) {
            const parsed = JSON.parse(stored);
            if (Array.isArray(parsed) && parsed.length > 0) {
                return parsed;
            }
        }
    } catch {
        // Fallback to initial data if localStorage is unavailable
    }
    const initialList = initialData[resource] || [];
    try {
        localStorage.setItem(key, JSON.stringify(initialList));
    } catch {
        // Ignore localStorage quota errors
    }
    return initialList;
};

const saveLocalCollection = (resource, list) => {
    const key = STORAGE_KEYS[resource] || `retro_${resource}_data`;
    try {
        localStorage.setItem(key, JSON.stringify(list));
    } catch {
        // Ignore localStorage quota errors
    }
};

const parseResourceAndId = (url) => {
    const cleanUrl = url.replace(/^\/?(api\/)?/, '');
    const parts = cleanUrl.split('/').filter(Boolean);
    const resource = parts[0];
    const id = parts[1] || null;
    return { resource, id };
};

const handleFallback = (config, data) => {
    const method = (config.method || 'get').toLowerCase();
    const { resource, id } = parseResourceAndId(config.url || '');

    if (!resource) {
        return { data: [] };
    }

    const items = [...getLocalCollection(resource)];

    if (method === 'get') {
        if (id) {
            const item = items.find((i) => String(i.id) === String(id));
            return { data: item || null, status: item ? 200 : 404 };
        }
        return { data: items, status: 200 };
    }

    if (method === 'post') {
        const payload = typeof data === 'string' ? JSON.parse(data || '{}') : (data || {});
        const newItem = { id: Date.now().toString(), ...payload };
        items.unshift(newItem);
        saveLocalCollection(resource, items);
        return { data: newItem, status: 201 };
    }

    if (method === 'put' || method === 'patch') {
        const payload = typeof data === 'string' ? JSON.parse(data || '{}') : (data || {});
        const index = items.findIndex((i) => String(i.id) === String(id));
        if (index !== -1) {
            items[index] = { ...items[index], ...payload };
        } else {
            items.unshift({ id: id || Date.now().toString(), ...payload });
        }
        saveLocalCollection(resource, items);
        return { data: items[index] || payload, status: 200 };
    }

    if (method === 'delete') {
        const filtered = items.filter((i) => String(i.id) !== String(id));
        saveLocalCollection(resource, filtered);
        return { data: { success: true, id }, status: 200 };
    }

    return { data: items, status: 200 };
};

api.interceptors.response.use(
    (response) => response,
    (error) => {
        const config = error?.config;
        if (!config) {
            return Promise.reject(error);
        }
        try {
            const fallbackResult = handleFallback(config, config.data);
            return Promise.resolve(fallbackResult);
        } catch {
            return Promise.reject(error);
        }
    }
);
