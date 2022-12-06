export default {
  namespaced: true,
  state: {
    status: false,
    text: "",
  },
  mutations: {
    update(state, payload) {
      state.status = payload.status;
      state.text = payload.text;
    },
  },
  actions: {
    show({ commit }, payload) {
      commit("update", payload);
    },
    hide({ commit }) {
      commit("update", {
        status: false,
        text: "",
      });
    },
  },
  getters: {
    status(state) {
      return state.status;
    },
    text(state) {
      return state.text;
    },
  },
};
