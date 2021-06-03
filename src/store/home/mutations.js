const mutations = {
  changeState(state, opt) {
    state[opt.key] = opt.val;
  },
  // 侧边栏折叠
  SETTOGGLE(state) {
    state.isCollapsed = !state.isCollapsed;
    if (!state.isCollapsed) {
      state.defaultOpeneds = ["4", "5", "6", "7", "8"];
    }
  }
};

export default mutations;
