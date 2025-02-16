import request from "@/utils/request";

const API_NAME = "/api/user";

export default {
  login(userInfo: any) {
    return request({
      url: `${API_NAME}/login`,
      method: "post",
      data: userInfo,
    });
  },
  saveUserAuth(userAuth: any) {
    return request({
      url: `${API_NAME}/auth/userAuth`,
      method: "post",
      data: userAuth,
    });
  },
  getUserInfo() {
    return request({
      url: `${API_NAME}/auth/userInfo`,
      method: "get",
    });
  },
};
