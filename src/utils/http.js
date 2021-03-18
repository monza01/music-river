import axios from "axios";
import Cookies from "vue-cookies";
import store from "../store";

const timeStamp = () => {
  return new Date().getTime();
};

const instance = axios.create({
  baseURL: "http://10.131.1.30:3000",
  timeout: 10000,
  withCredentials: true
});

instance.interceptors.request.use(
  config => {
    const USER_COOKIE = Cookies.get("userCookie") || "";
    if (USER_COOKIE) {
      config.params = {
        ...config.params,
        cookie: USER_COOKIE
      };
    }
    if (config.method === "get") {
      config.params = {
        ...config.params,
        timestamp: timeStamp()
      };
    } else if (config.method === "post") {
      config.url += `?timestamp=${timeStamp()}`;
      config.data = {
        ...config.data
      };
    }
    return config;
  },
  error => {
    store.commit("SET_ALERT", true);
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  response => {
    if (response.status !== 200) {
      return Promise.reject(response);
    } else {
      return response.data;
    }
  },
  error => {
    if (error.response) {
      const res = error.response.data;
      return Promise.reject(res);
    } else {
      store.commit("SET_ALERT", true);
      return Promise.reject(error);
    }
  }
);

export default instance;
