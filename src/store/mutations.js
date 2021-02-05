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
  }
};

export default mutations;
