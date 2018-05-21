<template>
  <v-layout row
            v-scroll="onScroll">
    <v-flex xs12
            sm6
            offset-sm3>
      <v-card>
        <v-toolbar>
          <v-toolbar-title>Всего {{ searchText && 'найдено' }} пользователей: {{ users.count }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-progress-circular v-if="loading"
                               indeterminate
                               class="primary--text mr-2" />
          <v-text-field name="search"
                        label="Поиск"
                        v-model="searchText"
                        @input="searchUsers"
                        append-icon="search"
                        type="text" />
        </v-toolbar>
        <v-list three-line>
          <transition-group v-if="filteredUsers.length"
                            name="scale-transition"
                            origin="center center">
            <div v-for="(user, i) in filteredUsers"
                 :key="user.id">
              <v-subheader>{{ i + 1 }}. {{ user.username }} (id: {{ user.id }})</v-subheader>
              <v-list-tile avatar
                           :to="{ name: 'users-id', params: { id: user.id } }"
                           download>
                <v-list-tile-avatar>
                  <img :src="user.avatar_url || $store.state.settings.defaultAvatar">
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title>{{ `${user.first_name} ${user.last_name}` }}</v-list-tile-title>
                  <v-list-tile-sub-title>{{ user.bio.slice(50) }}</v-list-tile-sub-title>
                  <v-list-tile-sub-title>{{ user.location }}</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-divider />
            </div>
          </transition-group>
          <template v-else>
            <v-subheader>Не найдено</v-subheader>
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title>По вашему запросу ничего не найдено</v-list-tile-title>
                <v-list-tile-sub-title>Попробуйте изменить запрос</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
        <v-btn v-if="users.next"
               :loading="loading"
               :disabled="loading"
               block
               @click="moreUsers">Еще</v-btn>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
let timeout = null;

export default {
  name: 'users',
  middleware: 'auth',
  data: () => ({
    searchText: '',
    loading: false
  }),
  async fetch({ store, error }) {
    if (store.state.users.results.length) return;
    try {
      await store.dispatch('users/fetchUsers');
    } catch ({ response: { status, statusText, data } }) {
      error({ status, statusText, data });
    }
  },
  computed: {
    users() {
      return this.$store.state.users;
    },
    filteredUsers() {
      return this.$store.getters['users/toArray']().filter((
        { username, email, first_name, last_name } // eslint-disable-line camelcase
      ) => this.checkSearchString(username, email, first_name, last_name));
    }
  },
  methods: {
    checkSearchString(...fieldValues) {
      return fieldValues.some(val =>
        val.toLowerCase().includes(this.searchText.toLowerCase())
      );
    },
    onScroll() {
      const {
        scrollHeight,
        scrollTop,
        clientHeight
      } = document.documentElement;
      const scrollEnd = scrollHeight - scrollTop < clientHeight + 5; // 5px to page end
      if (!scrollEnd) return;
      this.moreUsers();
    },
    async moreUsers() {
      if (!this.users.next || this.loading) return;
      this.loading = true;
      await this.$store.dispatch('users/fetchUsers', {
        endpoint: this.users.next
      });
      this.loading = false;
    },
    async searchUsers() {
      this.loading = true;
      clearTimeout(timeout);
      timeout = setTimeout(async () => {
        const params = this.searchText ? { search: this.searchText } : '';
        await this.$store.dispatch('users/fetchUsers', { params });
        this.loading = false;
      }, 1000);
    }
  }
};
</script>
