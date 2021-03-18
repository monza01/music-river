import Vuex from "vuex";
import * as actions from "@/store/actions";
import * as getters from "@/store/getters";
import state from "@/store/state";
import mutations from "@/store/mutations";

export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations
});
