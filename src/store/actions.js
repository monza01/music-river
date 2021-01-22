export const manageUser = function({ commit }, { status, id, avatar }) {
  commit("SET_LOGIN_STATUS", status);
  commit("SET_USER_ID", id);
  commit("SET_USER_AVATAR", avatar);
};
