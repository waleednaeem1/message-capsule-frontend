import { createStore } from 'vuex';

export default createStore({
  state: {
    capsules: []
  },
  mutations: {
    addCapsule(state, capsule) {
      state.capsules.push(capsule);
    }
  },
  actions: {
    addCapsule({ commit }, capsule) {
      commit('addCapsule', capsule);
    }
  },
  getters: {
    capsules: state => state.capsules
  }
});
