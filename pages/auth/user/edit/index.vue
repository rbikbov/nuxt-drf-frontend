<template>
  <v-layout column>
    <user-edit-form :user="user"
                    :redirect="{ name: 'index' }"
                    @success="successEdit" />
  </v-layout>
</template>

<script>
import UserEditForm from '~/components/auth/UserEditForm.vue';

export default {
  name: 'auth-user',
  middleware: 'auth',
  components: { UserEditForm },
  computed: {
    user() {
      return this.$store.getters['auth/user'];
    },
  },
  methods: {
    successEdit() {
      global.console.log('successEdit');
    }
  }
}
</script>
