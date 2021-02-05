import request from "@/utils/http";

export function getBanner() {
  return request.get("/banner?type=2");
}
