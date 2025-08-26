import axios, { type AxiosResponse } from "axios";

const apiUrl: string = "http://localhost:5174/api/";
interface User {
    username: string,
    email: string,
    password: string,
};

export const registerUser = async (user: User) => {
    try {
        const response: AxiosResponse = await axios.post(`${apiUrl}user/register`, user);
        return response.data;
    } catch (err) {
        return err;
    };
};

export const loginUser= async (user: User) => {
    try {
        const response: AxiosResponse = await axios.post(`${apiUrl}user/login`, user);
        return response.data;
    } catch (err) {
        return err;
    };
};