import {API_AUTH_URL, API_CORE_URL} from '../constants/Contants';

export const getApiUrlAuth = (path: string) => `${API_AUTH_URL}${path}`;

export const getApiUrl = (path: string) => `${API_CORE_URL}${path}`;

