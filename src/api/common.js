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

export function getRankSummary() {
  return request.get("/toplist/detail");
}

export function getSongDetail(params) {
  return request.post("/song/detail", params);
}

export function getDailySongs() {
  return request.post("/recommend/songs");
}

export function getTopSingers(params) {
  return request.post("/toplist/artist", params);
}
