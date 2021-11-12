import axios from "axios";

// Setting Up API
const API = axios.create({ baseURL: `${process.env.REACT_APP_API}/api` });
const token = `Bearer ${JSON.parse(localStorage.getItem("token"))}`;

API.interceptors.request.use((req) => {
	if (token) {
		req.headers.Authorization = token;
	}
	return req;
});

// Product APIs
export const getAllProductsAPI = () => API.post("/products/createProduct");
export const getFeaturedProductsAPI = () => API.get("/products/getFeaturedProducts");
