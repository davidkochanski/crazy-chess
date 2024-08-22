// API was defined in apiClient.js, as a client using axios. That is the thing that actually sends the http reqs.
// THESE are the functions to be used on the frontend that connect to the API and eventually will send HTTP requests via Axois.
import API from "./apiClient";

export const login = async (data) => API.post("/auth/login", data);