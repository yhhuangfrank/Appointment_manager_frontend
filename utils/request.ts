import axios from "axios";
import { ElMessage } from "element-plus";

// create instance of axios
const service = axios.create({
  baseURL: "http://localhost",
  timeout: 15000,
});

service.interceptors.request.use(
  (config: any) => {
    return config;
  },
  (err: any) => {
    return Promise.reject(err);
  }
);

service.interceptors.response.use(
  (response: any) => {
    if (response.status != 200) {
      ElMessage({
        message: response.message,
        type: "error",
        duration: 5000,
      });
      return Promise.reject(response.message);
    }
    return response.data;
  },
  (err: any) => {
    return Promise.reject(err.response);
  }
);

export default service;
