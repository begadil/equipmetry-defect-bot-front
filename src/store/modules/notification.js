export default {
  namespaced: true,
  state: {
    status: false,
    text: "",
    type: null,
  },
  mutations: {
    update(state, payload) {
      state.status = payload.status;
      state.text = payload.text;
      state.type = payload.type;
    },
  },
  actions: {
    show({ commit }, payload) {
      let text = "";
      let type = "error";
      if (typeof payload === "object") {
        text = payload.text;
        if (["error", "info", "success"].includes(payload.type)) {
          type = payload.type;
        }
      } else {
        text = payload;
      }
      commit("update", {
        status: true,
        text: text,
        type: type,
      });
    },
    hide({ commit }) {
      commit("update", {
        status: false,
        text: "",
        type: null,
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
    type(state) {
      return state.type;
    },
  },
};
