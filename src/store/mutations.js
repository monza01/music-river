const mutations = {
  SET_LOGIN_STATUS(state, status) {
    state.logged = status;
  },
  SET_USER_ID(state, id) {
    state.userId = id;
  },
  SET_USER_AVATAR(state, avatar) {
    state.userAvatar = avatar;
  }
};

export default mutations;
