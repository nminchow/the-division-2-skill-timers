import activeWin from 'active-win';

const state = {
  title: '',
};

const getters = {
  gameActive: state => state.title.includes('the-division-2-skill-timers'),
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
