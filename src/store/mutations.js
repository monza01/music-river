const mutations = {
  SET_LOGIN_STATUS(state, status) {
    state.logged = status;
  },
  SET_USER_ID(state, id) {
    state.userId = id;
  },
  SET_USER_AVATAR(state, avatar) {
    state.userAvatar = avatar;
  },
  SET_CACHE_VIEWS(state, view) {
    if (state.cacheViews.indexOf(view) === -1) {
      state.cacheViews.push(view);
    }
  },
  REMOVE_CACHE_VIEWS(state, view) {
    const index = state.cacheViews.indexOf(view);
    if (index !== -1) {
      state.cacheViews.splice(index, 1);
    }
  },
  SET_PLAYING_STATE(state, flag) {
    state.playing = flag;
  },
  SET_FULL_SCREEN(state, flag) {
    state.fullScreen = flag;
  },
  SET_PLAYLIST(state, list) {
    state.playlist = list;
  },
  SET_SEQUENCE_LIST(state, list) {
    state.sequenceList = list;
  },
  SET_PLAY_MODE(state, mode) {
    state.mode = mode;
  },
  SET_CURRENT_INDEX(state, index) {
    state.currentIndex = index;
  },
  SET_SHOW_TAB(state, flag) {
    state.showTab = flag;
  },
  SET_PROGRESS(state, percent) {
    state.progress = percent;
  },
  SET_ALERT(state, flag) {
    state.alert = flag;
  }
};

export default mutations;
