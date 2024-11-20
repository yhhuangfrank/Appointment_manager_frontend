import request from "@/utils/request";

const API_NAME = "/admin/cmn/dict";

export default {
  findChildrenData(parentId: number) {
    return request({
      url: `${API_NAME}/findChildrenData/${parentId}`,
      method: "get",
    });
  },
};
