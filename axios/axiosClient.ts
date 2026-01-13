import axios from 'axios';
import {getApiUrl, getApiUrlAuth} from '../ultils/api'
import AsyncStorage from "@react-native-async-storage/async-storage";
import {STORAGE_KEYS} from "@/constants/Contants";
import * as SecureStore from "expo-secure-store";
import {Alert} from "react-native";
import {router} from "expo-router";

let isRefreshing = false;
let failedQueue: any[] = [];

export const api = axios.create({ baseURL: getApiUrlAuth(""), timeout: 10000 });
export const apiRefresh = axios.create({ baseURL: getApiUrlAuth(""), timeout: 10000 });
export const apiCore = axios.create({ baseURL: getApiUrl(""), timeout: 10000 });

api.interceptors.request.use(async (cfg: any) => {
    const t = await AsyncStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
    if (t) cfg.headers.Authorization = `Bearer ${t}`;
    return cfg;
});

apiRefresh.interceptors.request.use(async (cfg: any) => {
    const t = await SecureStore.getItemAsync(STORAGE_KEYS.REFRESH_TOKEN);
    if (t) cfg.headers.Authorization = `Bearer ${t}`;
    return cfg;
});


apiCore.interceptors.request.use(async (cfg: any) => {
    const t = await AsyncStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
    if (t) cfg.headers.Authorization = `Bearer ${t}`; // nhớ có khoảng trắng
    return cfg;
});

apiCore.interceptors.response.use(
    response => response,
    error => {
        if (error.code === 'ECONNABORTED') {
            Alert.alert("Lỗi kết nối", "Kết nối chậm, vui lòng thử lại")
            // showToast('Kết nối chậm, vui lòng thử lại');
        }
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    response => response,
    error => {
        if (error.code === 'ECONNABORTED') {
            Alert.alert("Thông báo", "Kết nối chậm, vui lòng thử lại")
            // showToast('Kết nối chậm, vui lòng thử lại');
        }
        return Promise.reject(error);
    }
);

const processQueue = (error: any, token = null) => {
    failedQueue.forEach(p => {
        if (error) p.reject(error);
        else p.resolve(token);
    });
    failedQueue = [];
};

api.interceptors.response.use(
    res => res,
    async err => {
        const originalRequest = err.config;

        /**
         *  LỖI MẠNG → KHÔNG ĐỘNG AUTH
         */
        if (!err.response) {
            return Promise.reject(err);
        }

        const isAccessTokenExpired =
            err.response.status === 401 ||
            (
                err.response.status === 403 &&
                err.response.data?.error === 'jwt expired'
            );

        if (isAccessTokenExpired && !originalRequest._retry) {
            originalRequest._retry = true;

            /**
             * ĐANG REFRESH → ĐỢI
             */
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                }).then(token => {
                    originalRequest.headers.Authorization = `Bearer ${token}`;
                    return api(originalRequest);
                });
            }

            isRefreshing = true;

            try {
                const refresh = await SecureStore.getItemAsync(STORAGE_KEYS.REFRESH_TOKEN);

                /**
                 * KHÔNG CÓ REFRESH TOKEN → LOGOUT
                 */
                if (!refresh) {
                    throw { type: 'INVALID_REFRESH' };
                }

                /**
                 * REFRESH TOKEN
                 */
                const res = await apiRefresh.post('/api/v1/refresh');
                const newToken = res.data.token;

                await AsyncStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, newToken);

                /**
                 * GIẢI PHÓNG QUEUE
                 */
                processQueue(null, newToken);

                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                return api(originalRequest);

            } catch (e) {
                processQueue(e, null);

                /**
                 * CHỈ LOGOUT KHI REFRESH TOKEN INVALID
                 */
                if (
                    e.type === 'INVALID_REFRESH' ||
                    e.response?.status === 401
                ) {
                    logout();
                }

                return Promise.reject(e);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(err);
    }
);

function logout() {
    AsyncStorage.clear();
    SecureStore.deleteItemAsync(STORAGE_KEYS.REFRESH_TOKEN);
    router.replace('/login');
}



