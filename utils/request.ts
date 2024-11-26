import axios from "axios";
import { ElMessage } from "element-plus";
import Cookies from "js-cookie";

// create instance of axios
const service = axios.create({
  baseURL: "http://localhost",
  timeout: 15000,
});

service.interceptors.request.use(
  (config: any) => {
    config.headers["token"] = Cookies.get("token");
    return config;
  },
  (err: any) => {
    return Promise.reject(err);
  }
);

service.interceptors.response.use(
  (response: any) => {
    if (
      response.status !== 200 ||
      response.data.message === "Unauthenticated!"
    ) {
      ElMessage({
        message: response.data,
        type: "error",
        duration: 5000,
      });
      return Promise.reject(response.data);
    }
    return response.data;
  },
  (err: any) => {
    ElMessage({
      message: err.message,
      type: "error",
      duration: 5000,
    });
    return Promise.reject(err.response);
  }
);

export default service;
