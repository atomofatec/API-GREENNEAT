import axios from "axios";
import { API_BASE_URL } from "../../env";

const tokenCookie = document.cookie.split(" ");
let token = tokenCookie[0].split("=")[1];
token = token.substring(0, token.length - 1);

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    "Authorization": token,
  },
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      const { status } = error.response;

      switch (status) {
        case 401: {
          return Promise.reject(error.response.data);
        }

        default: {
          return Promise.reject(error.response.data);
        }
      }
    }

    return Promise.reject(error);
  }
);
