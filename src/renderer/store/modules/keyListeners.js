const state = {
  keys: [
    {
      key: 16,
      gamepad: 4,
      interval: 15000,
      notification: 10000,
      name: 'Q - Ability',
    },
    {
      key: 18,
      gamepad: 5,
      interval: 60000,
      notification: 10000,
      name: 'E - Ability',
    },
  ],
  editing: false,
};

const mutations = {
  editing(state, value) {
    state.editing = value;
  },
  update(state, value) {
    state.keys = value;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
};
