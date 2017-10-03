<template>
  <v-app :dark="settings.dark"
         :light="!settings.dark"
         fill-height
         toolbar
         footer
         fixed>
    <v-navigation-drawer persistent
                         :mini-variant="settings.firstDrawerMini"
                         :clipped="settings.firstDrawerClipped"
                         v-model="firstDrawer"
                         :right="settings.firstDrawerRight"
                         enable-resize-watcher>
      <v-toolbar v-if="user"
                 flat
                 class="transparent">
        <v-list class="pa-0">
          <v-flex layout
                  row>
            <v-flex xs12>
              <v-list-tile avatar
                           :to="{ name: 'users-id', params: { id: user.id } }"
                           exact>
                <v-list-tile-avatar>
                  <img v-if="user.avatar_url"
                       :src="user.avatar_url"
                       :alt="user.username">
                  <v-icon v-else>face</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title>{{ user.username }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-flex>
            <v-flex>
              <v-menu>
                <v-btn icon
                       slot="activator"
                       class="mt-2">
                  <v-icon>more_vert</v-icon>
                </v-btn>
                <v-list>
                  <v-list-tile v-for="route in userDropdownRoutes"
                               :key="route.title"
                               :to="route.to"
                               exact>
                    <v-list-tile-action>
                      <v-icon>{{ route.icon }}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-title>{{ route.title }}</v-list-tile-title>
                  </v-list-tile>
                </v-list>
              </v-menu>
            </v-flex>
          </v-flex>
        </v-list>
      </v-toolbar>
      <v-list class="pt-0"
              dense>
        <v-divider />
        <v-list-tile v-for="route in routes"
                     :key="route.title"
                     :to="route.to"
                     :exact="route.exact">
          <v-list-tile-action>
            <v-icon>{{ route.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ route.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar :fixed="settings.headerFixed">
      <v-toolbar-side-icon v-if="!settings.firstDrawerRight"
                           @click.stop="firstDrawer = !firstDrawer" />
      <v-btn v-if="!settings.secondDrawerRight"
             icon
             @click.stop="secondDrawer = !secondDrawer">
        <v-icon>chat</v-icon>
      </v-btn>
      <v-toolbar-title>{{ $route && $route.name && $route.name.toUpperCase() }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn v-if="settings.secondDrawerRight"
             icon
             @click.stop="secondDrawer = !secondDrawer">
        <v-icon>chat</v-icon>
      </v-btn>
      <v-toolbar-side-icon v-if="settings.firstDrawerRight"
                           @click.stop="firstDrawer = !firstDrawer" />
    </v-toolbar>
    <main>
      <v-container fluid>
        <slot />
      </v-container>
    </main>
    <v-navigation-drawer temporary
                         :right="settings.secondDrawerRight"
                         v-model="secondDrawer">
      <v-list>
        <v-list-tile @click="changeSingleSetting('secondDrawerRight')">
          <v-list-tile-action>
            <v-icon light>compare_arrows</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Переместить панель {{ settings.secondDrawerRight ? 'налево' : 'направо' }}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-footer :fixed="settings.footerFixed">
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'; // eslint-disable-line import/no-extraneous-dependencies

export default {
  data: () => ({
    firstDrawer: true,
    secondDrawer: false,
    allRoutes: [
      { to: { name: 'index' }, title: 'Главная', icon: 'home', exact: true },
      { to: { name: 'users' }, title: 'Пользователи', icon: 'people_outline', exact: true, permission: false },
      { to: { name: 'settings' }, title: 'Настройки', icon: 'settings' },
      { to: { name: 'auth-login' }, title: 'Войти', icon: 'fingerprint', permission: true },
      { to: { name: 'auth-registration' }, title: 'Регистрация', icon: 'person_add', permission: true },
      { to: { name: 'auth-logout' }, title: 'Выйти', icon: 'power_settings_new', permission: false },
    ],
    userDropdownRoutes: [
      { to: { name: 'auth-user-edit' }, title: 'Редактировать данные', icon: 'edit' },
      { to: { name: 'auth-password-change' }, title: 'Изменить пароль', icon: 'security' },
    ]
  }),
  computed: {
    ...mapGetters({ user: 'auth/user', loggedIn: 'auth/loggedIn' }),
    settings() {
      return this.$store.state.settings;
    },
    routes() {
      return this.allRoutes.filter(({ permission }) => permission !== this.loggedIn);
    }
  },
  methods: {
    changeSingleSetting(key) {
      this.$store.commit('settings/CHANGE_SETTING', key);
      this.$store.dispatch('settings/saveSettings');
    }
  },
  mounted() {
    this.$store.dispatch('settings/loadSettings');
  }
}
</script>