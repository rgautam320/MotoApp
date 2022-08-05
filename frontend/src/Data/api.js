import axios from "axios";
import { REACT_APP_API } from "./config";

// Setting Up API
const API = axios.create({ baseURL: `${REACT_APP_API}/api` });

API.interceptors.request.use((req) => {
    if (localStorage.getItem("TOKEN")) {
        req.headers.Authorization = `Bearer ${localStorage.getItem("TOKEN")}`;
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

export const getAllProductsAdminAPI = () => API.get("products/getAllProductsAdmin");
export const updateProductAPI = (id, data) => API.put(`products/updateProduct/${id}`, { data });
export const deleteProductAPI = (id) => API.delete(`products/deleteProduct/${id}`);
export const createProductAPI = (data) => API.post(`products/createProduct`, { data });

// Authentication APIs
export const loginAPI = (email, password) => API.post("/auth/login", { email, password });
export const registerAPI = (email, name, avatar, password) =>
    API.post("/auth/register", { email, name, avatar, password });
export const activateAccountAPI = (token) => API.put(`/auth/profile/activate/${token}`);
export const loadAPI = () => API.get(`/auth/me`);
export const updateProfileAPI = (info) => API.put("/auth/updateUserDetails", info);
export const changePasswordAPI = (passwords) => API.put("/auth/updatePassword", passwords);
export const forgotPasswordAPI = (email) => API.post("/auth/password/forgot", { email });
export const resetPasswordAPI = (token, passwords) => API.put(`/auth/password/reset/${token}`, passwords);
export const logoutAPI = () => API.get("/auth/logout");

export const getAllUsersAdminAPI = () => API.get("auth/admin/getAllUsers");
export const updateUserAdminAPI = (id, data) => API.put(`auth/admin/updateUser/${id}`, { role: data });
export const deleteUserAdminAPI = (id) => API.delete(`auth/admin/deleteUser/${id}`);

// Payment
export const getStripeKeyAPI = () => API.get("/payment/stripeapikey");
export const makePaymentAPI = (amount) => API.post("/payment/process", { amount });

// Cart
export const updateCartAPI = (cartItems) => API.post("/cart/update-cart", { cartItems });
export const getCartAPI = () => API.get("/cart/get-cart");

// Order
export const makeOrderAPI = (order) => API.post("/order/placeOrder", order);
export const getMyOrdersAPI = () => API.get("/order/getAllMyOrders");
export const getOrderDetailsAPI = (id) => API.get(`/order/getSingleOrder/${id}`);

export const getAllOrdersAdminAPI = () => API.get(`/order/getAllOrders`);
export const deleteOrderAdminAPI = (id) => API.delete(`/order/deleteOrder/${id}`);
export const updateOrderStatusAdminAPI = (id, status) => API.put(`/order/updateOrder/${id}`, { status });

// Review
export const writeReviewAPI = (id, comment, rating) => API.put(`/products/review/${id}`, { comment, rating });

// Contact
export const sendMessageAPI = (fullname, email, phone, message) =>
    API.post("/contact/contactUs", { fullname, email, phone, message });

// Dashboard
export const getDashboardDetailsAPI = () => API.get("dashboard/get");
