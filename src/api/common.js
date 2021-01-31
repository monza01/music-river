import request from "@/utils/http";

export function getPlaylist(params) {
  return request.get("/playlist/detail", { params });
}
export function getChosenSongs(params) {
  return request.get("/top/playlist", { params });
}

export function getRecommendSongList(params) {
  return request.get("/personalized", { params });
}
