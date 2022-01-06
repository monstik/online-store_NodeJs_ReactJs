import {$host, $authHost} from "./index";
import jwtDecode from "jwt-decode"


export const createDevice = async (formData) => {
    const {data} = await $authHost.post('api/device', formData);
    return data;
};

export const updateDevice = async (formData) => {
    const {data} = await $authHost.put('api/device', formData);
    return data;
};

export const fetchDevices = async (typeId, brandId, page, limit) => {
    const {data} = await $host.get('api/device', {
        params: {
            typeId,
            brandId,
            page,
            limit
        }
    });
    return data;
};

export const searchDevices = async (searchName, typeId, brandId, page, limit) => {
    const {data} = await $host.get('api/device/search', {
        params: {
            searchName,
            typeId,
            brandId,
            page,
            limit
        }
    });
    return data;
};

export const fetchOneDevice = async (id) => {
    const {data} = await $host.get('api/device/' + id);
    return data;
};