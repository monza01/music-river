import request from "@/utils/http";
export function getBanner() {
  return request({
    url: "/banner?type=2"
  });
}
