import { auth as api } from '~/api'; // eslint-disable-line

// main auth store in 'modules/nuxtjs/auth'

export const getters = {};

export const actions = {
  async registration({ dispatch }, { fields, authAfter }) {
    const { data } = await this.$axios(api.registration(fields));

    if (authAfter) {
      const token = data.token || data.id_token || data.key; // key in django default

      // Update new token
      await dispatch('updateToken', token);

      // Fetch authenticated user
      await dispatch('fetch');
    }
  },

  async editUser({ commit }, { fields } = {}) {
    const { data } = await this.$axios(api.editUser(fields));
    commit('SET_USER', data);
    commit('users/SET_USER', data, { root: true });
  },

  async passwordChange(ctx, { fields }) {
    await this.$axios(api.passwordChange(fields));
  },

  async passwordReset(ctx, { fields }) {
    await this.$axios(api.passwordReset(fields));
  },

  async passwordResetConfirm(ctx, { fields }) {
    const { data } = await this.$axios(api.passwordResetConfirm(fields));
    global.console.log(data);
  }
};
