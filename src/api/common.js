import request from "@/utils/http";

export function getPlaylist(params) {
  return request.get("/playlist/detail", { params });
}
