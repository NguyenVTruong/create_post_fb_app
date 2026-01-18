import React, {createContext, useEffect, useState, ReactNode, useCallback} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import { useRouter } from 'expo-router';
import {apiRefresh} from "@/axios/axiosClient";
import {STORAGE_KEYS} from "@/constants/Contants";
import {jwtDecode} from "jwt-decode";


type AuthContextType = {
    isAuthenticated: boolean;
    isChecking: boolean;
    login: () => void;
    logout: () => void;
};

export const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    isChecking: true,
    login: () => {},
    logout: () => {}
});

type Props = {
    children: ReactNode;
};

export const AuthProvider: React.FC<Props> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isChecking, setIsChecking] = useState(true);
    const router = useRouter();

    // const isTokenExpired = (token: string) => {
    //     try {
    //         const { exp } = jwtDecode(token);
    //         return exp * 1000 < Date.now();
    //     } catch (e) {
    //         return true;
    //     }
    // };

    // const checkLogin = async () => {
    //     setIsChecking(true);
    //
    //     try {
    //         const token = await AsyncStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
    //         const refreshToken = await SecureStore.getItemAsync(STORAGE_KEYS.REFRESH_TOKEN);
    //         const user = await AsyncStorage.getItem(STORAGE_KEYS.USER_INFO);
    //
    //         if (!token || !refreshToken || !user) {
    //             throw new Error('Missing auth data');
    //
    //         }
    //
    //         if (isTokenExpired(token)) {
    //             const success = await refreshTokenHandler();
    //             if (!success) throw new Error('Refresh failed');
    //         }
    //
    //         setIsAuthenticated(true);
    //         router.replace('/(tabs)');
    //     } catch (e) {
    //         router.replace('/login');
    //         setIsAuthenticated(false);
    //     } finally {
    //         setIsChecking(false);
    //     }
    // };

    const checkLogin = async () => {
        // setIsChecking(true);
        // try {
        //     const token = await AsyncStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
        //     const refreshToken = await SecureStore.getItemAsync(STORAGE_KEYS.REFRESH_TOKEN);
        //     const user = await AsyncStorage.getItem(STORAGE_KEYS.USER_INFO);
        //
        //     if (!token || !refreshToken || !user) {
        //         throw new Error('Missing auth');
        //     }
        //
        //     // KHÔNG refresh ở đây
        //     setIsAuthenticated(true);
            router.replace('/(tabs)');
        // } catch {
        //     setIsAuthenticated(false);
        //     router.replace('/login');
        // } finally {
        //     setIsChecking(false);
        // }
    };

    // const refreshTokenHandler = async (): Promise<boolean> => {
    //     try {
    //         const refreshToken = await SecureStore.getItemAsync(STORAGE_KEYS.REFRESH_TOKEN);
    //         if (!refreshToken) return false;
    //
    //         const res = await apiRefresh.post('api/v1/refresh');
    //
    //         // await SecureStore.setItemAsync(STORAGE_KEYS.ACCESS_TOKEN, res.data.token);
    //         await AsyncStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, res.data.token);
    //
    //         return true;
    //     } catch (e) {
    //         return false;
    //     }
    // };


    useEffect(() => {
        checkLogin();
    }, []);

    const login = async () => {
        await checkLogin();
    };

    const logout = async () => {
        // await SecureStore.deleteItemAsync(STORAGE_KEYS.REFRESH_TOKEN);
        // await AsyncStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
        // await AsyncStorage.removeItem(STORAGE_KEYS.USER_INFO);
        //
        // setIsAuthenticated(false);
        // router.replace('/login');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, isChecking, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};
