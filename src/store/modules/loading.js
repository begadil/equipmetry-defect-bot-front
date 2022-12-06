export default {
  namespaced: true,
  state: {
    status: false,
  },
  mutations: {
    update(state, payload) {
      state.status = payload;
    },
  },
  actions: {
    show({ commit }) {
      commit("update", true);
    },
    hide({ commit }) {
      commit("update", false);
    },
  },
  getters: {
    status(state) {
      return state.status;
    },
  },
};
