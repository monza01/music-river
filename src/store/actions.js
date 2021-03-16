import { shuffle } from "@/utils/utils";
import { playMode } from "@/utils/config";

function findIndex(list, song) {
  return list.findIndex(item => {
    return item.id === song.id;
  });
}

export const manageUser = function({ commit }, { status, id, avatar }) {
  commit("SET_LOGIN_STATUS", status);
  commit("SET_USER_ID", id);
  commit("SET_USER_AVATAR", avatar);
};

export const selectPlay = function({ commit, state }, { list, index }) {
  commit("SET_SEQUENCE_LIST", list);
  if (state.mode === playMode.random) {
    let randomList = shuffle(list);
    commit("SET_PLAYLIST", randomList);
    index = findIndex(randomList, list[index]);
  } else {
    commit("SET_PLAYLIST", list);
  }
  commit("SET_CURRENT_INDEX", index);
  commit("SET_FULL_SCREEN", true);
  commit("SET_PLAYING_STATE", true);
};

export const randomPlay = function({ commit }, { list }) {
  commit("SET_PLAY_MODE", playMode.random);
  commit("SET_SEQUENCE_LIST", list);
  let randomList = shuffle(list);
  commit("SET_PLAYLIST", randomList);
  commit("SET_CURRENT_INDEX", 0);
  commit("SET_FULL_SCREEN", true);
  commit("SET_PLAYING_STATE", true);
};
