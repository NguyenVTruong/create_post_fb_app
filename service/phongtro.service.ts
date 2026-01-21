import {getApiUrl} from '../ultils/api'
import {api} from "../axios/axiosClient"

export const getPhongTro = async (param: string) => {
    try {
        console.log(param);
        const response = await api.get(getApiUrl('/api/v1/phongTro' + param), {});
        return response.data;
    } catch (error) {
    }
};





