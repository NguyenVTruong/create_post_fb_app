import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {STORAGE_KEYS} from '../constants/Contants';
import {getApiUrlAuth} from '../ultils/api'
import {getUserByEmail} from "@/service/users.service";
import * as SecureStore from 'expo-secure-store';

export const login = async (email: string, password: string) => {
    try {
        const response = await axios.post(getApiUrlAuth('/api/v1/login'), {
            emailOrPhoneNumber: email,
            password: password,
        });

        const token = response.data?.token;
        if (token) {
            await SecureStore.setItemAsync(STORAGE_KEYS.REFRESH_TOKEN, response.data?.refreshToken);
            await AsyncStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, token);
            const userInfo = await getUserByEmail(response.data?.email)
            // saveAvatar(userInfo.avatar);
            const json = JSON.stringify(userInfo);
            await AsyncStorage.setItem(STORAGE_KEYS.USER_INFO, json);
        }

        return {
            success: true,
            data: response.data,
        };
    } catch (error) {
        const message =
            error?.response?.data?.message ||
            error?.response?.data ||
            'Đăng nhập thất bại';

        return {
            success: false,
            message,
        };
    }

};

export const loginGoogle = async (idToken: string, email: string) => {
    try{
        const response = await axios.post(getApiUrlAuth('/api/v1/google'), {
            idToken: idToken
        }).then(async (response) => {
            const token = response.data?.token;
            if (token) {
                await SecureStore.setItemAsync(STORAGE_KEYS.REFRESH_TOKEN, response.data?.refreshToken);
                await AsyncStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, response.data.token);
                const userInfo = await getUserByEmail(email);
                const json = JSON.stringify(userInfo);
                await AsyncStorage.setItem(STORAGE_KEYS.USER_INFO, json);
            }

            return response.data;
        });

        return response;
    } catch (error) {
        console.log(error);
    }

};

export const logout = async () => {

    await AsyncStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    await AsyncStorage.removeItem(STORAGE_KEYS.USER_INFO);
};