import {getApiUrl} from '../ultils/api'
import {api} from "../axios/axiosClient"

export const getPhongTro = async () => {
    try {
        const response = await api.get(getApiUrl('/api/v1/phongTro'), {});
        return response.data;
    } catch (error) {
        // console.log("getUserByUsername", error);
    }
};





