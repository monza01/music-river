import { playMode } from "@/utils/config";

const state = {
  logged: false,
  userId: 0,
  userAvatar: "",
  cacheViews: [],
  playing: false,
  fullScreen: false,
  playlist: [],
  sequenceList: [],
  mode: playMode.sequence,
  currentIndex: -1,
  showTab: true,
  progress: 0,
  alert: false
};

export default state;
