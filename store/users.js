import Vue from 'vue';

export const state = () => ({
  count: 0,
  previous: null,
  next: null,
  results: {}
});

export const mutations = {
  SET_USERS(state, { count, previous, next, results }) {
    state.count = count;
    state.previous = previous;
    state.next = next;
    if (results && results.length) {
      results.forEach(user => {
        Vue.set(state.results, user.id, user);
      });
    }
  },
  SET_USER(state, user) {
    Vue.set(state.results, user.id, user);
  }
};

export const actions = {
  async fetchUsers({ commit }, { endpoint = '/users', params, id = '' } = {}) {
    const url = id ? `${endpoint}/${id}` : endpoint;
    const data = await this.$axios.$get(url, { params });
    if (id) {
      commit('SET_USER', data);
    } else {
      commit('SET_USERS', data);
    }
    return Promise.resolve(data);
  },
  async getUserById({ dispatch, getters }, { id }) {
    const user = getters.byId(id) || (await dispatch('fetchUsers', { id }));
    return Promise.resolve(user);
  }
};

export const getters = {
  toArray: state => () => Object.values(state.results),
  byId: state => id => state.results[id]
};
