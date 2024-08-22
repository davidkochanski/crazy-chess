import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:4004",
    withCredentials: true
})

// interceptors are like football, when we send an API request to the server, and the server throws something back, we INTERCEPT that message here.
// We need 2 functions, one that handles a response and one that handles an error.
// This is needed because the front end has no idea how to catch the backend response, so we give it this space right here.

API.interceptors.response.use(
    // We only want to keep the data part, the rest is garbage (well not rly)
    (response) => response.data,

    // Likewise, we only want the reject the promise with the status and the data instead of everything else.
    // In the backend, we defined error messages and some error codes.
    (error) => {
        const { status, data } = error.response;
        return Promise.reject({status, ...data})
    }
);

export default API

