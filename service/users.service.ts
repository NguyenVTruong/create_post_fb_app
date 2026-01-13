import {getApiUrl, getApiUrlAuth} from '../ultils/api'
import {api, apiCore} from "../axios/axiosClient"

export const getUserByEmail = async (email: string) => {
    try {
        const response = await api.get(getApiUrlAuth('/api/v1/users?email=' + email), {});
        return response.data;
    } catch (error) {
        // console.log("getUserByUsername", error);
    }
};

export const findById = async (id: string) => {
    try {
        const response = await api.get(getApiUrlAuth('/api/v1/users/' + id), {});
        return response.data;
    } catch (error) {
        // console.log("findById", error);
    }
};

export const updateUsers = async (data: any, id: string,) => {
    try {
        const response = await api.put(getApiUrl(`/api/v1/users/${id}`), data);
        return response.data;
    } catch (error) {
    }
};

export async function uploadMyAvatar(form: FormData, id: number) {
    try {
        const response = await apiCore.put(`/api/v1/users/updateAvatar/${id}`, form, {
            headers: {"Content-Type": "multipart/form-data"},
        });
        return response.data;
    } catch (error) {
        // console.log('error uploadMyAvatar', error);
    }
}




