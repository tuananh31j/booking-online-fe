import axios from 'axios';
import { getContentType } from './apiHelper';

const axiosOptions = {
    baseURL: process.env.SERVER_URL,
    headers: getContentType(),
};

export const axiosClassic = axios.create(axiosOptions);
export const instance = axios.create(axiosOptions);
