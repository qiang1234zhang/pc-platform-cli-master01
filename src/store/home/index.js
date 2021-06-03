import Vue from "vue";
import Vuex from "vuex";
import state from "./state";
import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

Vue.use(Vuex);

const home = {
  namespaced: true,
  state, // 注册state
  mutations, // 注册mutations
  actions, // 注册actions
  getters // 注册getters
};
export default home;
