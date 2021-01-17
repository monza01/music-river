import * as types from "@/store/types";

const mutations = {
  [types.SET_SCROLL_TOP](state, pageTop) {
    state.scrollTop = pageTop;
  }
};

export default mutations;
