import {$host, $authHost} from "./index";
import jwtDecode from "jwt-decode"


export const registration = async (formData) => {
    const {data} = await $host.post('api/user/registration', formData);
    localStorage.setItem('token', data.token);
    return jwtDecode(data.token);
};

export const login = async (email, password) => {
    const {data} = await $host.post('api/user/login', {email, password});
    localStorage.setItem('token', data.token);
    return jwtDecode(data.token);
};

export const check = async () => {
    const {data} = await $authHost.get('api/user/auth');
    localStorage.setItem('token', data.token);
    return jwtDecode(data.token);
};

export const fetchUser = async () => {
    const {data} = await $authHost.get('api/user/fetchUser');
    return data;
};

export const fetchUsers = async (page, limit) => {
    const {data} = await $authHost.get('api/user', {
        params: {
            page,
            limit
        }
    });

    return data;
};

export const updateUserRole = async (id, role) => {
    const {data} = await $authHost.put('api/user/role',{
        id, role
    });

    return data;
}