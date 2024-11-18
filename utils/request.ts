import axios from "axios";
import { ElMessage, ElMessageBox } from "element-plus";

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
    if (response.data.code != 200) {
      ElMessage({
        message: response.data.message,
        type: "error",
        duration: 5000,
      });
      return Promise.reject(response.data);
    }
    return response.data;
  },
  (err: any) => {
    return Promise.reject(err.response);
  }
);

export default service;
