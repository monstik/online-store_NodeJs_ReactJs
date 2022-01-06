import {$host, $authHost} from "./index";


export const createBrand = async (brand) => {
    const {data} = await $authHost.post('api/brand', brand);
    return data;
};

export const fetchBrands = async () => {
    const {data} = await $host.get('api/brand');
    return data;
};