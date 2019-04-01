const state = {
  keys: [
    {
      key: 16,
      interval: 15000,
      notification: 10000,
      name: 'Q Ability',
    },
    {
      key: 18,
      interval: 60000,
      notification: 10000,
      name: 'E Ability',
    },
  ],
  editing: false,
};

const mutations = {
  editing(state, value) {
    state.editing = value;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
};
