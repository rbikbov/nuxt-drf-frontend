export const getters = {};

export const actions = {
  // regUser
  async registration(
    { dispatch },
    { fields, endpoint = '/auth/registration/', authAfter = false } = {}
  ) {
    const data = await this.$axios.$post(endpoint, fields);

    if (authAfter) {
      const token = data.token || data.id_token || data.key;

      // Update new token
      await dispatch('updateToken', token);

      // Fetch authenticated user
      await dispatch('fetch');
    }
  },

  // editUser
  async editUser({ commit }, { fields, endpoint = 'auth/user/' } = {}) {
    const user = await this.$axios.$put(endpoint, fields);
    commit('SET_USER', user);
    commit('users/SET_USER', user, { root: true });
  },

  // passwordChange
  async passwordChange(
    ctx,
    { fields, endpoint = 'auth/password/change/' } = {}
  ) {
    await this.$axios.$post(endpoint, fields);
  },

  // passwordReset
  async passwordReset(ctx, { fields, endpoint = 'auth/password/reset/' } = {}) {
    await this.$axios.$post(endpoint, fields);
  },

  // passwordResetConfirm
  async passwordResetConfirm(
    ctx,
    { fields, endpoint = 'auth/password/reset/confirm/' } = {}
  ) {
    global.console.log(fields);
    const data = await this.$axios.$post(endpoint, fields);
    global.console.log(data);
  }
};
