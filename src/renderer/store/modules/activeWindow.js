import activeWin from 'active-win';

const state = {
  title: '',
};

const getters = {
  gameActive: state => state.title.includes('Tom Clancy\'s The Division 2'),
};

const mutations = {
  setActiveWindowData(state, { title }) {
    state.title = title;
  },
};

const actions = {
  listenForActive({ state, commit }) {
    const pollActive = () => {
      activeWin().then((result) => {
        if (state.title !== result.title) {
          commit('setActiveWindowData', result);
        }
      });
    };
    setInterval(pollActive, 100);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
