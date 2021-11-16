import axios from "axios";

// Setting Up API
const API = axios.create({ baseURL: `${process.env.REACT_APP_API}/api` });
const token = `Bearer ${localStorage.getItem("token")}`;

API.interceptors.request.use((req) => {
	if (localStorage.getItem("token")) {
		req.headers.Authorization = token;
	}
	return req;
});

// Product APIs
export const getAllProductsAPI = (keyword, page, price, category, rating) => {
	let link = `/products/getAllProducts?keyword=${keyword}&page=${page}&price[gte]=${price[0]}&price[lte]=${price[1]}&rating[gte]=${rating}`;
	if (category) {
		link = `/products/getAllProducts?keyword=${keyword}&page=${page}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&rating[gte]=${rating}`;
	}
	return API.get(link);
};
export const getFeaturedProductsAPI = () => API.get("/products/getFeaturedProducts");
export const getSingleProductAPI = (id) => API.get(`/products/getProduct/${id}`);

// Authentication APIs
export const loginAPI = (email, password) => API.post("/auth/login", { email, password });
export const registerAPI = (email, name, avatar, password) => API.post("/auth/register", { email, name, avatar, password });
export const loadAPI = () => API.get("/auth/me");
