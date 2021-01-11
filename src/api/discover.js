import request from "@/utils/http";

export function getBanner() {
  return request.get("/banner?type=2");
}

export function getRecommendSongList() {
  return request.get("/personalized");
}

export function getChosenSongList(params) {
  return request.get("/top/playlist/highquality", { params });
}

export function getRankSummary() {
  return request.get("/toplist/detail");
}
