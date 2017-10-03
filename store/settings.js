import Cookie from 'cookie'; // eslint-disable-line import/no-extraneous-dependencies
import Cookies from 'js-cookie'; // eslint-disable-line import/no-extraneous-dependencies

export const state = () => ({
  dark: false,
  firstDrawerClipped: false,
  firstDrawerRight: true,
  firstDrawerMini: false,
  secondDrawerRight: false,
  headerFixed: true,
  footerFixed: false,
  defaultAvatar: 'https://vk.com/images/camera_200.png'
});

export const mutations = {
  SET_SETTINGS(state, settings) {
    if (settings && typeof settings === 'object') {
      Object.assign(state, settings);
    }
  },
  CHANGE_SETTING(state, keys) {
    keys.split('|').forEach(key => {
      state[key] = !state[key];
    });
  }
};

export const actions = {
  saveSettings({ state }) {
    if (process.browser && state) {
      const json = JSON.stringify(state);
      Cookies.set('settings', json);
      if (localStorage) {
        localStorage.setItem('nuxt::user::settings', json);
      }
    }
  },
  loadSettings({ dispatch, commit }) {
    let userSettings;

    if (process.browser && localStorage) {
      userSettings = localStorage.getItem('nuxt::user::settings');
    }

    if (process.browser && !userSettings) {
      const cookies = Cookie.parse(document.cookie || '') || {};
      userSettings = cookies.settings;
    }

    if (!userSettings) return;

    try {
      userSettings = JSON.parse(userSettings);
      commit('SET_SETTINGS', userSettings);
    } catch (error) {
      global.console.log(`${error}`);
      dispatch('clearSettings');
    }
  },
  updateSettings({ commit, dispatch }, { ...settings }) {
    commit('SET_SETTINGS', settings);
    dispatch('saveSettings', settings);
  },
  clearSettings() {
    if (process.browser) {
      Cookies.remove('settings');
      if (localStorage) {
        localStorage.removeItem('nuxt::user::settings');
      }
      global.console.log('Settings removed');
    }
  }
};
