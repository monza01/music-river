import axios from "axios";

export default function(config) {
  const instance = axios.create({
    baseURL: "https://autumnfish.cn",
    timeout: 10000,
    withCredentials: true
  });
  return instance(config);
}
