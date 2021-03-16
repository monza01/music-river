export const logged = state => state.logged;
export const userId = state => state.userId;
export const userAvatar = state => state.userAvatar;
export const cacheViews = state => state.cacheViews;
export const playing = state => state.playing;
export const fullScreen = state => state.fullScreen;
export const playlist = state => state.playlist;
export const sequenceList = state => state.sequenceList;
export const mode = state => state.mode;
export const currentIndex = state => state.currentIndex;
export const currentSong = state => {
  return state.playlist[state.currentIndex] || {};
};
export const showTab = state => state.showTab;
export const progress = state => state.progress;
export const alert = state => state.alert;
