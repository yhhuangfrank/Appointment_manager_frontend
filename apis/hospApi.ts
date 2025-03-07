import request from "@/utils/request";

const API_NAME = "/api/hosp";

export default {
  getPageList(page: number, limit: number, query: any) {
    return request({
      url: `${API_NAME}/findHospList/${page}/${limit}`,
      method: "post",
      data: query,
    });
  },
  getByHosName(hosName: string) {
    return request({
      url: `${API_NAME}/findHospByHosName/${hosName}`,
      method: "get",
    });
  },
  getById(id: string) {
    return request({
      url: `${API_NAME}/${id}`,
      method: "get",
    });
  },
  getBookingScheduleRule(page: number, limit: number, hosCode: string) {
    return request({
      url: `${API_NAME}/auth/getBookingScheduleRule/${page}/${limit}/${hosCode}`,
      method: "get",
    });
  },
  findScheduleList(hosCode: string, workDate: string) {
    return request({
      url: `${API_NAME}/auth/findScheduleList/${hosCode}/${workDate}`,
      method: "get",
    });
  },
};
