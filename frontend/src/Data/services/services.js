import axios from "axios";

const API = axios.create({ baseURL: `${process.env.REACT_APP_API}` });

export const fetchPosts = () => API.get(`/endpoint`);
export const fetchPosts = () => API.post(`/endpoint`);
